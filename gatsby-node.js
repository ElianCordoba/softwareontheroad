const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout, primaryTag } = node.frontmatter;
      const { relativePath } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      });

      createNodeField({
        node,
        name: 'primaryTag',
        value: primaryTag || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: `/2019-03-01-s3-direct-browser-upload`,
    toPath: `/aws-s3-secure-direct-upload`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2019-02-28-definitive-guide-s3-direct-browser-upload`,
    toPath: `/aws-s3-secure-direct-upload`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2017-06-22-javascript-promise`,
    toPath: `/javascript-promise`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2018-06-15-polinomial-regression`,
    toPath: `/polinomial-regression`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2018-06-12-my-first-neural-network`,
    toPath: `/my-first-neural-network`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2018-06-10-road-to-machine-learning`,
    toPath: `/aws-s3-secure-direct-upload`,
    isPermanent: true,
    statusCode: 200,
  })
  createRedirect({
    fromPath: `/2018-07-01-prevent-your-node-server-to-crash-with-this-simple-trick`,
    toPath: `/nodejs-crash-exception-handler`,
    isPermanent: true,
    statusCode: 200,
  })

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              title
              subtitle
              tags
              date
              draft
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
              author {
                id
                bio
                avatar {
                  children {
                    ... on ImageSharp {
                      fixed(quality: 90) {
                        src
                      }
                    }
                  }
                }
              }
            }
            fields {
              layout
              slug
            }
          }
        }
      }
      allAuthorYaml {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node }, index) => {
    const { slug, layout } = node.fields;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });

  // Create tag pages
  const tagTemplate = path.resolve('./src/templates/tags.tsx');
  const tags = _.uniq(
    _.flatten(
      result.data.allMarkdownRemark.edges.map(edge => {
        return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      }),
    ),
  );
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });

  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');
  result.data.allAuthorYaml.edges.forEach(edge => {
    createPage({
      path: `/author/${_.kebabCase(edge.node.id)}/`,
      component: authorTemplate,
      context: {
        author: edge.node.id,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === `develop` || stage === `develop-html`) {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
