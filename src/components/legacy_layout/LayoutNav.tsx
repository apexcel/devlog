import React from 'react';
import styled, { css } from 'styled-components';

import SVG from '../common/SVG'

const show = css`
    visibility: visible;
`;

const hide = css`
    visibility: hidden;
`;

const NavWrapper = styled.nav<LayoutNavProps>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: none !important;

    ${props => props.isVisible ? show : hide}
`;
interface LayoutNavProps {
    isVisible: boolean
}

const LayoutNav: React.FC<LayoutNavProps> = ({ isVisible }) => {
    return (
        <NavWrapper isVisible={isVisible}>
            <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='32px' height='32px' viewBox='0 0 24 24' /></a>
            <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='32px' height='32px' viewBox='0 0 24 24' /></a>
            <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='32px' height='32px' viewBox='0 0 24 24' /></a>
            <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='32px' height='32px' viewBox='0 0 24 24' /></a>
            <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='32px' height='32px' viewBox='0 0 24 24' /></a>
        </NavWrapper>
    )
};

export default LayoutNav;