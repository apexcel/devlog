import React from 'react';
import colors from '../../styles/colors';
import styled, {css} from 'styled-components';

const HeaderMenuWrapper = styled.div`
    justify-self: start;
    padding: 0 14px;
    margin-right: 32px;

    @media screen and (max-width: 1024px) {
        margin: 20px
    }

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;

const menuBar1 = css`
    & span {
        display: block;
        background-color: ${colors.font};
        width: 48px;
        height: 3px;

        &:nth-child(1) {
            width: 36px;
        }

        &:nth-child(2) {
            width: 24px;
        }

        &:nth-child(3) {
            width: 12px;
        }
    }
    &:hover {
        span {
            background-color: ${colors.main};
            width: 48px;
        }
    }
`;

const menuBar2 = css`
& span {
    display: block;
    background-color: ${colors.font};
    width: 48px;
    height: 3px;

    &:nth-child(1) {
        width: 24px;
        transform: rotate(35deg) translate(5px, 4px);
    }

    &:nth-child(2) {
        width: 44px;
        transform: translate(-3px, 0);
    }

    &:nth-child(3) {
        width: 24px;
        transform: rotate(-35deg) translate(5px, -4px);
    }
}
`;

const HeaderMenu = styled.div<{headerNavState: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    width: 48px;
    height: 48px;
    cursor: pointer;

    ${props => props.headerNavState ? menuBar2 : menuBar1}

`;

interface HeaderMenuProps {
    headerNavState: boolean;
    setHeaderNavState: (arg: boolean) => void;
}

const HeaderMenuBar: React.FC<HeaderMenuProps> = ({ headerNavState, setHeaderNavState }) => {
    return (
        <HeaderMenuWrapper>
            <HeaderMenu headerNavState={headerNavState} onClick={() => setHeaderNavState(!headerNavState)}>
                <span></span>
                <span></span>
                <span></span>
            </HeaderMenu>
        </HeaderMenuWrapper>
    )
};

export default HeaderMenuBar;