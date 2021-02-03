import React from 'react'
import styled from 'styled-components';
import PostFooter from './PostFooter';

const PostArticleWrapper = styled.article`
    ul, p {
        margin: 28px 0;
    }

    blockquote p {
        margin: 0;
    }
`;

const PostSection = styled.section``;

const PostArticle: React.FC<Record<string, any>> = ({ post, prev, next }) => {
    return (
        <PostArticleWrapper>
            <PostSection dangerouslySetInnerHTML={{ __html: post.html }} />
            <PostFooter prev={prev} next={next} />
        </PostArticleWrapper>
    )
};

export default PostArticle;