import IndexLayout from '../layouts';
import styled from '@emotion/styled'
import SiteNav from '../components/header/SiteNav';
import ContactForm from '../components/ContactForm';
import { SiteHeader, outer, inner } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';

import elianAvatar from '../content/avatars/elian.jpg'
import matiasAvatar from '../content/avatars/matias.jpg'
import ferAvatar from '../content/avatars/fer.png'

const primaryColor = `#0a0b0c`;
const textColor = `#3B474D`;
const callToActionColor = `#009FFF`;

const container = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`

const TestimonialsList = styled.div`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  .testimonial-wrapper {
    margin-left: 1vw;
    margin-right: 1vw;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
    -moz-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
    box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.04);
    flex: 1 1 0;
  }
  .testimonial-container {
    display: flex;
    flex: 1 1 0;
    justify-content: space-between;
    flex-direction: column;
    align-content: flex-end;
  }
  .testimonial-card {
    position: relative;
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 30px;
    padding-bottom: 0px;
    min-height: 250px;
    z-index: -1;
    flex: 1 1 0;
  }
  .testimonial-person {
    background: ${primaryColor};
    color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 30px;
    padding-top: 50px;
    text-align: center;
    flex: 1 1 0;
  }
  img {
    max-width: 100px;
    max-height: 100px;
    margin-top: -16vh;
    border:solid white 4px;
    border-radius: 50%;
  }
  .testimonial-person-name {
    font-weight: bold;
    text-transform: uppercase;
  }
  .testimonial-person-position {
    color: rgba(255,255,255,0.9);
  }
  padding-bottom: 5vh;
  padding-top: 2vh;
  .quotes {
    line-height:1;
    padding-right: .5em;
    font-size: 2.5em;
    color: ${callToActionColor};
  }
  @media only screen and (max-width: 960px) {
    flex-direction: column;
    .testimonial-wrapper {
      margin: 2vh 2vw;
    }
    .testimonial-card {
      min-height: 250px;
      text-align: center;
    }
  }
  .testimonial-description {
    line-height: 1.5;
  }

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
  @media only screen and (max-width: 420px) {
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
  margin: 0vh 5vw 5vh;
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
  margin: 0vh 0vw 1vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  /* Desktop Styles */
  @media only screen and (min-width: 961px) {
    flex-direction: row;
  }
`

const GetInTouch = styled.span`
  text-decoration: underline;
  font-weight: bold;
  color: black;
  cursor: pointer;
`

const PerkDescription = styled.div`
  padding-bottom: 10px;
  font-size: 17px;
}
`

const Perk= styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  flex: 1;
  width: 100%;
  text-align: left;
  height: 22vh;
  padding: 0vh 2vw 0vh 0vw;
  margin: 0vw 2vw;
`
const PerkTitle = styled.h2`
  text-align: left;
  color: black;
  line-height: 1.5;
  letter-spacing: -1px;
  font-style: italic;
`

const ShowcaseContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  >div:nth-child(odd) {
    border-left-width: 6px;
    border-left-color: ${primaryColor};
    border-left-style: solid;
  }
  >div:nth-child(even) {
    border-right-width: 6px;
    border-right-color: ${primaryColor};
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
  line-height: 1.25;
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
    font-size: 2.25em;
  }
`

const ShowcaseItemTechnologies = styled.div`
  padding-top: 20px;
  text-align: right;
  font-weight: 600;
  font-style: italic;
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

