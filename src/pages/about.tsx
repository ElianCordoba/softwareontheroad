import IndexLayout from '../layouts';
import styled from '@emotion/styled'
import SiteNav from '../components/header/SiteNav';
import ContactForm from '../components/ContactForm';
import { SiteHeader, outer, inner } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';

const primaryColor = `#0a0b0c`;
const secondaryColor = `#8CAFCE`;
const ternaryColor = `#6A7987`;
const quaternaryColor = `#2F0019`;
const callToActionColor = `#009FFF`;

const container = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`

const SkewWrapper = styled.div`
  transform: skewY(-4deg);
  transform-origin: top left;
  background: ${primaryColor};
`

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-family: 'Arial';
  color: #fff;
  height: 100vh;
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
`;

const Title = styled.h1`
  margin: 5vh 0vh;
  font-size: 4.25rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const SubHeader = styled.p`
  text-align: center;
  font-size: 2.25rem;
  line-height: 1.5;
  strong {
    text-decoration: underline;
  }
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    margin: 0px 18vw 5vh 18vw;
  }
`

const noSkew = css`
  transform: skewY(4deg);
`

const CallToAction = styled.button`
  background: ${callToActionColor};
  padding: 16px 4.5rem;
  margin-bottom: 20px;
  border-radius: 3px;
  font-size: 22px;
  font-weight: 600;
  max-width: 100%;
  color: #fff;
  transition: transform .2s;
  transition-timing-function: ease-out;
  cursor: pointer;
  :hover {
    cursor: pointer;
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
  color: black;
`

const PerkCallToAction = styled.button`
  border-radius: 4px;
  height: 60px;
  font-size: 14px;
  color: #000;
  width: 100%;
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
  >div:nth-child(odd) {
    border-left-width: 6px;
    border-left-color: #000;
    border-left-style: solid;
  }
  >div:nth-child(even) {
    border-right-width: 6px;
    border-right-color: #000;
    border-right-style: solid;
  }
`

const ShowcaseItemText = styled.div`
  padding: 20px;
`

const ShowcaseItem = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  margin: 10px 15px 20px 0px;
  background: white;
  border-radius: 3px;
  -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
  -moz-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
  box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
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
  background: ${primaryColor};
  color: #fff;
`
const FooterTitle = styled.p`
  padding-top: 10px;
  font-size: 40px;
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
  font-size: 15px;
  h2 {
    color: #000;
    font-size: 2em;
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

const WatchMeCodeSection = styled.div``

const WatchMeCodeContainer = styled.div`
  text-align: center;
  min-height: 50vh;
  margin-bottom: 3vh;
  margin-top: 3vh;
`
const WatchMeCodeVideo = styled.iframe`
  width: 75vw;
  min-height: 60vh;
  allowfullscreen="allowfullscreen"
`

const SectionWrapper = styled.div`
  font-family: 'Arial';
  font-size: 16px;
  strong {
    text-decoration: underline;
  }
`

const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet
      script={[{
        type: 'text/javascript',
        innerHTML: `
        (function(h,o,t,j,a,r){
          h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
          h._hjSettings={hjid: 1356406,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `
      }]} 
    >
      <title>Node.js developer expert | Santiago Quinteros</title>
    </Helmet>
    <SkewWrapper>
      <HeaderContainer css={noSkew}>
        <div>
          <Title>Hiring a development agency is expensive, slow and sucks.</Title>
        </div>
        <div>
          <SubHeader>
            Get a real node.js expert instead, talk <strong>directly</strong> to him, get a <strong>high-quality</strong>, <strong>maintainable</strong> and <strong>scalable</strong> codebase, have totally and dedicated attention span with long term support.
          </SubHeader>
        </div>
        <div>
          <CallToAction onClick={smothScroll('#contactme')}> Get in touch ! </CallToAction>
        </div>
        <div>
          <i> Not convinced? Keep scrolling </i>
        </div>
      </HeaderContainer>
    </SkewWrapper>
    {/* <SectionWrapper>
      <Separator>
        <h2> Testimonials </h2>
      </Separator>
        <PerksContainer css={container}>
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
              <PerkCallToAction> Read more about node.js architecture </PerkCallToAction>
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
      </SectionWrapper> */}
      <SectionWrapper>
        <Separator> 
            <h2> Previous Works </h2> 
            <div css={[BounceAnimation, ArrowIcon]}/>
        </Separator>
        <ShowcaseContainer css={container}>
          <ShowcaseItem>
            <ShowcaseItemText>
              Whyline is an application to skip the line in banks, government places, doctors offices, and more.
              <br/>
              Worked 3 years at several roles, software architect, DevOps, and Full-Stack developer. Me and my team, design the microservice architecture that makes possible scaling to thousands of users.
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
            I develop the foundation architecture for this location-based application and offered my consulting services for 2 years.
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
    </SectionWrapper>
    <SectionWrapper>
      <Separator>
        <h2> Read my tutorials </h2>
        <div css={[BounceAnimation, ArrowIcon]} />
      </Separator>
      <PerksContainer css={container}>
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
            <PerkCallToAction> Read more about node.js architecture </PerkCallToAction>
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
    </SectionWrapper>
    <SectionWrapper>
      <Separator>
        <h2> Watch me code </h2>
        <div css={[BounceAnimation, ArrowIcon]} />
      </Separator>
      <div css={css`max-width: 460px`}> 
        <WatchMeCodeSection>
          <WatchMeCodeContainer>
            <WatchMeCodeVideo src="https://www.youtube.com/embed/EtNHXaI1R9I" />
          </WatchMeCodeContainer>
        </WatchMeCodeSection>
      </div>
      <FooterContaienr>
        <div css={{ padding: '80px 0px 0px 0px' }}>
          <FooterTitle id="contactme"> Ready to scale your system? </FooterTitle>
          <h3 css={{ padding: '0px 0px 20px 0px' }}> Contact me and <strong>get free quote! </strong> </h3>
        </div>
        <ContactForm />
        <FooterCopyRight> © {(new Date()).getFullYear()} Software on the road LLC </FooterCopyRight>
      </FooterContaienr>
    </SectionWrapper>
  </IndexLayout>
);

export default About;
