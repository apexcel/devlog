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
    const isOkay = typeof window !== 'undefined'
    let preRenderedTheme: ThemeType;
    if (isOkay) {
        preRenderedTheme = window.__theme;
    }
    else {
        preRenderedTheme = 'light';
    }
    const [theme, setTheme] = useState<ThemeType>(preRenderedTheme);
    const themeToggler = () => {
        console.log(window.__theme, preRenderedTheme, theme)
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
        setTheme(window.__theme);

        window.__onThemeChange = (theme) => setTheme(theme);
    }, [theme])


    // useEffect(() => {
    //     localStorage.setItem('theme', JSON.stringify(theme));
    // }, [theme])

    return [theme, themeToggler] as const;
}