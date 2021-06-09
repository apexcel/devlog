import { createGlobalStyle, css } from 'styled-components';
import codeblockStyle from './codeblock.style';
import katexStyle from './katex.style';
import tableStyle from './table.style';
import colors from './colors';

const anchorStyle = css`
    a {
        text-decoration: none;
        color: ${colors.font};
        &:hover {
            color: ${colors.main};
        }
    }
`;

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }
    
    * {
        font-family: 'Noto Sans KR', 'Nanum Gothic', sans-serif;
        font-weight: 300;
        line-height: 1.8;
        colors: ${colors.font};
        text-shadow: none;
        text-decoration: none;
        box-sizing: border-box;
        vertical-align: baseline;
        transition: all 0.25s;
        font-size: 14pt;
    }

    strong, b {
        color: ${colors.main};
        font-weight: bold;
    }

    em {
        color: ${colors.main};
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

    ${katexStyle}
    ${anchorStyle}
    ${codeblockStyle}
    ${tableStyle}
`;

export default GlobalStyle;