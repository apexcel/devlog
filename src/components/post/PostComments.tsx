import React, { createRef, useEffect } from 'react'
import styled from 'styled-components';

const CommentWrapper = styled.div``;

const PostComments: React.FC = () => {
    const ref = createRef<HTMLDivElement>();
    const setUtterancesComment = () => {
        const utterances = document.createElement('script');
        const config = {
            src: "https://utteranc.es/client.js",
            repo: "apexcel/devlog-comments",
            'issue-term': "pathname",
            theme: "github-light",
            crossorigin: "anonymous",
            async: "true",
        };
        Object.freeze(config);
        Object.entries(config).forEach(([key, value]) => utterances.setAttribute(key, value));
        ref.current.append(utterances);
    }

    useEffect(() => {
        setUtterancesComment();
    }, [])

    return (
        <CommentWrapper ref={ref}/>
    )
}

export default PostComments;
