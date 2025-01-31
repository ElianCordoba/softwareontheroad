import { lighten, setLightness, darken, setSaturation } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled'
import rehypeReact from 'rehype-react';
import CTAContainer from './CTAContainer';
import { colors } from '../styles/colors';

export const PostFullContent = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 70px 100px 0;
  min-height: 230px;
  font-family: Georgia, serif;
  font-size: 2.2rem;
  line-height: 1.6em;
  background: #fff;

  @media (max-width: 1170px) {
    padding: 5vw 7vw 0;
  }
  @media (max-width: 800px) {
    font-size: 1.9rem;
  }

  :before {
    content: '';
    position: absolute;
    top: 15px;
    left: -5px;
    z-index: -1;
    display: block;
    width: 20px;
    height: 200px;
    background: rgba(39, 44, 49, 0.15);
    filter: blur(5px);
    transform: rotate(-5deg);
  }

  :after {
    content: '';
    position: absolute;
    top: 15px;
    right: -5px;
    z-index: -1;
    display: block;
    width: 20px;
    height: 200px;
    background: rgba(39, 44, 49, 0.15);
    filter: blur(5px);
    transform: rotate(5deg);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  dl,
  pre,
  blockquote,
  .post-full-comments,
  .footnotes {
    min-width: 100%;
  }

  li {
    word-break: break-word;
  }

  li p {
    margin: 0;
  }

  a {
    color: #000;
    word-break: break-word;
    box-shadow: ${colors.blue} 0 -1px 0 inset;
  }

  a:hover {
    color: ${colors.blue};
    text-decoration: none;
  }

  strong,
  em {
    color: ${darken('0.05', colors.darkgrey)};
  }

  small {
    display: inline-block;
    line-height: 1.6em;
  }

  li:first-child {
    margin-top: 0;
  }

  .gatsby-resp-image-link {
    box-shadow: none;
  }

  img,
  video {
    display: block;
    margin: 1.5em auto;
    max-width: 1040px;
    height: auto;
  }

  @media (max-width: 1040px) {
    img,
    video {
      width: 100%;
    }
  }

  img[src$='#full'] {
    max-width: none;
    width: 100vw;
  }

  img + br + small {
    display: block;
    margin-top: -3em;
    margin-bottom: 1.5em;
    text-align: center;
  }

  iframe {
    margin: 0 auto !important;
  }

  blockquote {
    margin: 0 0 1.5em;
    padding: 0 1.5em;
    border-left: #3eb0ef 3px solid;
  }

  blockquote p {
    margin: 0 0 1em 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: italic;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  code {
    padding: 0 5px 2px;
    font-size: 0.8em;
    line-height: 1em;
    font-weight: 400 !important;
    background: ${colors.whitegrey};
    border-radius: 3px;
  }

  p code {
    word-break: break-all;
  }

  pre {
    overflow-x: auto;
    margin: 1.5em 0 3em;
    padding: 20px;
    max-width: 100%;
    border: ${darken('0.01', colors.darkgrey)} 1px solid;
    color: ${colors.whitegrey};
    font-size: 1.4rem;
    line-height: 1.5em;
    background: ${darken('0.03', colors.darkgrey)};
    border-radius: 5px;
  }

  pre code {
    padding: 0;
    font-size: inherit;
    line-height: inherit;
    background: transparent;
  }

  pre code :not(span) {
    color: inherit;
  }

  .gatsby-resp-iframe-wrapper {
    margin: 1.5em 0 3em;
  }

  hr {
    margin: 4vw 0;
  }

  hr:after {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    display: block;
    margin-left: -10px;
    width: 1px;
    height: 30px;
    background: ${lighten('0.1', colors.lightgrey)};
    box-shadow: #fff 0 0 0 5px;
    transform: rotate(45deg);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${setLightness('0.05', colors.darkgrey)};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    margin: 0.5em 0 0.2em 0;
    font-size: 4.6rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 2.8rem;
    }
  }

  h2 {
    margin: 0.5em 0 0.2em 0;
    font-size: 3.6rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 2.6rem;
    }
  }

  h3 {
    margin: 0.5em 0 0.2em 0;
    font-size: 2.8rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h3 {
      font-size: 2.2rem;
    }
  }

  h4 {
    margin: 0.5em 0 0.2em 0;
    font-size: 2.8rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h4 {
      font-size: 2.2rem;
    }
  }

  h5 {
    display: block;
    margin: 0.5em 0;
    padding: 1em 0 1.5em;
    border: 0;
    color: ${colors.blue};
    font-family: Georgia, serif;
    font-size: 3.2rem;
    line-height: 1.35em;
    text-align: center;
  }
  @media (min-width: 1180px) {
    h5 {
      max-width: 1060px;
    }
  }
  @media (max-width: 500px) {
    h5 {
      padding: 0 0 0.5em;
      font-size: 2.2rem;
    }
  }

  h6 {
    margin: 0.5em 0 0.2em 0;
    font-size: 2.3rem;
    font-weight: 700;
  }
  @media (max-width: 500px) {
    h6 {
      font-size: 2rem;
    }
  }

  table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    white-space: nowrap;
    vertical-align: top;
  }

  table {
    -webkit-overflow-scrolling: touch;
    background: radial-gradient(ellipse at left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 0
        center,
      radial-gradient(ellipse at right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 100% center;
    background-attachment: scroll, scroll;
    background-size: 10px 100%, 10px 100%;
    background-repeat: no-repeat;
  }

  table td:first-child {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table td:last-child {
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-position: 100% 0;
    background-size: 20px 100%;
    background-repeat: no-repeat;
  }

  table th {
    color: ${colors.darkgrey};
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: left;
    text-transform: uppercase;
    background-color: ${lighten('0.04', colors.whitegrey)};
  }

  table th,
  table td {
    padding: 6px 12px;
    border: ${setSaturation('0.05', darken('0.01', colors.whitegrey))} 1px solid;
  }

  @media (max-width: 500px) {
    padding: 0;
    :before {
      display: none;
    }
    :after {
      display: none;
    }
  }
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'cta-container': CTAContainer },
}).Compiler;

