import React from 'react'
import { PageProps, graphql } from "gatsby"
import SEO from "../components/seo"
import { toPascalCase, removeAllWhiteSpace, replaceToWhiteSpace } from '../lib/utils'

import Layout from "../components/Layout.tsx"
import LayoutTemplate from '../components/layout/LayoutTemplate'
import TaggedPostsInfo from '../components/tags/TaggedPostInfo'
import PostList from '../components/post/PostList'

const Index: React.FC<PageProps<Record<string, any>>> = ({
	data,
	location
}) => {
	let posts = data.allMarkdownRemark.nodes;
	let tagValue, totalCount;

	// 인덱스 페이지가 아닐 때
	if (location.pathname !== '/') {
		// 패스 URL이 tags/??? 형태이면
		if (location.pathname.match(/(tags\/)/g)) {
			// 해당 그룹으로 포스트 대체
			tagValue = location.pathname.split('/')[2];
			let taggedPosts = data.allMarkdownRemark.group.find(post => removeAllWhiteSpace(post.fieldValue) === toPascalCase(tagValue, true));
			let { nodes } = taggedPosts;
			tagValue = toPascalCase(replaceToWhiteSpace(tagValue));
			totalCount = taggedPosts.totalCount;
			posts = nodes;
		}
	}

	if (posts.length > 0) {
		return (
			<LayoutTemplate location={location} title={'title'}>
				<SEO title="Apexcel" />
				<div>
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
				</div>
			</LayoutTemplate>
		)
	}

	return (
		<Layout location={location} title={'title'}>
			<SEO title="All posts" />
			<p>
				No blog posts found. Add markdown posts to "content/blog" (or the
				directory you specified for the "gatsby-source-filesystem" plugin in
				gatsby-config.js).
        	</p>
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
