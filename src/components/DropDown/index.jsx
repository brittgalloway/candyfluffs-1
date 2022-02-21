import React, {useState} from 'react';
import { Link } from 'gatsby';
import {handleOnClick} from '../NavMenu'
import styled from 'styled-components';

const DropDownContainer = styled("div")`
  width: 300px;
  margin: 0 auto;
  position: absolute;
  z-index: 2; 
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  color: #000;
  background: var(--background);
  text-align: center; 
  cursor: pointer;
`;

const DropDownListContainer = styled("nav")``;

const DropDownList = styled("ul")`
  padding: 3.5rem;
  margin: 0;
  text-align:center;
  background: var(--background);
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  border: 2px solid var(--highlight);
  border-radius: 10px;


  a {
    color: #000;
    text-decoration: none; 
  }

  a:hover, a:focus {
    color: var(--highlight);
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

export default function DropDown(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onClick = value => () => {
    setSelectedOption(value);
    setIsOpen(false);

  };

  const slugify = str => {
    return str.replace(/\s/g, '-').toLowerCase()
  }

  return(
    <DropDownContainer>
      <DropDownHeader tabIndex='0' onClick={toggling} onKeyPress={toggling}>
        {selectedOption || "Fandoms ▾ " } 
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer aria-label='Fandom Filter' >
          <DropDownList aria-expanded={isOpen}>
            {props.fandomList.map((option, idx) => (
              <ListItem onClick={onClick(option)} key={idx}>
                <Link onClick={handleOnClick} to={`/${props.productType.toLowerCase()}/${slugify(option)}`}>{option}</Link>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  )
}