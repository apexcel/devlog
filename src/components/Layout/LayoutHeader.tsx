import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from '../../../content/assets/Logo.svg';
import colors from '../../styles/colors';

import HeaderMenuBar from './HeaderMenuBar';

const Header = styled.header`
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    width: 100%;
    height: 108px;
    margin: 0 auto;
`;

const HeaderLogo = styled.div`
    width: auto;
    padding: 20px;
    margin: 0 32px;
    &:hover g {
        fill: ${colors.main_green};
    }
`;

const HeaderRight = styled.div`
    margin-left: auto;
`;

interface LayoutHeaderProps {
    siteTitle?: string;
    postTitle?: string;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ siteTitle, postTitle }) => {
    return (
        <Header>
            <HeaderLogo>
                <Link to='/'>
                    <Logo width='52px' height='52px' />
                </Link>
            </HeaderLogo>
            <HeaderRight>
                <HeaderMenuBar />
            </HeaderRight>
        </Header>
    )
};

export default LayoutHeader;