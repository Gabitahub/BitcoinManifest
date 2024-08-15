export const isMobile = () => window?.innerWidth < 768;
export const isSafari = () => navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const isChrome = () => navigator && /chrome/i.test(navigator.userAgent);
//test3