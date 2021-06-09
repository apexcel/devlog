import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from '../../../content/assets/Logo.svg';

import SVG from '../common/SVG';
import colors from '../../styles/colors';

const Footer = styled.footer`
    grid-area: footer;
    display: grid;
    grid-template-columns: auto minmax(0, 868px) auto;
    grid-template-areas:
        '. footer-contents .';
    width: 100%;
    height: 128px;
    background-color: ${colors.footer_bg};
`;

const FooterContents = styled.section`
    grid-area: footer-contents;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
`;

const FooterNav = styled.nav`
    & > a {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > * {
            margin-right: 4px;
        }

        & g {
            fill: ${colors.font_bright};
        }

        span {
            color: ${colors.font_bright};
        }
    }
`;

const FooterIcons = styled.div`
    & > * {
        margin: 0 4px;
    }
`;

const Mail = styled.span`
    cursor: pointer;
`;

const LayoutFooter: React.FC = () => {
    const [mailText, setMailText] = useState('메일 주소 복사')

    const copyEmail = () => {
        const temp = document.createElement('textarea');
        temp.value = 'dev.apexcel@gmail.com';
        document.body.append(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        setMailText('메일 복사 완료');
    }

    return (
        <Footer>
            <FooterContents>
                <FooterNav>
                    <Link to='/'>
                        <Logo width='32px' height='32px' />
                        <span>Apexcel's Devlog</span>
                    </Link>
                </FooterNav>
                <FooterIcons>
                    <Mail aria-valuetext={mailText} title='Copy e-Mail' onClick={copyEmail} ><SVG name='gmail' color='white' width='32px' height='32px' viewBox='0 0 216 216' /></Mail>
                    <a href='//github.com/apexcel' title='Github'><SVG name='github' color='white' width='32px' height='32px' viewBox='0 0 24 24' /></a>
                </FooterIcons>
            </FooterContents>
        </Footer>
    )
};

export default LayoutFooter;