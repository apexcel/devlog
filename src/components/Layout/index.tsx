import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyle';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';

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
    padding: 30px 0;
    min-height: 100vh;
`;

const Layout: React.FC = ({ children }) => {
    return (
        <LayoutWrapper>
            <GlobalStyle />
            <LayoutHeader siteTitle={'APEXCELDEVLOG'} postTitle={'test'}/>
            <LayoutMain>
                {children}
            </LayoutMain>
            <LayoutFooter />
        </LayoutWrapper>
    )
};

export default Layout;