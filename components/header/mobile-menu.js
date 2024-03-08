/* eslint-disable no-script-url */
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { Image, Accordion } from "semantic-ui-react";
import Spinner from "../../ui/spinner";
import cx from "classnames";
import { Link } from "../../reactor";

import Api from "../../api";
import { userLogout } from "../../actions";

import { Router } from "../../routes";

const Outer = styled(Flex)`
  font-family: "Barlow", sans-serif;
  color: #525254;
  .logo {
    flex: 1;
    margin-left: 20px;
    position: relative;
    z-index: 1;

    img {
      height: 50px;
    }
  }
  .close-menu {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 50;

    i {
      font-size: 26px;
      color: #525254;
    }
  }
  .musteri-hizmetleri {
    font-size: 16px;
    a {
      font-weight: 500;
      margin-left: 5px;
    }
  }
  .hesabim {
    a.hesabim-link {
      width: 100%;
      padding: 15px 0;
      text-transform: uppercase;
      font-weight: 500;
      background-color: #ff8900;
      color: white;
      & + a.hesabim-link {
        border-left: 1px solid white;
      }
    }
  }
  .mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    padding: 15px 20px;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
  }
  .ui.accordion .accordion .title,
  .ui.accordion .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    padding: 15px 20px;
    font-family: "Barlow", sans-serif;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    color: #525254;
  }
  .ui.accordion:not(.styled) .accordion .title ~ .content:not(.ui),
  .ui.accordion:not(.styled) .title ~ .content:not(.ui) {
    border-bottom: 1px solid #dddddd;
    padding: 10px 0;
  }
  .category {
    padding: 10px 0;
    border-bottom: 1px dashed #dddddd;
    .category-link {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 15px;
      font-size: 16px;
      i {
        font-size: 20px;
        margin-right: 15px;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
  .turuncu {
    color: #ff8900;
  }
`;
class MobileMenu extends React.Component {
  state = {
    activeIndex: 0,
    loading: true,
    loadingMadeni: true,
    madeni: [],
    openMadeni: false
  };

  async componentDidMount() {
    const madeniYaglar = await Api.get("MadeniYaglar/kategoriList");
    this.setState({ madeni: madeniYaglar });
  }

  componentWillUnmount() {
    this.setState({
      openMadeni: false,
      loadingMadeni: true,
      loading: true,
      activeIndex: 0
    });
  }

  handleClick = async (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex, loading } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    if (index === 1 && loading) {
      const categories = await Api.get("Products/kategoriler_v2/");
      this.setState({ categories, loading: false });
    }

