import type { Metadata, Viewport } from 'next';
import Script from 'next/script'; 
import { Header } from './components/header';
import { Footer } from './components/footer';
import { lato } from './fonts';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './style/globals.scss';

config.autoAddCss = false;

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
      <Script id="mcjs"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f0ccd4aae40398b03156934fd/716e06e6a8e0b1788b8cd6a33.js");
          `
        }}/>
      </head>
      <body className={lato.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          id="snipcart-setup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.SnipcartSettings = {
                publicApiKey: "${process.env.SNIPCART_APIKEY}",
                loadStrategy: "on-user-interaction",
                currency: "usd",
                modalStyle: "side",
              };
              (function() {
                var c,d;
                (d=(c=window.SnipcartSettings).version) != null || (c.version = "3.0");
                var s, S;
                (S=(s=window.SnipcartSettings).timeoutDuration) != null || (s.timeoutDuration = 2750);
                var l, p;
                (p=(l=window.SnipcartSettings).domain) != null || (l.domain = "cdn.snipcart.com");
                var w, u;
                (u=(w=window.SnipcartSettings).protocol) != null || (w.protocol = "https");
                var m, g;
                (g=(m=window.SnipcartSettings).loadCSS) != null || (m.loadCSS = true);
                var y=window.SnipcartSettings.version.includes("v3.0.0-ci") || window.SnipcartSettings.version != "3.0" && window.SnipcartSettings.version.localeCompare("3.4.0", void 0, {numeric: true, sensitivity: "base"}) === -1;
                var f=["focus","mouseover","touchmove","scroll","keydown"];
                window.LoadSnipcart = o;
                document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
                
                function r() {
                  if (window.SnipcartSettings.loadStrategy === "on-user-interaction") {
                    f.forEach(function(t) { document.addEventListener(t, o); });
                    setTimeout(o, window.SnipcartSettings.timeoutDuration);
                  } else {
                    o();
                  }
                }
                
                var a = false;
                
                function o() {
                  if (a) return;
                  a = true;
                  let t = document.getElementsByTagName("head")[0],
                      n = document.querySelector("#snipcart"),
                      i = document.querySelector('src[src^="' + window.SnipcartSettings.protocol + "://" + window.SnipcartSettings.domain + '"][src$="snipcart.js"]'),
                      e = document.querySelector('link[href^="' + window.SnipcartSettings.protocol + "://" + window.SnipcartSettings.domain + '"][href$="snipcart.css"]');
                  
                  if (!n) {
                    n = document.createElement("div");
                    n.id = "snipcart";
                    n.setAttribute("hidden", "true");
                    document.body.appendChild(n);
                  }
                  h(n);
                  if (!i) {
                    i = document.createElement("script");
                    i.src = window.SnipcartSettings.protocol + "://" + window.SnipcartSettings.domain + "/themes/v" + window.SnipcartSettings.version + "/default/snipcart.js";
                    i.async = true;
                    t.appendChild(i);
                  }
                  if (!e && window.SnipcartSettings.loadCSS) {
                    e = document.createElement("link");
                    e.rel = "stylesheet";
                    e.type = "text/css";
                    e.href = window.SnipcartSettings.protocol + "://" + window.SnipcartSettings.domain + "/themes/v" + window.SnipcartSettings.version + "/default/snipcart.css";
                    t.prepend(e);
                  }
                  f.forEach(function(v) { document.removeEventListener(v, o); });
                }
                
                function h(t) {
                  if (!y) return;
                  t.dataset.apiKey = window.SnipcartSettings.publicApiKey;
                  if (window.SnipcartSettings.addProductBehavior) t.dataset.configAddProductBehavior = window.SnipcartSettings.addProductBehavior;
                  if (window.SnipcartSettings.modalStyle) t.dataset.configModalStyle = window.SnipcartSettings.modalStyle;
                  if (window.SnipcartSettings.currency) t.dataset.currency = window.SnipcartSettings.currency;
                  if (window.SnipcartSettings.templatesUrl) t.dataset.templatesUrl = window.SnipcartSettings.templatesUrl;
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}


