import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components';
import useFloating from '../hooks/useFloating';
import colors from '../styles/colors';

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

const TOCPositioner = styled.div`
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

const TOCWrapper = styled.div`
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
    const positionerRef = useRef<HTMLDivElement>(null);
    const tocNavRef = useRef<HTMLElement>(null);
    const tocElement = useMemo(() => toc.replace(/<p>|<\/p>/g, ''), [toc]);

    const getPostHeaders = () => document.querySelectorAll(`main > h1, h2, h3`);
    useFloating(positionerRef, tocNavRef);

    useEffect(() => {
        console.log(document.querySelectorAll(`article h2, h3, h4`))
        tocEmphasizer();
    }, [])


    return (
        <TOCPositioner ref={positionerRef}>
            <TOCWrapper>
                <nav
                    ref={tocNavRef}
                    dangerouslySetInnerHTML={{ __html: tocElement }}>
                </nav>
            </TOCWrapper>
        </TOCPositioner>
    )
}

export default React.memo(TOC);