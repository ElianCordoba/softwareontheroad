// tslint:disable:no-http-string
import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { SocialLink } from '../../styles/shared';
import config from '../../website-config';
import Twitter from '../icons/twitter';
import Facebook from '../icons/facebook';
import SubscribeModal from '../subscribe/SubscribeOverlay';

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
  }
  border-bottom: 1px solid;
  border-color: white;
`;

const SiteNavStyles = css`
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 60px;
  @media (min-width: 900px) {
    position: relative;
  }
  @media (max-width: 700px) {
    justify-content: center;
    ul li a {
      opacity: 1;
      font-size: 1.2em;
      font-weight: bold;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      text-shadow: rgba(0,0,0,.01) 0 0 1px;
    }
  }
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
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0;
  list-style: none;
  overflow: hidden;

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
    opacity: .8;
  }

  li a:hover {
    text-decoration: none;
    cursor: pointer;
    opacity: 1;
    background: white;
    color: black;
  }

  .hide-in-mobile {
    @media (max-width: 700px) {
      display: none;
    }
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
  a:hover {
    text-decoration: #0b0c0e;
    cursor: pointer;
    opacity: 1;
  }
`;

const SubscribeButton = styled.a`
  color: #fff;
  display: block;
  margin-right: 20px;
  padding: 10px 12px;
  color: #fff;
  text-transform: uppercase;
  opacity: .8;
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
                <Link to="/">Articles</Link>
              </li>
            }
            {
              !isHireMe && <li role="menuitem">
                <Link to="/about">Consulting service</Link>
              </li>
            }
            {
              !isHireMe && 
                <li> 
                  <SubscribeButton className={isHome ? '' : "hide-in-mobile"} onClick={this.openModal}>Newsletter</SubscribeButton>
                </li>
            }
            {
              config.books && <li role="menuitem">
                <Link to="/nodejs-books">Books</Link>
              </li>
            }
          </ul>
        </SiteNavLeft>
        <SiteNavRight>
          <SocialLinks>
            {config.twitter && (
              <a
                css={SocialLink}
                href={config.twitter}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span css={css`font-size: 14px; text-transform: uppercase; margin-right: 5px;`}> Twitter </span>
                <Twitter />
              </a>
            )}
            {config.facebook && (
              <a
                css={SocialLink}
                href={config.facebook}
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span css={css`font-size: 14px; text-transform: uppercase; margin-right: 5px;`}> Facebook </span>
                <Facebook />
              </a>
            )}
          </SocialLinks>
        </SiteNavRight>
      </nav>, <SubscribeModal key="subscribe-modal" ref={this.subscribe} />]
    );
  }
}

export default SiteNav;
