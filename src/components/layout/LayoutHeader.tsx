import { Drawer } from '@material-ui/core';
import { Link } from 'gatsby';
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import useScrollPosition from '../../lib/hooks/useScrollPosition';
import colors from '../../lib/styles/colors.style';
import GlobalNav from './GlobalNav';


interface HeaderWrapperProps {
    readonly isVisible: boolean
}

const HeaderWrapper = styled.header<HeaderWrapperProps>`
    background-color: ${colors.headerBg};
    position: fixed;
    width: 100%;
    z-index: 999;
    top: ${props => props.isVisible ? `0px` : `-48px`};

    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 10px 20px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    max-width: 868px;
    margin: 0 auto;
    font-family: 'Roboto Mono', monospace;
`;

const HeaderTtitle = styled.div`
    padding: 5px;
    a {
        font-size: 1rem;
        font-weight: bold;
        color: ${colors.defaultBrightFont};

        &:hover {
            color: ${colors.mainBright};
        }
    }
`;

const HeaderMenuWrapper = styled.div`
    position: relative;
    width: 30px;
`;

const menuCss = css`
    display: block;
    background-color: ${colors.defaultBrightFont};
    width: 30px;
    height: 2px;
`;

const HeaderMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    width: 30px;
    height: 30px;
    cursor: pointer;

    & span:nth-child(1) {
        ${menuCss}
    }

    & span:nth-child(2) {
        ${menuCss}
        width: 18px;
    }

    & span:nth-child(3) {
        ${menuCss}
        width: 9px;
    }

    &:hover {
        span {
            background-color: ${colors.mainBright};
            width: 30px;
        }
    }
`;

const LayoutHeader: React.FC = () => {

    const [headerVisibility, setHeaderVisibility] = useState(true);
    const [navVisibility, setNavVisibility] = useState(false);

    useScrollPosition(({ prev, current }) => {
        setHeaderVisibility(prev > current);
    }, [headerVisibility])

    const showGlobalNav = ev => {
        ev.preventDefault();
        setNavVisibility(!navVisibility)
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    }

    return (
        <HeaderWrapper isVisible={headerVisibility}>
            <Header>
                <HeaderTtitle><Link to='/'>Apexcel Devlog</Link></HeaderTtitle>
                <HeaderMenuWrapper>
                    <HeaderMenu onClick={showGlobalNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </HeaderMenu>
                </HeaderMenuWrapper>
            </Header>
            <Drawer 
                variant="persistent"
                anchor={'right'} 
                open={navVisibility} 
                onClose={toggleDrawer('right', false)}>
                <div onClick={showGlobalNav}>Drawer</div>
                <GlobalNav />
            </Drawer>
        </HeaderWrapper>
    )

};

export default LayoutHeader;