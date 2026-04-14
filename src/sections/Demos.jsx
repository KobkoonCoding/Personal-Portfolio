import React from "react";
import { useTranslation } from "react-i18next";
import { demos } from "../constants/demos";
import DemoCard from "../components/DemoCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Demos = () => {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  return (
    <section id="demos" className="relative c-space section-spacing">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-2">
        <h2 className="text-heading mb-0">{t("demos.title")}</h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl md:text-right">
          {t("demos.subtitle")}
        </p>
      </div>

      <div
        ref={sectionRef}
        className={`bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-12 h-[1px] w-full scroll-reveal-fade ${
          isVisible ? "visible" : ""
        }`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {demos.map((demo, index) => (
          <div
            key={demo.id}
            className={`scroll-reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <DemoCard demo={demo} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Demos;
