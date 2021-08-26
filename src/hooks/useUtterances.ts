import { RefObject, useContext, useEffect } from "react";
import { Theme } from "./useThemeToggler";

export default function useUtterances<T extends Element>(ref: RefObject<T>) {
    const { theme } = useContext(Theme);

    const attachUtterances = () => {
        const utterances = document.createElement('script');
        const config = {
            className: `utterances-script`,
            src: `https://utteranc.es/client.js`,
            repo: `apexcel/devlog-comments`,
            'issue-term': `pathname`,
            theme: `github-${theme}`,
            crossorigin: `anonymous`,
            async: `true`,
        };
        Object.entries(config).forEach(([key, value]) => utterances.setAttribute(key, value));
        ref.current.append(utterances);
    };

    const postMessageToUtterances = (target: HTMLIFrameElement) => {
        const src = `https://utteranc.es`;
        const msg = {
            type: 'set-theme',
            theme: `github-${theme}`
        };
        target.contentWindow.postMessage(msg, src);
    };

    useEffect(() => {
        if (!ref.current) return;
        const utterances = ref.current.querySelector(`.utterances-frame`);
        utterances ? postMessageToUtterances(utterances as HTMLIFrameElement) : attachUtterances();
    }, [ref, theme])
}