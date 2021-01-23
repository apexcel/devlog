export function dedupeCategories(allMarkdownRemark) {
    const uniqueCategories = new Set();
    allMarkdownRemark.edges.forEach(({ node }) => {
        node.frontmatter.categories.forEach(category => {
            uniqueCategories.add(category);
        })
    })

    return Array.from(uniqueCategories);
}