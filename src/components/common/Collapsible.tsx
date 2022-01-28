import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SVG from './SVG';

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const Toggler = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    transform: rotate(90deg);

    svg path {
        fill: var(--default-color);
    }

    .open {
        transition: transform 0.25s ease-out;
    }
    
    .close {
        transform: rotate(-180deg);
        transition: transform 0.25s ease-out;
    }
`;

const Content = styled.div`
    height: 0;
    overflow: hidden;
    transition: height 0.25s cubic-bezier(.72, .13, .17, .95);
`;

const Collapsible: React.FC<{ title: string | React.ReactElement }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggle = () => {
        if (!isOpen) {
            ref.current.nextSibling.style.height = ref.current.nextSibling.scrollHeight + 'px';
            ref.current.lastChild.firstChild.classList.add('close');
            ref.current.lastChild.firstChild.classList.remove('open');
        }
        else {
            ref.current.nextSibling.style.height = '0';
            ref.current.lastChild.firstChild.classList.add('open');
            ref.current.lastChild.firstChild.classList.remove('close');
        }
        setIsOpen(!isOpen)
    }


    return (
        <>
            <Top ref={ref}>
                <Title>{title}</Title>
                <Toggler onClick={toggle}><SVG name='arrow' viewBox='0 0 32 32' width={32} height={32} fill='#000' /></Toggler>
            </Top>
            <Content>
                {children}
            </Content>
        </>
    )
};

export default Collapsible;