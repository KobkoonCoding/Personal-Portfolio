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

// ACADEMIC & PROFESSIONAL LINKS — exposed separately so Research + Footer can reuse them.
export const SOCIALS_SCHOLAR_URL = "https://scholar.google.com/citations?user=1qjk0uQAAAAJ&hl=en&oi=ao";
export const SOCIALS_GITHUB_URL = "https://github.com/KobkoonCoding";
export const SOCIALS_ORCID_URL = "https://orcid.org/0009-0003-9196-5018";
export const SOCIALS_LINKEDIN_URL = "https://www.linkedin.com/in/kobkoon-janngam-10ba81329/";

export const academicLinks = [
  { key: "scholar", href: SOCIALS_SCHOLAR_URL },
  { key: "github", href: SOCIALS_GITHUB_URL },
  { key: "orcid", href: SOCIALS_ORCID_URL },
  { key: "linkedin", href: SOCIALS_LINKEDIN_URL },
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
