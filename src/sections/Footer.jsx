import { useTranslation } from "react-i18next";
import { academicLinks } from "../constants";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 pb-4 text-sm text-neutral-400 c-space">
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2">
        {academicLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1 text-white/60 hover:text-sand transition-colors text-xs md:text-sm"
          >
            {t(`footer.${link.key}`)}
            {link.external && (
              <span aria-hidden="true" className="text-[0.8em] opacity-70">
                ↗
              </span>
            )}
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-3">
        <div className="flex gap-2 text-xs md:text-sm">
          <p>Terms &amp; Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>

        <p className="text-xs md:text-sm">
          © 2025 Kobkoon Janngam. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
