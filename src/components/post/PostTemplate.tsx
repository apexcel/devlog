import React from 'react';
import styled from "styled-components";
import SEO from "../seo";
import PostArticle from "./PostArticle";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostTemplateWrapper = styled.div`
    width: 768px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

interface PostProps {
    seoTitle: string
    seoDescription: string
    siteTitle: string
    prevPost: string
    nextPost: string
    post: Record<string, any>
    toc: HTMLCollection
}

const PostTemplate: React.FC<PostProps> = ({
    seoTitle,
    seoDescription,
    siteTitle,
    prevPost,
    nextPost,
    post,
    toc,
}) => {
    return (
        <PostTemplateWrapper>
            <PostHeader post={post} toc={toc} />
            <SEO title={seoTitle} description={seoDescription} />
            <PostArticle post={post} prev={prevPost} next={nextPost} />
            <PostComments />
        </PostTemplateWrapper>
    )
};

export default PostTemplate;