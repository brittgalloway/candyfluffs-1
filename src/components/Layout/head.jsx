import * as React from 'react';
import { Helmet } from "react-helmet";

export const Head = ({title}) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>Candy Fluffs | {title}</title>
      <meta name="description" content="Shop all of Candyfluffs and 2Heros art and merchandise" />
      <link rel="canonical" href="https://candyfluffs.com" />
      <script id="mcjs">{
        `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f0ccd4aae40398b03156934fd/716e06e6a8e0b1788b8cd6a33.js");`
      }</script>
    </Helmet>
  </>
)