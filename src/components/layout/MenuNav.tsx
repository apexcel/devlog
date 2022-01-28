import React from 'react';
import styled from 'styled-components';
import MenuNavItem from './MenuNavItem'

const NavWrapper = styled.div<{ isVisible: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(${props => props.isVisible ? `0px` : `512px`});
    height: 100%;
    width: 432px;
    background-color: var(--layout-background);
    padding: 0 40px;
    z-index: 997;
    overflow-y: auto;

    @media screen and (max-width: 1024px) {
        width: 100%;
        transform: translateX(${props => props.isVisible ? `0px` : `100vw`});
        padding: 0;
    }

    transition: transform 0.25s ease;
`;

const MenuNavItemWrapper = styled.nav`
    padding: 14px 0 14px;

    @media screen and (max-width: 1024px) {
        padding: 14px;
    }
`;

interface MenuNavProps {
    toggleState: boolean
    menuToggler: () => void
}

const MenuNav: React.FC<MenuNavProps> = ({ toggleState, menuToggler }) => {
    return (
        <NavWrapper isVisible={toggleState}>
            <MenuNavItemWrapper>
                <MenuNavItem menuToggler={menuToggler}/>
            </MenuNavItemWrapper>
        </NavWrapper>
    )
};

export default MenuNav;