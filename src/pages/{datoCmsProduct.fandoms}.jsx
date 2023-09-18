import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import GridSquare from '../components/GridSquare';
import '../styles/global.css'; 

export default function Product({ data }) {

	return(
    <Layout heading={`${data.allDatoCmsProduct.edges[0].node.fandoms}`}>
      <div className="product-grid">
        {data.allDatoCmsProduct.edges.map(({node}) => (
          <GridSquare 
            id={node.id} 
            title={node.title} 
            price={node.price}
            image={node.image[0]}
            slug={node.slug}
            key={node.id} 
          />
        ))}  
      </div>
    </Layout>
  )
};

export const query = graphql`
  query AllProductTypes($fandoms:String!) {
  allDatoCmsProduct(filter: {fandoms: {eq: $fandoms}}) {
    edges {
      node {
        id
        title
        price
        fandoms
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
`;