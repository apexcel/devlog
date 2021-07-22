import React from 'react'
import styled from 'styled-components';
import colors from '../../styles/colors';
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
        color: ${colors.main};
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