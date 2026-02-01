import React from "react";
import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const HeroText = () => {
  const { t } = useTranslation();
  const words = t('hero.words', { returnObjects: true });

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="z-10 mt-20 
  text-center md:mt-40 md:text-left rounded-3xl bg-clip-text"
    >
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-3xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          {t('hero.greeting')}
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            {" "}
            {t('hero.expertIn')} <br />
            {t('hero.expertInSub')}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={Array.isArray(words) ? words : ["Mathematics", "Optimization", "Machine Learning"]}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p className="text-4xl font-medium text-neutral-300">
            {" "}

          </motion.p>
        </div>
      </div>
      <div className="flex flex-col space-y-6 md:hidden">
        <motion.p className="text-4xl font-medium">{t('hero.greeting')}</motion.p>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}>
          <motion.p className="text-5xl font-black text-neutral-300">
            {t('hero.advancing')}
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            <FlipWords
              words={Array.isArray(words) ? words : ["Mathematics", "Optimization", "Machine Learning"]}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
          <motion.p className="text-4xl font-black text-neutral-300">
            {t('hero.researchFields')}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
