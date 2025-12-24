import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../lib/i18n';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Safely get the initial language, default to 'en' if i18n.language is undefined or invalid
    const getInitialLanguage = (): Language => {
        const lang = i18n.language;
        if (lang === 'ar' || lang === 'en') return lang;
        return 'en';
    };

    const [language, setLanguageState] = useState<Language>(getInitialLanguage());
    const isRTL = language === 'ar';

    useEffect(() => {
        // Set RTL based on language
        const shouldBeRTL = language === 'ar';
        if (I18nManager.isRTL !== shouldBeRTL) {
            I18nManager.allowRTL(shouldBeRTL);
            I18nManager.forceRTL(shouldBeRTL);
        }
    }, [language]);

    const setLanguage = async (lang: Language) => {
        if (lang === language) return;

        // Change i18n language
        await i18n.changeLanguage(lang);
        setLanguageState(lang);

        // Handle RTL change - requires app reload on native
        const shouldBeRTL = lang === 'ar';
        if (I18nManager.isRTL !== shouldBeRTL) {
            I18nManager.allowRTL(shouldBeRTL);
            I18nManager.forceRTL(shouldBeRTL);
            // Note: In development, you may need to manually reload for RTL changes
            console.log('Please restart the app to apply RTL layout changes');
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
