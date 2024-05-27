import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

const StyledDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
  margin: 0 auto; 
  margin: 0 auto; 
  .header{
    width: 99vw;
    border-bottom: 2px solid var(--faded-highlight);
    padding-bottom: 20px;
  }
  .container{
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  span{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin:0;
    .social-links{
      font-size: 4em;
      margin:0;
      padding:0;
      a{
        padding:1em;
        color: var(--highlight);
        &:hover, :focus{
          color: var(--gray);
        }
      }
    }
    button{
      margin-top: 4rem;
      background-color: transparent;
      border: 3px solid var(--gray);
      padding: 20px;
      
      &:hover, :focus{
        cursor:pointer;
        border: 3px solid var(--highlight);
        }
      a{
        padding:.5em;
        font-size: 1.5em;
        text-decoration:none;
        color: var(--gray);
        text-transform:uppercase;
        &:hover, :focus{
          text-decoration: underline;
          color: var(--highlight);
        }
      }
    }
  }
  @media(max-width: 850px) {
    width:450px;  
    .container{
      width: 90%;
      display: flex;
      flex-direction: column;

    }
    span button{
      margin-top: 0;
      margin-bottom:3em;
      a{
        padding:0em;
        font-size: 1.5em;
      }
    }
  }
  @media(max-width: 450px) {
    width:350px;  
    
      span .social-links{
        font-size: 2em;
        a{
          padding:1em;
        }
      }
    
      span button{
        margin-top: 0;
        margin-bottom:3em;
        a{
          padding:0em;
          font-size: .85em;
          font-weight:bold;
        }
      }
    }
`

export default function About() {
	return (
      <StyledDiv>
        <div className='header'>
        <div className='logo-area'>
          <div className="logo">
            <h1><StaticImage src='../components/Header/logo.jpg' alt='Candy Fluffs'style={{maxWidth: 300}}/></h1>
          </div>
          <div className="subheading">
            Under Construction! (ㆁᴗㆁ✿)
          </div>
        </div>

        </div>
        <div className="container">
              <StaticImage layout='fullWidth'  style={{maxWidth:752, margin: '4rem 0'}} src='../images/underConstruction.svg' alt='C Joy'/>

        <span>
          <div className="social-links">
            <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr"><FontAwesomeIcon icon={faTumblr} size="lg"/></a>
            <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram"><FontAwesomeIcon icon={faInstagram} size="lg"/></a>
            <a href="https://x.com/candy_fluffs" aria-label="Candy Fluffs Twitter"><FontAwesomeIcon icon={faTwitter} size="lg"/></a> 
          </div>
          <button type="button"><a href="http://eepurl.com/duTC3L">be the first to know when we’re live</a></button>
        </span>
        </div>
      </StyledDiv>
      
  
	)
}
