import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SocialLink,
} from '../styles/shared';
import { PageContext } from './post';
import Helmet from 'react-helmet';
import config from '../website-config';
import Twitter from '../components/icons/twitter';
import Github from '../components/icons/github';

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: Georgia, serif;
  font-style: italic;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 5px 0 10px 0;
  max-width: 600px;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.5;
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: 0 0 20px 0;
  width: 100px;
  height: 100px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
`;

interface AuthorTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
    authorYaml: {
      id: string;
      name: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      github?: string;
      location?: string;
      profile_image?: {
        childImageSharp: {
          fluid: any;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: any;
        };
      };
    };
  };
}

const Author: React.FunctionComponent<AuthorTemplateProps> = props => {
  const author = props.data.authorYaml;
  
  const edges = props.data.allMarkdownRemark.edges.filter(
    (edge) => {
      const isDraft = (edge.node.frontmatter.draft !== true ||
        process.env.NODE_ENV === 'development')
      return isDraft && edge.node.frontmatter.author && edge.node.frontmatter.author.id === author.id
    }
  );
  const totalCount = edges.length;

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.siteTitle}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.siteTitle}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        <meta property="article:publisher" content="https://www.facebook.com/santypk4" />
        <meta property="article:author" content="https://www.facebook.com/santypk4" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.github && (
          <meta
            name="github:site"
            content={`@${config.github.split('https://github.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          className="no-cover"
          css={[outer, SiteHeader]}
        >
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <img
                css={[AuthorProfileImage, AuthorProfileBioImage]}
                src={props.data.authorYaml.avatar.childImageSharp.fluid.src}
                alt={author.id}
              />
              <SiteTitle>{author.name} </SiteTitle>
              {author.bio && <AuthorBio>{author.bio}</AuthorBio>}
              <AuthorMeta>
                {author.location && (
                  <div css={HiddenMobile}>
                   📍 {author.location} <Bull>&bull;</Bull>
                  </div>
                )}
                <div css={HiddenMobile}>
                  {totalCount > 1 && `${totalCount} posts`}
                  {totalCount === 1 && `1 post`}
                  {totalCount === 0 && `No posts`} <Bull>•</Bull>
                </div>
                {author.twitter && (
                  <a
                    className="social-link-tw"
                    css={SocialLink}
                    href={`https://twitter.com/${author.twitter}`}
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </a>
                )}
                {author.github && (
                  <a
                    className="social-link-gh"
                    css={SocialLink}
                    href={`https://github.com/${author.github}`}
                    title="Github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github />
                  </a>
                )}
              </AuthorMeta>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges.map(({ node }) => {
                return <PostCard key={node.fields.slug} post={node} />;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Author;

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      name
      website
      twitter
      bio
      facebook
      location
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
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
                  ...GatsbyImageSharpFluid
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
  }
`;
