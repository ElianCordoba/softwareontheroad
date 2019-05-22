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
  margin-top: 20px;
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
    width: 70%;
    max-height: 250px;
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

const submit = css`
  background: #f80;
  padding: 16px 32px;
  margin: 20px 0 5px;
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

const ContactFormContainer = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  color: black;
  padding: 40px 40px 50px;
  border-radius: 5px;
  input, label {
    display: block
  }
  label {
    text-align: left;
    padding: 5px;
    font-size: 14px
  }
  input {
    padding: 0px 15px;
    background: #f3f3f3;
    width: 100%;
    height: 30px;
    border-radius: 2px;
    border-width: 0.95px;
    margin-bottom: 10px;
    ::placeholder {
      font-size: 14px;
    }
  }
  textarea {
    padding: 13px 15px;
    background: #f3f3f3;
    width: 100%;
    height: 226px;
    border-radius: 2px;
    resize: none;
    border-width: 0.95px;
  }
  sup {
    color: red;
  }

  div {
    width: 70vw;    
  }
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    div {
      width: 40vw;    
    }
  }
`
const ShowcaseItemTechnologies = styled.div`
  padding-top: 20px;
  text-align: right;
  font-weight: bold;
`

const BounceAnimation = css`
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }
  animation: bounce 2s infinite;
`
const ArrowIcon = css`
  width: 20px;
  height: 20px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MTIiIGlkPSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzIGlkPSJkZWZzNCIvPjxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTU0MC4zNjIyKSI+PHBhdGggZD0ibSAxMjcuNDA2MjUsNjU3Ljc4MTI1IGMgLTQuOTg1MywwLjA3ODQgLTkuOTEwNzcsMi4xNjMwOCAtMTMuNDM3NSw1LjY4NzUgbCAtNTUsNTUgYyAtMy42MDA1NjUsMy41OTkyNyAtNS42OTY4ODMsOC42NTg5NSAtNS42OTY4ODMsMTMuNzUgMCw1LjA5MTA1IDIuMDk2MzE4LDEwLjE1MDczIDUuNjk2ODgzLDEzLjc1IEwgMjQyLjI1LDkyOS4yNSBjIDMuNTk5MjcsMy42MDA1NiA4LjY1ODk1LDUuNjk2ODggMTMuNzUsNS42OTY4OCA1LjA5MTA1LDAgMTAuMTUwNzMsLTIuMDk2MzIgMTMuNzUsLTUuNjk2ODggTCA0NTMuMDMxMjUsNzQ1Ljk2ODc1IGMgMy42MDA1NiwtMy41OTkyNyA1LjY5Njg4LC04LjY1ODk1IDUuNjk2ODgsLTEzLjc1IDAsLTUuMDkxMDUgLTIuMDk2MzIsLTEwLjE1MDczIC01LjY5Njg4LC0xMy43NSBsIC01NSwtNTUgYyAtMy41OTgxNSwtMy41OTEyNyAtOC42NTA2OCwtNS42ODEyNyAtMTMuNzM0MzgsLTUuNjgxMjcgLTUuMDgzNjksMCAtMTAuMTM2MjIsMi4wOSAtMTMuNzM0MzcsNS42ODEyNyBMIDI1Niw3NzguMDMxMjUgMTQxLjQzNzUsNjYzLjQ2ODc1IGMgLTMuNjY2NzgsLTMuNjY0MjMgLTguODQ4MDEsLTUuNzY0NDIgLTE0LjAzMTI1LC01LjY4NzUgeiIgaWQ9InBhdGgzNzY2LTEiIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZmlsbDojMjIyMjIyO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDozOC44ODAwMDEwNzttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OlNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpTYW5zIi8+PC9nPjwvc3ZnPg==);
  background-size: contain;
`

const smothScroll = (elementId: string) => () => {
  document.querySelector(elementId).scrollIntoView({
    behavior: 'smooth'
  }); 
}

const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>22
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
          <CallToAction onClick={smothScroll('#contactme')}> Get in touch to discuss your needs now! </CallToAction>
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
                <h3> Previous Works </h3> 
                <div css={[BounceAnimation, ArrowIcon]}/>
            </Separator>
            <ShowcaseContainer>
              <ShowcaseItem>
                <ShowcaseItemText>
                  Whyline is an application to skip the line in banks, goverment places, doctors offices, and more.
                  <br/>
                  Worked 3 years at several roles, software architect, DevOps, and Full-Stack developer.
                  Me and my team, design the microservice architecture that make possible the scalation to thousands of users.
                  <ShowcaseItemTechnologies>Stack: Node.js | AWS | MongoDB | Angular | Ionic </ShowcaseItemTechnologies>
                </ShowcaseItemText>
                <ShowcaseImageItem>
                  <a href="https://whyline.com" rel="nofollow noreferrer"> 
                    <img src="https://user-images.githubusercontent.com/7070683/57968201-4780fb00-795f-11e9-9a94-26d1d7aa5d53.jpg" />
                  </a>
                
                </ShowcaseImageItem>
              </ShowcaseItem>
              <ShowcaseItem>
                <ShowcaseImageItem>
                  <a href="https://drinkko.com" rel="nofollow noreferrer">
                    <img src="https://user-images.githubusercontent.com/7070683/57968202-48199180-795f-11e9-950b-5f9ac90301a1.jpg" />
                  </a>
                </ShowcaseImageItem> 
                <ShowcaseItemText>
                Drinkko an app to find the cheapest beer pint near you.
                <br />
                I setup the base architecture for this location based application, and offering my consulting services for almost 2 years.
                <ShowcaseItemTechnologies>Stack: Node.js | AWS | MongoDB | Angular | Ionic</ShowcaseItemTechnologies>
                </ShowcaseItemText>
              </ShowcaseItem>
              <ShowcaseItem>
                <ShowcaseItemText> 
                  Standups.io is an application for communicating with your coworkers. 
                  <br />
                  As a Full Stack developer I helped standups.io with the mobile app implementation in React Native, developing mirror features in the web application with React, and mostly the main backend engineer, working with node.js and AWS services.
                <ShowcaseItemTechnologies>Stack: Node.js | AWS | MongoDB | React | React native </ShowcaseItemTechnologies>
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
      <div css={{ padding: '80px 0px 0px 0px'  }}>
        <FooterTitle id="contactme"> Ready to scale your system? </FooterTitle>
        <p css={{ padding: '0px 0px 20px 0px' }}> Contact me and get free quote today! </p>
        <p css={{ fontSize: '16px' }}> Send me an email to <a href="mailto:santiago@softwareontheroad.com"> santiago@softwareontheroad.com</a> or fill the form below</p>
      </div>
      <ContactFormContainer css={{ 'marginBottom': '100px' }}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          data-netlify-honeypot="anti-spam-bot-field"
          >
          <input type="hidden" name="anti-spam-bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label htmlFor="name" css={{ display: 'block' }}>Your name<sup>*</sup></label>
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label htmlFor="email">Your email<sup>*</sup></label>
            <input type="text" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="website" >Your website</label>
            <input type="text" placeholder="https://" name="website" id="website" />
          </div>
          <div>
            <label htmlFor="message">Project details<sup>*</sup></label>
            <textarea name="message" id="message" placeholder="" required />
          </div>
          <div data-netlify-recaptcha="true"/>
          <button type="submit" css={submit}> Get in touch </button>
        </form>
      </ContactFormContainer>
      <FooterCopyRight> © {(new Date()).getFullYear()} Santiago Quinteros | <a href="/privacy">Privacy policy</a> </FooterCopyRight>
    </FooterContaienr>
  </IndexLayout>
);

export default About;
