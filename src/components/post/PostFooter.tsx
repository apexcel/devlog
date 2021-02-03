import React from 'react'
import styled from 'styled-components'
import PostNavButton from './PostNavButton';

const PostFooterWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    margin-top: 160px;
    padding-bottom: 40px;
`;

const PostFooter: React.FC<Record<string, any>> = ({ prev, next }) => {
    return (
        <PostFooterWrapper>
            <PostNavButton postInfo={prev} dir='prev' />
            <PostNavButton postInfo={next} dir='next' />
        </PostFooterWrapper>
    )
};

export default PostFooter;