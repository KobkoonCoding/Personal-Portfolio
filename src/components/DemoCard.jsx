import React from "react";
import { useTranslation } from "react-i18next";

const DemoCard = ({ demo }) => {
  const { t } = useTranslation();
  const { key, url, source, image, stack = [] } = demo;
  const title = t(`demos.items.${key}.title`);
  const blurb = t(`demos.items.${key}.blurb`);
  const isLive = Boolean(url);

  const CardInner = (
    <div
      className={`h-full bg-[#0e0e1a] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 ${
        isLive
          ? "hover:border-white/20 transform hover:-translate-y-2"
          : "opacity-60"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isLive ? "group-hover:scale-105" : ""
          }`}
        />
        <div className="absolute top-4 left-4">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 bg-mint/15 text-mint backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-neutral-300">
              {t("demos.comingSoon")}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3
          className={`text-xl font-semibold text-white mb-2 transition-colors ${
            isLive ? "group-hover:text-sand" : ""
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{blurb}</p>

        {stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/5 text-white/70 text-xs px-2 py-0.5 border border-white/5"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-sm">
          <span
            className={`flex items-center font-medium ${
              isLive ? "text-sand" : "text-neutral-500"
            }`}
          >
            {isLive ? t("demos.openDemo") : t("demos.comingSoon")}
            {isLive && (
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </span>
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            >
              {t("demos.source")}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (!isLive) {
    return <div className="group block cursor-not-allowed">{CardInner}</div>;
  }

  const isInternal = url.startsWith("/");
  return (
    <a
      href={url}
      target={isInternal ? "_self" : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      aria-label={`${title} (opens${isInternal ? "" : " in new tab"})`}
      className="group block"
    >
      {CardInner}
    </a>
  );
};

export default DemoCard;
