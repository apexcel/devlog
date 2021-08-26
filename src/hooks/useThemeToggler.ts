import { createContext, useEffect, useState } from "react";

function setLocalStorage(key: string, item: any) {
    
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
    const [theme, setTheme] = useState<ThemeType>('light');

    const themeToggler = () => theme === 'dark' ? setTheme('light') : setTheme('dark');

    useEffect(() => {
        const item = localStorage.getItem('theme');
        if (item) {
            setTheme(JSON.parse(item))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme])

    return [theme, themeToggler] as const;
}