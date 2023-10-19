import React from 'react';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import Grid from '../components/Grid';

export default function Home() {
    return (
      <Layout title = {'Home'} heading = {'Just a girl who likes to draw manga'}>
        <Slider />
        <Grid />
      </Layout>
    )
  }