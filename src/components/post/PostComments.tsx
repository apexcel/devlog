import React, { createRef } from 'react'
import useUtterances from '../../hooks/useUtterances';

const PostComments: React.FC = () => {
    const ref = createRef<HTMLDivElement>();
    useUtterances(ref);
    return (
        <div ref={ref}></div>
    )
}

export default PostComments;
