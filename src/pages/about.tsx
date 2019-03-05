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
            <PostFullTitle>Hello world! It's Santiago</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                In my five years of experience as a software developer, I worked for several startups from the very beginning, some of them succeed, some fail, but I had the luck to experience what is write an MVP then re-write it using the best practices out there while having to scale it.
              </p>
              <p> 
              My vision for this blog is to be a source of knowledge for several topics of software development mainly javascript, node.js, typescript, cloud computing, AWS, GCP, continuous integration and, continuous delivery.
              </p>
              <p> 
                I also offer my services as a consultant, I can help you with your product, feel free to contact me at <a href="mailto:santiago@softwareontheroad.com."> santiago@softwareontheroad.com. </a>
                I can help you scale your product, taking it to production, designing the software architecture or just giving you my thoughts and tips.
              </p>
              <p> 
                If you want to know more about my previous work experience check my <a href="https://www.linkedin.com/in/santiagoquinteros/">LinkedIn profile. </a>
              </p>
              <p> 
              This blog is Open Source, so if you think that something can be improved, just open an issue or PR.
              </p>
              <p> 
              I hope you find this blog useful.
              </p>
              <p> 
              Santiago Quinteros - March 2019
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
