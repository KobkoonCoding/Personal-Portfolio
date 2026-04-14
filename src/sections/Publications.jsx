import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { publications } from "../constants/publications";
import { SOCIALS_SCHOLAR_URL } from "../constants";
import PublicationCard from "../components/PublicationCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Publications = () => {
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });

  const featured = publications.slice(0, 3);

  return (
    <section id="publications" className="c-space section-spacing">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-heading">{t("publications.title")}</h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60">
            {t("publications.intro")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            to="/publications"
            className="text-sand border-b border-sand pb-1 hover:text-white hover:border-white transition-colors hidden sm:block"
          >
            {t("publications.viewAll")}
          </Link>
          <a
            href={SOCIALS_SCHOLAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start text-sm text-white/60 hover:text-white transition-colors"
          >
            {t("publications.scholarProfile")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((pub, index) => (
          <div
            key={pub.id}
            className={`scroll-reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <PublicationCard publication={pub} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center sm:hidden">
        <Link
          to="/publications"
          className="bg-sand text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
        >
          {t("publications.seeMore")}
        </Link>
      </div>

      <div className="mt-16 hidden sm:flex justify-center">
        <Link
          to="/publications"
          className="group flex items-center gap-2 text-white/60 hover:text-sand transition-colors text-lg"
        >
          {t("publications.exploreAll")}
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Publications;
