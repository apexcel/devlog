import { createGlobalStyle, css } from 'styled-components';
import codeblockStyle from './codeblock.style';
import katexStyle from './katex.style';
import tableStyle from './table.style';
import colors from './colors';

const reset = css`
    body {
        background: ${props => props.theme.layout.background};
        color: ${props => props.theme.colors.default};
        font-family: 'Noto Sans KR', 'Nanum Gothic', sans-serif;
        font-weight: 300;
        line-height: 1.8;
        font-size: 14pt;
        text-shadow: none;
        vertical-align: baseline;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }

    strong, b {
        color: ${props => props.theme.colors.signature};
        font-weight: bold;
    }

    em {
        color: ${props => props.theme.colors.signature};
    }

    a {
        text-decoration: none;
        color: ${props => props.theme.colors.default};
        &:hover {
            color: ${props => props.theme.colors.signature};
        }
    }
`;

export const globalTheme = {
    light: {
        colors: {
            default: `#3d3d3d`,
            signature: `#3455bb`
        },
        layout: {
            background: `#ffffff`
        },
        tag: {
            background: `#e0e2e66f`
        }
    },
    dark: {
        colors: {
            default: `#eaeaea`,
            signature: `#3455bb`
        },
        layout: {
            background: `#1b1b1b`
        },
        tag: {
            background: `#3737376f`
        }
    }
};

export const GlobalStyle = createGlobalStyle`
    ${reset}

    h1 {
        font-size: 2.3rem;
    }

    h2 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.5rem;
    }

    h4 {
        font-size: 1.2rem;
    }

    h5, h6 {
        font-size: 1rem;
    }

    h1, h2, h3 {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    /* for gatsby-remark-autolink-headers */
    .a-header {
        visibility: hidden;
        width: 0;
        height: 0;
        user-select: none;
    }

    ${katexStyle}
    ${codeblockStyle}
    ${tableStyle}
`;