import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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


const ContactForm: React.FunctionComponent = () => (
<ContactFormContainer css={{ 'marginBottom': '100px' }}>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="anti-bot-field"
  >
    <p hidden> 
      <label>
        Don’t fill this out
      <input name="anti-bot-field" />
      </label>
    </p>
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
    <div data-netlify-recaptcha="true" />
    <button type="submit" css={submit}> Get in touch </button>
  </form>
</ContactFormContainer>
)

export default ContactForm;