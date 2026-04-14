// Five research/work pillars displayed in the Research section.
// Each pillar references i18n keys under `research.pillars.<id>` and
// `research.chips.<id>`.
//
// `accent` maps to the Tailwind palette colors defined in tailwind.config.js
// (royal, aqua, fuchsia, mint, sand). `span` controls bento grid placement.

export const pillars = [
  {
    id: "math",
    accent: "royal",
    glow: "from-royal/20 to-transparent",
    icon: "∑",
    span: "md:col-span-3 md:row-span-1",
  },
  {
    id: "dl",
    accent: "aqua",
    glow: "from-aqua/20 to-transparent",
    icon: "⌬",
    span: "md:col-span-3 md:row-span-1",
  },
  {
    id: "interp",
    accent: "fuchsia",
    glow: "from-fuchsia/25 to-transparent",
    icon: "◈",
    span: "md:col-span-2 md:row-span-1",
    highlight: true,
  },
  {
    id: "image",
    accent: "mint",
    glow: "from-mint/20 to-transparent",
    icon: "▣",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "ship",
    accent: "sand",
    glow: "from-sand/25 to-transparent",
    icon: "➤",
    span: "md:col-span-2 md:row-span-1",
  },
];
