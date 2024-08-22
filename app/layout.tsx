import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Footer } from './components/footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Candy Fluffs',
  description: 'Shop all of Candyfluffs and Necahual art and merchandise',
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
  return (
    <html lang='en'>
      <Script id='mcjs'>{
        `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,'script','https://chimpstatic.com/mcjs-connected/js/users/f0ccd4aae40398b03156934fd/716e06e6a8e0b1788b8cd6a33.js');`
      }</Script>
    
      <body className={inter.className}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
