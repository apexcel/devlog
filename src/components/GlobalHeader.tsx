import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { Link } from "gatsby"

import useScrollPosition from '../hooks/useScrollPosition';
import GlobalNav from './GlobalNav';

const GlobalHeader: React.FC = () => {
    const [headerVisibility, setHeaderVisibility] = useState(true);
    const [navVisibility, setNavVisibility] = useState(false);

    useScrollPosition(({ prev, current }) => {
        setHeaderVisibility(prev > current);
    }, [headerVisibility])

    const showGlobalNav = ev => {
        ev.preventDefault();
        setNavVisibility(!navVisibility)
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    }

    return (
        <header className={`global-header-wrapper ${headerVisibility ? 'show' : 'hide'}`}>
            <div className='global-header'>
                <div className='global-header-title'>
                    <Link to='/'>Apexcel Devlog</Link>
                </div>
                <div className='global-header-menu'>
                    <div className='menu-btn' onClick={showGlobalNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            {/* TODO: Replace to custom drawer */}
            <Drawer anchor={'right'} open={navVisibility} onClose={toggleDrawer('right', false)}>
                <div onClick={showGlobalNav}>Drawer</div>
                <GlobalNav />
            </Drawer>
        </header >
    )
};

export default GlobalHeader;