export const personalInfo = {
  name: "Sharear Ahammed Nihal",
  shortName: "S.A. Nihal",
  role: "Front-End Web Developer",
  taglines: [
    "Front-End Developer",
    "React Specialist",
    "Next.js Developer",
    "UI Craftsman",
  ],
  bio: "A passionate Front-End Web Developer with 1+ year of professional experience at Fly Far Tech. I craft beautiful, responsive web experiences using React, Next.js & modern web tech.",
  location: "Gazipur, Dhaka, Bangladesh",
  phone: "+880 1876523323",
  email: "sharearahammed@gmail.com",
  github: "https://github.com/sharearahammed",
  linkedin: "https://www.linkedin.com/in/sharear-ahammed-nihal",
  facebook: "https://www.facebook.com/Sharear.Ahammed.10",
  education: "B.Sc. in CSE from AIUB",
  experience: "1+ Year at Fly Far Tech",
  cvUrl: "/CV of Sharear Ahammed Nihal.pdf",
};

export const stats = [
  { label: "Years Experience", value: "1+", icon: "🎯" },
  { label: "Projects Built", value: "6+", icon: "🚀" },
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
    title: "Skill Bridge",
    slug: "skill-bridge",
    category: "Full Stack",
    img: "/skillbridge1.jpg",
    images: [
      "/skillbridge1.jpg",
      "/skillbridge2.jpg",
      "/skillbridge3.jpg",
      "/skillbridge4.jpg",
      "/skillbridge5.jpg",
    ],
    description:
      "Full-stack scalable tutor booking platform with role-based access, JWT & Google OAuth auth, SSR/SSG with Next.js, Prisma ORM and PostgreSQL.",
    longDescription:
      "A full-stack and scalable tutor booking platform built with Next.js and TypeScript, focusing on security, performance, and clean architecture. The application supports role-based access control, secure authentication flows, and a seamless booking experience for students and tutors. Features include role-based system for Student, Tutor & Admin with dedicated dashboards, secure authentication with JWT, Google OAuth & OTP-based password recovery, server-side rendering and static generation with Next.js, type-safe codebase with TypeScript and Prisma ORM, relational database management with PostgreSQL, and RESTful API development with Node.js & Express.js.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Google OAuth",
    ],
    liveUrl: "https://skill-bridge-frontend-uk5b.onrender.com",
    githubUrl: "https://github.com/sharearahammed/skill-bridge-frontend",
    githubServerUrl: "https://github.com/sharearahammed/skill-bridge-backend",
    backendUrl: "https://skill-bridge-backend-fprg.onrender.com",
    featured: true,
    color: "#6366F1",
  },
  {
    id: 2,
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
    id: 3,
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
      "A complete crowdsourcing platform with three distinct user roles. Admin manages users and tasks globally. Task Creators post tasks and manage payments. Workers browse, submit, and earn coins. Includes Stripe payment integration, JWT authentication, and real-time notifications. For Testing: email: sharearahammed@gmail.com | pass: Nihal@12",
    stack: [
      "React JS",
      "Firebase",
      "MongoDB",
      "Tailwind CSS",
      "Node.js",
      "JWT",
    ],
    liveUrl: "https://mega-earning.netlify.app",
    githubUrl: "https://github.com/sharearahammed/mega-earning-client.git",
    githubServerUrl:
      "https://github.com/sharearahammed/mega-earning-server.git",
    featured: true,
    color: "#A855F7",
  },
  {
    id: 4,
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
      "A responsive and user-friendly hotel booking platform. It features secure user authentication with JWT, seamless Stripe payment integration, and automated email notifications. Users can book, update, review, and cancel reservations with ease. Built with React JS, MongoDB, Firebase, Tailwind CSS, and NodeJS.",
    stack: ["React JS", "Firebase", "MongoDB", "Tailwind CSS", "Node.js"],
    liveUrl: "https://sunshinecity-hotelbooking.netlify.app",
    githubUrl: "https://github.com/sharearahammed/hotel-booking-client.git",
    githubServerUrl: "https://github.com/sharearahammed/hotel-booking-server",
    featured: false,
    color: "#22C55E",
  },
  {
    id: 5,
    title: "Tourism Management",
    slug: "tourism-management",
    category: "Full Stack",
    img: "/Project3Collage1.png",
    images: ["/Project3Collage1.png", "/Project3Collage2.png"],
    description:
      "Tourist information & destination guide for Southeast Asia. Features destination cards, tour packages, and guide profiles.",
    longDescription:
      "A responsive and user-friendly platform providing detailed information on tourist destinations across Southeast Asia, including Bangladesh, Thailand, Indonesia, Malaysia, and Vietnam. Features include emergency contact information, healthcare facilities, safety tips, and the ability to add and update tourist spots.",
    stack: ["React JS", "Firebase", "MongoDB", "Tailwind CSS", "Node.js"],
    liveUrl: "https://roamazing-tourism-management.netlify.app",
    githubUrl:
      "https://github.com/sharearahammed/tourism-management-client.git",
    githubServerUrl:
      "https://github.com/sharearahammed/tourism-management-server",
    featured: false,
    color: "#06B6D4",
  },
  {
    id: 6,
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
