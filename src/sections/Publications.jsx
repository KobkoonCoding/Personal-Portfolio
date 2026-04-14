import { useTranslation } from "react-i18next";
import { publications } from "../constants/publications";
import { SOCIALS_SCHOLAR_URL } from "../constants";
import PublicationCard from "../components/PublicationCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Publications = () => {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  return (
    <section id="publications" className="c-space section-spacing">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-heading">{t("publications.title")}</h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60">
            {t("publications.intro")}
          </p>
        </div>
        <a
          href={SOCIALS_SCHOLAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 self-start text-sm text-sand border-b border-sand/40 hover:text-white hover:border-white pb-1 transition-colors"
        >
          {t("publications.scholarProfile")}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div
        ref={sectionRef}
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {publications.map((pub, index) => (
          <div
            key={pub.id}
            className={`scroll-reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <PublicationCard publication={pub} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
