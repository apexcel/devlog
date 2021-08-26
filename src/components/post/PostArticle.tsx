import React from 'react'
import styled from 'styled-components';
import PostFooter from './PostFooter';

const PostArticleWrapper = styled.article`
    ul, p {
        margin: 28px 0;
    }

    li > p {
        display: inline;
        margin: 0;
    }

    li > ul {
        margin: 0 0 0 40px;
    }

    ul > li > * {
        word-break: break-all;
    }

    blockquote p {
        margin: 0;
    }

    a {
        color: var(--signature-color);
        text-decoration: underline;
    }

    @media screen and (max-width: 420px) {
        img {
            width: 400px;
        }
    }

    @media screen and (max-width: 360px) {
        img {
            width: 320px;
        }
    }

    @media screen and (max-width: 320px) {
        img {
            width: 300px;
        }
    }
`;

interface PostArticleProps {
    article: string;
    nextPostInfo: AdjacentPost;
    prevPostInfo: AdjacentPost;
}

const PostArticle: React.FC<PostArticleProps> = ({ article, nextPostInfo, prevPostInfo }) => {
    return (
        <PostArticleWrapper>
            <section dangerouslySetInnerHTML={{ __html: article }} />
            <PostFooter prev={prevPostInfo} next={nextPostInfo} />
        </PostArticleWrapper>
    )
};

export default PostArticle;