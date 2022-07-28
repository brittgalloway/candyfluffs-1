import React from "react"
import Layout from "../components/Layout"
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto; 
  margin: 0 auto; 
  h1{
    font-size:8em;
    color: var(--gray);
    margin-top:1em;
    margin-bottom:0;
  }
  p{
    font-size: 2.5em;
    color: var(--gray);
    a{
     
      text-decoration: none;
      color: var(--highlight);
      &:hover, :focus{
        text-decoration: underline;
      }
    }
  }

  @media(max-width: 850px) {
    width:750px;  
  }
  @media(max-width: 450px) {
    width:350px;  
    p{
      font-size: 1.5em;
      color: var(--gray);
    }
  }
`

export default function About() {
	return (
		<Layout heading = {"NOT FOUND?!?"} >
      <StyledDiv>
        <h1>404</h1>

        <p>NOT FOUND?!? Σ(‘◉⌓◉’)</p>

        <p><a href="/"> Let’s go back home</a></p>

      </StyledDiv>
      
    </Layout>
	)
}
