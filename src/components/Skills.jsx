import React from "react";

const Skills = () => {
  // Sample data structure - in a real app, this would come from props or a data file
  const skills = {
    title: "My Skills",
    description: "Technologies and tools I work with regularly:",
    categories: [
      {
        title: "Frontend",
        items: [
          "Vue.js",
          "React",
          "Next.js",
          "JavaScript",
          "HTML5",
          "CSS3",
          "jQuery",
        ],
      },
      {
        title: "Backend",
        items: [
          "PHP",
          "Laravel",
          "Node.js",
          "MongoDB",
          "MySQL",
          "PostgreSQL",
          "REST APIs",
        ],
      },
      {
        title: "Tools & Others",
        items: ["Git", "Docker", "AWS", "VS Code", "Cypress", "Figma"],
      },
    ],
  };

  // Color mapping for different categories
  const categoryColors = {
    Frontend: {
      bg: "bg-indigo-900",
      text: "text-indigo-200",
      badge: {
        bg: "bg-indigo-700",
        hover: "hover:bg-indigo-600",
        text: "text-indigo-100",
      },
    },
    Backend: {
      bg: "bg-indigo-900",
      text: "text-indigo-200",
      badge: {
        bg: "bg-blue-700",
        hover: "hover:bg-blue-600",
        text: "text-blue-100",
      },
    },
    "Tools & Others": {
      bg: "bg-indigo-900",
      text: "text-indigo-200",
      badge: {
        bg: "bg-cyan-700",
        hover: "hover:bg-cyan-600",
        text: "text-cyan-100",
      },
    },
  };

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">{skills.title}</h2>
          <div className="h-1 w-20 bg-blue-400 mx-auto mb-8"></div>
          <p className="text-indigo-200">{skills.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {skills.categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`rounded-lg p-6 shadow-lg ${
                categoryColors[category.title].bg
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  categoryColors[category.title].text
                }`}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className={`
                      px-3 py-1 rounded-full 
                      ${categoryColors[category.title].badge.bg} 
                      ${categoryColors[category.title].badge.hover} 
                      ${categoryColors[category.title].badge.text}
                      text-sm font-medium transition-colors duration-200
                      cursor-default
                    `}
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
  );
};

export default Skills;
