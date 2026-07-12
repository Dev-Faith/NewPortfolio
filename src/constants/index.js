export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Projects",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

export const clientReviews = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Marketing Director at GreenLeaf",
    img: "assets/review1.png",
    review:
      "Working with Muyiwa was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
  },
  {
    id: 2,
    name: "Mark Rogers",
    position: "Founder of TechGear Shop",
    img: "assets/review2.png",
    review:
      "Muyiwa’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.",
  },
  {
    id: 3,
    name: "John Dohsas",
    position: "Project Manager at UrbanTech ",
    img: "assets/review3.png",
    review:
      "I can’t say enough good things about Muyiwa. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
  },
  {
    id: 4,
    name: "Ether Smith",
    position: "CEO of BrightStar Enterprises",
    img: "assets/review4.png",
    review:
      "Muyiwa was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.",
  },
];

export const myProjects = [
  {
    title: "BridgePay Dashboard",
    desc: "Frontend engineering work for a fintech platform focused on customer and admin dashboards. The interface was built to stay fast, responsive, and easy to use across key product flows.",
    subdesc:
      "Built with Next.js, TypeScript, RTK, TanStack Query, TailwindCSS, and Framer Motion, with REST API integration and modular UI states for smooth interactions.",
    href: "https://app.bridgepay.com.ng/signin",
    texture: "/textures/project/bridgepay.mp4",
    logo: "/assets/bridgepay.png",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "RTK",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Framer Motion",
        path: "/assets/framer.png",
      },
    ],
  },
  {
    title: "Ubakco Delivery Website",
    desc: "Freelance frontend work for a delivery web application built from provided UI designs, focused on pixel-perfect implementation and responsive behavior.",
    subdesc:
      "Implemented with Next.js, TypeScript, ShadCN, and TailwindCSS while keeping accessibility and visual consistency aligned with the design system.",
    href: "https://ubakco.vercel.app/",
    texture: "/textures/project/ubakco.mp4",
    logo: "/assets/ubakco.png",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "ShadCN",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/framer.png",
      },
    ],
  },
  {
    title: "Dradiant Bags E-commerce",
    desc: "Frontend and full-stack delivery work for an e-commerce product, focused on building the interface from design requirements and supporting the product architecture end to end.",
    subdesc:
      "Implemented with Next.js, TypeScript, ShadCN, TailwindCSS, and supporting backend architecture for a scalable commerce experience.",
    href: "https://dradiant-brown.vercel.app/",
    texture: "/textures/project/dradiantbags.mp4",
    logo: "/assets/dradiant.jpeg",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "ShadCN",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/framer.png",
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
        ? [5, 4, 0]
        : isTablet
          ? [5, 4, 0]
          : [12, 3, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
        ? [-10, 10, 0]
        : isTablet
          ? [-12, 10, 0]
          : [-24, 10, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: "BridgePay",
    pos: "Frontend Engineering Intern",
    duration: "June - Nov, 2025",
    title:
      "Collaborated with a cross-functional engineering team to build the customer and admin dashboards for a fintech product. Integrated multiple REST APIs and optimized dashboard performance for speed and usability. Used Next.js, TypeScript, RTK, TanStack Query, TailwindCSS, and Framer Motion to deliver a polished responsive experience.",
    icon: "/assets/bridgepay.png",
    animation: "victory",
  },
  {
    id: 2,
    name: "Ubakco Delivery Website",
    pos: "Freelance Frontend Developer",
    duration: "Aug - Sept, 2025",
    title:
      "Built the complete frontend interface of the company's delivery web application from provided UI designs. Implemented pixel-perfect, responsive components using Next.js, TypeScript, ShadCN, and TailwindCSS while collaborating with the design team to ensure visual consistency and accessibility compliance.",
    icon: "/assets/ubakco.png",
    animation: "clapping",
  },
  {
    id: 3,
    name: "Dradiant Bags E-commerce",
    pos: "Full Stack Developer",
    duration: "Aug, 2024 - Feb, 2025",
    title:
      "Built the complete frontend interface of the company's delivery web application from provided UI designs. Implemented pixel-perfect, responsive components using Next.js, TypeScript, ShadCN, and TailwindCSS, and collaborated with the design team to ensure visual consistency and accessibility compliance.",
    icon: "/assets/dradiant.jpeg",
    animation: "salute",
  },
  {
    id: 4,
    name: "BridgePay",
    pos: "Full-Stack Engineer",
    duration: "Nov, 2025 - Present",
    title:
      "Engineered the complete end-to-end architecture of the BridgePay platform, spanning secure backend infrastructure and the frontend user interface. Implemented modular architecture, secure authentication, and efficient database management using NestJS, Prisma ORM, and PostgreSQL via Neon while collaborating closely with stakeholders and the core technical team.",
    icon: "/assets/bridgepay.png",
    animation: "victory",
  },
];
