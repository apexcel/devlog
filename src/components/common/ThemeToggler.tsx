import React, { useContext } from 'react';
import styled from 'styled-components';
import { Theme } from '../../hooks/useThemeToggler';

const Toggler = styled.input`
    appearance: none;
    cursor: pointer;

    &:focus {
        outline: 0;
    }

    height: 32px;
    width: 64px;
    border-radius: 16px;
    display: inline-block;
    position: relative;
    margin: 0;
    border: 2px solid #474755;
    background: linear-gradient(45deg, #343465 0%, #1F2027 100%);
    transition: all .2s ease;

    &:after{
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 2px rgba(44,44,44,.2);
        transition: all 0.25s cubic-bezier(.45,.27,.39,.79);
    }
    &:checked {
        border-color: var(--signature-color);
        &:after{
            transform: translatex(32px);
        }
    }
`;

const ThemeToggler: React.FC = () => {
    const { theme, themeToggler } = useContext(Theme);

    return (
        <Toggler type='checkbox' checked={theme === 'dark'} onChange={themeToggler}/>
    )
}

export default ThemeToggler;