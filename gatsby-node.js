const path = require('path');

exports.createPages = async function({actions, graphql}) {
  const {data} = await graphql(`
  query ProuctTypeFilter {
    allDatoCmsProduct {
      distinct(field: {fandoms: SELECT})
      nodes {
        id
        title
        price
        productType
        slug
        fandoms
        image {
          filename
          fluid(maxWidth: 200) {
            sizes
            src
          }
        }
      }
    }
  }      
  `)

  const productTypeObjects = {};

  // filter all products into product type
  data.allDatoCmsProduct.nodes.forEach( node => {
    if (productTypeObjects.hasOwnProperty(node.productType)) {
      productTypeObjects[node.productType].push(node)
    } else {

      productTypeObjects[node.productType] = []
      productTypeObjects[node.productType].push(node)
    }
  })

  // for each product type
  for (const productType in productTypeObjects) {
    const lowerProductType = productType.toLowerCase();
    
    // for each item in each product type
    actions.createPage({
      path: `/${lowerProductType}`,
      component: require.resolve(`./src/templates/productTypeFilter.jsx`),
      context: { pageContext: productTypeObjects[productType], productType: productType}
    })
  }
  
  const fandomList = data.allDatoCmsProduct.distinct;
 fandomList.map((fandom) =>{
   const lowerFandom = fandom === 'JoJo' ? 'jo-jo' : fandom.replace(/\s/g, '-').toLowerCase();
   actions.createPage({
     path: `/${lowerFandom}`,
     component: require.resolve(`./src/templates/productFandomFilter.jsx`),
     context: { pageContext: fandomList[fandom], fandoms: fandom}
   })
})
}
