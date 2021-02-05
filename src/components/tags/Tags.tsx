import React from 'react'
import styled from 'styled-components'
import colors from '../../lib/styles/colors.style'
import { toKebabCase } from '../../lib/utils';

const Wrapper = styled.div`
    width: inherit;
    list-style: none;
    margin-top: 15px;

    @media screen and (max-width: 768px) {
        margin-top: 10px;
    }
`;

const Tag = styled.a`
    display: inline-block;
    padding: 4px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 25px;
    text-align: center;
    background-color: ${colors.gray1};
    color: ${colors.green1};
    font-weight: 500;

    @media screen and (max-width: 768px) {
        padding: 4px 10px;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 0.8rem;
    }
`;

interface Tags {
    tags: Array<string>
}

const Tags: React.FC<Tags> = ({ tags }) => {
    return (
        <Wrapper>
            {
                tags.sort().map(tag => <Tag key={tag} href={`/tags/${toKebabCase(tag)}`}>{tag}</Tag>)
            }
        </Wrapper>
    )
}

export default Tags;