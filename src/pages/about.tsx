import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import styled from '@emotion/styled'
import SiteNav from '../components/header/SiteNav';	
import { SiteHeader, outer, SiteMain, inner } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { NoImage, PostFull } from '../templates/post';
import Helmet from 'react-helmet';

const container = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  width: 100%;
  text-align: center;
  background: #0a0b0c;
  font-family: Lato, sans-serif;
  color: #fff;
  padding: 0 76px 0 76px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 71px;
`;

const SubHeader = styled.p`
  max-width: 630px;
  text-align: center;
  font-size: 24px;
  margin: -36px 141px 44px 141px;
`

const CallToAction = styled.button`
  background: #f80;
  padding: 16px 32px;
  margin: 0 0 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 600;
  max-width: 100%;
`

const PerksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Perk= styled.div``
const PerkTitle = styled.h3``

const ShowcaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ShowcaseItem = styled.div`
 max-height: 500px;
 overflow: hidden;
`

const FooterContaienr = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FooterTitle = styled.div``
const FooterCopyRight = styled.div``

const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>How to scale your node.js application to 100k users and beyond</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>	        
          <SiteNav />	          
        </div>
      </header>
        <main id="site-main" className="site-main" css={[SiteMain]}>
          <HeaderContainer>
            <Title>Want to scale your node.js application to 100k users and beyond ?</Title>
              <SubHeader>If you are in search on of an expert in node.js and javascript technologies with a proven track of producing top-quality applications, and AWS DevOps expertise, you’re in the right place.
            </SubHeader>
            <CallToAction> Get in touch to discuss your needs now! </CallToAction>
          </HeaderContainer>
          <div css={container}> 
            <PerksContainer>
              <Perk>
                <PerkTitle> Node.js Expert </PerkTitle>
                I only make top-quality code, you can see my guide of a <a> bulletproof node.js architecture.</a>
                In order to create a top quality application, I only use the best tech stack out there: node.js, MongoDB, and react.js.
                Also, I'm a certified AWS DevOps, I will take care of how your app is deployed to Amazon Web Services (AWS).
            </Perk>
              <Perk>
                <PerkTitle> AWS DevOps </PerkTitle>
                I only make top-quality code, you can see my guide of a <a> bulletproof node.js architecture.</a>
                In order to create a top quality application, I only use the best tech stack out there: node.js, MongoDB, and react.js.
                Also, I'm a certified AWS DevOps, I will take care of how your app is deployed to Amazon Web Services (AWS).
            </Perk>
            </PerksContainer>
            <PerksContainer>
              <Perk>
                <PerkTitle> Fullstack Developer </PerkTitle>
                I only make top-quality code, you can see my guide of a <a> bulletproof node.js architecture.</a>
                In order to create a top quality application, I only use the best tech stack out there: node.js, MongoDB, and react.js.
                Also, I'm a certified AWS DevOps, I will take care of how your app is deployed to Amazon Web Services (AWS).
            </Perk>
              <Perk>
                <PerkTitle> Top Code Quality </PerkTitle>
                I only make top-quality code, you can see my guide of a <a> bulletproof node.js architecture.</a>
                In order to create a top quality application, I only use the best tech stack out there: node.js, MongoDB, and react.js.
                Also, I'm a certified AWS DevOps, I will take care of how your app is deployed to Amazon Web Services (AWS).
            </Perk>
            </PerksContainer>
            <ShowcaseContainer>
              <ShowcaseItem><img src="https://user-images.githubusercontent.com/7070683/57968200-4780fb00-795f-11e9-886c-07bab1890087.jpg" /></ShowcaseItem>
              <ShowcaseItem><img src="https://user-images.githubusercontent.com/7070683/57968201-4780fb00-795f-11e9-9a94-26d1d7aa5d53.jpg" /></ShowcaseItem>
              <ShowcaseItem><img src="https://user-images.githubusercontent.com/7070683/57968202-48199180-795f-11e9-950b-5f9ac90301a1.jpg" /></ShowcaseItem>
            </ShowcaseContainer>
            <FooterContaienr>
              <FooterTitle> Ready to scale? </FooterTitle>
              <p> Contact me and get free quote </p>
              <CallToAction> Get in touch</CallToAction>
              <FooterCopyRight> © 2019 Santiago Quinteros </FooterCopyRight>
            </FooterContaienr>
          </div>
        </main>
    </Wrapper>
  </IndexLayout>
);

export default About;
