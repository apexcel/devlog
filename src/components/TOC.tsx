import React, { useEffect, useRef, useState } from 'react'
import { getNearest } from '../utils.ts'

type Props = {
    [key: string]: any;
}

type Ref = {
    current: HTMLElement;
}

const tocFloater = (ref: Ref) => {
    const floater = document.getElementsByClassName('toc-list')[0];
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.intersectionRatio > 0.2 ? 
                floater.removeClass('floating') : 
                floater.addClass('floating');
        })
    });
    observer.observe(ref.current);
    return () => observer.unobserve(ref.current);
};

const genTableOfContents = (collections) => {
    if (collections.length) {
        return collections.map((element, i) => {
            const children = element.children;
            return (
                <li key={i}>
                    { !children.length ? (<a className={`toc-headings`} href={element.hash}>{element.innerText}</a>) : null}
                    {children.length ? (
                        <ul>
                            {genTableOfContents(Array.from(element.children))}
                        </ul>
                    ) : null}
                </li>
            )
        })
    }
};

// TODO: 최적화해서 구현하기
const tocHighlighter = () => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'));
    const convQuery = id => `nav ul li ul li a[href="#${encodeURI(id)}"]`;
    const pos = headings.map(v => v.getBoundingClientRect().y + globalThis.pageYOffset);
    let prevPos = -1;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            const scrollY = globalThis.pageYOffset;

            if (!i) {
                const near = getNearest(pos, scrollY);
                document.querySelectorAll(`nav ul li ul li a`).forEach(element => {
                    element.removeClass('active')
                })
                if (entry.isIntersecting) {
                    prevPos = scrollY;
                }
                if (near && near.length && near[1] >= 0) {
                    let target;
                    if (near[1] === 0 && scrollY >= near[0] - 48) {
                        target = headings[near[1]].id;
                        document.querySelector(convQuery(target)).addClass('active')
                    }
                    else if (near[1] > 0){
                        target = (scrollY < prevPos) ? headings[near[1] - 1].id : headings[near[1]].id
                        document.querySelector(convQuery(target)).addClass('active')
                    }
                    console.log(target)
                }
            }
        })
    }, { rootMargin: `0% 0% -95% 0%` });

    headings.forEach(v => observer.observe(v));

    return () => headings.forEach(v => observer.unobserve(v));
};

const TOC: React.FC<Props> = ({ toc }) => {
    const parsed = Array.from(new DOMParser().parseFromString(toc, 'text/html').querySelectorAll('body > ul > li'));
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        tocFloater(ref);
        tocHighlighter();
    }, [])

    return (
        <div ref={ref} className='toc-floater'>
            <div className='toc-wrapper'>
                <nav className='toc-list'>
                    <ul style={{ margin: 0 }}>
                        {genTableOfContents(parsed)}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default React.memo(TOC);