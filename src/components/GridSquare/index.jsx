import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare({id, slug, image, title, price, productType}) {
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  
  let url = null; 
  if (id.match(/DatoCmsProduct-188559869/)) {
    url = `https://app.snipcart.com/api/products/${id}`;
  } else  
  if (id.match(/^DatoCmsProduct-\d+$/)) {
    url = `https://app.snipcart.com/api/products/${id}-en`;
  } else  
  if ( id.match(/^DatoCmsName-[A-Za-z0-9]+$/)) {
    const idk = id.replace("DatoCmsProduct", "DatoCmsName")
    url = `https://app.snipcart.com/api/products/${idk}`;
  } else
  if ( productType.match(/print/)) {
    return null;
  } else {
    return null;
  }

  const reDirect = () => {
    window.location.href = `../../products/${slug}`;
  };
  if (url !== null) {
    const options = {
      method: 'GET',
      url: url,
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
  }
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