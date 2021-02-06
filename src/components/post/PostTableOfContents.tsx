import React from 'react';
import styled, { css } from 'styled-components';
import EmptyBox from '../common/EmptyBox';

const Toc = styled.div`
    position: absolute;
    left: 100%;
    margin-left: 84px;

    @media screen and (max-width: 1420px) {
        display: none;
    }

    @media screen and (max-width: 1451px) {
        margin-left: 74px;
    }

    @media screen and (min-width: 1550px) {
        margin-left: 108px;
    }

    @media screen and (min-width: 1600px) {
        margin-left: 108px;
    }
`;


interface TocListWrapperProps {
    isFloat: boolean
}
const float = css`
    position: fixed;
    top: 154px;
`;
const TocListWrapper = styled.ul<TocListWrapperProps>`
    margin-left: 18px;

    ${props => props.isFloat ? float: ''}

    @media screen and (min-width: 1550px) {
        width: 264px;
    }

    @media screen and (min-width: 1600px) {
        width: 100%;
    }
`;

const active = css`
    color: #1b6339;
    font-weight: bold;
    font-size: 1rem;
`;

interface TocListProps {
    isActive: boolean
}

const TocList = styled.li<TocListProps>`
    list-style: none;

    ${props => props.isActive ? active : ''}

    a {
        display: block;
        font-size: 0.8rem;
        color: #6b6b6b;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    p {
        margin: 0;
    }
`;

const PostTableOfContents:React.FC<Record<string, any>> = ({ toc }) => {
    return (
        <EmptyBox>
            <Toc>

            </Toc>
        </EmptyBox>
    )
};

export default PostTableOfContents;