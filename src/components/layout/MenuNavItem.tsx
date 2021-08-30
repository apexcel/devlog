import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import ThemeToggler from '../common/ThemeToggler';
import Tag from '../common/Tag';

const MenuNavItemWrapper = styled.nav`
    @media screen and (max-width: 1024px) {
        padding: 72px 14px 14px 14px;
    }
`;

const MenuTitle = styled.h3``;


const SubItemWrapper = styled.div`
    margin: 10px 0;
`;
const SubItemTitle = styled.h6`
    border-left: 1px solid rgba(0, 0, 0, 0.7);
    display: inline-block;
    cursor: pointer;
    color: ${props => props['aria-hidden'] ? `var(--signature-color)` : `var(--default-color)`};
    margin: 0;
    padding-left: ${props => props['aria-hidden'] ? '12px' : '8px'};
    font-weight: ${props => props['aria-hidden'] ? 'bold' : 'regular'};
`;
const SubItemCount = styled.span`
    font-size: 0.8rem;
`;

const SubItemContentWrapper = styled.div`
    display: ${props => props['aria-hidden'] ? 'block' : 'none'};
    height: ${props => props['aria-hidden'] ? 'auto' : 0};
`;
const SubItemContent = styled(Link)`
    display: block;
    font-size: 0.9rem;
    margin-left: 18px;
    padding: 2px 0;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuNavItem: React.FC = () => {

    const data: DataType = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    tags
                    category
                    title
                }
                fields {
                    slug
                }
            }
        }
    }`);

    const [subContentNumber, setSubContentNumber] = useState(-1);
    const contentNumberToggler = (index: number) => {
        setSubContentNumber(subContentNumber === index ? -1 : index);
    };

    const parseNodeData = () => {
        const nodes = data.allMarkdownRemark.nodes;
        const items = {};
        let uniqueTags = new Set();

        for (let i = 0; i < nodes.length; i += 1) {
            const { category, title, tags } = nodes[i].frontmatter;
            const { slug } = nodes[i].fields;

            items[category] = items[category] ? [...items[category], { title, slug }] : [{ title, slug }];
            tags.forEach(tag => uniqueTags.add(tag));
        }

        return {
            items: items,
            tags: Array.from(uniqueTags) as string[]
        };
    };

    const nodeData = parseNodeData();
    const resetDocumentStyle = () => {
        document.documentElement.removeAttribute('style');
    }

    const renderItems = () => {
        const categoryTitles = Object.keys(nodeData.items);
        const values = Object.values(nodeData.items);
        return categoryTitles.map((cTitle, i) =>
            <SubItemWrapper key={i}>
                <SubItemTitle aria-hidden={i === subContentNumber} onClick={() => contentNumberToggler(i)}>{cTitle}</SubItemTitle><SubItemCount>({values[i].length})</SubItemCount>
                <SubItemContentWrapper aria-hidden={i === subContentNumber}>
                    {
                        values[i].map((v, j) =>
                            <SubItemContent to={v.slug} key={j} onClick={resetDocumentStyle}>{v.title}</SubItemContent>
                        )
                    }
                </SubItemContentWrapper>
            </SubItemWrapper>
        )
    };

    return (
        <MenuNavItemWrapper>
            <ThemeToggler/>
            <MenuTitle>Category</MenuTitle>
            {renderItems()}
            <MenuTitle>Series</MenuTitle>
            <MenuTitle>Tags</MenuTitle>
            <Tag tags={nodeData.tags} />
        </MenuNavItemWrapper>
    )
};

export default MenuNavItem;
