import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'gatsby';
import ContactForm from '../ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledDiv = styled('div')`
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
  }

`;
const StyledA = styled('a')`

  color: #5C5C5C;
  font-size: 1.5rem;
  text-decoration: none;
  &:hover, :focus{
    color: var(--highlight)
  }

`;
const StyledSocial = styled('div')`

  display: flex;
  justify-content: space-around;
  width: 100%;

`;
const StyledFooter = styled('footer')`

  line-height: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
const StyledUl = styled('ul')`
  display: flex;
  justify-content: center;
  list-style: none;
  padding-left: 0;

`;
const StyledLi = styled('li')`
  margin: 0 70px;
  a{
    color: #5C5C5C;
    font-size: 1.5rem;
    text-decoration: none;
    &:hover, :focus{
      color: var(--highlight)
    }
  }
`;

export default function Footer() {
  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  return(
    <StyledDiv>
      <StyledFooter>
        {(isMobile) ?
            <StyledSocial className="social-links">
              <StyledA href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr"><FontAwesomeIcon icon={faTumblr} size="lg"/></StyledA>
              <StyledA href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram"><FontAwesomeIcon icon={faInstagram} size="lg"/></StyledA>
              <StyledA href="http://twitter.com/candy_fluffs" aria-label="Candy Fluffs Twitter"><FontAwesomeIcon icon={faTwitter} size="lg"/></StyledA> 
            </StyledSocial>
          :
          <StyledUl>
            <StyledLi><Link to="/about">About</Link></StyledLi>
            <StyledLi><Link to="/contact">Contact</Link></StyledLi>
          </StyledUl>
        }
        <ContactForm/>
      </StyledFooter>
    </StyledDiv>
  )
}