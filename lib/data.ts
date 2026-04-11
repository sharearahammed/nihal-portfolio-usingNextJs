export const personalInfo = {
  name: "Sharear Ahammed Nihal",
  shortName: "S.A. Nihal",
  role: "Front-End Web Developer",
  taglines: [
    "Software Engineer",
    "Full Stack Developer",
    "MERN Stack Developer", 
    "Backend Developer",
    "Front-End Developer",
    "React Specialist",
    "Next.js Developer",
    "UI Craftsman",
  ],
  bio: "A passionate Front-End Web Developer with 1+ year of professional experience at Fly Far International. I craft beautiful, responsive web experiences using React, Next.js & modern web tech.",
  location: "Gazipur, Dhaka, Bangladesh",
  phone: "+880 1876523323",
  email: "sharearahammed@gmail.com",
  github: "https://github.com/sharearahammed",
  linkedin: "https://www.linkedin.com/in/sharear-ahammed-nihal-27899b354",
  facebook: "https://www.facebook.com/Sharear.Ahammed.10",
  education: "B.Sc. in CSE from AIUB",
  experience: "1+ Year at Fly Far International",
};

export const stats = [
  { label: "Years Experience", value: "1+", icon: "🎯" },
  { label: "Projects Built", value: "5+", icon: "🚀" },
  { label: "Technologies", value: "10+", icon: "💻" },
  { label: "Happy Clients", value: "50+", icon: "😊" },
];

export const skillSections = [
  {
    title: "Expertise",
    description: "Core technologies I work with daily",
    color: "#F97316",
    skills: [
      { src: "/react.svg", title: "React.js" },
      { src: "/nextjs.png", title: "Next.js" },
      { src: "/tailwind.png", title: "Tailwind CSS" },
      { src: "/redux.svg", title: "Redux" },
      { src: "/mui.png", title: "Material UI" },
      { src: "/mongodb.svg", title: "MongoDB" },
    ],
  },
  {
    title: "Comfortable",
    description: "Technologies I use regularly",
    color: "#A855F7",
    skills: [
      { src: "/js.png", title: "JavaScript" },
      { src: "/typescript-def.png", title: "TypeScript" },
      { src: "/express.png", title: "Express.js" },
      { src: "/Postgresql_elephant.png", title: "PostgreSQL" },
    ],
  },
  {
    title: "Advanced",
    description: "Backend & auth capabilities",
    color: "#22C55E",
    skills: [
      { src: "/node.svg", title: "Node.js" },
      { src: "/jwt.svg", title: "JWT Auth" },
      { src: "/firebase.svg", title: "Firebase" },
    ],
  },
  {
    title: "Tools",
    description: "Dev tools & deployment platforms",
    color: "#F59E0B",
    skills: [
      { src: "/Vercel.png", title: "Vercel" },
      { src: "/netlify.svg", title: "Netlify" },
      { src: "/vite.svg", title: "Vite" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Fly Far International",
    slug: "fly-far-international",
    category: "Professional",
    img: "/FFIimgOne.png",
    images: ["/FFIimgOne.png", "/FFIimgTwo.png", "/FFIimgThree.png"],
    description:
      "Responsive flight booking system with OTP verification, CRUD operations, and ZIP downloads. Built with React, Redux & Material UI for a production travel company.",
    longDescription:
      "A full-featured flight booking platform developed during my tenure at Fly Far Tech. The system handles real-time flight search, seat selection, passenger details, OTP-based authentication, booking management, and PDF/ZIP downloads for itineraries. Built with performance and scalability in mind.",
    stack: ["React", "Redux", "Material UI", "REST API", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    color: "#F97316",
  },
  {
    id: 2,
    title: "Micro Task & Earning",
    slug: "micro-task-earning",
    category: "Full Stack",
    img: "/projectCollage1.png",
    images: [
      "/projectCollage1.png",
      "/projectCollage2.png",
      "/projectCollage3.png",
      "/projectCollage4.png",
    ],
    description:
      "Crowdsourcing platform where task creators post micro-tasks and workers earn rewards. Features role-based dashboards for Admin, Task Creator, and Worker.",
    longDescription:
      "A complete crowdsourcing platform with three distinct user roles. Admin manages users and tasks globally. Task Creators post tasks and manage payments. Workers browse, submit, and earn coins. Includes Stripe payment integration, JWT authentication, and real-time notifications.",
    stack: [
      "React JS",
      "Firebase",
      "MongoDB",
      "Tailwind CSS",
      "Node.js",
      "JWT",
    ],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    color: "#A855F7",
  },
  {
    id: 3,
    title: "Hotel Room Booking",
    slug: "hotel-room-booking",
    category: "Full Stack",
    img: "/Project2Collage1.png",
    images: [
      "/Project2Collage1.png",
      "/Project2Collage2.png",
      "/Project2Collage3.png",
      "/Project2Collage4.png",
    ],
    description:
      "Full-stack hotel booking app with room browsing, secure booking, review system, and booking management. Firebase auth + MongoDB backend.",
    longDescription:
      "A hotel booking web application with secure room browsing, date-based availability, booking management, and a review system. Users can browse rooms by type, check availability, make bookings, and manage their reservations. JWT-protected backend API with MongoDB storage.",
    stack: ["React JS", "Firebase", "MongoDB", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    color: "#22C55E",
  },
  {
    id: 4,
    title: "Tourism Management",
    slug: "tourism-management",
    category: "Full Stack",
    img: "/Project3Collage1.png",
    images: ["/Project3Collage1.png", "/Project3Collage2.png"],
    description:
      "Tourist information & destination guide for Southeast Asia. Features destination cards, tour packages, and guide profiles.",
    longDescription:
      "A tourism management web app that allows users to explore tourist destinations in Southeast Asia. Features include destination listings, tour package management, tourist guide profiles, and trip planning. Full CRUD operations with Firebase auth and MongoDB.",
    stack: ["React JS", "Firebase", "MongoDB", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    color: "#06B6D4",
  },
  {
    id: 5,
    title: "Flight Search Box Clone",
    slug: "flight-search-clone",
    category: "Frontend",
    img: "/Project4Collage1.jpg",
    images: [
      "/Project4Collage1.jpg",
      "/Project4Collage2.jpg",
      "/Project4Collage3.png",
    ],
    description:
      "Pixel-perfect flight search box clone with one-way, round-trip, and multi-city modes. Built with React, TypeScript & Tailwind CSS.",
    longDescription:
      "A highly accurate clone of a professional flight search interface built to demonstrate TypeScript skills and attention to UI detail. Supports one-way, round-trip, and multi-city flight searches with dynamic form fields, date pickers, and passenger selection.",
    stack: ["React JS", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    color: "#F59E0B",
  },
];
