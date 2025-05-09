import React from "react";
import { personalInfo } from "../data/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

function isMobileDevice() {
  return window.innerWidth <= 768; // Adjust the threshold based on your design
}

const Hero = () => {
  // Parse the bio to handle HTML tags properly
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <section className="relative w-full h-screen mx-auto" id="home">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 px-6 sm:px-16">
        <div className="flex-col justify-center items-center mt-5 hidden sm:flex">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-purple-500 to-transparent" />
        </div>
        
        <div className="w-[100%] h-[100%] flex flex-col sm:mt-0 mt-4">
          <h1 className="font-black text-white lg:text-[90px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 text-center md:text-left mb-8">
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-400">
              Hi, I'm <span className="text-[#915eff]">Sejeel</span>
            </mark>
          </h1>
          
          <div 
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center md:text-left md:mb-2"
          >
            {personalInfo.bio.split("<br />").map((line, index) => (
              <p key={index} className="mb-1">
                <mark className="px-2 bg-[#6072a3] rounded text-white">
                  {line.trim()}
                </mark>
              </p>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:mt-3 mt-[30%]">
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 mb-2 sm:mb-0 sm:mr-0 md:mr-4"
            >
              <div className="flex items-center justify-center bg-[#0077B5] text-white rounded-md px-4 py-2 space-x-2 hover:scale-105 transition-transform active:scale-95">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                <span>LinkedIn</span>
              </div>
            </a>
            
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 mb-2 sm:mb-0 sm:mr-0 md:mr-4"
            >
              <div className="flex items-center justify-center bg-[#7655a8] text-white rounded-md px-4 py-2 space-x-2 hover:scale-105 transition-transform active:scale-95">
                <FontAwesomeIcon icon={faFileAlt} className="text-2xl" />
                <span>CV</span>
              </div>
            </a>
            
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <div className="flex items-center justify-center bg-[#333] text-white rounded-md px-4 py-2 space-x-2 hover:scale-105 transition-transform active:scale-95">
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
                <span>GitHub</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
            <div className="w-3 h-3 rounded-full bg-white mb-1 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;