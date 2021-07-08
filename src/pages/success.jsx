import React from "react"
import Layout from "../components/Layout"
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto; 
`

export default function About() {
	return (
		<Layout heading = {"Success!"} >
      <StyledDiv>
        <span>

        <h2>Message</h2>
        <h1>Sent!</h1>
        </span>
        <p id="icon">
        (((o(*ﾟ▽ﾟ*)o)))♡
        </p>
        <p>
        I’ll get back to you soon
        </p>
      </StyledDiv>
      
    </Layout>
	)
}
