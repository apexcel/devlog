import React from 'react'
import styled from 'styled-components';
import colors from '../../lib/styles/colors';
import Tags from '../tags/Tags';
import PostWrittenDate from './PostWrittenDate';


const PostListWrapper = styled.div`
    position: relative;
    display: block;
    margin: 1.5rem 0;

    @media screen and (max-width: 768px) {
        width: 100%
    }
`;

const Box = styled.div``;

const PostListItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #e0e0e0bd;
`;

const PostTitle = styled.a`
    font-weight: 600;
    display: inline-block;
    width: 600px;
    font-size: 1.5rem;
    color: ${colors.defaultFont};
    word-break: break-all;

    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
        width: 100%;
    }
`;


const PostList: React.FC<Record<string, any>> = ({
    title, date, tags, slug, excerpt
}) => {

    return (
        <PostListWrapper>
            <Box>
                <PostListItemWrapper>
                    <PostTitle href={slug}>{title}</PostTitle>
                    <PostWrittenDate date={date} />
                </PostListItemWrapper>
                <Tags tags={tags} />
            </Box>
        </PostListWrapper>
    );
}

export default PostList;