import React from "react"
import Layout from "../components/Layout"
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  h2{
    font-size: 3em;
    margin-bottom:0;
    margin-top: 3em;
    text-align: center;
    text-transform: uppercase;
    color: var(--gray);
  } 
  h1{
    font-size: 5em;
    text-transform: uppercase;
    color: var(--highlight);
    margin:0; 
  } 
  p{
    color:var(--highlight);
    font-size 2.5em;
    span{
      color: var(--gray);
    }
  }
  small{
    color: var(--gray);
    a{
      text-decoration: none;
      color: var(--highlight);
      &:hover{
        text-decoration: underline;
      }
    }
  }
  @media(max-width: 450px) {
    width:100%;
    h2{
      font-size: 2em;
    } 
    h1{
      font-size: 3em;
    } 
    p{
      font-size 1.5em;
      }
  }
`

export default function About() {
	return (
		<Layout heading = {"Success!"} >
      <StyledDiv>
        <div>
          <h2>You Have</h2>
          <h1>Subscribed!</h1>
        </div>
        <p>
        <span>(((o(</span> *<span>ﾟ▽ﾟ</span>*<span>)o)))</span>♡
        </p>
        <p>
        Stay tuned for more news!
        </p>
        <small>
          Continue <a href="/">Shopping</a>
        </small>
      </StyledDiv>
      
    </Layout>
	)
}
