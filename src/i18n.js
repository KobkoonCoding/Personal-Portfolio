import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import th from './locales/th.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            th: { translation: th }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

// Keep <html lang="..."> in sync with the active language so our CSS
// font-stack switch (html[lang="th"] → Noto Sans Thai) takes effect.
const syncHtmlLang = (lng) => {
    if (typeof document !== 'undefined' && lng) {
        document.documentElement.lang = lng.startsWith('th') ? 'th' : 'en';
    }
};

syncHtmlLang(i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
