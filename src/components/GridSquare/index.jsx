import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare({id, slug, image, title, price}) {
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const reDirect = () =>{
      window.location.href =`../../products/${slug}`; 
  }
  const options = {
    method: 'GET',
    url: `https://app.snipcart.com/api/products/${id}-en`,
    params: {limit: '1'},
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.GATSBY_API_AUTH}`,
      'content-type': 'application/json'
    }
  };
  axios.request(options).then(function (response) {
    const items = response.data;
    const stock = items.stock;
    
    if (stock === 0){
      setIsOutOfStock(true);
    } else {
      setIsOutOfStock(false);
    }

  }).catch(function (error) {
    console.error(error);
  });
  return (
  <div className='product-item'>
    <div className='product-square'>
          {isOutOfStock && (<div className='soldOut' id={`${id}`}><p>Out of Stock</p></div>)}
          <Link to={`../../products/${slug}`} tabIndex='-1'>
          <Img
            objectFit='cover'
            fluid={image.fluid}
            alt={title}
            />
            <div className='overlay text' onKeyUp={reDirect} tabIndex='0'>
              <h2>{title}</h2>    
              <h3>${price}</h3>
            </div>
        </Link>
      </div>
    </div>
  )
}