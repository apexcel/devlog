import React from 'react';
import { Link } from 'gatsby';

const PostNavBtn: React.FC = ({ props, dir }) => {
    const postLink = props.fields.slug,
        postTitle = props.frontmatter.title

    return (
        <Link to={postLink} rel={dir}>
            <div className='post-nav-btn' role='post-navigation' data-dir={dir}>
                <em>{dir}</em>
                <strong>{postTitle}</strong>
            </div>
        </Link>
    )
};

export default PostNavBtn;