import React from 'react';
import Layout from '../components/Layout';
import GridSquare from '../components/GridSquare';

export default function productFandomFilter({pageContext}) {
  console.log("page", pageContext);

  return (
    <Layout heading = {'Just a girl who likes to draw manga'}>
      <div className='product-grid'>
      {pageContext.map(product => {
        return (
          <GridSquare 
            id={product.id}
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