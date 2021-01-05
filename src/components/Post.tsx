import React, { useEffect } from 'react'
import SEO from "./seo"

import PostNavBtn from "./PostNavBtn.tsx"
import TableOfContents from "./TableOfContents.tsx"

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
            <SEO
                title={seoTitle}
                description={seoDescription}
            />
            <Article post={post} prev={prevPost} next={nextPost} />
            <TableOfContents toc={toc} />
        </div>
    )
};

export default Post;

const Article: React.FC<DataType> = ({ post, prev, next }) => {
    useEffect(() => {
        window.addEventListener('scroll', tocActivator)

        return (() => {
            window.removeEventListener('scroll', tocActivator)
        })
    }, [])


    const tocActivator = () => {
        const headings: HTMLCollection = document.getElementsByClassName('link-header'),
            tocHeadings: HTMLCollection = document.getElementsByClassName('toc-headings'),
            currentOffsetY: number = globalThis.pageYOffset,
            values: Array<DataType> = Array.from(headings).map(v => v.getClientRects()[0]);
        let lastHeading, prevHeading;

        values.forEach((v, i) => {
            if (v.y + currentOffsetY < currentOffsetY + v.height) {
                if (prevHeading && prevHeading !== tocHeadings[i]) {
                    prevHeading.classList.remove('active');
                }
                tocHeadings[i].classList.add('active');
                prevHeading = tocHeadings[i];
                //prevHeading = addClass(tocHeadings[i], 'active');
                return;
            }
            else {
                tocHeadings[i].classList.remove('active')
                return;
            }
        })
    }

    return (
        <article className='post-article' itemScope itemType="http://schema.org/Article">
            <header className='post-title'>
                <h1 itemProp='headline'>{post.frontmatter.title}</h1>
                <p>{post.frontmatter.date} {post.frontmatter.category}</p>
            </header>
            <section
                className='post-section'
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
            {prev && <PostNavBtn props={prev} dir='prev' />}
            {next && <PostNavBtn props={next} dir='next' />}
        </nav>
    )
};