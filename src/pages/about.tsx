import IndexLayout from '../layouts';
import styled from '@emotion/styled'
import SiteNav from '../components/header/SiteNav';	
import { SiteHeader, outer, inner } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';

const container = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
  background: #fff;
`

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
  padding: 10px 76px 20px 76px;
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
  color: #fff;
`

const PerksContainer = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: flex-start;
`
const Perk= styled.div`
  width: 500px;
  height: 180px;
  text-align: left;
`
const PerkTitle = styled.h2`
  text-align: left;
`

const ShowcaseContainer = styled.div`
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ShowcaseItem = styled.div`
 max-height: 500px;
 overflow: hidden;
 margin-right: 15px;
 border-radius: 5px;
 transition: transform .5s;
 transition-timing-function: ease-out;
 :hover {
  transform: scale(1.05);
 }
`

const FooterContaienr = styled.div`
  padding-top: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #0a0b0c;
  color: #fff;
`
const FooterTitle = styled.p`
  padding-top: 10px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
`
const FooterCopyRight = styled.div`
  padding: 30px 0px 50px 0px;
  font-size: 12px;
`

const Separator = styled.div`
  padding-top: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 15px
`

const About: React.FunctionComponent = () => (
  <IndexLayout css={{ background: 'white' }}>
    <Helmet>
      <title>How to scale your node.js application to 100k users and beyond</title>
    </Helmet>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>	        
          <SiteNav isHireMe={true} />	          
        </div>
      </header>
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
                 I'm a node.js expert with more than 4 years of experience working in large scale projects. 
                 I contribute to serveral open source projects and write about best practices scaling node.js applications
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
                You can look at my github profile and see my activity, this 'hire-me' page itself is open source, and you can see the making process here 
            </Perk>
            </PerksContainer>
            <Separator> 
                <div> Previous Works </div> 
                <div> ↓ </div>
            </Separator>
            <ShowcaseContainer>
              <ShowcaseItem>
                <a href="https://whyline.com" rel="nofollow noreferrer"> 
                  <img src="https://user-images.githubusercontent.com/7070683/57968201-4780fb00-795f-11e9-9a94-26d1d7aa5d53.jpg" />
                </a>
              </ShowcaseItem>
              <ShowcaseItem>
                <a href="https://drinkko.com" rel="nofollow noreferrer"> 
                  <img src="https://user-images.githubusercontent.com/7070683/57968202-48199180-795f-11e9-950b-5f9ac90301a1.jpg" />
                </a>
              </ShowcaseItem>
              <ShowcaseItem>
                <a href="https://standups.io" rel="nofollow noreferrer"> 
                  <img src="https://user-images.githubusercontent.com/7070683/57968200-4780fb00-795f-11e9-886c-07bab1890087.jpg" />
                </a>
              </ShowcaseItem>
            </ShowcaseContainer>
          </div>
      <FooterContaienr>
        <div css={{ padding: '80px 0 100px 0px' }}>
          <FooterTitle> Ready to scale your system? </FooterTitle>
          <p css={{ padding: '0px 0px 20px 0px' }}> Contact me and get free quote today! </p>
        <CallToAction> <span css={{ padding: '0px 30px 0px 30px'  }}> Get in touch </span></CallToAction>
        </div>
        <FooterCopyRight> © 2019 Santiago Quinteros | <a href="/privacy">Privacy policy</a> </FooterCopyRight>
      </FooterContaienr>
  </IndexLayout>
);

export default About;
