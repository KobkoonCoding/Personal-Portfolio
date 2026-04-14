import { useTranslation } from "react-i18next";
import { mySocials, academicLinks } from "../constants";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-3 pb-4 text-sm text-neutral-400 c-space">
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        {academicLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-sand transition-colors text-xs md:text-sm"
          >
            {t(`footer.${link.key}`)}
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <p>Terms &amp; Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>

        <div className="flex items-center gap-3">
          {mySocials.map((social, index) => (
            <a
              href={social.href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <img src={social.icon} className="w-5 h-5" alt={social.name} />
            </a>
          ))}

          <p>© 2025 Kobkoon Janngam. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
