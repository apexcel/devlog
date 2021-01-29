import React, { useState } from 'react'
import { Link } from "gatsby"
import useScrollPosition from '../hooks/useScrollPosition';

const GlobalHeader: React.FC = () => {
    const [visibility, setVisibility] = useState(true);

    useScrollPosition(({ prev, current }) => {
        setVisibility(prev > current);
    }, [visibility])

    return (
        <div className={`global-header-wrapper ${visibility ? 'show' : 'hide'}`}>
            <div className='global-header'>
                <div className='global-header-title'>
                    <Link to='/'>Apexcel Devlog</Link>
                </div>
                <div className='global-header-menu'>
                    <div className='menu-btn'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GlobalHeader;