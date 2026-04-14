// Live demos shown in the Demos section.
// `titleKey` / `blurbKey` reference i18n keys under `demos.items.<key>.title` / `.blurb`.
// `image` is a path under /public/assets — replace placeholders with real screenshots
// once available. An empty `url` renders the card in "Coming soon" state.

export const demos = [
  {
    id: "ml-platform",
    key: "mlPlatform",
    url: "https://ml-research-platform.vercel.app/",
    source: "",
    image: "/assets/projects/deep_learning.png",
    stack: ["React", "Python", "ML"],
  },
  {
    id: "hypertension",
    key: "hypertension",
    url: "",
    source: "",
    image: "/assets/projects/hypertension.png",
    stack: ["Mobile", "Health Tech", "Prediction"],
  },
  {
    id: "portfolio",
    key: "portfolio",
    url: "/",
    source: "",
    image: "/assets/projects/image_restoration.png",
    stack: ["React 19", "Three.js", "Firebase"],
  },
];
