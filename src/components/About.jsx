import React from "react";
import { aboutContent, personalInfo } from "../data/index";

const About = () => {
  // Technology terms to highlight
  const techTerms = [
    "PHP",
    "Laravel",
    "Vuejs",
    "React",
    "Nextjs",
    "MySQL",
    "PostgreSQL",
    "API",
    "AWS",
    "Docker",
    "JavaScript",
    "Cypress",
    "DevOps"
  ];
  
  // Function to highlight tech terms in paragraphs
  const highlightTechInText = (text) => {
    let result = text;
    
    techTerms.forEach(term => {
      // Creating a regex that matches the term as a whole word
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      result = result.replace(
        regex, 
        `<span class="text-purple-400 font-medium transition-colors duration-300 hover:text-purple-300">${term}</span>`
      );
    });
    
    return <p dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{aboutContent.title}</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* About Text with Highlighted Tech Terms */}
          <div className="w-full md:w-2/3 mx-auto text-center">
            <div className="prose prose-xl dark:prose-invert max-w-none">
              {aboutContent.description
                .split("\n\n")
                .map((paragraph, index) => (
                  <div 
                    key={index}
                    className="mb-4 text-white dark:text-gray-100 text-lg"
                  >
                    {highlightTechInText(paragraph)}
                  </div>
                ))}
            </div>

            {/* Personal Info */}
            <div className="flex flex-wrap justify-center gap-6 mt-16 max-w-4xl mx-auto">
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-lg shadow-sm w-85">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium">{personalInfo.email}</p>
                </div>
              </div>
            
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-lg shadow-sm w-85">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="font-medium">{personalInfo.location}</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-lg shadow-sm w-85">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Title
                  </p>
                  <p className="font-medium">{personalInfo.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;