import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

<<<<<<< HEAD
// const StyledDiv = styled.div`
//   .gatsby-image-wrapper {
//     width: 100%;
//   }
//   position: relative;
//   /* height: auto; */
//   border: 2px solid  #f58f89;
//   box-sizing: border-box;
//   border-radius: 2px;
//   .overlay {
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 100%;
//     width: 100%;
//     opacity: 0;
//     transition: 0.5s ease;
//     background-color:  #f58f89;
//   }
//   &:hover .overlay {
//     opacity: 0.75;
//   }
//   .text {
//     color: purple;
//     font-size: 1.5em;
//     position: absolute;
//     text-align: center;
//   }
// `;
=======
const StyledDiv = styled.div`
  .gatsby-image-wrapper {
    width: 100%;
  }
  position: relative;
  /* height: auto; */


  width: 80px;


  border: 2px solid  #f58f89;
  box-sizing: border-box;
  border-radius: 2px;
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color:  #f58f89;
  }
  &:hover .overlay {
    opacity: 0.75;
  }
  .text {
    color: purple;
    font-size: 1.5em;
    position: absolute;
    text-align: center;
  }
`;
>>>>>>> doug

export default function GridSquare(props) {
  return(
    <Link to={`../../products/${props.slug}`}>
      {/* <StyledDiv> */}
          <img fluid={props.image.fluid} />
          <div className="overlay text">
            <h2>{props.title}</h2>
            <h3>${props.price}</h3>
          </div>
      {/* </StyledDiv> */}
    </ Link>
  )
}