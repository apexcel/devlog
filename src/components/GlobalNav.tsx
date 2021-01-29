import React from 'react'
import SVG from './SVG'

const GlobalNav: React.FC = () => {

    return (
        <nav className='global-nav-wrapper'>
            <div>
                <SVG name='github' width='48px' height='48px'/>
                <SVG name='instagram' width='48px' height='48px'/>
            </div>
            <div>
                <h1>Series</h1>
            </div>
            <div>
                <h1>Tags</h1>
            </div>
        </nav>
    )
};

export default GlobalNav;