    this.setState({ activeIndex: newIndex });
  };

  handleClickYag = () => {
    this.setState({
      openMadeni: !this.state.openMadeni,
      loadingMadeni: this.state.madeni === []
    });
  };

  changeCar = car => {
    // const { Id, ...carList } = car;
    // this.props.dispatch({ type: 'ADD_GARAGE', payload: carList });
    const { dispatch } = this.props;
    const { Id, uyeid, not, resim, sasi, ...carList } = car;
    dispatch({ type: "ADD_GARAGE", payload: carList });

    // console.log('car: ', car);
    Router.pushRoute("listcar", carList);
  };

  render() {
    const { closeMenu, isLogin, userData, dispatch } = this.props;
    const {
      activeIndex,
      categories,
      loading,
      loadingMadeni,
      openMadeni,
      madeni
    } = this.state;
    return (
      <Outer flexDirection="column">
        <Flex my={2} alignItems="center" justifyContent="center">
          <Link className="logo" title="Aloparça" route="home">
            <Image src="/static/img/logo.svg" alt="Aloparça" />
          </Link>

          <a href="javascript:;" className="close-menu" onClick={closeMenu}>
            <i className="icon-x-altx-alt" />
          </a>
        </Flex>
        <Flex
          my={1}
          className="musteri-hizmetleri"
          alignItems="center"
          justifyContent="center"
        >
          Müşteri Hizmetleri:
          <a href="tel: 08503330686" className="telefon">
            0 850 333 0 686
          </a>
        </Flex>
        <Flex my={1} className="hesabim">
          <Link
            route="profile"
            params={{ slug: "siparislerim" }}
            className="hesabim-link"
            width={1 / 2}
          >
            Siparişlerim
          </Link>
          <Link route="profile" className="hesabim-link" width={1 / 2}>
            Hesabım
          </Link>
        </Flex>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            Oto Yedek Parça
            <i
              className={cx({
                "icon-chevron-thin-right": activeIndex !== 1,
                "icon-chevron-thin-down": activeIndex === 1
              })}
            />
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            {loading ? (
              <Spinner />
            ) : (
              <Flex flexDirection="column">
                {categories &&
                  categories.map(category => (
                    <Flex
                      className="category"
                      key={category.ust_kategoriler.link}
                    >
                      <Link
                        route="listmaincategory"
                        params={{ maincategory: category.ust_kategoriler.link }}
                        className="category-link"
                      >
                        <i
                          className={`icon-kategoriler-${category.ust_kategoriler.link}`}
                        />
                        {category.ust_kategoriler.name.toUpperCase()}
                      </Link>
                    </Flex>
                  ))}
              </Flex>
            )}
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Title
            active={openMadeni}
            index={1}
            onClick={this.handleClickYag}
          >
            Madeni yağ
            <i
              className={cx({
                "icon-chevron-thin-right": !openMadeni,
                "icon-chevron-thin-down": openMadeni
              })}
            />
          </Accordion.Title>
          <Accordion.Content active={openMadeni}>
            {loadingMadeni ? (
              <Spinner />
            ) : (
              <Flex flexDirection="column">
                {madeni &&
                  madeni.map(yag => (
                    <Flex className="category" key={yag.id}>
                      <Link
                        route={`/madeni-yaglar/motor-yaglari/${yag.id}`}
                        className="category-link"
                      >
                        <i className={`icon-kategoriler-${yag.name}`} />
                        {yag.name}
                      </Link>
                    </Flex>
                  ))}
              </Flex>
            )}
          </Accordion.Content>
        </Accordion>
        {/*
          <Link route="motor-oil" className="mobile-link">
            madeni yağ
            <i className="icon-chevron-thin-right" />
          </Link>
        */}
        <Link route="accessories" className="mobile-link">
          aksesuarlar
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link route="campaign" className="mobile-link">
          kampanyali ürünler
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link route="bakimseti" className="mobile-link">
          Pratik Bakım Robotu
          <i className="icon-chevron-thin-right" />
        </Link>

        <Link route="temizlik" className="mobile-link">
          temizlik ürünleri
          <i className="icon-chevron-thin-right" />
        </Link>

        <Link
          route="profile"
          params={{ slug: "siparislerim" }}
          className="mobile-link"
        >
          kargo takip
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link
          route="kurumsal"
          params={{ slug: "toplu-parca-teklifi" }}
          className="mobile-link"
        >
          Parça ve Hizmet Teklifi
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link route="blog" className="mobile-link">
          Blog
          <i className="icon-chevron-thin-right" />
        </Link>
        {isLogin ? (
          <Accordion>
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              garajım
              <i
                className={cx({
                  "icon-chevron-thin-right": activeIndex !== 2,
                  "icon-chevron-thin-down": activeIndex === 2
                })}
              />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <Flex flexDirection="column">
                {userData &&
                  userData.uye_garaj &&
                  userData.uye_garaj.map(arac => (
                    <Flex className="category" key={arac.Id}>
                      <a
                        href="javascript:;"
                        onClick={() => this.changeCar(arac)}
                        className="category-link"
                      >
                        {`${arac.marka} ${arac.model} ${arac.yil} ${arac.kasa}`}
                      </a>
                    </Flex>
                  ))}
                <Flex className="category">
                  <Link
                    route="profile"
                    params={{ slug: "garaj" }}
                    className="category-link"
                  >
                    <i className="icon-garaj" />
                    Yeni Araç Ekle
                  </Link>
                </Flex>
              </Flex>
            </Accordion.Content>
          </Accordion>
        ) : (
          <Link route="profile" className="mobile-link">
            garajım
            <i className="icon-chevron-thin-right" />
          </Link>
        )}
        <Link
          route="profile"
          params={{ slug: "destek-merkezi" }}
          className="mobile-link"
        >
          destek
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link route="yardim" className="mobile-link">
          yardım
          <i className="icon-chevron-thin-right" />
        </Link>
        <Link route="contact" className="mobile-link">
          iletişim
          <i className="icon-chevron-thin-right" />
        </Link>

        {isLogin && (
          <a
            href="javascript:;"
            onClick={() => dispatch(userLogout())}
            className="mobile-link turuncu"
          >
            Çıkış
            <i className="icon-logout" />
          </a>
        )}
      </Outer>
    );
  }
}

const mapStateToProps = ({ isLogin, cart, userData, garage }) => ({
  isLogin,
  cart,
  userData,
  garage
});
export default connect(mapStateToProps)(MobileMenu);
