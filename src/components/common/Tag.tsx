import { Link } from 'gatsby';
import React from 'react'
import styled from 'styled-components'
import { toKebabCase } from '../../utils';

const Wrapper = styled.div`
    width: inherit;
    list-style: none;
    margin-top: 15px;

    @media screen and (max-width: 768px) {
        margin-top: 10px;
    }
`;

const TagItem = styled(Link)`
    display: inline-block;
    padding: 4px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 25px;
    text-align: center;
    background-color: ${props => props.theme.tag.background};
    color: ${props => props.theme.colors.default};
    font-size: 0.9rem;

    @media screen and (max-width: 768px) {
        padding: 4px 10px;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 0.8rem;
    }
`;

interface TagProps {
    tags: string[]
}

const Tag: React.FC<TagProps> = ({ tags }) => {
    return (
        <Wrapper>
            {tags.sort().map(tag => <TagItem key={tag} to={`/tags/${toKebabCase(tag)}`}>{tag}</TagItem>)}
        </Wrapper>
    )
}

export default Tag;