import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components';
import colors from '../styles/colors';

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


const tocEmphasizer = () => {
    const headings: Array<Element> = Array.from(document.querySelectorAll(`h2, h3, h4`));
    const convQuery = id => `nav > ul > li a[href="#${encodeURI(id)}"]`;
    let prevY = 0;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            const scrollY = globalThis.pageYOffset;
            const pos: Array<number> = headings.map(v => v.getBoundingClientRect().y + globalThis.pageYOffset);
            const currentY = entry.boundingClientRect.y;

            if (!i) {
                if (entry.isIntersecting) {
                    document.querySelectorAll(`nav > ul > li a`).forEach(element => element.classList.remove('active'));
                    document.querySelector(convQuery(entry.target.id))?.classList.add('active');
                }
                else if (prevY < currentY - 100) {
                    document.querySelectorAll(`nav > ul > li a`).forEach(element => element.classList.remove('active'));
                    const index = pos.filter(y => y < currentY + scrollY).length - 1;
                    if (index > -1) {
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

const replaceTableOfContents = (ref: React.RefObject<HTMLElement>, toc: string) => {
    const replaced = toc.replace(/(<p>)|(<\/p>)/g, '').replace(/(<a)\b/g, `<a class='toc-headings'`);
    return <nav ref={ref} className='toc-list' dangerouslySetInnerHTML={{ __html: replaced }} />
}

const createTocElements = (tocItems: Array<Record<string, any>>, activeHash) => {
    return tocItems.map(item => {
        const isActive = item.hash === `#${activeHash}`;
        const currentDepth = item.depth;
        return (
            <li key={item.hash}>
                <a className={`toc-headings ${isActive ? 'active' : ''}`} href={item.hash}>{item.title}</a>
            </li>
        )
    })
};

const parseStringToDom = (toc: string) => {
    const replaced = toc.replace(/(<p>)|(<\/p>)/g, '');
    const parsed = new DOMParser().parseFromString(replaced, 'text/html');
    return Array.from(parsed.querySelectorAll(`body > ul > li`));
};


const stringToObject = (elements, depth: number = 1) => {
    const toc = [];
    for (const element of elements) {
        if (element.children.length > 0) {
            if (element.tagName === 'UL') depth = depth + 1;
            toc.push(...stringToObject(Array.from(element.children), depth));
        }
        if (element?.hash) {
            toc.push({
                depth: depth,
                hash: element.hash,
                title: element.textContent
            });
        }
    }
    return toc;
};

const getTocItems = (toc: string) => {
    return stringToObject(parseStringToDom(toc));
}

const TOCWrapper = styled.div`
    position: relative;
    margint-top: 2rem;

    .floating {
        position: fixed;
        top: 154px;
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const TOCItem = styled.div`
    position: absolute;
    left: 100%;
    margin-top: 154px;
    margin-left: 30px;

    & li {
        list-style: none;
        a {
            display: block;
            font-size: 0.8rem;
            color: ${colors.font};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p {
            margin: 0;
        }
        .active {
            color: ${colors.main};
            font-weight: bold;
            font-size: 1rem;
        }
    }

    & ul {
        padding: 2px;
        margin-left: 14px;
    }
`;

const TOC: React.FC<Record<string, any>> = ({ toc }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLElement>(null);
    const [activeHash, setActiveHash] = useState<null | string>(null);

    useEffect(() => {
        tocFloater(wrapperRef, listRef);
        tocEmphasizer();
    }, [])


    return (
        <TOCWrapper ref={wrapperRef}>
            <TOCItem>
                {replaceTableOfContents(listRef, toc)}
            </TOCItem>
        </TOCWrapper>
    )
}

export default React.memo(TOC);