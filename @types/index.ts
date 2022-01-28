import { ThemeType } from "../src/hooks/useThemeToggler";

declare global {
    interface Window {
        __theme: ThemeType;
        __setTheme: (theme: ThemeType) => void;
        __onThemeChange: (theme: ThemeType) => void;
    }
    interface Frontmatter {
        category?: string;
        tags?: string[];
        title?: string;
        description?: string;
        date?: string;
    }

    interface Fields {
        slug?: string;
    }

    interface AdjacentPost {
        fields?: Fields;
        frontmatter?: Frontmatter;
    }

    interface MarkdownRemarkNode {
        id: string;
        frontmatter?: Frontmatter;
        fields?: Fields;
        excerpt?: string;
    }

    interface Edges {
        nodes?: MarkdownRemarkNode;
        next?: AdjacentPost;
        previous?: AdjacentPost;
        fieldValue?: string;
        totalCount?: number;
    }

    interface Group {
        fieldValue?: string;
        totalCount?: number;
        edges?: Edges;
        nodes?: MarkdownRemarkNode[];
    }

    interface AllMarkdownRemark {
        nodes?: MarkdownRemarkNode[];
        group?: Group[];
        edges?: Edges[];
    }

    interface DataType {
        allMarkdownRemark?: AllMarkdownRemark;
        markdownRemark?: {
            excerpt?: string;
            frontmatter?: Frontmatter;
            html?: string;
            id?: string;
            tableOfContents?: string;
        }
        next?: AdjacentPost;
        previous?: AdjacentPost;
        site?: {
            siteMetadata?: {
                title?: string;
            }
        }
    }
}