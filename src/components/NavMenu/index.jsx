import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'gatsby';
import styled from 'styled-components';
import hamburgerIcon from './hamburger.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../Searchbar';

const Nav = styled('nav')`
  border-top:2px solid var(--faded-highlight);
  border-bottom:1px solid var(--faded-highlight);

  ul.mobile { 
    flex-direction: column;
    align-items: center;
  }
  
  li {
    padding: .5rem; 
   
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    line-height: 1.8rem; 
    color: var(--gray);
  }

  a:hover, a:focus {
    color: var(--highlight);
    cursor: pointer; 
  }

  .mobile-menu {
    display: flex;
    justify-content: space-between;
  }

  @media(max-width: 830px) {
    width: 100%;
    bottom: 0; 
    position: fixed;
    background: var(--background);
    z-index: 2; 
  }

  button.snipcart-checkout{
    font-size: 1.2em;
    margin: 0 0.4em 0.4em 0;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--form-gray);
    transition: transform .2s;

    .snipcart-total-items{
      color: var(--form-gray);
      font-size: 1rem;
      font-weight: bold;
      position: relative;
      top: 10px;
      right: 13px;
      z-index: 1;   
      border: 1px solid var(--faded-highlight);
      border-radius: 50%; 
      background-color: white;
      padding: 1px 6px;
    }
    &:hover, :focus {
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
`;

const Hamburger = styled('button')`
  display: none;
  cursor: pointer;
  @media(max-width: 830px) {
    display: inline;
    border: none;
    padding: 16px;
    background: none;
    text-align: center; 
  }
`;

const NavList = styled('ul')`
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding: 0;
  padding-left: 1em;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
  background: var(--background);
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;

  &:first-child {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  a {
    color: #000;
    text-decoration: none; 
  }

`;

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});

  const toggling = () => setIsOpen(!isOpen);

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

  return(
    <Nav aria-label='Main'>
      {(isOpen || !isMobile) && (
        <NavList className={isMobile && 'mobile'}>
          <li>
            <Link to='/book'>Books</Link>
          </li>
          <li>
            <Link to='/print'>Prints</Link>
          </li>
          <li>
            <Link to='/scroll'>Scrolls</Link>
          </li>
          <li>
            <Link to='/charm'>Charms</Link>
          </li>
          <li>
            <Link to='/button'>Buttons</Link>
          </li>
          <li>
            <Link to='/sticker'>Stickers</Link>
          </li>
          <li>
            <Link to='/2heroes'>Necahual</Link>
          </li>
          {isMobile && 
            <>
              <li>
                <Link to='/about'>About Me</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Me</Link>
              </li>
              <li>
                <Link to='/events'>Conventions/Expos</Link>
              </li> 
              <li className='snipcart-summary'>
                <a href='#' className='snipcart-user-email snipcart-user-profile'>
                    Account
                </a>
              </li>
            </>
          }
        </NavList>
      )}
      <div className='mobile-menu'>
        <Hamburger type="button" title="" onClick={toggling}><img src={hamburgerIcon} alt="hamburger menu"/></Hamburger>
        {isMobile &&
          <>
          <Searchbar/>
           <button title="See your cart" type="button" aria-label="Go to cart" className="snipcart-checkout">
            <div className="snipcart-summary">  
              <span className="snipcart-total-items">{cartCount}</span>
            </div>
            <FontAwesomeIcon icon={faShoppingBag} size='lg'/>
          </button>
         </>
        }
      </div>
    </Nav>
  )
}