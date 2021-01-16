import React, { useEffect } from 'react'
import { addClass, removeClass, throttle, debounce } from '../utils.ts'
import { useGlobalScroll } from '../hooks/useGlobalScroll.ts'
import querystring from 'querystring'

type DataType = {
    [key: string]: any
}

const TOC: React.FC<DataType> = ({ toc }) => {
    const currentPath = location.pathname;

    useEffect(() => {
        globalThis.addEventListener('scroll', throttle(floater, 50));
        highlightTOC();
        return () => globalThis.removeEventListener('scroll', floater);
    }, [])

    const highlightTOC = () => {
        let prev, prevId;
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                const currentOffsetY = globalThis.pageYOffset;
                const id = entry.target.getAttribute('id');

                if (entry.boundingClientRect.y + currentOffsetY - 50 < currentOffsetY) {
                    document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(id)}"]`).classList.add('active')
                }
                else if (prev) {
                    document.querySelector(`nav ul li a[href="${currentPath}#${encodeURI(prevId)}"]`).classList.remove('active')
                }
                prev = entry;
                prevId = id;

            })
        }, { rootMargin: `0% 0% -100% 0%` });

        document.querySelectorAll('h2').forEach(h => observer.observe(h))
        document.querySelectorAll('h3').forEach(h => observer.observe(h))
        document.querySelectorAll('h4').forEach(h => observer.observe(h))
    };


    // TODO: React.memo 나 useMemo를 이용해서 최적화하기
    const floater = () => {
        const wrapper = document.getElementsByClassName('toc-list')[0],
            currentOffsetY: number = globalThis.pageYOffset;
        if (wrapper) {
            if (wrapper.getClientRects()[0].y - 132 + currentOffsetY < currentOffsetY) {
                wrapper.classList.add('floating');
            }
            if (wrapper.getClientRects()[0].y + 132 > currentOffsetY) {
                wrapper.classList.remove('floating');
            }
        }
    }

    const renderTableOfContents = () => {
        const tocHeadings = toc.replace(/(<a)\b/g, `<a class='toc-headings'`);
        return <nav className='toc-list' dangerouslySetInnerHTML={{ __html: tocHeadings }} />
    };

    return (
        <div className='toc-floater'>
            <div className='toc-wrapper'>
                {renderTableOfContents()}
            </div>
        </div>
    )
}

export default React.memo(TOC);