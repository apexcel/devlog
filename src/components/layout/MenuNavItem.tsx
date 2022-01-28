import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import ThemeToggler from '../common/ThemeToggler';
import Tag from '../common/Tag';
import Collapsible from '../common/Collapsible';
import { toKebabCase } from '../../utils';

const MenuTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`;

const CloseButton = styled.div`
    position: relative;
    height: 36px;
    width: 36px;

    ::before, ::after {
        position: absolute;
        content: '';
        top: 50%;
        height: 3px;
        width: 36px;
        transform: rotate(-45deg);
        background-color: var(--default-color);
    }

    ::after {
        transform: rotate(45deg);
    }

    :hover {
        ::before, ::after {
            background-color: var(--signature-color);
        }
        cursor: pointer;
    }
`;

const SubItemWrapper = styled.div`
    margin-top: 10px;
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

const MenuNavItem: React.FC<{ menuToggler: () => void }> = ({ menuToggler }) => {

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
        }
    `);

    const parseNodeData = () => {
        const nodes = data.allMarkdownRemark.nodes;
        const posts = {};
        const uniqueTags = new Set();

        for (let node of nodes) {
            const { slug } = node.fields;
            const { category, title, tags } = node.frontmatter;

            posts[category] = posts[category] ? [...posts[category], { title, slug }] : [{ title, slug }];
            tags.forEach(tag => uniqueTags.add(tag));
        }

        return {
            posts: posts,
            tags: Array.from(uniqueTags) as string[]
        };
    };

    const nodeData = parseNodeData();
    const resetDocumentStyle = () => document.documentElement.removeAttribute('style');

    const renderItems = () => {
        const metaData = Object.entries<{ slug: string, title: string }[]>(nodeData.posts);
        return metaData.map(([categoryTitle, posts], i) =>
            <SubItemWrapper key={i}>
                <Collapsible title={<Link to={`/category/${toKebabCase(categoryTitle)}`}>{categoryTitle}({posts.length})</Link>}>
                    {posts.map(({ title, slug }, j) => <SubItemContent to={slug} key={j} onClick={resetDocumentStyle}>{title}</SubItemContent>)}
                </Collapsible>
            </SubItemWrapper>
        );
    };

    return (
        <>
            <MenuTop>
                <ThemeToggler />
                <CloseButton onClick={menuToggler} />
            </MenuTop>
            <h3>Category</h3>
            {renderItems()}
            <h3>Series</h3>
            <h3>Tags</h3>
            <Tag tags={nodeData.tags} />
        </>
    )
};

export default MenuNavItem;
