import React, {Dispatch, SetStateAction, useState} from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from '../../../content/assets/Logo.svg';

import HeaderMenuBar from './HeaderMenuBar';
import useScrollPosition from '../../hooks/useScrollPosition';

const Header = styled.header<{isVisible: boolean}>`
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    width: 100%;
    height: 72px;
    margin: 0 auto;
    z-index: 991;

    @media screen and (max-width: 1024px) {
        background: var(--layout-background);
        height: 64px;
        border-bottom: 1px solid rgba(0,0,0,0.3);
        top: 0px;
        transform: translateY(${props => props.isVisible ? `0px` : `-72px`});
    }
    transition: all 0.25s ease;
`;

const HeaderLogo = styled.div`
    width: auto;
    padding: 14px;
    margin: 0 32px;

    g {
        fill: var(--default-color);
    }

    &:hover g {
        fill: var(--signature-color);
    }

    @media screen and (max-width: 1024px) {
        margin: 20px
    }

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;

const HeaderRight = styled.div`
    margin-left: auto;
`;

interface LayoutHeaderProps {
    menuToggler: () => void
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ menuToggler }) => {

    const [headerVisibility, setHeaderVisibility] = useState(true);

    useScrollPosition(({ prev, current}) => {
        if (window.innerWidth <= 1024) setHeaderVisibility(prev > current);
    }, [headerVisibility]);

    return (
        <Header isVisible={headerVisibility}>
            <HeaderLogo>
                <Link to='/'>
                    <Logo width='36px' height='36px' />
                </Link>
            </HeaderLogo>
            <HeaderRight>
                <HeaderMenuBar menuToggler={menuToggler}/>
            </HeaderRight>
        </Header>
    )
};

export default LayoutHeader;