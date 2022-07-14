import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "animate.css/animate.min.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from 'next/router';

NProgress.configure({ showSpinner: false });

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
