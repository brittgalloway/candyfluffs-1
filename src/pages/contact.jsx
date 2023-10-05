import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  display: flex;
  justify-content:center;
  width: 100%;
  margin: 0 auto;
  h1{
    color: var(--highlight);
    font-size: 2rem;
    text-align:center;
    position: relative;
    top: 100px;
    @media (max-width: 760px) {
      top: 50px;
      font-size: 1.5rem
    }
  }


  iframe{
    border:none;
    padding-top:0px;
    width: 800px;
    height: 1100px;
    @media (max-width: 760px) {
      width: 400px;
      height: 900px;
    }
  }

`;

export default function Contact() {
	return (
		<Layout title = {'Contact Me'} heading = {'Feel free to contact me!'}>
      <StyledDiv>
        <div>

        <h1>I love to hear from people!</h1>
          <iframe
              title="Mailchimp Contact Form"
              src="https://us16.list-manage.com/contact-form?u=f0ccd4aae40398b03156934fd&form_id=a52d1c81b8d8ff1a843eaa0798c8941e">
          </iframe>
                </div>
      </StyledDiv>
      
    </Layout>
	)
}
