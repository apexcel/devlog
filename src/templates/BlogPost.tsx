import React from "react"
import { graphql, PageProps } from "gatsby"
import PostTemplate from "../components/post/PostTemplate"
import LayoutTemplate from "../components/layout/LayoutTemplate"

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
    <LayoutTemplate location={location} siteTitle={siteTitle} postTitle={post.frontmatter.title}>
      <PostTemplate
        seoTitle={post.frontmatter.title}
        seoDescription={post.frontmatter.description || post.excerpt}
        post={post}
        prevPost={previous}
        nextPost={next}
        toc={toc}
      />
    </LayoutTemplate>
  )
};

export default BlogPost;
// TODO: category 분류를 새로 추가했음.
// 이에 따른 쿼리를 불러오고 template에 props 추가 해주기
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
        tags
        category
      }
      tableOfContents(absolute: false, maxDepth: 4)
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
