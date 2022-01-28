import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components';
import Tag from '../common/Tag';
import PostWrittenDate from './PostWrittenDate';

const PostListWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
    width: 100%
`;

const PostListItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #e0e0e0bd;

    &:hover {
        border-color: var(--signature-color);
    }

    @media screen and (max-width: 768px) {
        width: 100%
    }
`;

const PostTitle = styled(Link)`
    display: inline-block;
    flex: 1 1 auto;
    font-weight: bold;
    font-size: 18px;
    color: var(--default-color);
    word-break: break-all;

    @media screen and (max-width: 768px) {
        font-size: 16px;
        width: 100%;
    }
`;

interface PostListProps {
    title: string
    date: string
    tags: string[]
    slug: string
}

const PostList: React.FC<PostListProps> = ({ title, date, tags, slug }) => {

    return (
        <PostListWrapper>
            <PostListItemWrapper>
                <PostTitle to={slug}>{title}</PostTitle>
                <PostWrittenDate date={date} />
            </PostListItemWrapper>
            <Tag tags={tags} />
        </PostListWrapper>
    );
}

export default PostList;