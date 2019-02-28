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


const Privacy: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>Privacy policy</title>
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
            <PostFullTitle>Privacy policy</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
            <p> 
              We do not share personal information with third-parties nor do we store information we collect about your visit to this blog for use other than to analyze content performance through the use of cookies, which you can turn off at anytime by modifying your internet browser's settings.
              We are not responsible for the republishing of the content found on this blog on other websites or media without our permission. 
              This privacy policy is subject to change without notice.
            </p>
              <h2>Contact Us</h2>
              <p> 
              If you have any questions about these Terms, please contact us at contact@softwareontheroad.com.
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default Privacy;
