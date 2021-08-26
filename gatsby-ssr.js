const React = require('react');

exports.onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents([
        React.createElement('script', {
            dangerouslySetInnerHTML: {
                __html: `
                    (() => {
                        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                        let localTheme;
                        let preferredTheme;

                        if (localStorage.getItem('theme')) {
                            localTheme = JSON.parse(localStorage.getItem('theme'));
                        }
                        preferredTheme = mediaQuery.matches ? 'dark' : 'light';

                        window.__onThemeChange = function(theme) {}

                        window.__setTheme = function(theme) {
                            window.__theme = theme;
                            preferredTheme = theme;
                            document.body.className = theme;
                            window.__onThemeChange(theme);
                            localStorage.setItem('theme', JSON.stringify(theme));
                        }

                        window.__setTheme(localTheme || preferredTheme);

                        mediaQuery.addEventListener('change', e => e.matches ? 'dark' : 'light');
                    })()
                `,
            },
        }),
    ])
}