import { useState } from "react"

const useMenuToggler = (initialState = false) => {
    const [toggle, setToggle] = useState(initialState);

    const toggler = () => {
        const html = document.documentElement;
        toggle ? html.removeAttribute('style') : html.setAttribute('style', 'overflow: hidden');
        setToggle(!toggle);
    }

    return [toggle, toggler] as const;
};

export default useMenuToggler;
