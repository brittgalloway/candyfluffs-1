import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledDiv = styled('div')`

text-align: center;
-webkit-text-stroke-width: 0.5px;
-webkit-text-stroke-color: black;
  .brand{
    display: flex;
    flex-direction: column;
    color: var(--highlight);
    h1{
      font-size: 3em;
      padding: 0;
    }
    p{
      margin: .5rem 1.5rem;
      font-size: 1.5em;
      padding: 0;
      }
    }
    .social-links{
      width: 50%;
      font-size: 2em;
      margin:auto;
      padding: 5rem 1.5rem 1rem 1rem;
      display: flex;
      flex-direction: column;
      a{
        -webkit-text-stroke-width: 0.5px;
        -webkit-text-stroke-color: black;
        padding: 0.5em;
        color: var(--highlight);
        text-decoration: none;
        &:hover{
          color: var(--gray);
          transform: scale(1.1);
        }
      }
      
    }
  }
  @media(max-width: 830px) {
    margin: auto;
    
    .brand{
      p{
        margin: 0;
      }
    }
    .social-links{
      width:100%;
      font-size: 1.5em !important;
      padding: 6rem 0rem 1rem 0rem;
        a{
          padding: 0.5em 0;
        }
      }
  }
  @media(max-width: 450px) {
    .social-links{
      width:60% !important;
      font-size: 1.5em !important;
      padding: 4rem 0rem 1rem 0rem !important;
      }
  }
`

export default function Links() {
	return (
      <StyledDiv>
          <div className="brand">
            <h1>Candy Fluffs</h1>
            <p>Just a girl who likes to draw manga!</p>
          </div>
          <nav className="social-links">
            <Link to="/" aria-label="Offical Candy Fluffs Website">candyfluffs.com</Link>
            <a href="https://www.patreon.com/2heroes" aria-label="Patreon to support Necahual">Patreon</a>
            <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr">Tumblr</a>
            <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram">Instagram</a>
            <a href="https://x.com/candy_fluffs" aria-label="Candy Fluffs Twitter">Twitter</a> 
            <a href="https://bsky.app/profile/candyfluffs.bsky.social" aria-label="Candy Fluffs BlueSky">BlueSky</a> 
            <a href= "mailto:joy@candyfluffs.com" aria-label="Candy Fluffs Email">joy(at)candyfluffs.com</a>  
          </nav>
      </StyledDiv>
      
  
	)
}
