import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO';
import PostTitle from '../components/post/PostTitle';
import PostArticle from '../components/post/PostArticle';
import PostComments from '../components/post/PostComments';

const PostTemplate: React.FC<PageProps<DataType>> = ({ data, location }) => {
    const { previous, next } = data;
    const post = data.markdownRemark;
    const article = post.html;

    return (
        <Layout>
            <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
            <PostTitle frontmatter={post.frontmatter} toc={post.tableOfContents} />
            <PostArticle article={article} nextPostInfo={next} prevPostInfo={previous} />
            <PostComments />
        </Layout>
    )
};

export default PostTemplate;
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
