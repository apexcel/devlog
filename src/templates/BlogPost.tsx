import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout.tsx"
import Post from "../components/Post.tsx"
import '../global.ts'

type DataType = {
  [key: string]: any
}

const BlogPost = ({ data, location }) => {
  const { previous, next } = data;
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const toc = post.tableOfContents;

  return (
    <Layout location={location}>
      <Post
        seoTitle={post.frontmatter.title}
        seoDescription={post.frontmatter.description || post.excerpt}
        siteTitle={siteTitle}
        post={post}
        prevPost={previous}
        nextPost={next}
        toc={toc}
      />
    </Layout>
  )
};

export default BlogPost;

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
        categories
      }
      tableOfContents(maxDepth: 4)
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
