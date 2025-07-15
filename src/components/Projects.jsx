import React, { useState, useEffect } from "react";
import useContentful from "../data/useContentful";

const Projects = () => {
  const { getProjects } = useContentful();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define the preferred order of projects
  const WORK_ORDER = [
    "AppointMe",
    "Structify",
    "NutriPAL",
    "AI-Summarizer",
    "TaskFlow",
    "My Portfolio",
  ];

  // Define colors for different technology tags
  const tagColors = {
    React: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Next: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Node: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    MongoDB:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    JavaScript:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    TypeScript:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Python: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    CSS: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    HTML: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    tailwind:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    Tailwind:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    ThreeJS:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Contentful:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Vue: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    Angular: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Express: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    "Next.js": "bg-black text-white dark:bg-white/20 dark:text-white",
    Vite: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Firebase:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    API: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    OpenAI:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    PostgreSQL:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    MySQL:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Redis: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Docker: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    AWS: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Git: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };

  // Get color for a tag
  const getTagColor = (tag) => {
    return (
      tagColors[tag] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    );
  };

  // Extract unique tags for filter buttons
  const uniqueTags = [
    "All",
    ...new Set(projects.flatMap((project) => project.tags)),
  ];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  // Function to check URL and open project if needed
  const checkUrlForProject = () => {
    const path = window.location.pathname;
    if (path.includes("/project-")) {
      const projectName = decodeURIComponent(path.split("/project-")[1]);
      const projectToOpen = projects.find((p) => p.name === projectName);
      if (projectToOpen) {
        setSelectedProject(projectToOpen);
        setCurrentImageIndex(0);
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        console.log("Fetched projects:", data);

        // Sort projects according to WORK_ORDER
        const sortedProjects = data.sort((a, b) => {
          return WORK_ORDER.indexOf(a.name) - WORK_ORDER.indexOf(b.name);
        });

        setProjects(sortedProjects);
        console.log("Projects fetched and sorted:", sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Check URL for project after projects are loaded
  useEffect(() => {
    if (projects.length > 0) {
      checkUrlForProject();
    }
  }, [projects]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes("/project-")) {
        checkUrlForProject();
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [projects]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Update URL without reloading page
    const newUrl = `/project-${encodeURIComponent(project.name)}`;
    window.history.pushState({}, "", newUrl);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    // Remove project from URL
    window.history.pushState({}, "", "/");
  };

  // Handle clicking outside modal
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeProjectModal();
    }
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Function to convert Contentful image URL to HTTPS
  const getHttpsImageUrl = (url) => {
    if (!url) return "/api/placeholder/400/250";
    return url.startsWith("//") ? `https:${url}` : url;
  };

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-100">
            Here are some of the projects I've worked on. Click on any project
            to learn more.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {uniqueTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="card group hover:shadow-xl transition-all duration-300 bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden ">
                <img
                  src={
                    project.image
                      ? getHttpsImageUrl(project.image.url)
                      : "/api/placeholder/400/250"
                  }
                  alt={project.name}
                  className="w-full h-full object-contain bg-gray-800 transform group-hover:scale-102 transition-transform duration-300"
                />
                {/* Project Links Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {project.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags &&
                    project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 text-xs rounded font-medium ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {selectedProject.name}
              </h3>
              <button
                onClick={closeProjectModal}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mb-6 relative">
                  <div className="rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={getHttpsImageUrl(
                        selectedProject.images[currentImageIndex].url
                      )}
                      alt={
                        selectedProject.images[currentImageIndex].description ||
                        selectedProject.name
                      }
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Image Description */}
                  {selectedProject.images[currentImageIndex].description && (
                    <div className="mt-3 text-sm text-gray-400 italic text-center">
                      {selectedProject.images[currentImageIndex].description}
                    </div>
                  )}

                  {/* Navigation Arrows (only if more than one image) */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Project Description - Only show if different from image description */}
              {selectedProject.description && (
                <div className="mb-6 hidden md:block">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              )}

              {/* Technologies Used */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags &&
                    selectedProject.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
