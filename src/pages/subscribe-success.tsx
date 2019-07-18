import { graphql, Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SiteNavLogo from '../components/header/SiteNavLogo';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, PostFeed, SiteHeader } from '../styles/shared';
import { PageContext } from '../templates/post';
import Subscribe from '../components/subscribe/Subscribe';

const SiteNavCenter = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .site-nav-logo {
    margin-right: 0;
  }
`;

const ThanksTemplate = css`
  padding: 7vw 4vw;
`;

const ThankYouTitle = styled.h1`
  margin: 2vh 0vw;
  font-size: 3.5rem;
  line-height: 1.5;
  font-family: 'Georgia', sans-serif
  color: ${colors.darkgrey};
  letter-spacing: -1px;
`;

const ThanksDescription = styled.p`
  word-spacing: -1px;
  padding-top: 2vh;
  padding-bottom: 2vh;
  margin: 0;
  color: ${colors.darkgrey};
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: inherit;
  font-family: 'Georgia';
`;

const ThanksLink = css`
  display: inline-block;
  margin-top: 5px;
`;

interface NotFoundTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
  };
}

const ThanksPage: React.FunctionComponent<NotFoundTemplateProps> = props => {
  const { edges } = props.data.allMarkdownRemark;

  return (
    <IndexLayout>
      <Wrapper>
        <header css={[SiteHeader, outer]}>
          <div className="inner">
            <SiteNavCenter>
              <SiteNavLogo />
            </SiteNavCenter>
          </div>
        </header>
        <main id="site-main" css={[ThanksTemplate, outer]}>
          <div css={inner}>
            <section style={{ textAlign: 'center' }}>
              <ThankYouTitle>Thanks for signing up!</ThankYouTitle>
              <ThanksDescription>
                I just sent you a confirmation e-mail.
                <br/>
                Remember to mark <b>feed@softwareontheroad.com</b>
                <br />
                as a "safe sender" with your email provider, so you get all of the articles that I'll be sending you!
              </ThanksDescription>
              <Link css={ThanksLink} to={''}>
                Go to the front page →
              </Link>
            </section>
          </div>
        </main>
        <aside css={outer}>
          <div css={inner}>
            <div css={PostFeed}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </aside>
      </Wrapper>
    </IndexLayout>
  );
};

export default ThanksPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
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
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
