import React from 'react';
import { Head } from './head';
import Header from '../Header';
import NavMenu from '../NavMenu';
import Footer from '../Footer';

export default function Layout({title, heading, children}) {
  return(
    <div className="container">
      <Head title={title}/>
      <Header heading={heading} />
      <NavMenu/>
      <main>
          {children}
      </main>
      <Footer />   
  </div>
  )
}