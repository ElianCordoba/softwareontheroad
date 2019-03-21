import { darken, desaturate, mix } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import config from '../../website-config';


const SubscribeFormStyles = css`
  @media (max-width: 500px) {
    -ms-flex-direction: column;
    flex-direction: column;
  }
`;

const SubscribeEmail = styled.input`
  display: block;
  padding: 10px;
  width: 100%;
  border: ${props => props.color === 'white' ? '#000' : colors.midgrey};
  background-color: ${props => props.color === 'white' ? colors.whitegrey : '#fff'};
  color: ${props => props.color === 'white' ? '#000' : colors.midgrey};
  font-size: 1.8rem;
  line-height: 1em;
  font-weight: normal;
  user-select: text;
  transition: border-color 0.15s linear;

  -webkit-appearance: none;
  :focus {
    outline: 0;
    border-color: ${props => props.color === 'white' ? '#000' : colors.midgrey};
  }
`;

const SubscribeFormButton = styled.button`
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0 20px;
  height: 41px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 37px;
  font-weight: 400;
  text-align: center;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);

  background: linear-gradient(
    ${mix('0.1', '#fff', colors.darkgrey)},
    ${desaturate('0.1', darken('0.07', colors.darkgrey))} 60%,
    ${desaturate('0.1', darken('0.07', colors.darkgrey))} 90%,
    ${desaturate('0.1', darken('0.04', colors.darkgrey))}
  );
  box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.14);

  -webkit-font-smoothing: subpixel-antialiased;

  :active,
  :focus {
    background: ${desaturate('0.1', darken('0.09', colors.darkgrey))};
  }
  @media (max-width: 500px) {
    margin: 10px 0 0;
    width: 100%;
  }
`;

const FormGroup = styled.div`
  flex-grow: 1;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SubscribeForm: React.FunctionComponent<{color: string;}> = ({color}) => {
  return (
      <form
        css={SubscribeFormStyles}
        action={config.mailchimpAction}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        {/* This is required for the form to work correctly  */}
        <FormGroup className="form-group">
          <SubscribeEmail color={color} className="subscribe-email" type="email" name="EMAIL" placeholder="youremail@example.com" />
        </FormGroup>
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name={config.mailchimpName} tabIndex={-1} />
        </div>
        <SubscribeFormButton type="submit">
          <span>Subscribe</span>
        </SubscribeFormButton>
      </form>
  );
};

export default SubscribeForm;
