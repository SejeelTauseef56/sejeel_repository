// src/data/index.js

// Personal Information
export const personalInfo = {
  name: "Sejeel Tauseef",
  title: "Software Developer",
  email: "sejeelm56@gmail.com",
  phone: "07775560592",
  location: "Manchester, UK",
  bio: "I’m a software developer with strong expertise in PHP <br /> Laravel, and Vue, dedicated to creating high-performance <br /> and scalable applications.",
  social: {
    github: "https://github.com/SejeelTauseef56",
    linkedin: "https://www.linkedin.com/in/sejeeltauseef/",
  },
  resumeLink:
    "https://drive.google.com/file/d/1Bd-BRVFet0SKcgTJZDwdcXUJxSlvMIXK/view?usp=sharing",
};

// Navigation Links
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// About Section
export const aboutContent = {
  title: "About Me",
  description: `Hi, I’m Sejeel Tauseef, a Software Developer specialising in PHP and Laravel, focused on building scalable and high-performance web applications.

I work across the full stack using technologies such as Vue.js, React, Next.js, MySQL, PostgreSQL, AWS, and Docker. I also build custom WordPress solutions using Bricks Builder and Elementor, including landing pages and organic site improvements.

At One Claims Management, I work on both the internal claims and lead management CRM as well as the company’s WordPress website. My role includes developing CRM features, automations, API integrations, and performance improvements, alongside creating new landing pages and enhancing the overall web presence.

I’m passionate about clean code, modern DevOps practices, and creating reliable digital experiences. Always open to collaborating on exciting projects.`,
};

// Skills
export const skills = {
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

// Projects
export const projects = [
  {
    title: "NutriPAL",
    description:
      "A meal planning and nutrition tracking app built with a focus on accessibility and responsive design.",
    tags: ["Vue.js", "Laravel", "MySQL"],
    imageUrl: "/nutripal.jpg", // Replace with actual image
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/nutripal", // Replace with actual
  },
  {
    title: "AppointMe",
    description:
      "An appointment management tool to book, cancel, and manage personal or client meetings.",
    tags: ["React", "Tailwind CSS", "Laravel"],
    imageUrl: "/appointme.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/appointme",
  },
  {
    title: "Structify",
    description:
      "A platform to manage project structure and team collaboration, integrated with CI/CD.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    imageUrl: "/structify.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/structify",
  },
  {
    title: "AI-Summarizer",
    description:
      "A tool that summarizes long texts and articles using OpenAI's GPT model.",
    tags: ["React", "API", "Tailwind CSS"],
    imageUrl: "/ai-summarizer.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/ai-summarizer",
  },
  {
    title: "TaskFlow",
    description:
      "A full-featured task management and productivity tool with authentication and team collaboration features.",
    tags: ["Vue.js", "Laravel", "Inertia", "Tailwind CSS"],
    imageUrl: "/taskflow.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/taskflow",
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio built to showcase my projects and skills.",
    tags: ["React", "Tailwind CSS", "Vite"],
    imageUrl: "/portfolio.jpg",
    liveUrl: "#",
    githubUrl: "https://github.com/yourusername/portfolio",
  },
  {
    title: "TQUK - Training Qualifications UK",
    description: "While working at Chippy Digital, I was the main developer responsible for building the WordPress landing pages for TQUK (Training Qualifications UK). I developed these using ACF fields and Elementor, creating custom blocks and handling the full build-out of the pages.",
    tags: ["Wordpress", "Elementor", "PHP"],
    imageUrl: "/hq720.jpg",
    liveUrl: "https://www.tquk.org/",
  },
];

// Contact Section
export const contactInfo = {
  title: "Get In Touch",
  description: "Have a project in mind or want to collaborate? Let's connect.",
  email: "sejeelm56@gmail.com",
};

// Footer Information
export const footerInfo = {
  text: "© 2025 Sejeel Tauseef. All rights reserved.",
  privacyPolicy: "#",
  termsOfService: "#",
};

// Theme and Style Options
export const themeOptions = {
  primaryColor: "#3b82f6",
  secondaryColor: "#10b981",
  darkMode: true,
  fontFamily: "'Inter', sans-serif",
};
