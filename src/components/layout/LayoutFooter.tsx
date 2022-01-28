import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from '../../../content/assets/Logo.svg';

import SVG from '../common/SVG';

const Footer = styled.footer`
    background-color: var(--layout-footer-background);
`;

const FooterContents = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 128px;
    max-width: 720px;
    padding: 14px;
    margin: 0 auto;
`;

const FotterLogo = styled.div`
    & > a {
        display: flex;
        flex-direction: row;
        align-items: center;

        & > * {
            margin-right: 4px;
        }

        & g {
            fill: var(--default-color);
        }

        span {
            color: var(--default-color);
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
                <FotterLogo>
                    <Link to='/'>
                        <Logo width='32px' height='32px' fill="red"/>
                    </Link>
                </FotterLogo>
                <FooterIcons>
                    <Mail title='Copy email' onClick={copyEmail} ><SVG name='gmail' color='white' width='32px' height='32px' viewBox='0 0 216 216' /></Mail>
                    <a href='//github.com/apexcel' title='Github'><SVG name='github' color='white' width='32px' height='32px' viewBox='0 0 24 24' /></a>
                </FooterIcons>
            </FooterContents>
        </Footer>
    )
};

export default LayoutFooter;