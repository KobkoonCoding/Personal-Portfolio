import React from "react";
import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const scrollToId = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CTARow = ({ ctaPrimary, ctaSecondary, size = "md" }) => {
  const base =
    size === "sm"
      ? "px-5 py-2 text-sm rounded-full font-semibold transition-all"
      : "px-6 py-2.5 rounded-full font-semibold transition-all";
  return (
    <motion.div
      className="flex flex-wrap gap-3 mt-8"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.9 }}
    >
      <a
        href="#research"
        onClick={(e) => scrollToId(e, "research")}
        className={`${base} bg-sand text-primary hover:bg-white`}
      >
        {ctaPrimary} →
      </a>
      <a
        href="#contact"
        onClick={(e) => scrollToId(e, "contact")}
        className={`${base} border border-sand/40 text-sand hover:border-white hover:text-white`}
      >
        {ctaSecondary}
      </a>
    </motion.div>
  );
};

const HeroText = () => {
  const { t } = useTranslation();
  const rawWords = t("hero.words", { returnObjects: true });
  const words = Array.isArray(rawWords)
    ? rawWords
    : [
        "Math-First Researcher",
        "Deep Learning Practitioner",
        "Interpretability Advocate",
      ];

  const ctaPrimary = t("hero.ctaPrimary");
  const ctaSecondary = t("hero.ctaSecondary");

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-3xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("hero.greeting")}
        </motion.h1>

        <motion.p
          className="text-4xl font-semibold text-neutral-300 mt-2"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.15 }}
        >
          {t("hero.identity")}
        </motion.p>

        <div className="flex flex-col items-start mt-4">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-7xl lg:text-8xl"
            />
          </motion.div>

          <motion.p
            className="text-lg lg:text-xl text-neutral-400 max-w-2xl mt-6 leading-relaxed"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.7 }}
          >
            {t("hero.subline")}
          </motion.p>

          <CTARow ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden">
        <motion.h1
          className="text-3xl font-medium mb-2"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t("hero.greeting")}
        </motion.h1>

        <motion.p
          className="text-2xl font-semibold text-neutral-300 mb-4"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.15 }}
        >
          {t("hero.identity")}
        </motion.p>

        <div className="flex flex-col items-start">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-5xl"
            />
          </motion.div>

          <motion.p
            className="text-base text-neutral-400 max-w-md mt-4 leading-relaxed"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.7 }}
          >
            {t("hero.subline")}
          </motion.p>

          <CTARow
            ctaPrimary={ctaPrimary}
            ctaSecondary={ctaSecondary}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroText;
