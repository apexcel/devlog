import React from 'react'
import { Link } from "gatsby"

const GlobalHeader: React.FC = () => {

    return (
        <div className='global-header'>
            <div className='global-header-title'>
                <Link to='/'>Apexcel Devlog</Link>
            </div>
        </div>
    )
};

export default GlobalHeader;