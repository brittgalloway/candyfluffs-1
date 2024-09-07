import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { lato } from './fonts'
import './globals.scss';

export const metadata: Metadata = {
  title: 'Candy Fluffs',
  description: 'Shop all of Candyfluffs and Necahual art and merchandise',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    },
};
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tagline ='Just a girl who likes to draw manga'
  return (
    <html lang='en'>
      <Script id='mcjs'>{
        `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,'script','https://chimpstatic.com/mcjs-connected/js/users/f0ccd4aae40398b03156934fd/716e06e6a8e0b1788b8cd6a33.js');`
      }</Script>
    
      <body className={lato.className}>
        <Header 
          tagline={`${tagline} (ㆁᴗㆁ✿)`}
        />
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
