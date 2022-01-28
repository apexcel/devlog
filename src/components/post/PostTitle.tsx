import React from 'react'
import styled from "styled-components";
import Tag from "../common/Tag";
import TOC from "./TOC";
import PostWrittenDate from "./PostWrittenDate";

const Wrapper = styled.div`
    margin-bottom: 80px;
`;

const TitleWrapper = styled.div`
    h1 {
        color: var(--default-color);
        font-size: 36px;
        border: 0;
        padding: 0;
        margin: 0;
    }

    span {
        display: inline-block;
        color: var(--default-color);
        font-size: 14px;
        padding-left: 2px;

        ::after {
            display: inline-block;
            vertical-align: middle;
            content: '';
            width: 2px;
            height: 2px;
            border-radius: 50%;
            margin-left: 4px;
            background-color: var(--default-color);
        }
    }

    time {
        padding-left: 4px;
    }
`;

interface PostTitleProps {
    frontmatter: Frontmatter;
    toc: string;
}

const PostTitle: React.FC<PostTitleProps> = ({ frontmatter, toc }) => {
    return (
        <Wrapper>
            <TitleWrapper>
                <h1>{frontmatter.title}</h1>
                <span>{frontmatter.category}</span>
                <PostWrittenDate date={frontmatter.date} />
            </TitleWrapper>
                <Tag tags={frontmatter.tags} />
            <TOC title={frontmatter.title} toc={toc} />
        </Wrapper>
    )
};

export default PostTitle;