import React from 'react';
import {useMediaQuery} from 'react-responsive';
import { Link } from 'gatsby';
import ContactForm from '../ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-top: 10rem; 
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  border-top: 2px solid var(--faded-highlight);

  @media(max-width: 830px) {
    border-top: 1px solid var(--faded-highlight);
    width:100%;
    h2 {
      font-size: 1.25rem;
    }
  
  }

  a {
    color: #5C5C5C;
    font-size: 1.5rem;
    text-decoration: none;
    &:hover, :focus{
      color: var(--highlight)
    }
  }
  
  h2 {
    font-size: 2.25rem;
  }

  footer {
    line-height: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      padding-left: 0;

      li {
        margin: 0 70px;
      }
    } 
  }

  .social-links {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

export default function Footer() {
  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  return(
    <StyledDiv>
      <footer>
        {(isMobile) ?
          <>
            <div className="social-links">
              <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr"><FontAwesomeIcon icon={faTumblr} size="lg"/></a>
              <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram"><FontAwesomeIcon icon={faInstagram} size="lg"/></a>
              <a href="http://twitter.com/candy_fluffs" aria-label="Candy Fluffs Twitter"><FontAwesomeIcon icon={faTwitter} size="lg"/></a> 
            </div>
          </>
          :
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        }
        <ContactForm/>
      </footer>
    </StyledDiv>
  )
}