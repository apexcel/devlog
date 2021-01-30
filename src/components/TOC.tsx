import React, { useEffect, useRef } from 'react'
import { getNearest } from '../lib/utils.ts'

const tocFloater = (wrapper: React.RefObject<HTMLElement>, floatTarget: React.RefObject<HTMLElement>) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.intersectionRatio > 0.2 ? 
                floatTarget.current?.removeClass('floating') : 
                floatTarget.current?.addClass('floating');
        })
    });
    observer.observe(wrapper.current);
    return () => observer.unobserve(wrapper.current);
};

const genTableOfContents = (collections) => {
    if (collections.length) {
        return collections.map((element, i) => {
            const children = element.children;
            return (
                <li key={i}>
                    {/* { !children.length ? (<a className={`toc-headings`} href={element.hash}>{element.innerText}</a>) : null} */}
                    { element.hash ? (<a className={`toc-headings`} href={element.hash}>{element.innerText}</a>) : null}
                    { children.length ? (
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
const tocEmphasizer = () => {
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
                        document.querySelector(convQuery(target))?.addClass('active')
                    }
                    else if (near[1] > 0){
                        target = (scrollY < prevPos) ? headings[near[1] - 1].id : headings[near[1]].id
                        document.querySelector(convQuery(target))?.addClass('active')
                    }
                }
            }
        })
    }, { rootMargin: `0% 0% -95% 0%` });

    headings.forEach(v => observer.observe(v));

    return () => headings.forEach(v => observer.unobserve(v));
};

const parser = (element, depth = 1) => {
    const list = [];
    if (element) {
        for (const item of element) {
            if (item.hash) {
                list.push({
                    hash: item.hash,
                    depth: depth
                })
            }
            else if (item.children) {
                list.push(...parser(item.children, depth + 1))
            }
        }
    }

    return list;
};

const TOC: React.FC<Record<string, any>> = ({ toc }) => {
    console.log(toc)
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
                <nav ref={listRef} className='toc-list'>
                    <ul style={{ margin: 0 }}>
                        {genTableOfContents(parsed)}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default React.memo(TOC);