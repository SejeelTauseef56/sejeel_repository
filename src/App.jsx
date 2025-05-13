import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative z-0">
      {/* Hero section with background image */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 bg-hero-pattern2 bg-cover bg-no-repeat bg-center" />
        
        {/* Gradient overlay that fades from transparent to solid color */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-[#2f2379]" />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <Hero />
        </div>
      </div>
      
      {/* Rest of the content with solid gradient background */}
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