import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import ActivityCard from "../components/ActivityCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

const Project = () => {
  const { activities } = useAdmin();
  const { t } = useTranslation();
  const [sectionRef, isVisible] = useScrollReveal({
    threshold: 0.1,
    once: true,
  });

  const featuredActivities = activities.slice(0, 6);

  return (
    <section
      className="relative c-space section-spacing"
      id="activities"
    >
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-heading mb-0">{t('activities.title')}</h2>
        <Link
          to="/activities"
          className="text-sand border-b border-sand pb-1 hover:text-white hover:border-white transition-colors hidden sm:block"
        >
          {t('activities.viewAll')}
        </Link>
      </div>

      <div
        ref={sectionRef}
        className={`bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-12 h-[1px] w-full scroll-reveal-fade ${isVisible ? "visible" : ""
          }`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <ActivityCard {...activity} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center sm:hidden">
        <Link
          to="/activities"
          className="bg-sand text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
        >
          {t('activities.seeMore')}
        </Link>
      </div>

      <div className="mt-16 hidden sm:flex justify-center">
        <Link
          to="/activities"
          className="group flex items-center gap-2 text-white/60 hover:text-sand transition-colors text-lg"
        >
          {t('activities.exploreAll')}
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Project;
