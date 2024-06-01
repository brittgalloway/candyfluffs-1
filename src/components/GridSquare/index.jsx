import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';

export default function GridSquare({ id, slug, image, title, price }) {
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const reDirect = useCallback(() => {
    navigate(`../../products/${slug}`);
  }, [slug]);

  useEffect(() => {
    const fetchStockStatus = async () => {
      const options = {
        method: 'GET',
        url: `https://app.snipcart.com/api/products/${id}-en`,
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${process.env.GATSBY_API_AUTH}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.request(options);
        const items = response.data;
        const stock = items.stock;

        setIsOutOfStock(stock === 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockStatus();
  }, [id]);

  return (
    <div className='product-item'>
      <div className='product-square'>
        {isOutOfStock && (
          <div className='soldOut' id={`${id}`}>
            <p>Out of Stock</p>
          </div>
        )}
        <Link to={`../../products/${slug}`} tabIndex='-1'>
          <Img objectFit='cover' fluid={image.fluid} alt={title} />
          <div className='overlay text' onKeyUp={reDirect} tabIndex='0'>
            <h2>{title}</h2>
            <h3>${price}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
