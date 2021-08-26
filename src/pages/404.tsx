import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/SEO"
import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title

	return (
		<Layout>
			<SEO title="404: Not Found" />
			<h1>404: Not Found</h1>
			<Link to='/'>Home</Link>
		</Layout>
	)
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
