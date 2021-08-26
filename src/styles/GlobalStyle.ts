import { createGlobalStyle, css } from 'styled-components';
import codeblockStyle from './codeblock.style';
import katexStyle from './katex.style';
import tableStyle from './table.style';

const scrollbarStyle = css`
::-webkit-scrollbar {
    background-color: #272727;
    width: 8px;
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
}
`;

const customTheme = css`
    body {
        &.light {
            --default-color: #3d3d3d;
            --signature-color: #3455bb;

            --layout-background: #ffffff;
            --layout-footer-background: #0c0c0c;

            --tag-background: #e0e2e66f;

            --codeblock-background: #2b2b2b;
            --codeblock-color: #cacaca;

            --blockquote-background: #e6e6e6;
        }
        &.dark {
            --default-color: #eaeaea;
            --signature-color: #3455bb;

            --layout-background: #1b1b1b;
            --layout-footer-background: #0c0c0c;
            
            --tag-background: #3737376f;

            --codeblock-background: #2b2b2b;
            --codeblock-color: #cacaca;

            --blockquote-background: #111111;
        }
    }
`;

const reset = css`
    body {
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
        color: var(--signature-color);
        font-weight: bold;
    }

    em {
        color: var(--signature-color);
    }

    a {
        text-decoration: none;
        color: var(--default-color);
        &:hover {
            color: var(--signature-color);
        }
    }

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

    ${customTheme}
    ${scrollbarStyle}
`;

export const GlobalStyle = createGlobalStyle`
    ${reset}
    ${katexStyle}
    ${codeblockStyle}
    ${tableStyle}
`;