import React from "react";
import { useTranslation } from "react-i18next";

// Map accent name → Tailwind classes. Kept as a static map so Tailwind's
// JIT compiler can see every class literal at build time.
const accentStyles = {
  royal: {
    text: "text-royal",
    border: "hover:border-royal/40",
    chip: "bg-royal/10 text-royal/90",
    glow: "#5c33cc",
  },
  aqua: {
    text: "text-aqua",
    border: "hover:border-aqua/40",
    chip: "bg-aqua/10 text-aqua/90",
    glow: "#33c2cc",
  },
  fuchsia: {
    text: "text-fuchsia",
    border: "hover:border-fuchsia/40",
    chip: "bg-fuchsia/10 text-fuchsia/90",
    glow: "#ca2f8c",
  },
  mint: {
    text: "text-mint",
    border: "hover:border-mint/40",
    chip: "bg-mint/10 text-mint/90",
    glow: "#57db96",
  },
  sand: {
    text: "text-sand",
    border: "hover:border-sand/40",
    chip: "bg-sand/10 text-sand/90",
    glow: "#d6995c",
  },
};

const PillarCard = ({ id, accent = "sand", icon, highlight = false, span = "" }) => {
  const { t } = useTranslation();
  const styles = accentStyles[accent] ?? accentStyles.sand;
  const title = t(`research.pillars.${id}.title`);
  const blurb = t(`research.pillars.${id}.blurb`);
  const rawChips = t(`research.chips.${id}`, { returnObjects: true });
  const chips = Array.isArray(rawChips) ? rawChips : [];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-[#0e0e1a] p-6 transition-all duration-300 hover:-translate-y-1 ${
        highlight ? "border-white/20" : "border-white/10"
      } ${styles.border} ${span}`}
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden="true"
        style={{ backgroundColor: styles.glow }}
      />

      <div className="relative flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-lg font-bold ${styles.text}`}
            aria-hidden="true"
          >
            {icon}
          </span>
          <h3 className={`text-lg md:text-xl font-semibold ${styles.text}`}>
            {title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-neutral-300/90 leading-relaxed flex-1">
          {blurb}
        </p>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.chip}`}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
