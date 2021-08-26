import React from 'react';
import styled from 'styled-components';
import MenuNavItem from './MenuNavItem'

const NavWrapper = styled.div<{ isVisible: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(${props => props.isVisible ? `0px` : `524px`});
    height: 100%;
    width: 432px;
    background-color: var(--layout-background);

    z-index: 998;
    padding: 108px 46px 46px 46px;
    overflow-y: auto;

    @media screen and (max-width: 1024px) {
        width: 100%;
        transform: translateX(${props => props.isVisible ? `0px` : `100vw`});
        padding: 0;
    }

    transition: transform 0.25s ease;
`;

interface MenuNavProps {
    headerNavState: boolean;
}

const MenuNav: React.FC<MenuNavProps> = ({ headerNavState }) => {
    return (
        <NavWrapper isVisible={headerNavState}>
            <MenuNavItem />
        </NavWrapper>
    )
};

export default MenuNav;