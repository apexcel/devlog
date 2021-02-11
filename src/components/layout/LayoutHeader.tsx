import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import Logo from '../../../content/assets/Logo.svg'

import useScrollPosition from '../../lib/hooks/useScrollPosition';
import COLORS from '../../lib/styles/colors.style';
interface HeaderWrapperProps {
    readonly isVisible: boolean
}

const HeaderWrapper = styled.header<HeaderWrapperProps>`
    background-color: ${COLORS.HEADER_FOOTER_BG};
    position: fixed;
    width: 100%;
    z-index: 999;
    top: ${props => props.isVisible ? `0px` : `-60px`};

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 878px 1fr;
    align-items: center;
    height: 60px;
    font-family: 'Roboto Mono', monospace;

    @media screen and (max-width: 1280px) {
        grid-template-columns: auto 1fr auto;
    }
`;

const TitleAndLogoWrapper = styled.div`
    justify-self: end;
`;

const PostTitleInHeader = styled.p`
    color: ${COLORS.FONT_BRIGHT};
    padding: 0 54px;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 768px) {
        font-size: 0.9rem;
        display: none;
    }
`;

const HeaderMenuWrapper = styled.div`
    justify-self: start;
    padding: 0 20px;

    @media screen and (max-width: 768px) {
        justify-self: end;
    }
`;

const menuCss = css`
    display: block;
    background-color: ${COLORS.FONT_BRIGHT};
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
            background-color: ${COLORS.MAIN_BRIGHT};
            width: 30px;
        }
    }
`;

const TitleAndLogo = styled.a`
    display: flex;
    align-items: center;
    
    svg {
        padding: 0 10px;
    }
    path {
        fill: ${COLORS.FONT_BRIGHT};
        cursor: pointer;
        &:hover {
            fill: ${COLORS.MAIN_BRIGHT};
        }
    }
`;

const SiteTitle = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding-left: 10px;
    width: max-content;

    color: ${COLORS.FONT_BRIGHT};

    &:hover {
        color: ${COLORS.MAIN_BRIGHT};
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

interface LayoutHeaderProps {
    siteTitle: string
    postTitle?: string
}
const LayoutHeader: React.FC<LayoutHeaderProps> = ({ siteTitle, postTitle }) => {

    const [headerVisibility, setHeaderVisibility] = useState(true);
    const [navVisibility, setNavVisibility] = useState(false);

    useScrollPosition(({ prev, current }) => {
        setHeaderVisibility(prev > current);
    }, [headerVisibility])

    const showGlobalNav = ev => {
        ev.preventDefault();
        setNavVisibility(!navVisibility)
    };

    return (
        <HeaderWrapper isVisible={headerVisibility}>
            <Header>
                <TitleAndLogoWrapper>
                    <TitleAndLogo href='/'>
                        <Logo width='52px' height='52px' />
                        <SiteTitle>{siteTitle}</SiteTitle>
                    </TitleAndLogo>
                </TitleAndLogoWrapper>
                <PostTitleInHeader>{postTitle}</PostTitleInHeader>
                <HeaderMenuWrapper>
                    <HeaderMenu onClick={showGlobalNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </HeaderMenu>
                </HeaderMenuWrapper>
            </Header>
        </HeaderWrapper>
    )

};

export default LayoutHeader;