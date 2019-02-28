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


const Terms: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>Terms and conditions</title>
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
            <PostFullTitle>Terms and conditions</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                All content provided on this blog is for informational purposes only. 
                The owner of this blog makes no representations as to the accuracy or completeness of any information on this site or found by following any link on this site.
                The owner will not be liable for any errors or omissions in this information nor for the availability of this information. 
                The owner will not be liable for any losses, injuries, or damages from the display or use of this information. 
                These terms and conditions of use are subject to change at any time and without notice.
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

export default Terms;
