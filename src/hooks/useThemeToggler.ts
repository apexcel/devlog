import { createContext, useEffect, useState } from "react";

function isPreferDark() {
    if (!window.matchMedia || window.matchMedia(`(prefers-color-scheme)`).media !== `not-all`) {
        return false;
    }
    return window.matchMedia(`(prefers-color-scheme: dark)`).matches;
}

function setLocalStorage(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
}

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
    theme: ThemeType;
    themeToggler: () => void;
}

export const Theme = createContext<ThemeContextType>({
    theme: 'light',
    themeToggler: () => {}
});

export function useThemeToggler() {
    const preferTheme = isPreferDark() ? 'dark' : 'light';
    const localTheme = getLocalStorage('theme');
    const initTheme = localTheme || preferTheme;

    const [theme, setTheme] = useState<ThemeType>(initTheme);

    const themeToggler = () => theme === 'dark' ? setTheme('light') : setTheme('dark');

    useEffect(() => {
        setLocalStorage('theme', theme);
    }, [theme])

    return [theme, themeToggler] as const;
}