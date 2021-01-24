import React, { SetStateAction, useEffect, useRef, useMemo, useState, ReactHTML, ReactHTMLElement, RefObject } from 'react'
import { Link } from "gatsby"
import { throttle } from '../utils.ts';
import '../global.ts'

// const setHeaderEvent = (setter: React.Dispatch<SetStateAction<HeaderStatus>>, delay: number, state?: any) => {
//     globalThis.addEventListener('scroll', debounce(() => {
//         setter({ ...state, current: globalThis.pageYOffset })
//     }, delay))
// };

// const toggleHeader = (ref: React.RefObject<HTMLDivElement>, visibility: boolean) => {
    // visibility ? ref.current.classList.add('hide') : ref.current.classList.remove('hide')
// };

const toggleHeader = (ref: RefObject<HTMLDivElement>) => {
    const delta = 48;
    let prevY = 0;
    globalThis.addEventListener('scroll', throttle(() => {
        const currentY = globalThis.pageYOffset;
        console.log(prevY, currentY)
        if (Math.abs(prevY - currentY) <= delta) {
            return;
        }
        currentY > prevY ? ref.current.addClass('hide').removeClass('show') : ref.current.addClass('show').removeClass('hide');
        prevY = currentY;
    }, 150))
}

const GlobalHeader: React.FC = () => {
    const header = useRef<HTMLDivElement>(null);
    useEffect(() => {
        toggleHeader(header)
    }, [])

    return (
        <div ref={header} className='global-header-wrapper'>
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