import React from 'react'
import styled from 'styled-components'
import PostNavButton from './PostNavButton';

const PostFooterWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 160px 0;
    padding-bottom: 40px;

    @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

interface PostFooterProps {
    next: AdjacentPost;
    prev: AdjacentPost;
}

const PostFooter: React.FC<PostFooterProps> = ({ prev, next }) => {
    return (
        <PostFooterWrapper>
            <PostNavButton postInfo={prev} dir='prev' />
            <PostNavButton postInfo={next} dir='next' />
        </PostFooterWrapper>
    )
};

export default PostFooter;