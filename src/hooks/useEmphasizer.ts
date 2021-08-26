import { useEffect } from "react";

// TODO: 다른 더 좋은 방법이 있으면 교체하기
/**
 * Intersection Observer로 다시 만들어 보기
 */
const empahsizeTOCItem = () => {
    const currentY = window.scrollY;
    const offsetY = 15;
    const headers: HTMLAnchorElement[] = Array.from(document.querySelectorAll(`article > section h2, article > section h3, article > section h4`));
    const tocItems = headers.map(header => document.querySelector(`a[href="#${encodeURI(header.id)}"]`));
    let previous = -1;

    tocItems.forEach(item => item.classList.remove(`active`));

    for (let i = 0; i < headers.length; i += 1) {
        const { top } = headers[i].getBoundingClientRect();
        const elemTop = top + currentY;

        if (currentY <= elemTop - offsetY) {
            if (previous >= 0) {
                tocItems[previous].classList.add('active');
            }
            break;
        }
        else {
            i === headers.length - 1 ? tocItems[i].classList.add('active') : previous = i;
        }
    }
}

export default function useEmphasizer() {
    useEffect(() => {
        window.addEventListener('scroll', empahsizeTOCItem, { capture: false });
        return () => window.removeEventListener('scroll', empahsizeTOCItem);
    }, [])
}