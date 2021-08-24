import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Tags from '../tags/Tags';

const MenuNavItemWrapper = styled.nav`
`;

const MenuTitle = styled.h3``;


const SubItemWrapper = styled.div`
    margin: 10px 0;
`;
const SubItemTitle = styled.h6<{active: boolean}>`
    border-left: 1px solid rgba(0, 0, 0, 0.7);
    display: inline-block;
    cursor: pointer;
    color: ${props => props.active ? colors.main : colors.font};
    margin: 0;
    padding-left: ${props => props.active ? '12px' : '8px'};
    font-weight: ${props => props.active ? 'bold' : 'regular'};
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
    font-size: 0.9rem;
    margin-left: 18px;
    padding: 2px 0;
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

    const renderItems = () => {
        const categoryTitles = Object.keys(nodeData.items);
        const values = Object.values(nodeData.items);
        return categoryTitles.map((cTitle, i) =>
            <SubItemWrapper key={i}>
                <SubItemTitle active={i === subContentNumber} onClick={() => contentNumberToggler(i)}>{cTitle}</SubItemTitle><SubItemCount>({values[i].length})</SubItemCount>
                <SubItemContentWrapper active={i === subContentNumber}>
                    {
                        values[i].map((v, j) =>
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
