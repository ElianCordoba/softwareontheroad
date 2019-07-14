import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const submit = css`
  background: #009FFF;
  padding: 16px 32px;
  margin: 20px 0 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 600;
  max-width: 100%;
  color: #fff;
  transition: transform .2s;
  transition-timing-function: ease-out;
  pointer-events: auto;

  :hover {
    transform: scale(1.10);
  }
  -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.1);
  -moz-box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.1);
  box-shadow: 0px 3px 3px 3px rgba(0,0,0, 0.1);
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
    :hover {
      cursor: text;
    }
    cursor: text;
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

export default class ContactForm extends React.Component {
  private ContactForm: any;
  constructor(props: Readonly<{}>) {
    super(props)
    this.ContactForm = React.createRef()
    this.state = {}
  }
  encode = (data: { [x: string]: string; }) => {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&")
  }
  handleChange = (e: { target: { name: any; value: any; }; }) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e: { preventDefault(): void; }) => {
    e.preventDefault()
    const form = this.ContactForm.current

    try {
      // tslint:disable-next-line:no-unused-expression
      window.ga && window.ga('send', {
        hitType: 'event',
        eventCategory: 'Contact',
        eventAction: 'submit',
        eventLabel: 'Hire services campaign'
      });
    } catch(e) {
      console.log('error tracking event')
      console.log(e);
    }


    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(response => {
        console.log("====================================")
        console.log(`${JSON.stringify(response, null, 2)}`)
        console.log("====================================")
        alert("Thanks for your message, we will speak soon :)")
        document.getElementById("contact-form").reset();
      })
      .catch(error => {
        console.log("====================================")
        console.log(`error in submiting the form data:${error}`)
        console.log("====================================")
      })
  }

  render() {
    return <ContactFormContainer css={{ 'marginBottom': '100px' }}>
      <form
        id="contact-form"
        name="contact"
        method="POST"
        action="sucess"
        data-netlify="true"
        netlify-honeypot="anti-bot-field"
        onSubmit={this.handleSubmit}
        ref={this.ContactForm}
      >
        <p hidden> 
          <label>
            Don’t fill this out
          <input name="anti-bot-field"  onChange={this.handleChange} />
          </label>
        </p>
        <div>
          <label htmlFor="name" css={{ display: 'block' }}>Your name<sup>*</sup></label>
          <input type="text" name="name" id="name" required  onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="email">Your email<sup>*</sup></label>
          <input type="text" name="email" id="email" required  onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="message">Project details<sup>*</sup></label>
          <textarea name="message" id="message" placeholder="" required onChange={this.handleChange}  />
        </div>
        <div data-netlify-recaptcha="true" />
        <button type="submit" css={submit}> Get in touch </button>
      </form>
    </ContactFormContainer>
  }
}