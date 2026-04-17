import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParrallaxBackground from "../components/ParrallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section id="home" className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParrallaxBackground />
      <figure className="absolute inset-0 w-full h-full opacity-60 md:opacity-100">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile && 0.18}
                position={isMobile && [0, -2, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
      {/* Mobile-only top gradient to keep Hero text legible over the 3D canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent md:hidden"
      />
    </section>
  );
};
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
