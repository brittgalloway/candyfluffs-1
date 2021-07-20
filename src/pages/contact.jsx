import React from "react"
import Layout from "../components/Layout"
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content:center;
  width: 80%;
  margin: 0 auto;
  h1{
    color: var(--highlight);
    size: 1.5rem;
    text-align:center;
    position: relative;
    top: 100px;
  }


  iframe{
    border:none;
    padding-top:0px;
  }
`;

export default function Contact() {
	return (
		<Layout heading = {"Feel free to contact me!"}>
      <StyledDiv>
        <div>

        <h1>I love to hear from people!</h1>
          <iframe
              title="Mailchimp Contact Form"
              width="800px"
              height="1100px"
              src="https://us16.list-manage.com/contact-form?u=f0ccd4aae40398b03156934fd&form_id=a52d1c81b8d8ff1a843eaa0798c8941e">
          </iframe>
                </div>
      </StyledDiv>
      
    </Layout>
	)
}
