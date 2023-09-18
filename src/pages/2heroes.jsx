import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import GridSquare from '../components/GridSquare';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledDiv = styled('div')`
  #title{
    font-size: 3rem;
    color: var(--highlight);
    text-align: center;
    padding: 2rem;
    @media(max-width: 830px) {
      position: absolute !important;
      height: 1px; width: 1px; 
      overflow: hidden;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
    }
  }
  .info {
    display: flex;
    @media(max-width: 830px) {
      flex-direction: column;
      align-items: center;
      margin:2rem;
    }
  }
  .links {
    margin-left: 4rem;
    @media(max-width: 830px) {
      margin:0rem;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }s
    li, p {
      font-size: 1.5rem;
    }
    a {
      text-decoration: none;
      color: var(--grey);
      &:hover, :focus {
        color: var(--highlight);
        text-decoration: underline;
      }
    }
 
  }

`

export default function Necahual({ data }) {
  return (
    <Layout heading = {'Necahual'}>
      <StyledDiv>
       
          <h2 id="title">NECAHUAL</h2>
          <div className='info'style={{justifyContent:'center',lineHeight:'3rem'}}>
            <StaticImage layout='constrained'  aspectRatio={1} style={{maxWidth:600}} src='../images/necahualImg.jpeg' alt='Necahual'/>
            <div className="links">
              <h3 style={{fontSize:'1.5rem'}}>Read it on <a style={{color: 'var(--highlight)'}} href="https://www.webtoons.com/en/challenge/necahual/list?title_no=216820">WEBTOONS</a>!</h3>
              <p style={{ color: 'var(--highlight)'}}>Support us on:</p>
              <ul>
                <li><a href="https://www.patreon.com/2heroes">Patreon</a></li>
                <li><a href="https://www.instagram.com/2.heroes/">Instagram</a></li>
                <li><a href="https://twitter.com/2Heroes1/">Twitter </a></li>
              </ul>
              <small>Patreon Members get 15% off the entire order. Check the Patreon for the discount code! </small>
            </div>
          </div>
      
        <h2 style={{  fontSize:' 3rem', color: 'var(--highlight)',textAlign: 'center',padding:'2rem'}}>MERCH</h2>
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
      </StyledDiv>
    </Layout>
  )
}

export const query = graphql`
  query NechaualQuery {
    allDatoCmsProduct(filter: {fandoms: {eq: "Necahual"}}) {
      edges {
        node {
          id
          title
          price
          slug
          image {
            fluid(maxWidth: 200) {
              src
            }
          }
        }
      }
    }
  }

`