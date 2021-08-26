import React from 'react'
import styled from 'styled-components';
import colors from '../../styles/colors';
import Tags from '../tags/Tags';
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
        border-color: ${colors.main};
    }

    @media screen and (max-width: 768px) {
        width: 100%
    }
`;

const PostTitle = styled.a`
    font-weight: 400;
    display: inline-block;
    width: 700px;
    font-size: 1.3rem;
    color: ${props => props.theme.colors.default};
    word-break: break-all;

    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
        width: 100%;
    }
`;

interface PostListProps {

}


const PostList: React.FC<Record<string, any>> = ({ title, date, tags, slug, excerpt }) => {

    return (
        <PostListWrapper>
            <PostListItemWrapper>
                <PostTitle href={slug}>{title}</PostTitle>
                <PostWrittenDate date={date} />
            </PostListItemWrapper>
            <Tags tags={tags} />
        </PostListWrapper>
    );
}

export default PostList;