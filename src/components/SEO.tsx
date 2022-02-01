/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
    title: string
    description?: string,
    lang?: string,
    meta?: Array<HTMLMetaElement>
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = '', 
    lang = 'ko', 
    meta = [], 
}) => {
    const { site } = useStaticQuery(
        graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
            link={[
                {
                    rel: 'canonical',
                    href: 'https://apexcel.netlify.app'
                }
            ]}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: "google-site-verification",
                    content: "3vaVwxDWhw6XgnBUU-ltEsYo7oTEV9Cm87Dfgqm4GRI"
                }, 
                {
                    name: "naver-site-verification",
                    content: "e35f7dfac83d944f05ec08513da728b517fe401f"
                }
            ].concat(meta)}
        />
    )
}
export default SEO;