import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/Layout.tsx"
import Post from "../components/Post.tsx"
import '../lib/global.ts'

type DataType = {
  previous: string
  next: string
  markdownRemark: Record<string, any>
  site: Record<string, any>
}

const BlogPost: React.FC<PageProps<DataType>> = ({ data, location }) => {
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
        tags
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