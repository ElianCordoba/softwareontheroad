import * as React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../styles/colors';
import SubscribeForm from './SubscribeForm';
import SubscribeLogo from './SubscribeLogo';

interface SubscribeOverlayProps {
  open?: boolean;
}

const SubscribeOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 25, 40, 0.97);
  opacity: ${(props: SubscribeOverlayProps) => (props.open ? 1 : 0)};
  transition: opacity 200ms ease-in;
  pointer-events: ${(props: SubscribeOverlayProps) => (props.open ? 'auto' : 'none')};
  backdrop-filter: blur(3px);

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 500px;
  }

  .form-group {
    flex-grow: 1;
  }

  .subscribe-email {
    display: block;
    padding: 14px 20px;
    width: 100%;
    border: none;
    color: #000;
    ::placeholder {
      color: ${colors.midgrey};
    }
    font-size: 2rem;
    line-height: 1em;
    font-weight: normal;
    letter-spacing: 0.5px;
    user-select: text;
    border-radius: 5px;
    transition: border-color 0.15s linear;

    -webkit-appearance: none;
  }

  button {
    display: inline-block;
    margin: 0 0 0 0px;
    padding: 0 25px;
    height: 52px;
    outline: none;
    color: #fff;
    font-size: 1.7rem;
    line-height: 37px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.14);

    -webkit-font-smoothing: subpixel-antialiased;

    border-radius: 5px;
    margin: 10px 10px;
    opacity: 1;
    background: #f80;
  }
`;

const SubscribeOverlayClose = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  :before {
    content: '';
    position: absolute;
    top: 40px;
    right: 25px;
    display: block;
    width: 30px;
    height: 2px;
    background: #fff;
    opacity: 0.8;
    transform: rotate(45deg);
  }

  :after {
    content: '';
    position: absolute;
    top: 40px;
    right: 25px;
    display: block;
    width: 30px;
    height: 2px;
    background: #fff;
    opacity: 0.8;
    transform: rotate(-45deg);
  }

  :hover {
    cursor: pointer;
  }
`;

const SubscribeOverlayContent = styled.div`
  position: relative;
  z-index: 9999;
  margin: 0 0 5vw 0;
  padding: 4vw;
  color: #fff;
  text-align: center;
`;

const SubscribeOverlayTitle = styled.h1`
  display: inline-block;
  margin: 0 0 10px 0;
  font-size: 6rem;
  line-height: 1.15em;
`;

const SubscribeOverlayDescription = styled.p`
  margin: 0 auto 50px;
  max-width: 650px;
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.5em;
  font-weight: 200;
  opacity: 0.9;
`;

interface SubscribeState {
  isOpen: boolean;
}

class SubscribeModal extends React.Component<any, SubscribeState> {
  constructor(props: any) {
    super(props);
    this.state = { isOpen: false };
  }

  componentWillUnmount() {
    this.unsubscribeEsc();
  }

  escFunction = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  subscribeEsc() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  unsubscribeEsc() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  open = () => {
    this.setState({ isOpen: true });
    this.subscribeEsc();
  };

  close = () => {
    this.setState({ isOpen: false });
    this.unsubscribeEsc();
  };

  render() {
    return (
      <SubscribeOverlay open={this.state.isOpen}>
        <SubscribeOverlayClose onClick={this.close} />
        <SubscribeOverlayContent>
          <SubscribeLogo />
          <SubscribeOverlayTitle>Get The Latest Articles In Your Inbox.</SubscribeOverlayTitle>
          <SubscribeOverlayDescription>
            Join the other 2000+ savvy node.js developers who get article updates.
            You will receive only high-quality articles about Node.js, DevOps and Javascript front-end frameworks.
            Unsubscribe anytime.
          </SubscribeOverlayDescription>
          <SubscribeForm />
        </SubscribeOverlayContent>
      </SubscribeOverlay>
    );
  }
}

export default SubscribeModal;
