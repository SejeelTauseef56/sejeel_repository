// src/data/index.js

// Personal Information
export const personalInfo = {
  name: "Sejeel Tauseef",
  title: "Software Developer",
  email: "sejeeltauseef21@gmail.com",
  phone: "07775560592",
  location: "Manchester, UK",
  bio: "Software Developer with over 2 years of experience in PHP and Laravel. I build scalable web applications, manage databases with MySQL and PostgreSQL, and deliver seamless front-end experiences using React, Vue.js, and Next.js. I follow DevOps best practices, integrate APIs, and deploy solutions using Docker and AWS.",
  social: {
    github: "https://github.com/SejeelTauseef56", // Update with actual
    linkedin: "https://www.linkedin.com/in/sejeeltauseef/", // Update with actual
  },
  resumeLink: "/Sejeel-Tauseef-Resume.pdf", // Place your resume in the public folder
}

// Navigation Links
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

// About Section
export const aboutContent = {
  title: "About Me",
  description: `I'm a Software Developer with over 2 years of experience, currently working at Chippy Digital. I specialise in PHP, Laravel, and JavaScript frameworks like Vue.js and React. I enjoy building full-stack web applications and automating workflows. I'm also experienced with Docker, AWS, API integrations, and automated testing using Cypress.

Outside of work, I explore new tech, contribute to side projects, and constantly learn to refine my craft.`,
}

// Skills
export const skills = {
  title: "My Skills",
  description: "Technologies and tools I work with regularly:",
  categories: [
    {
      title: "Frontend",
      items: ["Vue.js", "React", "Next.js", "JavaScript", "HTML5", "CSS3", "jQuery"]
    },
    {
      title: "Backend",
      items: ["PHP", "Laravel", "Node.js", "MongoDB", "MySQL", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Tools & Others",
      items: ["Git", "Docker", "AWS", "VS Code", "Cypress", "Figma"]
    }
  ]
}

// Projects
export const projects = [
  {
    title: "NutriPAL",
    description: "A meal planning and nutrition tracking app built with a focus on accessibility and responsive design.",
    tags: ["Vue.js", "Laravel", "MySQL"],
    imageUrl: "/nutripal.jpg", // Replace with actual image
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/nutripal", // Replace with actual
  },
  {
    title: "AppointMe",
    description: "An appointment management tool to book, cancel, and manage personal or client meetings.",
    tags: ["React", "Tailwind CSS", "Laravel"],
    imageUrl: "/appointme.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/appointme",
  },
  {
    title: "Structify",
    description: "A platform to manage project structure and team collaboration, integrated with CI/CD.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    imageUrl: "/structify.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/structify",
  },
  {
    title: "AI-Summarizer",
    description: "A tool that summarizes long texts and articles using OpenAI's GPT model.",
    tags: ["React", "API", "Tailwind CSS"],
    imageUrl: "/ai-summarizer.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/ai-summarizer",
  },
  {
    title: "TaskFlow",
    description: "A full-featured task management and productivity tool with authentication and team collaboration features.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    imageUrl: "/taskflow.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/taskflow",
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio built to showcase my projects and skills.",
    tags: ["React", "Tailwind CSS", "Vite"],
    imageUrl: "/portfolio.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/portfolio",
  },
]

// Contact Section
export const contactInfo = {
  title: "Get In Touch",
  description: "Have a project in mind or want to collaborate? Let's connect.",
  email: "sejeeltauseef21@gmail.com",
  phone: "07775560592",
}

// Footer Information
export const footerInfo = {
  text: "© 2025 Sejeel Tauseef. All rights reserved.",
  privacyPolicy: "#",
  termsOfService: "#",
}

// Theme and Style Options
export const themeOptions = {
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  darkMode: true,
  fontFamily: "'Inter', sans-serif",
}
