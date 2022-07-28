import React from 'react';
import { graphql, StaticQuery } from "gatsby";
import GridSquare from '../GridSquare';

export default function Grid() {
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
            id={node.id} 
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