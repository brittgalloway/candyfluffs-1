import React, { useState } from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import styled from 'styled-components';
import Img from 'gatsby-image';
import { text } from "@fortawesome/fontawesome-svg-core";

const StyledDiv = styled.section`

  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
  margin-top: 4rem;

  @media(max-width: 830px) {
    flex-direction: column;
    align-items: center;
  }

  
  .images-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    @media(max-width: 830px) {
      width: 100%;
    }
  }

  .img-array {
    display: flex;
    margin-top: 2rem;
    width: 550px;
    height: 190px;
    overflow-x: scroll;
    @media(max-width: 430px) {
      width: 300px;
    }

    .preview {
      margin: 1rem 1rem 1rem .1rem;
      width: 110px;
      height:110px;
      cursor: pointer;
    
      &:hover {
        outline: 1px solid var(--highlight);
      }
    }
  }
  .img-array::-webkit-scrollbar {
    width: 2px; 
  }
  
  .img-array::-webkit-scrollbar-track {
  background-color: var(--background);
  }
  
  .img-array::-webkit-scrollbar-thumb {
  background: var(--faded-highlight);
  border-radius: 25px;
  }

  .details {
    display: flex;
    flex-direction: column;
    width: 575px;
    margin-left: 40px;
    @media(max-width: 830px) {
      width: 90%;
      margin: 3rem;
    }
    .selected {
      /* visibility: visible; */
      display: inherit;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 3rem;
      color: var(--highlight);
      @media(max-width: 830px) {
        margin-top: 0.5rem;
        margin-bottom: 0;
        font-size: 1.5rem;
        font-weight:400;
        color: black;
      }
    }

    h3 {
      margin-top: 0.5rem;
      margin-bottom: 0;
    }

    p {
      font-size: 1.15rem;
      a{
        color: var(--highlight);
        text-decoration: none;
        &:hover{
          text-decoration: underline;
        }
      }
    }

    select {
      background-color: transparent;
      border: 2px solid var(--gray);
      width: 300px; 
      padding: 20px;
      margin: 2rem 0; 
      color: var(--gray);
      font-weight: 700;
      transition: font-weight .2s;
      &:hover{
        cursor:pointer;
        font-weight: 900;
      }
    }
    select > option {
      background-color: transparent;
    }
    ul{
      list-style: none;
    }
    li{
      padding: 1rem 0
    }
    button {
      /* visibility: collapse; */
      display: none;
      border: 3px solid var(--gray);
      width: fit-content;
      background: var(--background);
      padding: 20px 30px;
      font-weight: 700;
      margin-top: 2rem;
      color: var(--gray);
      transition: font-weight .2s, border .2s;
      &:hover {
        cursor: pointer;
        border: 3px solid var(--highlight);
        color: var(--highlight);
        font-weight: 900;
        padding: px 30px;
      }
    }
  }
`;

export default function Product({ data }) {
  const [displayImg, setDisplayImage] = useState(0);
  const [variant, setVariant] = useState("OG")

  let previewImgs
  
  if (data.datoCmsProduct.image[1]) {
    previewImgs = (
      <div className="img-array">
        {data.datoCmsProduct.image.map((img, idx) => {
          return (
            <div onClick={() => setDisplayImage(idx)} >
              <Img className="preview"  fluid={img.fluid} key={idx}/>
            </div>
          )     
        })}
      </div>
    )
  } else {
    previewImgs = false;
  }

  const selectVariant = (e) => {
    setVariant(e.target.value)
    
  }
 const text = () =>{
    console.log('Added!');
    item.classList.add('soldOut');
 }
	return(
    <Layout heading={`${data.datoCmsProduct.title}`}>
      <StyledDiv>
        <div className="images-section">
          <Img 
            style={{maxWidth:600, height: "auto"}}
            fluid={{...data.datoCmsProduct.image[displayImg].fluid, aspectRatio: 1}} />
          {previewImgs}
        </div>
        <div className="details">
          <h2>{data.datoCmsProduct.title}</h2>
          <h3>{variant === "OG" ? "" : data.datoCmsProduct.variation[variant].title}</h3>
          <p>${variant === "OG" ? data.datoCmsProduct.price : data.datoCmsProduct.variation[variant].price}</p>
          <div dangerouslySetInnerHTML={{__html: data.datoCmsProduct.descriptionNode.childMarkdownRemark.html}} />

          {data.datoCmsProduct.variation.length > 0 &&
            <select value={variant} onChange={selectVariant}>
              <option value={"OG"}>{data.datoCmsProduct.title}</option>
              {data.datoCmsProduct.variation.map((variant, idx)=>{
                return <option value={idx} key={idx}>{variant.title}</option>
              })}
            </select>
          }
          
          <button 
            className={variant==="OG" ? "snipcart-add-item selected":"snipcart-add-item"}
            aria-hidden={variant=="OG" ? "false":"true"}
            aria-label="Add to Cart"
            data-item-id={data.datoCmsProduct.id}
            data-item-price={data.datoCmsProduct.price}
            data-item-description={data.datoCmsProduct.descriptionNode.childMarkdownRemark.html}
            data-item-image={data.datoCmsProduct.image.url}
            data-item-name={data.datoCmsProduct.title}
            data-item-url={`/products/${data.datoCmsProduct.slug}`}
            data-item-categories={`${data.datoCmsProduct.productType } | ${data.datoCmsProduct.fandoms}`}
            onClick={text}
          >
            ADD TO CART
          </button>

          {/* if there is a variant, map and add a button to page for each */}
          {data.datoCmsProduct.variation.length > 0 &&
            data.datoCmsProduct.variation.map((vari, idx)=>{
              return <button 
                className={variant==idx ? "snipcart-add-item selected":"snipcart-add-item"}
                aria-hidden={variant==idx ? "false":"true"}
                aria-label="Add to Cart"
                data-item-id={vari.id}
                data-item-price={vari.price}
                data-item-description={data.datoCmsProduct.descriptionNode.childMarkdownRemark.html + " " + vari.title}
                data-item-image={data.datoCmsProduct.image.url}
                data-item-name={vari.title}
                data-item-url={`/products/${data.datoCmsProduct.slug}`}
                key={idx}
                onClick={text}
              >
                ADD TO CART
              </button>
            })
          }
          
        </div>
      </StyledDiv>
    </Layout>
  )
};

export const query = graphql`
  query ($slug: String!) {
    datoCmsProduct(slug: {eq: $slug}) {
      id
      title
      price
      slug
      productType
      fandoms
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid(maxWidth: 600) {
          src
          ...GatsbyDatoCmsFluid
        }
      }
      variation {
        id
        price
        weight
        title
        stock
        size
        originalId
      }
    }
  }
`;