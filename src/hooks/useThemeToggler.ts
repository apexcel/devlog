import { createContext, useEffect, useState } from "react";

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
    const preRenderedTheme: ThemeType = typeof window !== 'undefined' ? window.__theme : 'light';
    const [theme, setTheme] = useState<ThemeType>(preRenderedTheme);

    const themeToggler = () => {
        if (theme === 'dark') {
            setTheme('light') 
            window.__setTheme('light');
        } 
        else {
            setTheme('dark');
            window.__setTheme('dark');
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTheme(window.__theme);
        }
        window.__onThemeChange = (theme) => setTheme(theme);
    }, [theme])

    return [theme, themeToggler] as const;
}