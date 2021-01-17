import React, { useEffect, useRef } from 'react'
import { useActive } from '../hooks/useActive.ts'

type DataType = {
    [key: string]: any
}

const TOC: React.FC<DataType> = ({ toc }) => {
    const currentPath = location.pathname;
    const headings = Array.from(document.querySelectorAll(`h2, h3, h4`));
    const ref = useRef(null);

    useEffect(() => {
        // globalThis.addEventListener('scroll', float);
        // highlightTOC();
        // addEventListener('DOMContentsLoaded, ())는 그냥 userEffect에 함수만
        // 적어주면 된다.
        float()
        // return () => globalThis.removeEventListener('scroll', float);
    }, [])

    const highlightTOC = () => {
        let prevEntry, prevId, prevRatio;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const currentOffsetY = globalThis.pageYOffset;
                const id = entry.target.getAttribute('id');
                // console.log(entry, prevEntry)
                // if (entry.boundingClientRect.y + currentOffsetY < currentOffsetY) {
                if (entry.isIntersecting) {
                    document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(id)}"]`).classList.add('active');
                    if (prevId && prevId !== id) {
                        document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(prevId)}"]`).classList.remove('active')
                    }
                }
                else {
                    document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(id)}"]`).classList.remove('active')
                    if (prevId) {
                        document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(prevId)}"]`).classList.add('active');
                    }
                }
                prevId = id;
                prevEntry = entry;
            })
        }, { rootMargin: `0% 0% -100% 0%` });

        console.log(document.querySelectorAll('h2'))
        document.querySelectorAll('h2').forEach(h => observer.observe(h))
        document.querySelectorAll('h3').forEach(h => observer.observe(h))
        document.querySelectorAll('h4').forEach(h => observer.observe(h))
    };

    const float = () => {
        const f = document.getElementsByClassName('toc-list')[0];
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!(entry.intersectionRatio > 0)) {
                    f.style.top = '72px'
                    f.style.position = 'fixed'
                    // f.classList.add('floating');
                }
                else {
                    f.style.position = 'relative'
                    // f.classList.remove('floating');
                }
            })
        }, {threshold: 0})

        observer.observe(ref.current)
        return () => observer.unobserve(ref.current);
    }

    const renderTableOfContents = () => {
        const tocHeadings = toc.replace(/(<a)\b/g, `<a class='toc-headings'`);
        return <nav className='toc-list' dangerouslySetInnerHTML={{ __html: tocHeadings }} />
    };

    return (
        <div ref={ref} className='toc-floater'>
            <div className='toc-wrapper'>
                {renderTableOfContents()}
            </div>
        </div>
    )
}

export default React.memo(TOC);