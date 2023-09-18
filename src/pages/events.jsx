import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from 'styled-components';
import moment from 'moment';

const StyledDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: content-fit;
  margin-top: 2rem;
  @media(max-width: 850px) {
     
    margin:2rem;
  }

`
export default function Events({data}) {
  return (
    <Layout heading = {'Catch me outside! '}>
      <StyledDiv>
        {data.allDatoCmsLiveEvent.nodes.map(liveEvent => {
         const startDate=moment(liveEvent.startDate).format( 'dddd, MMMM Do YYYY, h:mm a');
         const endDate=moment(liveEvent.endDate).format( 'dddd, MMMM Do YYYY, h:mm a');
     
          return (
            <article  className="event">
              <h3 style={{color:'var(--highlight)'}}>{liveEvent.eventName}</h3>
              <time style={{fontWeight:'bold'}}>{startDate} - {endDate} </time>
              <address style={{fontStyle:'normal'}}>{liveEvent.address}</address>
              <p>
                Get tickets here: <a style={{color:'var(--highlight)', textDecoration: 'none', fontWeight:'bold'}}href={liveEvent.website}>{liveEvent.website}</a>
              </p>
            </article>
          )
        })}
      </StyledDiv>
    </Layout>
	)
}

export const query = graphql`
  query events {
    allDatoCmsLiveEvent {
      nodes {
        eventName
        startDate
        endDate
        website
        address
      }
    }
  }
`