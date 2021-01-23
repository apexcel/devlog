import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"

const toggleHeader = () => {
    const [status, setStatus] = useState(true);
    useEffect(() => {

    }, [])
};

const GlobalHeader: React.FC = () => {

    return (
        <div className='global-header'>
            <div className='global-header-wrapper'>
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