import React from 'react'
import { useState } from 'react'
import { projects } from '../data/index'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  
  // Extract unique tags for filter buttons
  const uniqueTags = ['All', ...new Set(projects.flatMap(project => project.tags))]
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter))

  return (
    <section id="projects" className="bg-white dark:bg-gray-800">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300">
            Here are some of the projects I've worked on. Click on any project to learn more.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {uniqueTags.slice(0, 8).map((tag, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="card group hover:shadow-xl transition-all duration-300">
              {/* Project Image */}
              <div className="relative overflow-hidden h-60">
                <img
                  src={project.imageUrl || "/api/placeholder/400/250"}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Project Links Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
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
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
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
    </section>
  )
}

export default Projects