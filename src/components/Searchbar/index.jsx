import React, {useState} from 'react';
import OptionsQuery from './searchQuery';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const StyledLabel = styled('label')`
  visibility: hidden;
  font-size:0;
  width:0;
  height:0;
`
const StyledButton = styled('button')`
  background: transparent;
  border: none;
  color: var(--form-gray);
  font-size: 1.15rem;
  padding-left: 10px;
  transition: transform .2s;
  cursor: pointer;
  &:hover, :focus {
    transform: scale(1.2);
    color: var(--highlight);
  }
  span{
    visibility: hidden;
    font-size:0;
    width:0;
    height:0;
  }
`
const StyledInput = styled('input')`
  display: inline-block;
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background: var(--form-gray);
`
const StyledDiv = styled('div')`
  width: 100%;
  display: flex;
  @media(max-width: 830px) {
    align-items: center;
  }
`

export default function Searchbar() {
  
  function handleSearch(event) {
    event.target.setAttribute('value', event.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);
  function submit() {
    let searchValue = document.querySelector('#searchBar').getAttribute('value');
    const searchResult = searchValue === null ? '' : searchValue.replace(/\s/g, '-').toLowerCase();
    if (searchValue !== null && searchValue !== '') {
      document.location=`/${searchResult}/`;
    } else {
      searchValue = document.querySelector('#searchBar').setAttribute('value', '');
    }
  };

  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
    if (isOpen === false) {
      document.querySelector('#searchBar').classList.remove('hide');
      document.querySelector('.snipcart-summary').classList.add('hide');
      document.querySelector('.snipcart-checkout').classList.add('hide');
      submit();
    } else {
      document.querySelector('#searchBar').classList.add('hide');
      document.querySelector('.snipcart-summary').classList.remove('hide');
      document.querySelector('.snipcart-checkout').classList.remove('hide');
      submit();
    }
  };
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      submit();
    }
  };
  function handleSelect(event) {
      submit();
  };

  return(
    <StyledDiv className='searchBar'>
      <StyledLabel htmlFor='searchBar'>Search show and manga titles</StyledLabel>
      <StyledInput  name='searchBar' className='hide' id='searchBar' onChange={handleSearch} onKeyUp={handleKeyPress} type='search' list='product-options' placeholder='Search titles...'/>
      <StyledButton title="Search Products" type="button" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} size="lg"/>
        <span>Search</span>
      </StyledButton>
      <datalist id='product-options' onKeyUp={handleKeyPress} onClick={handleSelect}>
          <OptionsQuery/> 
      </datalist>
    </StyledDiv>
  )
}
