import React, { useState } from 'react';
import styled from 'styled-components';
import { useThemeToggler, Theme } from '../../hooks/useThemeToggler';
import { GlobalStyle } from '../../styles/GlobalStyle';
import Floater from '../common/Floater';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import MenuNav from './MenuNav';

const LayoutWrapper = styled.section`
    display: grid;
    grid-template-columns: auto minmax(0, 868px) auto;
    grid-template-rows: 108px auto 128px;
    grid-template-areas:
        '. . .'
        '. main .'
        'footer footer footer';
    margin: 0 auto;
    color: var(--default-color);
    background-color: var(--layout-background);
    transition: color 0.25s ease-in-out, background 0.25s ease-in-out;
`;

const LayoutMain = styled.main`
    grid-area: main;
    height: 100%;
    padding: 30px 14px;
    min-height: 100vh;
`;

const Membrane = styled.div<{ headerNavState: boolean }>`
    display: ${props => props.headerNavState ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    cursor: pointer;
`;


const Layout: React.FC = ({ children }) => {
    const [headerNavState, setHeaderNavState] = useState(false);
    const [theme, themeToggler] = useThemeToggler();

    const headerToggler = () => {
        const html = document.documentElement;
        headerNavState ? html.removeAttribute('style') : html.setAttribute('style', 'overflow: hidden');
        setHeaderNavState(!headerNavState);
    }

    return (
        <>
            <Theme.Provider value={{ theme, themeToggler }}>
                <GlobalStyle />
                <LayoutWrapper>
                    <LayoutHeader headerNavState={headerNavState} headerToggler={headerToggler} />
                    <LayoutMain>
                        {/* <Floater /> */}
                        {children}
                        <MenuNav headerNavState={headerNavState} />
                    </LayoutMain>
                    <LayoutFooter />
                </LayoutWrapper>
                <Membrane headerNavState={headerNavState} onClick={headerToggler} />
            </Theme.Provider>
        </>
    )
};

export default Layout;