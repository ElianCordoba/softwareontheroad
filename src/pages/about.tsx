import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;


const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p> 
                Welcome to the personal blog of Santiago Quinteros. 
              </p>
              <p> 
                Santiago has been developing software since a young age, he started at age 16 making video games with good old Unity3D.
              </p>
                At 19 he learned javascript and web development and fall in love with NodeJs and cloud computing.
              <p>
                Six years later, he has acquired vast experience working on early-stage startups, helping them reach the next level.
              </p>
              <p> 
                Santiago is interested in working with cloud computing, full-stack development, and machine learning projects.
              </p>
              <p>
                Now he travels the world as a digital nomad while working full time at <a href="https://standups.io" rel="noreferrer" target="_blank"> standups.io </a> the best way to run video standups specially crafted for remote and distributed teams 🌎
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
