import React from "react"
import Layout from "../components/Layout"
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content:center;
  width: 80%;
  margin: 0 auto;

  @media(max-width: 1100px) {
    width: 90%;
  }

  @media(max-width: 830px) {
    width: 95%;
    margin-bottom: 80px;
  }
  section{
    margin-top: 4rem;
  }


  form {
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around; 
    flex-wrap: wrap;
    margin: 2rem;

    @media(max-width: 830px) {
      width: 20rem;
     
    }
  }

  .nameDiv {
    display: flex;
    justify-content: space-around;
    width: 100%;
    input[type=text]:first-of-type {
      margin-right: 20px;
    }
    @media(max-width: 600px) {
      flex-direction: column;
      input[type=text]:first-of-type {
        margin-right: 0;
      }
    }
  }

  input[type=text] {
    margin-top: 20px;
    padding: 12px 20px;
    font-family: 'Lato', sans-serif;
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--form-gray);
    color: #000;
    border: 0px;
    @media(max-width: 680px) {
      width: 100%;
    }
  }

  input[type=text]:focus {
   border: 3px solid #555;
  }

  textarea {
    margin-top: 20px;
    padding: 20px 20px;
    background-color: var(--form-gray);
    border: none;
    width: 100%;
    font-family: 'Lato', sans-serif;
  }
  
  .submitButton {
    margin-top: 4rem;
    background-color: transparent;
    border: 3px solid #5C5C5C;
    color: #5C5C5C;
    width: 200px;
    padding: 20px;
 
    &:hover{
      cursor:pointer;
      }
    @media(max-width: 680px) {
      width: 100%;
    }
  }

  p{
    text-align: center; 
  }

  label {
    color: #000;
    padding-right: 10px;
    display: none;
    visibility: hidden; 
  }
`;

export default function Contact() {
	return (
		<Layout heading = {"Feel free to contact me!"}>
      <StyledDiv>
        <section>
          
          <p>I love to hear from people!</p>
          <form action="/success" method="post" netlify-honeypot="bot-field" data-netlify="true" name="message" >
            <div className="nameDiv">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" placeholder="First Name"/>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name"/>
            </div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email"/>
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" placeholder="Subject"/>
            <label htmlFor="message">Message</label>
            <textarea name="message" cols="30" rows="10" placeholder="Message"></textarea>
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <input className="submitButton" type="submit" value="SUBMIT"/>
          </form>
          
          </section>
      </StyledDiv>
      
    </Layout>
	)
}
