import React from 'react'
import { PageProps, graphql } from "gatsby"
import SEO from "../components/SEO"
import { toKebabCase } from '../lib/utils'

import TaggedPostsInfo from '../components/tags/TaggedPostInfo'
import PostList from '../components/post/PostList'
import Layout from '../components/Layout'

const Index: React.FC<PageProps<Record<string, any>>> = ({
	data,
	location,
}) => {
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	let posts = data.allMarkdownRemark.nodes;
	let tagValue, totalCount;

	// 인덱스 페이지가 아닐 때
	if (location.pathname !== '/') {
		// 패스 URL이 tags/??? 형태이면
		if (location.pathname.match(/(tags\/)/g)) {
			// 해당 그룹으로 포스트 대체
			const postTag = location.pathname.split('/')[2];
			const taggedPosts = data.allMarkdownRemark.group.find(post => {
				if (toKebabCase(post.fieldValue) === postTag) {
					tagValue = post.fieldValue;
					return true;
				}
			});
			totalCount = taggedPosts.totalCount;
			posts = taggedPosts.nodes;
		}
	}

	if (posts.length > 0) {
		return (
			<Layout>
				<SEO title="Apexcel Devlog" />
				{tagValue ? <TaggedPostsInfo tagValue={tagValue} totalCount={totalCount} /> : ''}
				{
					posts.map((post, i) => {
						const { title, date, tags } = post.frontmatter;
						return (
							<PostList
								key={i}
								title={title}
								date={date}
								tags={tags}
								excerpt={post.excerpt}
								slug={post.fields.slug}
							/>
						)
					})
				}
			</Layout>
		)
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
query {
    site {
		siteMetadata {
			title
		}
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
		nodes {
			excerpt(truncate: true)
			fields {
				slug
			}
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
			}
		}
		group(field: frontmatter___tags) {
			nodes {
				excerpt(truncate: true)
				fields {
					slug
				}
				frontmatter {
					date
					description
					tags
					title
				}
			}
		fieldValue
		totalCount
		}
	}
}
`
