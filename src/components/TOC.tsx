import React, { useEffect, useRef, useState } from 'react'
import { getNearest } from '../lib/utils';

const tocFloater = (wrapper: React.RefObject<HTMLElement>, floatTarget: React.RefObject<HTMLElement>) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.intersectionRatio > 0.2 ?
                floatTarget.current?.classList.remove('floating') :
                floatTarget.current?.classList.add('floating');
        })
    });
    observer.observe(wrapper.current);
    return () => observer.unobserve(wrapper.current);
};


// TODO: 최적화해서 구현하기
const tocEmphasizer = () => {
    const headings: Array<Element> = Array.from(document.querySelectorAll(`h2, h3, h4`));
    const convQuery = id => `nav > ul > li a[href="#${encodeURI(id)}"]`;
    let prevY = 0, prevRatio = 0;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            const scrollY = globalThis.pageYOffset;
            const pos: Array<number> = headings.map(v => v.getBoundingClientRect().y + globalThis.pageYOffset);
            const currentY = entry.boundingClientRect.y;
            const currentRatio = entry.intersectionRatio;
            const intersect = entry.isIntersecting;

            if (!i) {

                if (entry.isIntersecting) {
                    document.querySelectorAll(`nav > ul > li a`).forEach(element => element.classList.remove('active'));
                    document.querySelector(convQuery(entry.target.id))?.classList.add('active')
                }
                else if (prevY < currentY ) {
                    document.querySelectorAll(`nav > ul > li a`).forEach(element => element.classList.remove('active'));
                    const index = pos.filter(y => y < currentY + scrollY).length - 1;
                    console.log(index)
                    if (index !== -1) {
                        document.querySelector(convQuery(headings[index].id))?.classList.add('active')                    
                    }
                }
                prevY = currentY
            }
        })
    }, { rootMargin: `0% 0% -95% 0%` });

    headings.forEach(v => observer.observe(v));

    return () => headings.forEach(v => observer.unobserve(v));
};

const createTableOfContents = (collections, hash) => {
    if (collections.length) {
        return collections.map((element, i) => {
            const children = element.children;
            return (
                <li key={i}>
                    { element.hash ? (<a className={`toc-headings ${hash ? 'active' : ''}`} href={element.hash}>{element.innerText}</a>) : null}
                    { children.length ? (
                        <ul>
                            {createTableOfContents(Array.from(element.children), hash)}
                        </ul>
                    ) : null}
                </li>
            )
        })
    }
};

const replaceTableOfContents = (ref, toc: string) => {
    const replaced = toc.replace(/(<p>)|(<\/p>)/g, '').replace(/(<a)\b/g, `<a class='toc-headings'`);
    return <nav ref={ref} className='toc-list' dangerouslySetInnerHTML={{ __html: replaced }} />
}

const TOC: React.FC<Record<string, any>> = ({ toc }) => {
    const parsed = Array.from(new DOMParser().parseFromString(toc, 'text/html').querySelectorAll('body > ul > li'));

    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLElement>(null);

    useEffect(() => {
        tocFloater(wrapperRef, listRef);
        tocEmphasizer();
    }, [])


    return (
        <div ref={wrapperRef} className='toc-wrapper'>
            <div className='toc'>
                {replaceTableOfContents(listRef, toc)}
                {/* <nav ref={listRef} className='toc-list'>
                    <ul style={{ margin: 0 }}>
                        {createTableOfContents(parsed, '')}
                    </ul>
                </nav> */}
            </div>
        </div>
    )
}

export default React.memo(TOC);