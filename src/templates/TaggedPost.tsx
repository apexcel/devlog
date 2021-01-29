import React from 'react'
import { Link, graphql, PageProps } from "gatsby"

type DataType = {
    allMarkdownRemark: Record<string, any>
    totalCount: number
    fieldValue: string
    title: string
    slug: string
}

type PageContextType = {
    tag: string
}

const TaggedPost: React.FC<PageProps<DataType, PageContextType>> = ({ data, pageContext }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allMarkdownRemark;
    const makeList = edges.map(({ node }) => {
        const { slug } = node.fields;
        const { title } = node.frontmatter;
        return (
            <li key={slug}>
                <Link to={slug}>{title}</Link>
            </li>
        )
    })

    return (
        <div>
            <p>{totalCount}개의 {tag}결과</p>
            <ul>
                {makeList}
            </ul>
        </div>
    )
}

export default TaggedPost;

export const pageQuery = graphql`
query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
     
    }
  }
`;