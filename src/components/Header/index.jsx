import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import { faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const StyledDiv = styled.header`

  .subheading {
    color: var(--dark-highlight);
  }

  .social-links {
    a {
      color: var(--form-gray);
      margin-right: 20px;
      font-size: 1.15rem;
      &:hover {color: var(--highlight);}
    }
  }
  
  @media(max-width: 830px) {
    .hidden {
      display: none;
    }
  }

  button.snipcart-checkout, button.snipcart-user-email {
    font-size: 1.15rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--form-gray);
    transition: transform .2s;
    .snipcart-total-items{
      color: var(--form-gray);
      font-weight: bold;
      position: relative;
      top: 10px;
      left: 15px;
      z-index: 1;   
      border: 1px solid var(--faded-highlight);
      border-radius: 50%; 
      background-color: white;
      padding: 1px 6px;
    }
    &:hover {
      transform: scale(1.2);
      color: var(--highlight);
      .snipcart-total-items{
        color: var(--highlight);
      }
    }
  }



  .snipcart-summary {
    color: var(--gray);
  }

  margin-bottom: 1rem;
`;

export default function Header(props) {

  const [cartCount, setCartCount] = useState('');
  const [cartTotal, setCartTotal] = useState('');
  
  useEffect(()=> {
    if (window.Snipcart) {
      //this allows it to work when switching pages
      var count = window.Snipcart.api.items.count();
      var cart = window.Snipcart.api.cart.get();

      setCartCount(count)
      setCartTotal(cart);

      //this allows it to work when you add or change items
      window.Snipcart.subscribe('cart.closed', () => {
          var count = window.Snipcart.api.items.count();
          var cart = window.Snipcart.api.cart.get();
          setCartCount(count)
          setCartTotal(cart)
      });

      //this allows it to work on refreshing the page
      window.Snipcart.subscribe('cart.ready', (data) => {
          var count = window.Snipcart.api.items.count();
          var cart = window.Snipcart.api.cart.get();
          setCartCount(count)
          setCartTotal(cart)
      })
    }
  }, [])
  return (
    <StyledDiv className="header">
        <div className="social-links hidden">
          <a href="https://candy-fluffs.tumblr.com/" aria-label="Candy Fluffs Tumblr"><FontAwesomeIcon icon={faTumblr} size="lg"/></a>
          <a href="http://instagram.com/candy_fluffs" aria-label="Candy Fluffs Instagram"><FontAwesomeIcon icon={faInstagram} size="lg"/></a>
          <a href="http://twitter.com/candy_fluffs" aria-label="Candy Fluffs Twitter"><FontAwesomeIcon icon={faTwitter} size="lg"/></a> 
        </div>
        <div className="logo-area">
          <div className="logo">
            <h1><Link to='/'><StaticImage src='./logo.jpg' alt='Candy Fluffs'style={{maxWidth: 300}}/></Link></h1>
          </div>
          <div className="subheading">
            {props.heading} (ㆁᴗㆁ✿)
          </div>
        </div>
        <div className="contact-links hidden">
          <div className="snipcart-summary">
              <button aria-label="User Profile" className="snipcart-user-email snipcart-user-profile">
              <FontAwesomeIcon icon={faUser} size="lg"/>
              </button >
          </div>
          <button aria-label="Go to cart" className="snipcart-checkout">
            <div className="snipcart-summary">  
              <span className="snipcart-total-items">{cartCount}</span>
            </div>
            <FontAwesomeIcon icon={faShoppingBag} size="lg"/>
          </button>
        </div>
    </StyledDiv>
  )
}