import moment from 'moment';
// Note: Supported locales need to be explicitly imported from moment
// import 'moment/locale/es';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_US from 'locales/en_us.json';

// @TODO moment locale needs to update with i18next's active locale setting
moment.locale('en');

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      "en-US": {
        translation: en_US
      }
    }
  });

export default i18n;
