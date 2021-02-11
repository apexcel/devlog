import React from 'react'
import styled from "styled-components";
import COLORS from '../../../lib/styles/colors.style';
import Tags from "../tags/Tags";
import TOC from "../TOC";
import PostWrittenDate from "./PostWrittenDate";

const PostHeaderWrapper = styled.div`
    margin-bottom: 80px;
`;

const PostTitle = styled.h1`
    color: ${COLORS.FONT};
    font-size: 2.7rem;
`;

const PostHeader: React.FC<Record<string, any>> = ({ post, toc }) => {
    const { title, date, tags } = post.frontmatter;
    
    return (
        <PostHeaderWrapper>
            <PostTitle>{title}</PostTitle>
            <Tags tags={tags} />
            <PostWrittenDate date={date} />
            <TOC title={title} toc={toc} />
        </PostHeaderWrapper>
    )
};

export default PostHeader;