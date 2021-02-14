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

    table {
        border: 1px solid black;
        border-collapse: collapse;
        
        th {
            border: 1px solid black;
            padding: 10px;
            vertical-align: bottom;
        }
        td {
            border: 1px solid black;
            padding: 10px;
            vertical-align: bottom;
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