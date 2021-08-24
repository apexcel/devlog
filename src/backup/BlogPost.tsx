import React from "react"
import { graphql, PageProps } from "gatsby"
import PostTemplate from "./PostTemplate"
import Layout from "../components/Layout"

const BlogPost: React.FC<PageProps<DataType>> = ({ data, location }) => {
  console.log(data)
  const { previous, next } = data;
  const post = data.markdownRemark;
  const toc = post.tableOfContents;

  return (
    <Layout>
      <PostTemplate
        seoTitle={post.frontmatter.title}
        seoDescription={post.frontmatter.description || post.excerpt}
        post={post}
        prevPost={previous}
        nextPost={next}
        toc={toc}
      />
    </Layout>
  )
};

export default BlogPost;
// TODO: category 분류를 새로 추가했음.
// 이에 따른 쿼리를 불러오고 template에 props 추가 해주기
export const pageQuery = graphql`
  query aBlogPostBySlug(
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
