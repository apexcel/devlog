import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

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

const HeaderMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
    width: 32px;
    height: 32px;
    cursor: pointer;

    & span {
        display: block;
        background-color: var(--default-color);
        width: 48px;
        height: 3px;
        transition: all 0.25s ease 0s;

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
            background-color: var(--signature-color);
            width: 48px;
        }
    }
`;

interface HeaderMenuProps {
    menuToggler: () => void
}

const HeaderMenuBar: React.FC<HeaderMenuProps> = ({ menuToggler }) => {

    return (
        <HeaderMenuWrapper>
            <HeaderMenu onClick={menuToggler}>
                <span></span>
                <span></span>
                <span></span>
            </HeaderMenu>
        </HeaderMenuWrapper>
    )
};

export default HeaderMenuBar;