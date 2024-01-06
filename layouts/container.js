/* eslint-disable react/sort-comp */
/* eslint-disable camelcase */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Head from "next/head";
import routerEvents from "next-router-events";
// import PropTypes from 'prop-types';
import NProgress from "nprogress";
import { Sidebar, Menu } from "semantic-ui-react";
import cx from "classnames";
import Spinner from '../ui/spinner';
import Dimmer from '../ui/dimmer';

import { host } from "../api";
import Header from "../components/header";
import Footer from "../components/footer";
import FlashMessage from "../components/flash-message";

import Login from "../pages/user";
import MobileMenu from "../components/header/mobile-menu";
import { seoMeta } from "../reactor/func";
// import { host } from '../api';

import { userLogout } from "../actions/user";
import { Router } from "../routes";

const loginRequiredRouteList = [
  "/hesabim",
  "/satin-al",
  "/satin-al/adres-secim",
  "/satin-al/odeme-secim"
];

class Container extends React.Component {
  state = {
    isLoginCheckCompleted: false,
    visible: false,
    meta: this.props.meta || {
      title: "Aloparça",
      description: "Aloparça",
      canonical: false
    }
  };

  async componentDidMount() {
    const { isLogin, userData, dispatch, isBasketOn, meta } = this.props;
    const { asPath } = Router.router;
    if (isLogin === false || isLogin === true) {
      if (isLogin && userData.status === false) {
        await dispatch(userLogout());
      }
      this.loginComplete();
    }
    this.resetLoginRequired();
    routerEvents.on("routeChangeStart", this.routeChangeStart);
    routerEvents.on("routeChangeComplete", this.routeChangeComplete);
    routerEvents.on("routeChangeError", this.routeChangeComplete);

    if (isBasketOn === true) {
      if (
        asPath === "/sepet" ||
        asPath === "/hesabim/giris" ||
        asPath === "/hesabim"
      ) {
        await dispatch({ type: "BASKET_ON", payload: true });
      } else {
        await dispatch({ type: "BASKET_ON", payload: false });
      }
    }
  }

  async componentDidUpdate() {
    const { isBasketOn } = this.props;
    const { asPath } = Router.router;
    if (isBasketOn === true) {
      if (asPath === "/hesabim/giris") {
        await Router.pushRoute("/satin-al/adres-secim");
      }
    }
  }

  UNSAFE_componentWillReceiveProps({ meta, isLogin }) {
    if (isLogin === false || isLogin === true) {
      this.loginComplete();
    }
    if (meta && Object.keys(meta).length > 0) {
      this.setState({ meta });
    }
  }

  componentWillUnmount() {
    routerEvents.off("routeChangeStart", this.routeChangeStart);
    routerEvents.off("routeChangeComplete", this.routeChangeComplete);
    routerEvents.off("routeChangeError", this.routeChangeComplete);
  }

  loginComplete = () => {
    this.setState({ isLoginCheckCompleted: true });
  };

  routeChangeStart = () => {
    // this.props.dispatch(mobilMenuAction('hide'));
    NProgress.start();
  };

  routeChangeComplete = () => {
    this.resetLoginRequired();
    seoMeta(this.props.router.asPath);
    this.closeMenu();
    NProgress.done();
  };

  isRequiredStatus = () => {
    const { router } = this.props;
    if (loginRequiredRouteList.some(item => router.asPath.includes(item)))
      return true;
    return false;
  };

  resetLoginRequired = () => {
    const { isLoginRequired, dispatch } = this.props;
    if (isLoginRequired && !this.isRequiredStatus()) {
      dispatch({ type: "LOGIN_REQUIRED", payload: false });
    }
  };

  closeMenu = () => {
    const body = document.querySelector("body");
    body.classList.remove("no-scroll");
    this.setState({ visible: false });
  };

  checkScroll = () => {
    const { visible } = this.state;
    if (visible) {
      const body = document.querySelector("body");
      body.classList.add("no-scroll");
    } else {
      const body = document.querySelector("body");
      body.classList.remove("no-scroll");
    }
  };

  toggleMobileMenu = async () => {
    await this.setState(prevState => ({ visible: !prevState.visible }));
    this.checkScroll();
  };

  renderLogin = () => {
    const { slug } = this.props;

    let props = {};
    if (["yeni-uye", "sifremi-unuttum"].includes(slug)) props = { slug };
    return <Login {...props} />;
  };

  render() {
    // console.log(this.props, this.state.meta);
    const {
      children,
      isLoginRequired,
      isLogin,
      title,
      paginate,
      hasFixedAddCart
    } = this.props;
    const { visible, meta, isLoginCheckCompleted } = this.state;

    return (
      <>
        <Head>
          <title>
            {meta.title
              ? `${meta.title} | Aloparca.com`
              : "Oto Yedek Parça | Aloparca.com"}
          </title>
          <meta property="og:site_name" content={
              meta.title
                ? `${meta.title} | Aloparca.com`
                : "Oto Yedek Parça | Aloparca.com"
            }></meta>
          <meta name="description" content={meta.description} />
          <meta property="og:type" content="website" />
          
          {meta.canonical ? (
            <link rel="canonical" href={meta.canonical} />
          ) : null}
          {meta.canonical ? (
            <link rel="alternate" hreflang="tr" href={meta.canonical} />
          ) : null}
          <meta name="x-canonical-url" content={this.props.router.asPath} />
          {meta.keywords ? (
            <meta name="keywords" content={meta.keywords} />
          ) : null}
          <meta
            property="og:title"
            content={
              meta.title
                ? `${meta.title} | Aloparca.com`
                : "Oto Yedek Parça | Aloparca.com"
            }
          />
          <meta property="og:description" content={meta.description} />
          <meta
            property="og:image:secure_url"
            content="https://www.aloparca.com/static/img/logo.svg"
          />
          {paginate && paginate.current > 1 ? (
            <link
              rel="prev"
              href={`${host}${paginate.pageUrl}?page=${paginate.current - 1}`}
            />
          ) : null}
          {paginate && paginate.current < paginate.total ? (
            <link
              rel="next"
              href={`${host}${paginate.pageUrl}?page=${paginate.current + 1}`}
            />
          ) : null}
        </Head>
        <Header toggleMobileMenu={this.toggleMobileMenu} />

         {!isLoginCheckCompleted & this.isRequiredStatus() ? (
          <div style={{ width: "100%", position: "relative", height: "500px" }}>
            <Dimmer>
              <Spinner />
            </Dimmer>
          </div>
        ) : isLoginRequired && !isLogin ? (
          this.renderLogin()
        ) : (
          children
        )}
        <Footer
          hasFixedAddCart={hasFixedAddCart}
          isSepet={meta && meta.isSepet}
        />
        <FlashMessage />
        <Sidebar
          as={Menu}
          animation="push"
          width="wide"
          visible={visible}
          icon="labeled"
          vertical
        >
          <MobileMenu closeMenu={this.closeMenu} />
        </Sidebar>
        <a
          href="javascript:;"
          className={cx("mobile-menu-overlay", { active: visible })}
          onClick={this.closeMenu}
        />
      </>
    );
  }
}

const mapStateToProps = ({
  isLogin,
  isLoginRequired,
  userData,
  isBasketOn
}) => ({
  isLogin,
  isLoginRequired,
  userData,
  isBasketOn
});

export default connect(mapStateToProps)(withRouter(Container));
