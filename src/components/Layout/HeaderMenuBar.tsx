import React from 'react';
import colors from '../../styles/colors';
import styled, {css} from 'styled-components';

const HeaderMenuWrapper = styled.div`
    justify-self: start;
    padding: 0 20px;
    margin-right: 32px;

    @media screen and (max-width: 768px) {
        justify-self: end;
    }
`;

const menuCss = css`
    display: block;
    background-color: ${colors.font};
    width: 30px;
    height: 4px;
`;

const HeaderMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    width: 48px;
    height: 48px;
    cursor: pointer;

    & span:nth-child(1) {
        ${menuCss}
        width: 36px;
    }

    & span:nth-child(2) {
        ${menuCss}
        width: 24px;
    }

    & span:nth-child(3) {
        ${menuCss}
        width: 12px;
    }

    &:hover {
        span {
            background-color: ${colors.main_green};
            width: 48px;
        }
    }
`;

const HeaderMenuBar: React.FC = () => {
    return (
        <HeaderMenuWrapper>
            <HeaderMenu onClick={() => console.log('hi')}>
                <span></span>
                <span></span>
                <span></span>
            </HeaderMenu>
        </HeaderMenuWrapper>
    )
};

export default HeaderMenuBar;