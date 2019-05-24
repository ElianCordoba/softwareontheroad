// tslint:disable:no-http-string
import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { SocialLink } from '../../styles/shared';
import config from '../../website-config';
import Twitter from '../icons/twitter';
import SubscribeModal from '../subscribe/SubscribeOverlay';
import Github from '../icons/github';

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
    top: -70px;
  }
`;

const SiteNavStyles = css`
  position: relative;
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 40px;
  font-size: 1.25rem;
`;

const SiteNavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding-bottom: 80px;
  letter-spacing: 0.5px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 4vw;
  }
`;

const NavStyles = css`
  display: flex;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin-right: 20px;
    font-size: 14px;
    padding: 10px 12px;
    color: #fff;
    opacity: 1;
    transition: transform .2s;
    transition-timing-function: ease-out;
  }

  li a:hover {
    text-decoration: none;
    transform: scale(1.10);
    font-weight: bold;
  }
`;

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
  transition: transform .2s;
  transition-timing-function: ease-out;
  a:hover {
    transform: scale(1.10);
    font-weight: bold;
  }
`;

const SubscribeButton = styled.a`
  color: #fff;
  display: block;
  margin-right: 20px;
  font-size: 14px;
  padding: 10px 12px;
  color: #fff;
  text-transform: uppercase;
  transition: transform .2s;
  transition-timing-function: ease-out;
  :hover {
    text-decoration: none;
    cursor: pointer;
    transform: scale(1.10);
    font-weight: bold;
  }
`;

interface SiteNavProps {
  isHome?: boolean;
  isHireMe?: boolean;
}

interface SiteNaveState {
  isOpen: boolean;
}

class SiteNav extends React.Component<SiteNavProps, SiteNaveState> {
  subscribe = React.createRef<SubscribeModal>();

  constructor(props: SiteNavProps) {
    super(props);
    this.state = { isOpen: false };
  }
  openModal = () => {
    if (this.subscribe.current) {
      this.subscribe.current.open();
    }
  };

  render() {
    const { isHome = false, isHireMe = false } = this.props;
    const hireMeCss = isHireMe ? {
      'borderBottom': '#bbb solid 1px',
    } : {}
    return (
      [<nav key="site-nav" css={[isHome && HomeNavRaise, SiteNavStyles, hireMeCss]}>
        <SiteNavLeft>
          <ul css={NavStyles} role="menu">
            {
              !isHome && <li role="menuitem">
                <Link to="/">Home</Link>
              </li>
            }
            {
              !isHireMe && <li role="menuitem">
                <Link to="/about">Hire my services</Link>
              </li>
            }
            {
              !isHireMe && <SubscribeButton onClick={this.openModal}>Subscribe</SubscribeButton>
            }
          </ul>
        </SiteNavLeft>
        <SiteNavRight>
          <SocialLinks>
            <span css={css`font-size: 14px; text-transform: uppercase;`}> Follow me </span>
            {config.twitter && (
              <a
                css={SocialLink}
                href={config.twitter}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
            )}
            {config.github && (
              <a
                css={SocialLink}
                href={config.github}
                title="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </a>
            )}
          </SocialLinks>
        </SiteNavRight>
      </nav> , <SubscribeModal key="subscribe-modal" ref={this.subscribe} />]
    );
  }
}

export default SiteNav;
