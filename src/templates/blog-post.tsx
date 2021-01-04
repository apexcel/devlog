import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout.tsx"
import TableOfContents from "../components/TableOfContents.tsx"
import SEO from "../components/seo"

type DataType = {
	[key: string]: any
}

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata?.title || `Title`;

	console.log(data)

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<Article data={data} />
			<TableOfContents data={data} />
		</Layout>
	)
};

export default BlogPostTemplate;

const Article: React.FC<DataType> = ({ data }) => {
	const post = data.markdownRemark;

	return (
		// <div className='post-wrapper'>
			<article className='post-article' itemScope itemType="http://schema.org/Article">
				<header className='post-title'>
					<h1 itemProp='headline'>{post.frontmatter.title}</h1>
					<p>{post.frontmatter.date} {post.frontmatter.category}</p>
				</header>
				<section
					className='post-section'
					dangerouslySetInnerHTML={{ __html: post.html }}
					itemProp="articleBody"
				/>
				<PostNavigation data={data} />
			</article>
		// </div>
	)
};

const PostNavigation: React.FC<DataType> = ({ data }) => {
	const { previous, next } = data;
	return (
		<nav className="post-footer-nav">
			<ul
				style={{
					display: `flex`,
					flexWrap: `wrap`,
					justifyContent: `space-between`,
					listStyle: `none`,
					padding: 0,
				}}
			>
				<li>
					{previous && (
						<Link to={previous.fields.slug} rel="prev">
							← {previous.frontmatter.title}
						</Link>
					)}
				</li>
				<li>
					{next && (
						<Link to={next.fields.slug} rel="next">
							{next.frontmatter.title} →
						</Link>
					)}
				</li>
			</ul>
			<div>
				
			</div>
		</nav>
	)
};

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
	  }
	  tableOfContents
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
