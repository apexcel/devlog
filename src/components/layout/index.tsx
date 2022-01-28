import React, { useState } from 'react';
import styled from 'styled-components';
import useMenuToggler from '../../hooks/useMenuToggler';
import { useThemeToggler, Theme } from '../../hooks/useThemeToggler';
import { GlobalStyle } from '../../styles/GlobalStyle';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import MenuNav from './MenuNav';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: var(--default-color);
    background-color: var(--layout-background);
    transition: color 0.25s ease-in-out, background 0.25s ease-in-out;
`;

const LayoutMain = styled.main`
    flex: 1 1 auto;`;

const LayoutContent = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 72px 14px 10px;
`;

const Membrane = styled.div<{ toggleState: boolean }>`
    display: ${props => props.toggleState ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 992;
    cursor: pointer;
`;


const Layout: React.FC = ({ children }) => {
    const [toggleState, menuToggler] = useMenuToggler();
    const [theme, themeToggler] = useThemeToggler();


    return (
        <>
            <Theme.Provider value={{ theme, themeToggler }}>
                <GlobalStyle />
                <LayoutWrapper>
                    <LayoutHeader menuToggler={menuToggler} />
                    <LayoutMain>
                        <LayoutContent>
                            {children}
                        </LayoutContent>
                    </LayoutMain>
                    <LayoutFooter />
                    <MenuNav toggleState={toggleState} menuToggler={menuToggler} />
                </LayoutWrapper>
            </Theme.Provider>
            <Membrane toggleState={toggleState} onClick={menuToggler} />
        </>
    )
};

export default Layout;