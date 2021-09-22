import React from 'react';
import { graphql, StaticQuery } from "gatsby";
import GridSquare from '../GridSquare';

export default function Grid() {
// const secret = 'MzFmNzVkYTktNWQzYy00MmQzLWE3MDctY2Q2OWIzOTJkMGIzNjM3NDMxNDcyNjQ0Nzc3NDEw';

// const request = await fetch('https://app.snipcart.com/api/products', {
//     headers: {
//         'Authorization': `Basic ${btoa(secret)}`,
//         'Accept': 'application/json'
//     }
// })
// // make new prop in GRidSquare, map?? fore

// const result = await request.json()
// console.log("products", result);

  return(
    <StaticQuery 
      query={graphql`
        query AllProductsGridQuery {
          allDatoCmsProduct {
            edges {
              node {
                id
                title
                price
                slug
                image {
                  fluid(maxWidth: 400) {
                    src
                    ...GatsbyDatoCmsFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        data.allDatoCmsProduct.edges.map(({node}) => (
          //some how pass prop
          <GridSquare 
            title={node.title} 
            price={node.price}
            image={node.image[0]}
            slug={node.slug}
            key={node.id} 
          />
        ))
      )}
    />
  )
}