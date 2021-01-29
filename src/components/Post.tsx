import React from 'react'
import SEO from "./seo"

import TOC from "./TOC.tsx"
import Tags from './Tags'
import PostWrittenDate from './WrittenDate'
import PostFooterNav from './PostFooterNav'

type DataType = {
    [key: string]: any
}

type PostProps = {
    seoTitle: string
    seoDescription: string
    siteTitle: string
    prevPost: DataType
    nextPost: DataType
    post: DataType
    toc: HTMLCollection
}

const Post: React.FC<PostProps> = ({
    seoTitle,
    seoDescription,
    siteTitle,
    prevPost,
    nextPost,
    post,
    toc,
}) => {

    return (
        <div className='post-wrapper'>
            <PostTitle post={post} toc={toc} />
            <SEO
                title={seoTitle}
                description={seoDescription}
            />
            <Article post={post} prev={prevPost} next={nextPost} />
        </div>
    )
};

export default Post;

const PostTitle: React.FC<DataType> = ({ post, toc }) => {
    const { title, date, tags } = post.frontmatter;
    return (
        <header className='post-title'>
            <h1 itemProp='headline'>{title}</h1>
            <Tags tags={tags} />
            <PostWrittenDate date={date} />
            <TOC toc={toc} />
        </header>
    )
};

const Article: React.FC<DataType> = ({ post, prev, next }) => {
    return (
        <article className='post-article' itemScope itemType="http://schema.org/Article">
            <section
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp="articleBody"
            />
            <PostFooterNav prev={prev} next={next} />
        </article>
    )
};