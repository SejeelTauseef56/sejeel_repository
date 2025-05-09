import React from 'react'
import { skills } from '../data/index'

const Skills = () => {
  return (
    <section id="skills" className="bg-gray-100 dark:bg-gray-900">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{skills.title}</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-700 dark:text-gray-300">{skills.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="card p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-500">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <span 
                    key={itemIndex}
                    className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills