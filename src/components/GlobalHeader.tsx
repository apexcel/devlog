import React from 'react'
import { Link } from "gatsby"


const GlobalHeader: React.FC = () => {

    return (
        <div className='global-header'>
        <nav className='global-nav__main'>
            <div className='global-nav__wrapper'>
                <h1 className='global-nav__title'><a href='/'>Apexcel Devlog</a></h1>
                <div className='global-nav__links'>
                </div>
            </div>
        </nav>
        </div>
    )
};

export default GlobalHeader;