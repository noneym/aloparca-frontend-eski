import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import theme from '../style/theme';
import Normalize from '../style/normalize';
import DefaultStyles from '../style';
import Nprogress from '../style/nprogress';
import PhotoSwipe from '../style/photo-swipe';
import Plyr from '../style/plyr';
import Semantic from '../style/semantic';
import withReduxStore from '../lib/with-redux-store';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="manifest" href="/static/manifest.json" />

            <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico?v=3" />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/app-icons/icons/favicon-16x16.png?v=2"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/app-icons/icons/favicon-32x32.png?v=2"
            />

            <meta name="theme-color" content={theme.color.primary} />
            <meta name="msapplication-navbutton-color" content={theme.color.primary} />
            <meta name="msapplication-starturl" content="/" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />

            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-640x1136.png"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-750x1334.png"
              media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-1242x2208.png"
              media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-1125x2436.png"
              media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-1536x2048.png"
              media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-1668x2224.png"
              media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="/static/app-icons/splash/launch-2048x2732.png"
              media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/app-icons/icons/apple-touch-icon.png"
            />
            <meta id="Content-Language" httpEquiv="Content-Language" content="tr"/>
            <meta name="revisit-after" content="1 Days"/>
            <meta name="author" content="aloparca.com" />
            <meta name="Designer" content="Designed by Boranka" href="http://www.boranka.com" />
            <meta name="classification" content="Yedek Parça" />
            <meta name="distribution" content="Local" />
            <meta name="copyright" content="aloparca.com" />
            <meta name="reply-to" content="destek@aloparca.com" />
            <meta name="rating" content="General" />
            <meta name="resource-type" content="Web Page" />
            <meta name="robots" content="NOODP, index, follow" />
            <link rel="stylesheet" href="/static/semantic/semantic.min.css" />
          </Head>
          <Provider store={reduxStore}>
            <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
              <Component {...pageProps} />
              <Normalize />
              <DefaultStyles />
              <Nprogress />
              <PhotoSwipe />
              <Plyr />
              <Semantic />
            </PersistGate>
          </Provider>
          <link rel="stylesheet" href="/static/icomoon/style.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow:300,400,500,600,700&amp;subset=latin-ext&amp;display=swap"
            rel="stylesheet"
          />
          <script
            src="https://www.artfut.com/static/tagtag.min.js?campaign_code=636987bbbf&_t=1.0"
            async
            onError={() => {
              const self = this;
              window.ADMITAD = window.ADMITAD || {},
              ADMITAD.Helpers = ADMITAD.Helpers || {},
              ADMITAD.Helpers.generateDomains = function () { for (var e = new Date(), n = Math.floor(new Date(2020, e.getMonth(), e.getDate()).setUTCHours(0, 0, 0, 0) / 1e3), t = parseInt(1e12 * (Math.sin(n) + 1)).toString(30), i = ['de'], o = [], a = 0; a < i.length; ++a)o.push({ domain: `${t}.${i[a]}`, name: t }); return o; },
              ADMITAD.Helpers.findTodaysDomain = function (e) {
                function n() {
                  const o = new XMLHttpRequest(); const a = i[t].domain;
                  const D = `https://${a}/`; o.open('HEAD', D, !0), o.onload = function () { setTimeout(e, 0, i[t]); }, o.onerror = function () { ++t < i.length ? setTimeout(n, 0) : setTimeout(e, 0, void 0); }, o.send();
                } var t = 0;
                var i = ADMITAD.Helpers.generateDomains(); n();
              }, window.ADMITAD = window.ADMITAD || {}, ADMITAD.Helpers.findTodaysDomain((e) => {
                if (window.ADMITAD.dynamic = e, window.ADMITAD.dynamic) {
                  const n = (function () { return function () { return self.src ? self : ''; }; }());
                  const t = n();
                  const i = (/campaign_code=([^&]+)/.exec(t.src) || [])[1] || ''; t.parentNode.removeChild(t);
                  const o = document.getElementsByTagName('head')[0];
                  const a = document.createElement('script');
                  a.src = `https://www.${window.ADMITAD.dynamic.domain}/static/${window.ADMITAD.dynamic.name.slice(1)}${window.ADMITAD.dynamic.name.slice(0, 1)}.min.js?campaign_code=${i}`, o.appendChild(a);
                }
              });
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: 'ADMITAD = window.ADMITAD || {};ADMITAD.Invoice = ADMITAD.Invoice || {};var admitad_cookie_name = \'deduplication_cookie\';var admitad_days_to_store = 90;var admitad_deduplication_cookie_value = \'admitad\';var admitad_channel_name = \'target\';getSourceParamFromUri = function() {var pattern = admitad_channel_name + \'=([^&]+)\';var re = new RegExp(pattern);return (re.exec(document.location.search) || [])[1] || \'\';};getSourceCookie = function() {var matches = document.cookie.match(new RegExp(\'(?:^|; )\' + admitad_cookie_name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, \'\\$1\') + \'=([^;]*)\'));return matches ? decodeURIComponent(matches[1]) : undefined;};setSourceCookie = function() {var param = getSourceParamFromUri();if (!param) {return;}var period = admitad_days_to_store * 60 * 60 * 24 * 1000;var expiresDate = new Date((period) + +new Date);var cookieString = admitad_cookie_name + \'=\' + param + \'; path=/; expires=\' + expiresDate.toGMTString();document.cookie = cookieString;document.cookie = cookieString + \'; domain=.\' + location.host;};setSourceCookie();if (!getSourceCookie(admitad_cookie_name)) {ADMITAD.Invoice.broker = \'na\';} else if (getSourceCookie(admitad_cookie_name) != admitad_deduplication_cookie_value) {ADMITAD.Invoice.broker = getSourceCookie(admitad_cookie_name);} else {ADMITAD.Invoice.broker = \'adm\';}' }}
          />
          <script charSet="UTF-8" src="//cdn.sendpulse.com/js/push/f8e71f8325dcf5f35e5a73a19586ca46_1.js" async />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KZ26ZXT');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZ26ZXT" height="0" width="0" style="display:none;visibility:hidden;"></iframe>',
            }}
          />
        </>
      </ThemeProvider>
    );
  }
}

export default withReduxStore(MyApp);
