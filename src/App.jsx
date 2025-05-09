import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { themeOptions } from "./data/index";

function App() {
  const [darkMode, setDarkMode] = useState(themeOptions.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative z-0 ">
      <div className="bg-hero-pattern2 bg-cover bg-no-repeat bg-center">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
      </div>

      <div className="bg-gradient-to-b from-[#2f2379] to-indigo-600 min-h-screen">
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
