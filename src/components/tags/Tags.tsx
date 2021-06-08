import React from 'react'
import styled from 'styled-components'
import COLORS from '../../lib/styles/colors.style'
import { toKebabCase } from '../../lib/utils';
import colors from '../../styles/colors';

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
    background-color: ${COLORS.TAG_BG};
    color: ${colors.font};
    font-size: 0.9rem;

    @media screen and (max-width: 768px) {
        padding: 4px 10px;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 0.8rem;
    }
`;

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