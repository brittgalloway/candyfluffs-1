import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare({id, slug, image, title, price}) {
  const addLink = () =>{
      window.location.href =`../../products/${slug}`; 
  }
  return (
  <div className='product-item'>
    <div className='product-square'>
          <div id={`${id}`} className='hide'><p>Out of Stock</p></div>
          
          <Link to={`../../products/${slug}`} tabIndex='-1'>
          <Img
            objectFit='cover'
            fluid={image.fluid}
            alt={title}
            />
            <div className='overlay text' onKeyUp={addLink} tabIndex='0'>
              <h2>{title}</h2>    
              <h3>${price}</h3>
            </div>
        </Link>
      </div>
    </div>
  )
}