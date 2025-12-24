import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

// Get the device's locale, defaulting to 'en' if not Arabic
const getDeviceLanguage = (): string => {
    const locale = Localization.getLocales()[0]?.languageCode;
    return locale === 'ar' ? 'ar' : 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getDeviceLanguage(),
        fallbackLng: 'en',
        compatibilityJSON: 'v4',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
