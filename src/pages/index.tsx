import React from 'react'
import { PageProps, Link, graphql } from "gatsby"
import SEO from "../components/seo"

import Layout from "../components/Layout.tsx"
import Tags from '../components/Tags.tsx'
import PostWrittenDate from '../components/WrittenDate'
import { toPascalCase, removeAllWhiteSpace, replaceToWhiteSpace } from '../lib/utils'

type DataType = {
	[key: string]: any
}

const PostList: React.FC<DataType> = ({
	title, date, tags, slug, excerpt
}) => {

	return (
		<div className='post-list'>
			<div>
				<div className='post-list-item'>
					<Link className='post-list-title' to={slug} itemProp="url">{title}</Link>
					<PostWrittenDate date={date} />
				</div>
				<Tags tags={tags} />
			</div>
			<div>
				{/* {excerpt} */}
			</div>
		</div>
	);
}

type TaggedPostsInfo = {
	tagValue: string
	totalCount: number
}
const TaggedPostsInfo: React.FC<TaggedPostsInfo> = ({ tagValue, totalCount }) => {
	return (
		<div>
			<h1>Tag: {tagValue}</h1>
			<span>Total: {totalCount}</span>
		</div>
	)
}

const Index: React.FC<PageProps<DataType>> = ({
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
			<Layout location={location} title={'title'}>
				<SEO title="Apexcel" />
				<div className='post-list-wrapper'>
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
		totalCount
		}
	}
}
`
