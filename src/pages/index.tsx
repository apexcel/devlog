import React from 'react'
import { PageProps, Link, graphql } from "gatsby"
import SEO from "../components/seo"

import Layout from "../components/Layout.tsx"
import Tags from '../components/Tags.tsx'
import PostWrittenDate from '../components/WrittenDate'

type DataType = {
	[key: string]: any
}

const PostList: React.FC<DataType> = ({
	title, date, tags, slug, excerpt
}) => {

	return (
		<div className='post-list-item'>
			<div>
				<Link to={slug} itemProp="url">
					<h3>{title}</h3>
				</Link>
				<Tags tags={tags} />
			</div>
			<div>
				<PostWrittenDate date={date} />
				{/* {excerpt} */}
			</div>
		</div>
	);
}

const Index: React.FC<PageProps<DataType>> = ({
	data,
	location
}) => {
	let posts = data.allMarkdownRemark.nodes;

	// 인덱스 페이지가 아닐 때
	if (location.pathname !== '/') {
		// 패스 URL이 tags/??? 형태이면
		if (location.pathname.match(/(tags\/)(\w+)/g)) {
			// 해당 그룹으로 포스트 대체
			const tag = location.pathname.split('/')[2];
			let taggedPosts = data.allMarkdownRemark.group.filter(post => post.fieldValue === decodeURI(tag))
			let { nodes } = taggedPosts[0];
			console.log(nodes)
			posts = nodes;
		}
	}

	if (posts.length > 0) {
		return (
			<Layout location={location} title={'title'}>
				<SEO title="Apexcel" />
				<div className='post-list-wrapper'>
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
			</Layout>
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
		}
	}
}
`
