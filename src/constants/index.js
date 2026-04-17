// ACADEMIC & PROFESSIONAL LINKS — exposed separately so Research + Footer can reuse them.
export const SOCIALS_EMAIL = "mailto:Kobkoon.j@cmu.ac.th";
export const SOCIALS_CMU_URL = "https://www.math.science.cmu.ac.th/";
export const SOCIALS_SCHOLAR_URL = "https://scholar.google.com/citations?user=1qjk0uQAAAAJ&hl=en&oi=ao";
export const SOCIALS_GITHUB_URL = "https://github.com/KobkoonCoding";
export const SOCIALS_ORCID_URL = "https://orcid.org/0009-0003-9196-5018";
export const SOCIALS_LINKEDIN_URL = "https://www.linkedin.com/in/kobkoon-janngam-10ba81329/";

// Text-only academic/professional links used in Footer.
// Icons were removed because email.svg / cmu.svg didn't exist in /public/assets/logos/
// and the text-only pattern is consistent across all 6 links.
export const academicLinks = [
  { key: "email", href: SOCIALS_EMAIL, external: false },
  { key: "cmu", href: SOCIALS_CMU_URL, external: true },
  { key: "scholar", href: SOCIALS_SCHOLAR_URL, external: true },
  { key: "github", href: SOCIALS_GITHUB_URL, external: true },
  { key: "orcid", href: SOCIALS_ORCID_URL, external: true },
  { key: "linkedin", href: SOCIALS_LINKEDIN_URL, external: true },
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
