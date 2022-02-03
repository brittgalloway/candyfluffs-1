import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://app.snipcart.com/api/products',
  params: {limit: '200'},
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${process.env.API_AUTH}`,
    'content-type': 'application/json'
  }
};

axios.request(options).then(function (response) {
  const items = response.data.items
  // creates an array of items 
  Object.keys(items).map(key =>{
    const stock = items[key].stock
    if (stock === 0 ){
      console.log('Out of Stock: ', 'name: ', items[key].name, 'id: ', items[key].id)
      const itemId = items[key].id;
      // $('#outOfStock').addClass('soldOut');

    }
  });
 
  
}).catch(function (error) {
  console.error(error);
});

export default function GridSquare(props) {
  const addLink = () =>{
      window.location.href =`../../products/${props.slug}`; 
  }
  return (
  <div className="product-item">
    <div className="product-square">
          <div id={`${props.id}`} ><p>Out of Stock</p></div>
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