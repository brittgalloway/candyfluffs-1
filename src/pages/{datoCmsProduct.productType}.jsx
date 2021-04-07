import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import styled from 'styled-components';
import GridSquare from '../components/GridSquare';
// import Img from 'gatsby-image';
import '../styles/global.css'; 

// const StyledDiv = styled.div`
//   .details {
//     display:flex;
//     flex-direction:row;
//     flex-wrap: nowrap;
//   }
// `;

export default function Product({ data }) {
	return(
    // don't forget to dynamically set product type 
    <Layout heading={"Sort by product type"}>
      <div className="product-grid">
        {data.allDatoCmsProduct.edges.map(({node}) => (
          <GridSquare 
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
  query AllProductTypes($productType:String!) {
  allDatoCmsProduct(filter: {productType: {eq: $productType}}) {
    edges {
      node {
        id
        title
        price
        slug
        image {
          fluid(maxWidth: 200) {
            src
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
}
`;