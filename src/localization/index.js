export const languages = [
    'lt', 'en'
];

export const translations = [
  ["city"] = {en: 'City', lt: 'Miestas'}
];

export function t(language, keyword, translations) {
    return translations[keyword].language
}