module.exports = {
  siteMetadata: {
    title: `Apexcel Devlog`,
    author: {
      name: `Apexcel`,
      summary: `Blog about the web and software development.`,
    },
    description: `Blog about the web and software development.`,
    siteUrl: `https://apexcel.blog`,
    social: {
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`, // prismjs 보다 앞에 와야함.
            options: {
              className: `anchor-header`,
              icon: false,
              maintainCase: false,
              removeAccents: true,
              elements: [`h2`, 'h3', `h4`],
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-plugin-react-svg",
            options: {
              rule: {
                include: /assets/
              }
            }
          }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Apexcel Devlog`,
        short_name: `Apexcel Devlog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#028157`,
        display: `minimal-ui`,
        icon: `content/assets/Logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.apexcel.blog`,
        sitemap: `https://www.apexcel.blog/sitemap.xml`
      }
    }
  ],
}
