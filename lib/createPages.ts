import path from 'path';
import { CreatePagesArgs } from 'gatsby';

export async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
    const { createPage } = actions;
    const { data, errors } = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html {

                        }
                    }
                }
            }
        }
    `);
    if (errors) throw errors;
}