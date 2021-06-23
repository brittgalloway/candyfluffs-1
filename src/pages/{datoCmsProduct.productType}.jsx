import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import GridSquare from '../components/GridSquare';
import DropDown from '../components/DropDown';
import '../styles/global.css'; 

export default function Product({ data }) {

  let fandomList = []
  data.allDatoCmsProduct.edges.forEach(({node}) => {
    if (!fandomList.includes(node.fandoms.replace(/\s/g, ' ').toLowerCase())) {
      fandomList.push(node.fandoms.replace(/\s/g, ' ').toLowerCase())
    }
  })

	return(
    <Layout heading={`${data.allDatoCmsProduct.edges[0].node.productType}s`}>

      <div className="fandom-dropdown">
        <DropDown
          fandomList = {fandomList}
          productType = {data.allDatoCmsProduct.edges[0].node.productType.toLowerCase()}
        />
      </div>

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
        fandoms
        slug
        productType
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