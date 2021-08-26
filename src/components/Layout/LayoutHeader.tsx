import React, {useState} from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import colors from '../../styles/colors';
import Logo from '../../../content/assets/Logo.svg';

import HeaderMenuBar from './HeaderMenuBar';
import useScrollPosition from '../../hooks/useScrollPosition';

const Header = styled.header<{isVisible: boolean}>`
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    width: 100%;
    height: 108px;
    margin: 0 auto;
    z-index: 999;

    @media screen and (max-width: 1024px) {
        background: white;
        height: 72px;
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
    &:hover g {
        fill: ${colors.main};
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
    headerNavState: boolean;
    setHeaderNavState: (arg: boolean) => void;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ headerNavState, setHeaderNavState }) => {

    const [headerVisibility, setHeaderVisibility] = useState(true);

    useScrollPosition(({ prev, current}) => {
        if (window.innerWidth <= 1024) setHeaderVisibility(prev > current);
    }, [headerVisibility]);

    return (
        <Header isVisible={headerVisibility}>
            <HeaderLogo>
                <Link to='/'>
                    <Logo width='52px' height='52px' />
                </Link>
            </HeaderLogo>
            <HeaderRight>
                <HeaderMenuBar headerNavState={headerNavState} setHeaderNavState={setHeaderNavState}/>
            </HeaderRight>
        </Header>
    )
};

export default LayoutHeader;