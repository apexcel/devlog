import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import Tags from '../tags/Tags';

const MenuNavItemWrapper = styled.nav`
`;

const MenuTitle = styled.h3``;


const SubItemWrapper = styled.div`
`;
const SubItemTitle = styled.h6`
    padding: 0 0 0 12px;
    margin: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.7);
    display: inline-block;
    cursor: pointer;
`;
const SubItemCount = styled.span`
    font-size: 0.8rem;
`;

const SubItemContentWrapper = styled.div<{ active: boolean }>`
    display: ${props => props.active ? 'block' : 'none'};
    height: ${props => props.active ? 'auto' : 0};
`;
const SubItemContent = styled.a`
    display: block;
    font-size: 0.8rem;
    margin-left: 14px;
    padding: 2px 0;
`;

const MenuNavItem: React.FC = () => {

    const data: RawNavItems = useStaticQuery(graphql`
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

    const parseNodeData = (): NavItems => {
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

    const renderItems = () => {
        const categoryTitles = Object.keys(nodeData.items);
        const values: unknown = Object.values(nodeData.items);
        return categoryTitles.map((cTitle, i) =>
            <SubItemWrapper key={i}>
                <SubItemTitle onClick={() => contentNumberToggler(i)}>{cTitle}</SubItemTitle>
                <SubItemContentWrapper active={i === subContentNumber}>
                    {
                        values[i].map((v: NavSubItem, j) =>
                            <SubItemContent href={v.slug} key={j}>{v.title}</SubItemContent>
                        )
                    }
                </SubItemContentWrapper>
            </SubItemWrapper>
        )
    };

    return (
        <MenuNavItemWrapper>
            <MenuTitle>Category</MenuTitle>
            {renderItems()}
            <MenuTitle>Series</MenuTitle>
            <MenuTitle>Tags</MenuTitle>
            <Tags tags={nodeData.tags} />
        </MenuNavItemWrapper>
    )
};

export default MenuNavItem;
