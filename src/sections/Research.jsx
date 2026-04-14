import React from "react";
import { useTranslation } from "react-i18next";
import { pillars } from "../constants/pillars";
import PillarCard from "../components/PillarCard";
import { OrbitingCircles } from "../components/ObitingCircles";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SOCIALS_SCHOLAR_URL } from "../constants";

// Small orbit glyphs — reuse the pillar icons so the intro tile mirrors the grid.
const ORBIT_GLYPHS = [
  { icon: "∑", color: "#5c33cc" },
  { icon: "⌬", color: "#33c2cc" },
  { icon: "◈", color: "#ca2f8c" },
  { icon: "▣", color: "#57db96" },
  { icon: "➤", color: "#d6995c" },
];

const Stat = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
    <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
      {label}
    </span>
  </div>
);

const IntroTile = () => {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e0e1a] via-[#14142a] to-[#0e0e1a] p-6 md:p-8 h-full flex flex-col">
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-sand mb-3">
          {t("research.title")}
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold text-white leading-snug max-w-md">
          {t("research.intro")}
        </h3>
      </div>

      {/* Orbit centerpiece (hidden on small screens for readability) */}
      <div className="relative hidden md:flex flex-1 items-center justify-center my-6">
        <div className="relative h-[220px] w-[220px] lg:h-[260px] lg:w-[260px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/20 text-2xl text-sand font-bold">
              ×
            </div>
          </div>
          <OrbitingCircles radius={100} duration={28} iconSize={36}>
            {ORBIT_GLYPHS.map((g) => (
              <div
                key={g.icon}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0e0e1a] text-base font-semibold"
                style={{ color: g.color }}
              >
                {g.icon}
              </div>
            ))}
          </OrbitingCircles>
        </div>
      </div>

      {/* Stats + Scholar link */}
      <div className="mt-auto flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <Stat value="10+" label={t("research.stats.talks")} />
          <Stat value="Q1/Q2" label={t("research.stats.papers")} />
          <Stat value="5+" label={t("research.stats.years")} />
        </div>
        <a
          href={SOCIALS_SCHOLAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-sand hover:text-white transition-colors inline-flex items-center gap-1 w-fit"
        >
          {t("research.stats.scholar")}
        </a>
      </div>
    </div>
  );
};

const Research = () => {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  return (
    <section id="research" className="relative c-space section-spacing">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-heading mb-0">{t("research.title")}</h2>
      </div>

      <div
        ref={sectionRef}
        className={`bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-12 h-[1px] w-full scroll-reveal-fade ${
          isVisible ? "visible" : ""
        }`}
      />

      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[14rem] gap-6">
        <div
          className={`md:col-span-3 md:row-span-2 scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "0s" }}
        >
          <IntroTile />
        </div>

        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            className={`${pillar.span} scroll-reveal ${
              isVisible ? "visible" : ""
            }`}
            style={{ transitionDelay: `${(index + 1) * 0.08}s` }}
          >
            <PillarCard
              id={pillar.id}
              accent={pillar.accent}
              icon={pillar.icon}
              highlight={pillar.highlight}
              span="h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Research;
