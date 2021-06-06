import { createGlobalStyle } from 'styled-components';
import colors from './colors';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Noto Sans KR', 'Nanum Gothic', sans-serif;
        font-weight: 300;
    }
    a {
        text-decoration: none;
        color: ${colors.font};
        &:hover {
            color: ${colors.main_green};
        }
    }
`;

export default GlobalStyle;