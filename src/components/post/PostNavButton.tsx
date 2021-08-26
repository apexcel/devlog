import { Link } from 'gatsby';
import React from 'react'
import styled, { keyframes } from 'styled-components'
import SVG from '../common/SVG';

const animation = keyframes`
    {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(5px);
        }
        50% {
            transform: translateX(0);
        }
        75% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

const PostNavButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #cfcfcf;
    height: 80px;
    width: 300px;

    div {
        display: block;
        width: 220px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 6px;
    }

    svg {
        padding: 6px;
    }

    &[data-dir='prev'] {
        text-align: right;
        em, b {
            padding-right: 5px;
        }
    }
    &[data-dir='next'] {
        text-align: left;
        em, b {
            padding-left: 5px;
        }
    }
    &:hover {
        border: 1px solid #9b9b9b;
        svg {
            animation-name: ${animation};
            animation-duration: 1s;
            animation-timing-function: ease;
        }
        path {
            fill: var(--signature-color);
        }
        b, em {
            color: var(--signature-color);
        }
    }

    em {
        display: block;
        font-size: 0.9rem;
        color: var(--default-color);
    }

    b {
        font-size: 1.1rem;
        color: var(--default-color);
    }

    path {
        fill: #3d3d3d;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0;

        div {
            width: 100%;
        }
    }

`;

const LinkTo = styled(Link)`
    visibility: ${props => props['aria-hidden'] ? 'hidden' : 'visible'};

    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 10px 0;
    }
`;

interface PostNavButtonsProps {
    postInfo: Record<string, any>
    dir: string
}

const PostNavButton: React.FC<PostNavButtonsProps> = ({ postInfo, dir }) => {
    let postLink, postTitle, isHidden = false;

    if (postInfo) {
        postLink = postInfo.fields.slug;
        postTitle = postInfo.frontmatter.title;
    }
    else {
        postLink = '/';
        isHidden = true;
    }

    return (
        <LinkTo to={postLink} aria-hidden={isHidden} rel={dir}>
            <PostNavButtonWrapper data-dir={dir}>
                {dir === 'prev'
                    ? <SVG
                        name='rewind'
                        width='32px'
                        height='32px'
                        viewBox='0 0 512 512'
                        color='black' />
                    : null}
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
            </PostNavButtonWrapper>
        </LinkTo>
    )
}

export default PostNavButton;