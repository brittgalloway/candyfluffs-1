const path = require('path');
const { keyframes } = require('styled-components');
const { isArray } = require('util');

exports.createPages = async function({actions, graphql}) {
  const {data} = await graphql(`
    query ProuctTypeFilter {
      allDatoCmsProduct {
        nodes {
          id
          title
          price
          productType
          slug
          image {
            filename
            fluid(maxWidth: 200) {
              sizes
              src
            }
          }
          fandoms
        }
      }
    }      
  `)

  let filteredObjects = {};

  // filter all products into product type
  data.allDatoCmsProduct.nodes.forEach( node => {
    if (filteredObjects.hasOwnProperty(node.productType)) {
      filteredObjects[node.productType].push(node)
    } else {

      filteredObjects[node.productType] = []
      filteredObjects[node.productType].push(node)
    }
  })
  
  let organizedObjects = {}

  // organize all products and product types by sub fandoms
  for (const productType in filteredObjects) {
    organizedObjects[productType] = {}
    // for each product within each product type
    filteredObjects[productType].forEach( product => {
      // if productType contains product.fandom property, push it to that fandom array
      if (organizedObjects[productType].hasOwnProperty(product.fandoms)) {
        organizedObjects[productType][product.fandoms].push(product)
      } else {
        organizedObjects[productType][product.fandoms] = []
        organizedObjects[productType][product.fandoms].push(product)
      }
    })
  }

  // for each product type
  for (const productType in organizedObjects) {
    let lowerProductType = productType.toLowerCase();
    let fandomList = Object.keys(organizedObjects[productType]);
    
    // for each item in each product type
    for (const fandom in organizedObjects[productType]) {
      let lowerFandom = fandom.replace(/\s/g, '-').toLowerCase()
      actions.createPage({
        path: `/${lowerProductType}/${lowerFandom}`,
        component: require.resolve(`./src/templates/productTypeFilter.jsx`),
        context: { pageContext: organizedObjects[productType][fandom], productType: productType, fandomList: fandomList }
      })
    }
  }
}