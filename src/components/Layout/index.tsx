import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyle';
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
`;

const LayoutMain = styled.main`
    grid-area: main;
    height: 100%;
    padding: 30px 14px;
    min-height: 100vh;
`;

const Membrane = styled.div<{headerNavState: boolean}>`
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

    return (
        <>
            <LayoutWrapper>
                <GlobalStyle />
                <LayoutHeader headerNavState={headerNavState} setHeaderNavState={setHeaderNavState} />
                <LayoutMain>
                    {children}
                    <MenuNav headerNavState={headerNavState} />
                </LayoutMain>
                <LayoutFooter />
            </LayoutWrapper>
            <Membrane headerNavState={headerNavState} onClick={() => setHeaderNavState(false)}/>
        </>
    )
};

export default Layout;