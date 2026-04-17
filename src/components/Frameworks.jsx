import { OrbitingCircles } from "./ObitingCircles";

// Only reference SVGs that actually exist in public/assets/logos/.
// Tools on the inner orbit match the "Daily Stack" text (Python, PyTorch,
// NumPy, OpenCV, LaTeX); outer orbit shows the web stack used to ship this
// portfolio (React, Vite, Three.js, TypeScript, Git, Tailwind).
const primaryStack = [
  "python",
  "pytorch",
  "numpy",
  "opencv",
  "latex",
];

const secondaryStack = [
  "react",
  "typescript",
  "vitejs",
  "threejs",
  "tailwindcss",
  "git",
  "javascript",
];

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {primaryStack.map((skill) => (
          <Icon key={skill} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {secondaryStack.map((skill) => (
          <Icon key={skill} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="duration-200 rounded-sm hover:scale-110"
  />
);
