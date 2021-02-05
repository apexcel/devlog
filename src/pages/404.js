import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import LayoutTemplate from "../components/layout/LayoutTemplate"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <LayoutTemplate location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <Link to='/'>Home</Link>
    </LayoutTemplate>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
