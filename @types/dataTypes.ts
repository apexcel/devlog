// 파싱 전 Raw data type
interface RawNavItems {
    allMarkdownRemark: {
        nodes: Array<{
            frontmatter: {
                tags: string[];
                category: string;
                title: string;
            },
            fields: {
                slug: string;
            }
        }>
    }
}

// 파싱 후 
interface NavItems {
    items: Record<string, NavSubItem>
    tags: string[];
}

interface NavSubItem {
    title: string;
    slug: string;
}

interface Tags {
    tags: string[];
}