const borderBottom = css`
  border-bottom: 2px solid #ddd;
`
const borderTop = css`
  border-top: 2px solid #ddd;
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
    <SectionWrapper css={borderBottom}>
      <Separator>
        <h2> Testimonials </h2>
        <PerkDescription>
          People who <b>trusted</b> in me.
        </PerkDescription>
      </Separator>
      <TestimonialsList>

        <div className="testimonial-wrapper">
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-description">
                <span className="quotes">&#8220;</span>
                After reviewing all our codebase, Santiago solved <b>68%</b> bug issues, and then help us with architectural decisions that got us<b> 3X </b>performance.
              </div>
            </div>
            <div className="testimonial-person">
              <img src={matiasAvatar} />
              <div className="testimonial-person-name"> Matias Heredia </div>
              <div className="testimonial-person-position"> CEO - HerediaEstudio.com.ar </div>
            </div>
          </div>
        </div>

        <div className="testimonial-wrapper">
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-description">
                <span className="quotes">&#8220;</span>
                Santiago is the best developer I've ever worked with, his <b>passion</b> for coding and getting things done it's unmatchable. A real catalyzer to any team.
              </div> 
            </div>
            <div className="testimonial-person">
              <img src={elianAvatar} />
              <div className="testimonial-person-name"> Elian Cordoba </div>
              <div className="testimonial-person-position"> CTO - PampaSoft </div>
            </div>
          </div>
        </div>

        <div className="testimonial-wrapper">
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-description">
                <span className="quotes">&#8220;</span>
                Santiago has really helped our business. I <b>STRONGLY</b> recommend him to <b>EVERYONE</b> interested in running a successful online business!.
              </div>
            </div>
            <div className="testimonial-person">
              <img css={css`background-color: #ccddcd;`} src={ferAvatar} />
              <div className="testimonial-person-name"> Fernando Guevara </div>
              <div className="testimonial-person-position"> Software Architect - Whyline Inc. </div>
            </div>
          </div>
        </div>

      </TestimonialsList>       
    </SectionWrapper>
    <SectionWrapper css={borderBottom}>
        <Separator> 
            <h2> Previous Works </h2> 
            <PerkDescription>
              <i> These projects have a place in my heart. ❤️ </i> 
            </PerkDescription>
            <div css={[BounceAnimation, ArrowIcon]}/>
        </Separator>
        <ShowcaseContainer css={[container]}>
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
    <SectionWrapper css={[container, { paddingBottom: '8vh' }]}>
      <Separator>
        <h2> Questions? </h2>
      </Separator>
      <PerksContainer>
        <Perk>
          <PerkTitle>How long would it take for you to take ownership?</PerkTitle>
          <PerkDescription>
            It really depends upon the codebase complexity, but I'll start analyzing <GetInTouch onClick={smothScroll('#contactme')} className="get-in-touch">it as soon as possible.</GetInTouch>
          </PerkDescription>
        </Perk>
        <Perk>
          <PerkTitle>Where are you? </PerkTitle>
          <PerkDescription>I'm based in Buenos Aires, Argentina the timezone is GMT+3.</PerkDescription>
        </Perk>
        </PerksContainer>
        <PerksContainer>
        <Perk>
          <PerkTitle>Do you have a Tax Identification Number to work in the U.S? </PerkTitle>
          <PerkDescription> 
            Yes, this is a registered company, Software On The Road LLC in the state of Wyoming, payments are via wire transfer to a U.S. bank or Paypal. 
            <GetInTouch onClick={smothScroll('#contactme')} className="get-in-touch">I have everything set up for your peace of mind</GetInTouch> :) 
          </PerkDescription>
        </Perk>
        <Perk>
          <PerkTitle>You didn't answer my question.</PerkTitle>
          <PerkDescription> 
            That’s not a question. :) If you still have questions after reading this page please <GetInTouch onClick={smothScroll('#contactme')} className="get-in-touch">get in touch</GetInTouch> and I will do my best to answer them.
          </PerkDescription>
        </Perk>
      </PerksContainer>
    </SectionWrapper>
    <SectionWrapper css={borderTop}>
      <Separator>
        <h2> Watch me code </h2>
        <PerkDescription> 
          I'm not the best youtuber but an <GetInTouch onClick={smothScroll('#contactme')} className="get-in-touch"> excelent coder.</GetInTouch>
        </PerkDescription>
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
