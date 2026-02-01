// PROJECTS
export const myProjects = [
  {
    id: 1,
    title: "Accelerated Forward-Backward Algorithm",
    date: "July 2021",
    previewDetail: "New iterative method for convex minimization in image restoration.",
    description:
      "Development of an accelerated forward-backward algorithm with specific applications to image restoration problems, focusing on mathematical convergence and efficiency.",
    subDescription: [
      "Proposed a new iterative method for solving convex minimization problems.",
      "Applied the algorithm to restore blurred and noisy images.",
      "Published in Thai Journal of Mathematics, 19(2), 325-339 (2021).",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/image_restoration.png",
    gallery: [
      "/assets/projects/image_restoration.png",
      "/assets/projects/fixed_point.png",
      "/assets/projects/deep_learning.png",
    ],
    tags: [
      { id: 1, name: "Mathematics", path: "/assets/logos/threejs.svg" },
      { id: 2, name: "Image Processing", path: "/assets/logos/react.svg" },
      { id: 3, name: "Python", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 2,
    title: "Accelerated Fixed-Point Algorithm with Inertial Technique",
    date: "April 2022",
    previewDetail: "Improving convergence rates for G-nonexpansive mappings in Hilbert spaces.",
    description:
      "An accelerated fixed-point algorithm incorporating an inertial technique for a countable family of G-nonexpansive mappings, applied to image recovery.",
    subDescription: [
      "Extended fixed-point theory to G-nonexpansive mappings in Hilbert spaces with graphs.",
      "Improved convergence rates using inertial parameters.",
      "Published in Symmetry, 14(4), 662 (2022).",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/fixed_point.png",
    tags: [
      { id: 1, name: "Optimization", path: "/assets/logos/typescript.svg" },
      { id: 2, name: "Graph Theory", path: "/assets/logos/tailwindcss.svg" },
      { id: 3, name: "Mathematics", path: "/assets/logos/threejs.svg" },
    ],
  },
  {
    id: 3,
    title: "Deep Learning Data Classification Algorithm",
    date: "January 2025",
    previewDetail: "Two-step inertial algorithm for high-dimensional data classification.",
    description:
      "A novel fixed-point based two-step inertial algorithm for convex minimization applied to deep learning data classification challenges.",
    subDescription: [
      "Developed a robust algorithm for high-dimensional data classification.",
      "Integrated inertial techniques to speed up the learning process.",
      "Published in AIMS MATHEMATICS, 10(3), 6209-6232 (2025).",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/deep_learning.png",
    tags: [
      { id: 1, name: "Deep Learning", path: "/assets/logos/nextjs.png" },
      { id: 2, name: "Machine Learning", path: "/assets/logos/typescript.svg" },
      { id: 3, name: "Data", path: "/assets/logos/react.svg" },
    ],
  },
  {
    id: 4,
    title: "Hypertension Predictor Mobile App",
    date: "2024",
    previewDetail: "Mobile app for early health risk assessment trained for health volunteers.",
    description:
      "A mobile innovation for predicting the risk of hypertension, presented and trained for health volunteers (Village Health Volunteers) in San Pa Tong District.",
    subDescription: [
      "Developed a user-friendly application for early health risk assessment.",
      "Conducted training workshops for over 75 health volunteers.",
      "Integrated predictive modeling for blood pressure risk analysis.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/hypertension.png",
    tags: [
      { id: 1, name: "Mobile App", path: "/assets/logos/vitejs.svg" },
      { id: 2, name: "Health Tech", path: "/assets/logos/react.svg" },
      { id: 3, name: "Prediction", path: "/assets/logos/javascript.svg" },
    ],
  },
  // Pagination test data
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 5,
    title: `Research Activity ${i + 5}`,
    date: "2024-2025",
    previewDetail: "Additional research documentation and results.",
    description: "Extended research findings and mathematical proofs related to algorithmic optimization.",
    subDescription: ["Item 1", "Item 2"],
    image: "/assets/projects/image_restoration.png",
    tags: [{ id: 1, name: "Research", path: "/assets/logos/react.svg" }],
  })),
];

// SOCIALS
export const mySocials = [
  {
    name: "Email",
    href: "mailto:Kobkoon.j@cmu.ac.th",
    icon: "/assets/logos/email.svg",
  },
  {
    name: "Chiang Mai University",
    href: "https://www.math.science.cmu.ac.th/",
    icon: "/assets/logos/cmu.svg",
  },
];

// WORK EXPERIENCE
export const experiences = [
  {
    title: "Proactive Researcher",
    job: "Chiang Mai University",
    date: "2024 - Present",
    contents: [
      "Conducting advanced research in Nonlinear and Convex Analysis.",
      "Developing novel algorithms for Optimization and Fixed Point Theory.",
      "Collaborating on international research projects, including short-term research in Japan.",
    ],
  },
  {
    title: "PhD in Mathematics",
    job: "Chiang Mai University",
    date: "2020 - 2024",
    contents: [
      "Focused on advanced mathematical modeling and algorithm development.",
      "Published multiple high-impact papers in international journals (Q1/Q2).",
      "Gained expertise in Machine Learning and Deep Learning applications.",
    ],
  },
  {
    title: "Teaching Assistant in Calculus",
    job: "Chiang Mai University",
    date: "2019 - 2024",
    contents: [
      "Assisted in teaching Calculus to undergraduate students.",
      "Provided academic support and led tutorial sessions.",
      "Managed classroom activities and graded assignments.",
    ],
  },
  {
    title: "Short-term Researcher",
    job: "Niigata University, Japan",
    date: "Sep 2023 & Sep 2024",
    contents: [
      "Participated in international research exchanges focused on complex analysis.",
      "Presented research findings at ICNS2024 and other international forums.",
      "Collaborated with international experts in the field of mathematics.",
    ],
  },
];
