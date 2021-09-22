import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare(props) {
  const addLink = () =>{
      window.location.href =`../../products/${props.slug}`; 
  }
  return (
  <div className="product-item">
    <div className="product-square">
          {/* <div className="soldOut"><p>Out of Stock</p></div> */}
          <Link to={`../../products/${props.slug}`} tabIndex="-1">
          <Img
            objectFit="cover"
            fluid={props.image.fluid}
            alt={props.title}
            />
            <div className="overlay text" onKeyPress={addLink} tabIndex="0">
              <h2>{props.title}</h2>    
              <h3>${props.price}</h3>
            </div>
        </Link>
      </div>
    </div>
  )
}