import { useTranslation } from "react-i18next";

const PublicationCard = ({ publication }) => {
  const { t } = useTranslation();
  const { title, venue, citation, year, tags, url, featured } = publication;

  const hasLink = Boolean(url);

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border transition-all duration-300 ${
        featured
          ? "border-sand/30 bg-gradient-to-br from-sand/[0.06] via-white/[0.02] to-transparent hover:border-sand/60"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      } hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30`}
    >
      <div className="flex h-full flex-col gap-4 p-6">
        {/* Year badge */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${
              featured ? "text-sand" : "text-white/50"
            }`}
          >
            {year}
          </span>
          {featured && (
            <span className="rounded-full border border-sand/40 bg-sand/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sand">
              {t("publications.latest")}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg leading-snug text-white/95 group-hover:text-white transition-colors">
          {title}
        </h3>

        {/* Venue */}
        <p className="text-sm text-white/60">
          <span className="italic">{venue}</span>
          {citation && <span className="text-white/40">, {citation}</span>}
        </p>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {hasLink ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand hover:text-white transition-colors"
          >
            {t("publications.viewPaper")}
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        ) : (
          <span className="text-xs text-white/30 italic">
            {t("publications.linkSoon")}
          </span>
        )}
      </div>
    </article>
  );
};

export default PublicationCard;
