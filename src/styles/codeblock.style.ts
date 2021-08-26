import { css } from 'styled-components';

// TODO: 다크모드 컬러 설정

const codeblockStyle = css`
    font-family: 'D2Coding ligature';
    font-weight: normal;
    font-style: normal;
    src: local('D2Ligature'), url('./D2Ligature.ttf') format('truetype');

    blockquote {
        margin: 0;
        padding: 1.2rem;
        border-left: 8px solid var(--signature-color);
        background-color: var(--blockquote-color) !important;
        margin: 10px 0;
    }
    
    pre[class*='language-'],
    code[class*='language-'] {
        font-family: 'D2Coding ligature', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
        background-color: var(--codeblock-background);
        color: var(--codeblock-color);
        text-shadow: none;

        .operator {
            background-color: transparent;
        }
    }
    pre[class='language-text'],
    pre[class='language-text'] > code[class='language-text'],
    pre[class='language-markdown'],
    code[class='language-markdown'] {
        background-color: var(--blockquote-color);
        color: var(--default-color) !important;
    }
    
    code[class='language-text'] {
        background-color: var(--blockquote-color) !important;
        color: var(--signature-color);
        padding: 4px !important;
    }
    
    
    .gatsby-highlight {
        position: relative;
        font-size: 1.2rem;
        &:not(.token){
            font-size: 1.2rem;
        }
    }
    .gatsby-highlight pre[class*='language-']::before {
        position: absolute;
        font-size: 0.75rem;
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
            'Courier New', monospace;
        letter-spacing: 0.075em;
        line-height: 1;
        padding: 0.25rem 0.5rem;
        text-transform: uppercase;
        right: 0px;
        top: 0px;
        border-bottom-left-radius: 7px;
        text-align: right;
        color: black;
    }
    
    .gatsby-highlight[data-language='js'] pre[class*='-js']::before {
        content: 'JAVASCRIPT';
        background: #e7da23;
    }
    .gatsby-highlight[data-language='ts'] pre[class*='-ts']::before {
        content: 'TYPESCRIPT';
        background: #1d69f7;
    }
    .gatsby-highlight[data-language='rust'] pre[class*='-rust']::before {
        content: 'RUST';
        background: #f7911d;
    }
    .gatsby-highlight[data-language='go'] pre[class*='-go']::before {
        content: 'GO';
        background: #1db9f7;
    }
    .gatsby-highlight[data-language='java'] pre[class*='-java']::before {
        content: 'JAVA';
        background: #13ac2d;
    }
    .gatsby-highlight[data-language='cpp'] pre[class*='-cpp']::before {
        content: 'C++';
        background: #3654db;
    }
    .gatsby-highlight[data-language='text'] pre[class*='-text']::before {
        content: 'TEXT';
        background: #a5a5a5;
    }
    .gatsby-highlight[data-language='markdown'] pre[class*='-markdown']::before {
        content: 'MARKDOWN';
        background: #a5a5a5;
    }
    .gatsby-highlight[data-language='html'] pre[class*='-html']::before {
        content: 'HTML';
        background: #e6530f;
    }
    .gatsby-highlight[data-language='css'] pre[class*='-css']::before {
        content: 'CSS';
        background: #2445d8;
    }
    .gatsby-highlight[data-language='graphql'] pre[class*='-graphql']::before {
        content: 'GRAPHQL';
        background: #bd2fca;
    }
    .gatsby-highlight[data-language='shell'] pre[class*='-shell']::before {
        content: 'SHELL';
        background: #d8e6e7;
    }
    
    .token {
        font-family: 'D2Coding ligature', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
        'Courier New', monospace;
    }
    .token.class-name {
        color: #e9cc26;
    }
    .token.number {
        color: #eb6527;
    }
    .token.parameter {
        color: var(--signature-color);
    }
    .token.function {
        color: #5c8ce6;
    }
    .token.keyword {
        color: #a26ef5;
    }
`;

export default codeblockStyle;