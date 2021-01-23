import React from 'react'
import SEO from "./seo"

import PostNavBtn from "./PostNavBtn.tsx"
import TOC from "./TOC.tsx"

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
            <PostTitle post={post} toc={toc}/>
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
    const renderCategories = () => {
        if (post.frontmatter.categories) {
            return post.frontmatter.categories.map((category, i) =>
                <span key={i}>{category}</span>
            )
        }
        return;
    }

    return (
        <header className='post-title'>
            <h1 itemProp='headline'>{post.frontmatter.title}</h1>
            <div>{post.frontmatter.date}</div>
            <div className='post-category'>
                {renderCategories()}
            </div>
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
            <PostNavigation prev={prev} next={next} />
        </article>
    )
};

const PostNavigation: React.FC<DataType> = ({ prev, next }) => {
    return (
        <nav className="post-footer-nav">
            {<PostNavBtn props={prev} dir='prev' />}
            {<PostNavBtn props={next} dir='next' />}
        </nav>
    )
};