import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

export default function OptionsQuery() {
  return(
    <StaticQuery 
      query={graphql`
      query allFandoms {
        allDatoCmsProduct {
          distinct(field: {fandoms: SELECT})
        }
      }
      `}
      render={data => (
        data.allDatoCmsProduct.distinct.map((fandom) => (
          <option key={fandom} value={fandom}></option>
        ))
      )}
    />
  )
}
