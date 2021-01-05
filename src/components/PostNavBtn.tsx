import React from 'react';
import { Link } from 'gatsby';
import SVG from './SVG.tsx';

const PostNavBtn: React.FC = ({ props, dir }) => {
    const postLink = props.fields.slug,
        postTitle = props.frontmatter.title

    return (
        <Link to={postLink} rel={dir}>
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

export default PostNavBtn;