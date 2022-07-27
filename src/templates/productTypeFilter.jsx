import React from 'react'
import Layout from '../components/Layout'
import DropDown from '../components/DropDown';
import GridSquare from '../components/GridSquare';

export default function productTypeFilter({pageContext}) {

  let fandomList = pageContext.fandomList.map(fandom => {
    // Below line will make fandom a slug
    // return fandom.replace(/\s/g, '-').toLowerCase();
    return fandom;
  })
  // console.log(fandomList);
  return (
    <Layout heading = {"Just a girl who likes to draw manga"}>

      <div className="fandom-dropdown">
        <DropDown
          fandomList = {fandomList}
          productType = {pageContext.productType}
        />
      </div>

      <div className='product-grid'>
      {pageContext.pageContext.map(product => {
        return (
          <GridSquare 
            title={product.title} 
            price={product.price}
            image={product.image[0]}
            slug={product.slug}
            key={product.id} 
          /> 
        )
      })}
      </div>     
    </Layout>
  )
}