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
`

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  background: #0a0b0c;
  font-family: Lato, sans-serif;
  color: #fff;
  height: 600px;
  /* Mobile Styles */
  @media only screen and (max-width: 400px) {
    padding: 10px;
  }

  /* Tablet Styles */
  @media only screen and (min-width: 401px) and (max-width: 960px) {
    padding: 10px
  }

  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    padding: 10px 76px 20px 76px;
  }
  transform: skewY(-4deg);
  transform-origin: top left;
`;

const Title = styled.h1`
  /* Mobile Styles */
  @media only screen and (max-width: 400px) {
    font-size: 40px;  
  }

  /* Tablet Styles */
  @media only screen and (min-width: 401px) and (max-width: 960px) {
    font-size: 40px;
  }

  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    font-size: 48px;
  }
  font-weight: 900;
  margin-bottom: 71px;
`;

const SubHeader = styled.p`
  text-align: center;
  font-size: 24px;
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    margin: -36px 141px 44px 141px;
  }
`

const noSkew = css`
  transform: skewY(4deg);
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
  transition: transform .2s;
  transition-timing-function: ease-out;
  :hover {
    transform: scale(1.10);
  }
`

const PerksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: flex-start;
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    flex-direction: row;
  }
`

const PerkDescription = styled.div`
  padding-bottom: 10px;
  height: 100px;
`

const Perk= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  width: 100%;
  text-align: left;
  height: 300px;
  padding: 20px;
  padding-top: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 3px;
  border-left-style: solid;
  border-left-color: black;
  border-left-width: 6px;
  -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
  -moz-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
  box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);

  transition: transform .2s;
  transition-timing-function: ease-out;
  :hover {
    transform: translate(3px);
  }


`
const PerkTitle = styled.h2`
  text-align: center;
`

const PerkCallToAction = styled.button`
  border-radius: 4px;
  height: 60px;
  font-size: 14px;
  color: #000;
  max-width: 100%;
  border-style: solid;
  border-color: black;
  border-width: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  background: #fff;
  :hover {
    color: #fff;
    background: #000;
  }

`

const ShowcaseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

const ShowcaseItemText = styled.div`
  padding: 20px;
`

const ShowcaseItem = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin: 10px 15px 20px 0px;
`

const ShowcaseImageItem = styled.div`
  border-radius: 5px;
  max-height: 50px;
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    max-height: 250px;
  }
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

const ContactFormContainer = styled.div``

const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>How to scale your node.js application to 100k users and beyond</title>
    </Helmet>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>	        
          <SiteNav isHireMe={true} />	          
        </div>
      </header>
      <HeaderContainer>
        <div css={noSkew}> 
        <Title>Want to scale your node.js application to 100k users and beyond ?</Title>
        <div>
          <SubHeader>If you are in search on of an expert in node.js and javascript technologies with a proven track of producing top-quality applications, and AWS DevOps expertise, you’re in the right place.</SubHeader>
        </div>
        <CallToAction> Get in touch to discuss your needs now! </CallToAction>
        </div>
      </HeaderContainer>
          <div css={container}> 
            <PerksContainer>
              <Perk>
                <PerkTitle>AWS DevOps </PerkTitle>
                <PerkDescription>I will deploy your node.js proyect to the AWS Cloud using the best practices and services avaiable.</PerkDescription>
                <a href="/tags/aws/" rel="nofollow noreferrer"> 
                  <PerkCallToAction> See my tutorials about DevOps </PerkCallToAction>
                </a>
              </Perk>
              <Perk>
                <PerkTitle> Node.js expert </PerkTitle>
                <PerkDescription> More than 5 years of experience in high scale proyects. I'm an expert in node.js and javascript technologies. </PerkDescription>
                <a href="/ideal-nodejs-project-structure/" rel="nofollow noreferrer"> 
                  <PerkCallToAction> Read my masterpiece of node.js architecture </PerkCallToAction>
                </a>
              </Perk>
              <Perk>
                <PerkTitle>Full-Stack developer </PerkTitle>
                <PerkDescription>I have been using several front-end technologies such as React.js, React Native, Angular and Ionic for years. </PerkDescription>
                <a href="/react-hooks/" rel="nofollow noreferrer"> 
                  <PerkCallToAction> Deepdive into my guide on React Hooks </PerkCallToAction>
                </a> 
              </Perk>
            </PerksContainer>
            <Separator> 
                <div> Previous Works </div> 
                <div> ↓ </div>
            </Separator>
            <ShowcaseContainer>
              <ShowcaseItem>
                <ShowcaseItemText>
                  Standups.io an application for communicating with your coworkers.
                  As a Full Stack developer I helped standups.io with the mobile app implementation in React Native, developing mirror features in the web application with React, and mostly the main backend engineer, working with node.js and AWS services.
                </ShowcaseItemText>
                <ShowcaseImageItem>
                  <a href="https://whyline.com" rel="nofollow noreferrer"> 
                    <img src="https://user-images.githubusercontent.com/7070683/57968201-4780fb00-795f-11e9-9a94-26d1d7aa5d53.jpg" />
                  </a>
                </ShowcaseImageItem>
              </ShowcaseItem>
              <ShowcaseItem>
                <ShowcaseItemText>
                  Standups.io an application for communicating with your coworkers.
                  As a Full Stack developer I helped standups.io with the mobile app implementation in React Native, developing mirror features in the web application with React, and mostly the main backend engineer, working with node.js and AWS services.
                  </ShowcaseItemText>
                <ShowcaseImageItem> 
                  <a href="https://drinkko.com" rel="nofollow noreferrer"> 
                    <img src="https://user-images.githubusercontent.com/7070683/57968202-48199180-795f-11e9-950b-5f9ac90301a1.jpg" />
                  </a>
                </ShowcaseImageItem> 
              </ShowcaseItem>
              <ShowcaseItem>
                <ShowcaseItemText> 
                  Standups.io an application for communicating with your coworkers. 
                  As a Full Stack developer I helped standups.io with the mobile app implementation in React Native, developing mirror features in the web application with React, and mostly the main backend engineer, working with node.js and AWS services.
                </ShowcaseItemText>
                <ShowcaseImageItem> 
                  <a href="https://standups.io" rel="nofollow noreferrer">
                    <img src="https://user-images.githubusercontent.com/7070683/57968200-4780fb00-795f-11e9-886c-07bab1890087.jpg" />
                  </a>
                </ShowcaseImageItem> 
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
      <ContactFormContainer>
        <form 
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          data-netlify-honeypot="anti-spam-bot-field"
          action="#">
          <input type="hidden" name="anti-spam-bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <div className="field half first">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" />
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" className="special" />
            </li>
            <li>
              <input type="reset" value="Clear" />
            </li>
          </ul>
        </form>
      </ContactFormContainer>
  </IndexLayout>
);

export default About;
