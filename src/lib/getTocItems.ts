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

export const getTocItems = (toc: string) => {
    return stringToObject(parseStringToDom(toc));
}