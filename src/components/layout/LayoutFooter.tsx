import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import SVG from '../common/SVG';
import styled from 'styled-components';
import COLORS from '../../lib/styles/colors.style';

const LayoutFooterWrapper = styled.footer`
    height: 600px;
    width: 100%;
    background-color: ${COLORS.HEADER_FOOTER_BG};
    z-index: 0;
`;

const FooterFront = styled.div`
    display: block;
    position: relative;
    width: 100%;
    background-color: ${COLORS.LAYOUT_OUTSIDE_BG};
    height: 240px;
    z-index: 1;
`;

const FooterBack = styled.div`
    position: relative;
`;

const FooterNav = styled.nav`
    position: fixed;
    display: block;
    bottom: 0;
    height: 200px;
    width: 100%;
`;

const FooterNavItemWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: -1;
    width: 878px;
    margin: 0 auto;

    & a {
        font-size: 1.2rem;
        color: ${COLORS.FONT_BRIGHT};
    }

    & path {
        fill: ${COLORS.FONT_BRIGHT};
    }

    @media screen and (max-width: 768px) {
        padding: 0 20px;
        width: 100%;
        margin: 0;
    }
`;

const FooterNavItem = styled.div``;

const FooterContactItem = styled.div`
    position: relative;
    text-align: right;

    svg {
        margin: 10px;
        cursor: pointer;
    }
    
    div,
    a {
        display: inline-block;
    }

    div:hover::before {
        position: absolute;
        top: -34px;
        left: 106px;
        content: attr(data-text);
        color: ${COLORS.MAIN_BRIGHT};
        padding: 2px 6px;
        border-radius: 8px;
        background-color: #4b4b4b;
    }

    @media screen and (max-width: 768px) {
        div:hover::before {
            top: -32px;
            left: 0;
            right: 0;
            font-size: 0.8rem;
        }
    }
`;


const LayoutFooter: React.FC = () => {
    const [mailText, setMailText] = useState('메일 주소 복사')

    const copyMailAdress = () => {
        const temp = document.createElement('textarea');
        temp.value = 'dev.apexcel@gmail.com';
        document.body.append(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        setMailText('메일 복사 완료');
    };

    return (
        <LayoutFooterWrapper>
            <FooterFront></FooterFront>
            <FooterBack></FooterBack>
            <FooterNav>
                <FooterNavItemWrapper>
                    <FooterNavItem>
                        <Link to='/'>Home</Link>
                    </FooterNavItem>
                    <FooterNavItem></FooterNavItem>
                    <FooterContactItem>
                        <div tabIndex={1} onMouseDownCapture={copyMailAdress} onBlurCapture={() => setMailText('메일 주소 복사')} data-text={mailText}>
                            <SVG name='gmail' title='Copy mail address' width='64px' height='64px' viewBox='0 0 216 216' />
                        </div>
                        <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='64px' height='64px' viewBox='0 0 24 24' /></a>
                    </FooterContactItem>
                </FooterNavItemWrapper>
            </FooterNav>
        </LayoutFooterWrapper>
    )
}

export default LayoutFooter;