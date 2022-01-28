require('ts-node').register();
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { toKebabCase } = require('./src/utils');

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions

	// Define a template for blog post
	// TODO: 업데이트한 템플릿으로 이름 변경
	const postTemplate = path.resolve(`./src/templates/PostTemplate.tsx`);
	const indexPage = path.resolve(`./src/pages/index.tsx`);

	// Get all markdown blog posts sorted by date
	const result = await graphql(
		`
			{
				allMarkdownRemark (
					sort: { fields: [frontmatter___date], order: ASC }, 
					limit: 1000
				) {
					nodes {
						id
						fields {
							slug
						}
						frontmatter {
							tags
							category
						}
					}
				}
				tagsGroup: allMarkdownRemark(limit: 1000) {
					group(field: frontmatter___tags) {
						fieldValue
						totalCount
					}
				}
				categoryGroup: allMarkdownRemark(limit: 1000) {
				group(field: frontmatter___category) {
					fieldValue
					totalCount
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your blog posts`,
			result.errors
		)
		return
	}

	// Create blog posts pages
	// But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
	// `context` is available in the template as a prop and as a variable in GraphQL

	const posts = result.data.allMarkdownRemark.nodes
	if (posts.length > 0) {
		posts.forEach((post, index) => {
			const previousPostId = index === 0 ? null : posts[index - 1].id
			const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
			const categories = post.frontmatter.category;

			createPage({
				path: post.fields.slug,
				component: postTemplate,
				context: {
					id: post.id,
					previousPostId,
					nextPostId,
					categories
				},
			})
		})
	}

	const tags = result.data.tagsGroup.group;
	tags.forEach(tag => {
		createPage({
			path: `/tags/${toKebabCase(tag.fieldValue)}`,
			component: indexPage,
			context: {
				data: tags
			}
		})
	})

	const categories = result.data.categoryGroup.group;
	categories.forEach(category => {
		createPage({
			path: `/category/${toKebabCase(category.fieldValue)}`,
			component: indexPage,
			context: {
				data: category
			}
		})
	})

}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })

		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions

	// Explicitly define the siteMetadata {} object
	// This way those will always be defined even if removed from gatsby-config.js

	// Also explicitly define the Markdown frontmatter
	// This way the "MarkdownRemark" queries will return `null` even when no
	// blog posts are stored inside "content/blog" instead of returning an error
	createTypes(`
		type SiteSiteMetadata {
			author: Author
			siteUrl: String
			social: Social
		}

		type Author {
			name: String
			summary: String
		}

		type Social {
			twitter: String
		}

		type MarkdownRemark implements Node {
			frontmatter: Frontmatter
			fields: Fields
		}
		type Frontmatter {
			title: String
			description: String
			date: Date @dateformat
		}
		type Fields {
			slug: String
		}
	`)
}