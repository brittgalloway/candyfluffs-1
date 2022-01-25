import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare(props) {
  return (
  <div className="product-item">
    <div className="product-square">
      <Link to={`../../products/${props.slug}`}>
          <Img
            objectFit="cover"
            fluid={props.image.fluid}
            alt={props.title}
            />
            <div className="overlay text">
              <h2>{props.title}</h2>
              <h3>${props.price}</h3>
            </div>
        </Link>
      </div>
    </div>
  )
}