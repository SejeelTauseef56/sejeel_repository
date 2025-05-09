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
    "My Portfolio",
    "Structify",
    "AppointMe",
    "AI-Summarizer",
    "NutriPAL",
    "TaskFlow",
  ];

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
      const projectName = decodeURIComponent(
        path.split("/project-")[1]
      );
      const projectToOpen = projects.find(
        (p) => p.name === projectName
      );
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
          <p className="text-gray-700 dark:text-gray-300">
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
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                      </a>
                    )}
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
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">
                {selectedProject.name}
              </h3>
              <button
                onClick={closeProjectModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
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
                  <img
                    src={getHttpsImageUrl(
                      selectedProject.images[currentImageIndex].url
                    )}
                    alt={
                      selectedProject.images[currentImageIndex].description ||
                      selectedProject.name
                    }
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Image Description */}
                  {selectedProject.images[currentImageIndex].description && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
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
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer"
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
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer"
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
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Project Description */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2 dark:text-white">
                  About this project
                </h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies Used */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2 dark:text-white">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags &&
                    selectedProject.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4">
                {selectedProject.projectUrl && (
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                  >
                    View Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;