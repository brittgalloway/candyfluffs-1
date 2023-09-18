import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'gatsby';

const StyledDiv = styled('div')`
  width: 55rem;
  margin: 6rem auto;

  .card{
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 5px 5px 25px 5px #bae6db;
  }
  .brand{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--highlight);

    p{
      margin: .5rem 1.5rem 0 0;
      font-size: 1.5em;
      padding: 0;
    }
  }
    .social-links{
      width: 50%;
      font-size: 2em;
      margin:0;
      padding: 6rem 1.5rem 1rem 1rem;
      flex-direction: column;
      align-items: flex-start;
      a{
        padding: 0.5em;
        color: var(--highlight);
        text-decoration: none;
        &:hover{
          color: var(--gray);
        }
      }
     
    }
  }
  @media(max-width: 850px) {
    width:450px;  
    flex-direction: column; 
    margin: auto;
    .card{
      padding-top: 5rem;
      width: 90%; 
      display: flex;
      flex-direction: column;
      border-radius: none;
      box-shadow: none;
    }
    .brand{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--highlight);
      p{
        margin: 0;
      }
    }
    .social-links{
        align-items: center;
        width:100%;
        font-size: 1.5em;
        a{
          padding: 0.5em;
        }
      }
  }
  @media(max-width: 450px) {
    flex-direction: column; 
    margin: auto;
    .card{
      padding-top: 5rem;
      width: 90%; 
      display: flex;
      flex-direction: column;
      border-radius: none;
      box-shadow: none;
    }
    .brand{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--highlight);
      p{
        margin: 0;
      }
    }
    .social-links{
        align-items: center;
        width:100%;
        font-size: 1.5em;
        a{
          padding: 0.5em;
        }
      }
    }
`

export default function Card() {
	return (
      <StyledDiv>
        <div className="card">
          <div className="brand">
            <StaticImage src='../components/Header/logo.jpg' alt='Candy Fluffs' style={{borderRadius:10}}/>
            <p>Just a girl who likes to draw manga!</p>
            <p>This is my shop of fandoms~</p>
          </div>
          <menu className="social-links">
            <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr"><FontAwesomeIcon icon={faTumblr} size="lg"/> Candy-fluffs</a>
            <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram"><FontAwesomeIcon icon={faInstagram} size="lg"/> Candy_fluffs</a>
            <a href="http://twitter.com/candy_fluffs" aria-label="Candy Fluffs Twitter"><FontAwesomeIcon icon={faTwitter} size="lg"/> Candy_fluffs</a> 
            <Link to="/">candyfluffs.com</Link>
            <a href= "mailto:joy@candyfluffs.com" > joy@candyfluffs.com </a>  
          </menu>
        </div>
      </StyledDiv>
      
  
	)
}
