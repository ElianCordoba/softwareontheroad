import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import SubscribeForm from './SubscribeForm';


const SubscribeFormSection = styled.section`
  margin: 1.5em 0;
  padding: 6.5vw 7vw 7vw;
  border: ${lighten('0.02', colors.whitegrey)} 1px solid;
  text-align: center;
  background: ${props =>
    props.color === 'white' ? '#fff' : lighten('0.04', colors.whitegrey)
  };
  border-radius: 7px;

  p {
    margin-bottom: 1em;
    color: ${props =>
      props.color === 'white' ? colors.darkgrey : colors.midgrey
    };
    font-size: 2.2rem;
    line-height: 1.55em;
    letter-spacing: 0.2px;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 420px;
  }

  .form-group {
    flex-grow: 1;
  }
  @media (max-width: 650px) {
    p {
      font-size: 1.6rem;
    }
  }
`;

const SubscribeFormTitle = css`
  margin: 0 0 3px 0;
  padding: 0;
  color: ${colors.darkgrey};
  font-size: 3.5rem;
  line-height: 1;
  font-weight: 700;
  @media (max-width: 650px) {
    font-size: 2.4rem;
  }
`;

const Subscribe: React.FunctionComponent<{ color: string; }> = ({ color }) => {
  return (
    <SubscribeFormSection color={color}>
      <h3 css={SubscribeFormTitle}>Get notified when new content is out.</h3>
      <p> Only high-quality articles about AWS, DevOps, continuous integration, node.js, react, ionic and more...</p>
      <SubscribeForm color={color} />
    </SubscribeFormSection>
  );
};

export default Subscribe;
