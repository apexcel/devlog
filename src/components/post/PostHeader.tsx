import React from 'react'
import styled from "styled-components";
import Tags from "../tags/Tags";
import TOC from "../TOC";
import PostWrittenDate from "./PostWrittenDate";

const PostHeaderWrapper = styled.div`
    margin-bottom: 80px;
`;

const PostTitle = styled.h1`
    font-size: 3rem;
`;

const PostHeader: React.FC<Record<string, any>> = ({ post, toc }) => {
    const { title, date, tags } = post.frontmatter;
    
    return (
        <PostHeaderWrapper>
            <PostTitle>{title}</PostTitle>
            <Tags tags={tags} />
            <PostWrittenDate date={date} />
            <TOC toc={toc} />
        </PostHeaderWrapper>
    )
};

export default PostHeader;