const Ast = ({ ast, ...props }: any) => {
  ast.properties = props;
  return renderAst(ast);
};

export interface PostContentProps {
  htmlAst: any;
}

const PostContent: React.FunctionComponent<PostContentProps> = ({ htmlAst }) => {
  return (
    <PostFullContent className="post-full-content">
      {/* TODO: this will apply the class when rehype-react is published https://github.com/rhysd/rehype-react/pull/11 */}
      <Ast className="post-content" ast={htmlAst} />
      <br />
      <div>
        <h1>  ✋ Hey ! Before you go 🏃‍ </h1>
        <p>
        Have you noticed that this website is called 'software on the road'?
        </p>
        <p>
        That's because I'm a digital nomad and I write software, while I'm on the road.
        </p>
        <p>
        Well, not while I'm driving, but when travel by plane, train or bus to kill some time and stay productive.
        </p>
        <p>
        But working with a laptop all the time <b>can be bad for your posture</b>. So to avoid back pain I use a <b>stand for my laptop</b>.
        </p>
        <p>
        If you plan to <b>travel the world</b>, <b>work from cafes</b>, or even from <b>coworking spaces</b>, make sure to pack <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.amazon.com/gp/product/B016QO64FI/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B016QO64FI&linkCode=as2&tag=santypk4-20&linkId=5d0fa5b75c5d9c064fa6301942790232" >an external keyboard</a>, <a rel="noopener noreferrer nofollow" target="_blank" href="https://www.amazon.com/gp/product/B01NAAY3RA/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01NAAY3RA&linkCode=as2&tag=santypk4-20&linkId=6f9d9254cc8ef77afdc627914ee04840"> a mouse </a>, and <a rel="noopener noreferrer nofollow" target="_blank" href="https://www.amazon.com/gp/product/B01HHYQBB8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01HHYQBB8&linkCode=as2&tag=santypk4-20&linkId=650bc6b8acd5514654e40e405648f6ab">this practical and transportable laptop stand.</a>
        </p>
        <p>
          It works perfect with my <a href="https://www.amazon.com/gp/product/B07K1WWS63/ref=as_li_ss_tl?ie=UTF8&th=1&linkCode=ll1&tag=santypk4-20&linkId=d0e376434dcfd6d7e8ff0ec522e9da3f">MacBook Air</a>, fits pretty well.
        </p>
        <p>
          <a href="https://www.amazon.com/gp/product/B01HHYQBB8/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01HHYQBB8&linkCode=as2&tag=santypk4-20&linkId=650bc6b8acd5514654e40e405648f6ab"><img alt="nextstand" src="https://images-na.ssl-images-amazon.com/images/I/71GICdOKwkL._SL1296_.jpg" width="400" height="400" /></a>
        </p>
        For just little money you can avoid back injuries and neck pains, but it's just a bit of kindly advice from an old developer 😊  
      </div>
      <div id="amzn-assoc-ad-8a41004c-831a-4dfc-8329-89ef1a3b9a5f" />
      <script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=8a41004c-831a-4dfc-8329-89ef1a3b9a5f"/>
      <br />
    </PostFullContent>
  );
};

export default PostContent;
