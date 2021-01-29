import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import SVG from './SVG';

const GlobalFooter: React.FC = () => {
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
        <footer className='global-footer'>
            <div className='global-footer-front'></div>
            <div className='global-footer-shade'></div>
            <nav className='global-footer-nav'>
                <div className='nav-items-wrapper'>
                    <div className='nav-item'>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className='nav-item'>
                    </div>
                    <div className='nav-item contact'>
                        <div tabIndex={1} onMouseDownCapture={copyMailAdress} onBlurCapture={() => setMailText('메일 주소 복사')} data-text={mailText}>
                            <SVG name='gmail' title='Copy mail address' width='64px' height='64px' viewBox='0 0 216 216' />
                        </div>
                        <a href='https://github.com/apexcel'><SVG title='Github' name='github' width='64px' height='64px' viewBox='0 0 24 24'/></a>
                    </div>
                </div>
            </nav>
        </footer>
    )
}

export default GlobalFooter;