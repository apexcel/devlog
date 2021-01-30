import React, { useEffect, createRef } from 'react'
import { Link } from 'gatsby';
import SEO from "./seo"

import TOC from "./TOC"
import Tags from './Tags'
import SVG from './SVG';
import PostWrittenDate from './WrittenDate'


type PostProps = {
    seoTitle: string
    seoDescription: string
    siteTitle: string
    prevPost: Record<string, any>
    nextPost: Record<string, any>
    post: Record<string, any>
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
            <Comments />
        </div>
    )
};

export default Post;

const PostTitle: React.FC<Record<string, any>> = ({ post, toc }) => {
    const { title, date, tags } = post.frontmatter;
    return (
        <header className='post-title'>
            <h1 className='post-heading' itemProp='headline'>{title}</h1>
            <Tags tags={tags} />
            <PostWrittenDate date={date} />
            <TOC toc={toc} />
        </header>
    )
};

const Article: React.FC<Record<string, any>> = ({ post, prev, next }) => {
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

type PostNavBtn = {
    props: Record<string, any>
    dir: string
}

const PostNavBtn: React.FC<PostNavBtn> = ({ props, dir }) => {
    let postLink = '', postTitle = '', isHidden = false;

    if (props) {
        postLink = props.fields.slug;
        postTitle = props.frontmatter.title;
    }
    else {
        isHidden = true;
    }

    return (
        <Link className={`${isHidden ? 'hidden' : null}`} to={postLink} rel={dir}>
            <div className='post-nav-btn' role='post-navigation' data-dir={dir}>
                {dir === 'prev' ?
                    <SVG
                        name='rewind'
                        width='32px'
                        height='32px'
                        viewBox='0 0 512 512'
                        color='black'
                    /> : null}
                <div>
                    <em>{dir}</em>
                    <b>{postTitle}</b>
                </div>
                {dir === 'next' ?
                    <SVG
                        name='fast-forward'
                        width='32px'
                        height='32px'
                        viewBox='0 0 512 512'
                        color='black'
                    /> : null}
            </div>
        </Link>
    )
};

const PostFooterNav: React.FC<Record<string, any>> = ({ prev, next }) => {
    return (
        <nav className="post-footer-nav">
            <PostNavBtn props={prev} dir='prev' />
            <PostNavBtn props={next} dir='next' />
        </nav>
    )
};

const Comments = () => {
    const commentRef = createRef<HTMLDivElement>();
    const setUtterancesComment = () => {
        const utterances = document.createElement('script');
        const config = {
            src: "https://utteranc.es/client.js",
            repo: "apexcel/devlog-comments",
            'issue-term': "pathname",
            theme: "github-light",
            crossorigin: "anonymous",
            async: "true",
        };
        Object.freeze(config);
        Object.entries(config).forEach(([key, value]) => utterances.setAttribute(key, value));
        commentRef.current.append(utterances);
    }


    useEffect(() => {
        setUtterancesComment();
    }, [])
    return <div ref={commentRef} className='post-comments'></div>
}