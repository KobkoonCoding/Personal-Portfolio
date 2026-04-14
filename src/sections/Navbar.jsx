import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, targetId) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate(`/#${targetId}`);
    }
  };

  const navItems = [
    { name: t('nav.home'), href: 'home' },
    { name: t('nav.research'), href: 'research' },
    { name: t('nav.publications'), href: 'publications' },
    { name: t('nav.activities'), href: 'activities' },
    { name: t('nav.demos'), href: 'demos' },
    { name: t('nav.contact'), href: 'contact' },
  ];

  return (
    <ul className="nav-ul items-center">
      {navItems.map((item) => (
        <li key={item.href} className="nav-li">
          <a
            className="nav-link"
            href={`#${item.href}`}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.name}
          </a>
        </li>
      ))}
      <li className="nav-li">
        <Link className="nav-link" to="/login">
          {t('nav.admin')}
        </Link>
      </li>
    </ul>
  );
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'th' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/10 transition-all text-sm font-semibold text-sand"
    >
      <span className={i18n.language === 'en' ? 'text-white' : 'opacity-40'}>EN</span>
      <span className="opacity-20 text-white">|</span>
      <span className={i18n.language === 'th' ? 'text-white' : 'opacity-40'}>TH</span>
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-end py-2 sm:py-4">
          {/* VX Logo removed - Music player button will serve as home link */}
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex">
              <Navigation />
            </nav>

            <LanguageSwitcher />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            >
              <img
                src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                className="w-6 h-6"
                alt="toggle"
              />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden border-t border-white/5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5 pt-4">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
