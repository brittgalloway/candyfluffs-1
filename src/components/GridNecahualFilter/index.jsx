import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import GridSquare from '../GridSquare';

export default function GridNecahualQuery() {
  return(
    <StaticQuery 
      query={graphql`
        query NecahualQuery {
          allDatoCmsProduct(filter: {fandoms: {eq: "Necahual"}}) {
            edges {
              node {
                id
                title
                price
                slug
                productType
                image {
                  fluid(maxWidth: 200) {
                    src
                  }
                }
              }
            }
          }
        }

      `}

      render={data => (
        data.allDatoCmsProduct.edges.map(({node}) => (
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