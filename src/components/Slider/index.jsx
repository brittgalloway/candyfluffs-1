import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import styled from 'styled-components';


const StyledDiv = styled.div`
  .alice-carousel__wrapper{
    width: 90%;
    margin: 0 auto;
  }
  margin: 0 auto;
  .alice-carousel__dots-item.__active{
  background-color: var(--highlight);
  }
  .alice-carousel__dots-item{
    width: 20px;
    height: 20px;
    background-color: var(--faded-highlight);
    &:hover, :focus{
      background-color: var(--highlight);
    }
  }
  @media (max-width: 830px){
    .alice-carousel__wrapper{
      width: 100%;
      margin: 0;
    }
    .alice-carousel__dots-item{
      width: 10px;
      height: 10px;
    }
  }
  @media (max-width: 450px){
    .alice-carousel__wrapper{
      width: 100%;
      margin: 0;
    }
    .alice-carousel__dots-item{
      width: 0px;
      height: 0px;
    }
  }

`;

export default function Slider(props) {
  
  return(
    <StaticQuery
      query={graphql`
        query Banner {
          allDatoCmsBanner {
            nodes {
              banner {
                title
                notes
                fluid {
                  src
                }
              }
            }
          }
        }
      `}
      render={data => (
        <StyledDiv className="slider">
            <AliceCarousel
              autoPlay autoPlayInterval="3000"
              disableButtonsControls
              infinite
              items={data.allDatoCmsBanner.nodes.map((node, idx) => {
                return (
                  <a href={node.banner[0].notes}>
                    <img src={node.banner[0].fluid.src} alt={node.banner[0].title} className="sliderimg" key={idx}/>
                  </a>
                )
              })}
            />
        </StyledDiv>
      )}
    />
  )
}