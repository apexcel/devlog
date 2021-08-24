import React from 'react'
import styled from "styled-components";
import colors from '../../styles/colors';
import Tags from "../tags/Tags";
import TOC from "../TOC";
import PostWrittenDate from "./PostWrittenDate";

const PostTitleWrapper = styled.div`
    margin-bottom: 80px;
`;

const Title = styled.h1`
    color: ${colors.font};
    font-size: 2.7rem;
`;

interface PostTitleProps {
    frontmatter: Frontmatter;
    toc: string;
}

const PostTitle: React.FC<PostTitleProps> = ({ frontmatter, toc }) => {
    return (
        <PostTitleWrapper>
            <Title>{frontmatter.title}</Title>
            <Tags tags={frontmatter.tags} />
            <PostWrittenDate date={frontmatter.date} />
            <TOC title={frontmatter.title} toc={toc} />
        </PostTitleWrapper>
    )
};

export default PostTitle;