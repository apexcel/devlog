import React from 'react';
import { Link } from 'gatsby';
import SVG from './SVG.tsx';

type PostNavBtnProps = {
    props: Record<string, any>
    dir: string
}

const PostNavBtn: React.FC<PostNavBtnProps> = ({ props, dir }) => {
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

export default PostNavBtn;