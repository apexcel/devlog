import React from 'react'
import { PageProps, graphql } from "gatsby"

import SEO from "../components/SEO"
import PostList from '../components/post/PostList'
import Layout from '../components/layout'

import { toKebabCase } from '../utils'

const Index: React.FC<PageProps<DataType>> = ({ data, location }) => {
	const nodes = data.allMarkdownRemark.nodes;

	const Slot = (quantity) => {
		const [_, classify, name] = location.pathname.split('/');
		return (
			<h2>
				{classify.toUpperCase()}: {name} #{quantity}
			</h2>
		)
	}

	const renderPost = (posts, classified = false) => {
		return (
			<Layout>
				<SEO title="Apexcel Devlog" />
				{classified ? Slot(posts.length) : ''}
				{
					posts.map(post => {
						const { title, date, tags } = post.frontmatter;
						return (
							<PostList
								key={post.id}
								title={title}
								date={date}
								tags={tags}
								slug={post.fields.slug}
							/>
						)
					})
				}
			</Layout>
		)
	};

	const filterPost = (key: keyof Frontmatter, prop: string) => {
		return nodes.filter(post => {
			const val = post.frontmatter[key];
			if (Array.isArray(val)) {
				return val.findIndex(v => toKebabCase(v) === prop) > -1 ? true : false;
			}
			else {
				return toKebabCase(val) === prop;
			}
		})
	}

	const route = () => {
		const [key, prop, ...rest] = location.pathname.split('/').filter(Boolean);
		if (key === 'tags' || key === 'category') {
			return renderPost(filterPost(key, prop), true);
		}
		return renderPost(nodes);
	}


	if (nodes.length > 0) {
		return route();
	}

	return (
		<Layout>
			<SEO title="All posts" />
			<p>No existing post. :(</p>
		</Layout>
	)
}
export default Index

export const pageQuery = graphql`
{
	site {
		siteMetadata {
			title
		}
	}
	allMarkdownRemark (
		sort: { fields: [frontmatter___date], order: DESC },
	) {
		nodes {
			excerpt(truncate: true)
			id
			fields {
				slug
			}
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
				category
			}
		}
		group (field: frontmatter___tags) {
			nodes {
				excerpt(truncate: true)
					fields {
					slug
				}
				frontmatter {
					date
					title
					description
					tags
					category
				}
			}
			fieldValue
			totalCount
		}
	}
}`
