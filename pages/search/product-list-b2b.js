import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Flex, Box } from '@rebass/grid';
import DotDotDot from 'react-dotdotdot';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import {
  Header, Modal, Button, Icon
} from 'semantic-ui-react';
import { media } from '../../style/theme';

import Api from '../../api';
import { Link } from '../../reactor';
import {
  Discount, TitleContent, Price, ImageBg,
} from '../../components/product';
import { addCart } from '../../actions';
import Spinner from '../../ui/spinner';

const Outer = styled(Flex)`
  height: ${props => props.absolute ? '120px' : '100px'};
  position: relative;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-top: 20px;
  ${media.tablet`
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #dddddd;
  `};
  ${media.phone`
    flex-wrap: wrap;
    height: auto;
  `};
  .image-area {
    height: 100px;
    padding: 10px;
    .product-image {
      width: 100%;
      height: 100%;
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .stok-bilgilendirme-buton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    color: #fff;
    background-color: #4B94D7;
    letter-spacing: 1;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px 0;
    border-radius: 3px;
    margin-top 60px;
    ${media.phone`
        padding: 10px;
        margin: 10px;    
        height: 60px;

     `};

    }
    .phone-click {
      width: 100%;
      position: absolute;
      top: 0;
      ${media.phone`
        position: relative;
        top: unset;
        margin-top: 10px;
      `};
    }
    .stok-yok {
      width: 110px;
      text-align: center;
      font-weight: 500;
      border-radius: 3px;
      margin: 10px auto;
      padding: 10px;
      position: absolute;
      right: 15px;
      top: 0px;
      height: auto;
      z-index: 3 !important;
      color: white;
      background-color: #e81111;
      font-size: 12px;
      @media screen and (max-width: 850px) {
        width: auto;
        right: 10px;
      }
      ${media.phone`
        width: 90%;
        position: relative;
        right: unset;
        top: unset;
      `};
    }
  .link-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .content-area {
    height: 100%;
    flex-grow: 1;
    padding: 10px 20px;
    background-color: #f3f3f3;
    @media screen and (max-width: 850px) {
      padding: 10px 15px;
    }
    ${media.phone`
      padding: 0;
      order: 3;
    `};
    .marka-stok-area {
      flex-grow: 1;
      ${media.phone`
        flex-grow: 1;
        padding: 10px;
      `};
      .marka-stok {
        width: 250px;
        font-size: 16px;
        color: #525355;
        @media screen and (max-width: 850px) {
          width: 210px;
        }
        strong {
          font-weight: 500;
          color: black;
          margin-right: 5px;
        }
      }
      .marka-parca {
        width: 220px;
        font-size: 16px;
        color: #525355;
        @media screen and (max-width: 850px) {
          width: 210px;
        }
        strong {
          font-weight: 500;
          color: black;
          margin-right: 5px;
        }
      }
    }
    .tedarikci-aciklama {
      font-size: 14px;
      color: black;
      font-weight: 600;
    }
  }

  .discount-container {
    background-color: #f3f3f3;
    height: 100%;
    ${media.phone`
      flex-direction: column-reverse;
      margin: auto;
      margin-right: 10px;
    `};
    .brandImage{
      height: 40px;
      width: 60px;
      margin-right: 15px;
    }
    .brand {
      height: 60px;
      padding-right: 20px;
      @media screen and (max-width: 850px) {
        height: 50px;
        padding-right: 10px;
      }
      ${media.phone`
        height: 40px;
        padding-right: 0px;
        margin-top: 4px;
      `};
      &.noDiscount {
        padding-right: 0;
      }
    }
    .indirim-container {
        position: relative;
        height: 60px;
        @media screen and (max-width: 850px) {
          height: 50px;
        }
        ${media.phone`
          height: 40px;
        `};
      .indirim {
        height: 60px;
        margin-right: 0;
        background-color: transparent !important;
        overflow: hidden;
        @media screen and (max-width: 850px) {
          height: 50px;
        }
        ${media.phone`
          height: 40px;
        `};
        img {
          width: unset;
        }
      }
      .percent {
        position: absolute;
        top: 18px;
        left: 50%;
        transform: translate(-50%);
        display: block;
        color: white;
        font-size: 18px;
        font-weight: 700;
        line-height: 1em;
        @media screen and (max-width: 850px) {
          top: 15px;
          font-size: 16px;
        }
        ${media.phone`
          top: 10px;
          font-size: 14px;
        `};
      }
      .content {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translate(-50%);
        display: block;
        color: white;
        font-size: 14px;
        line-height: 1em;
        @media screen and (max-width: 850px) {
          font-size: 12px;
        }
        ${media.phone`
          bottom: 6px;
          font-size: 12px;
        `};
      }
    }
  }

  .price-area {
    padding: 15px;
    position: relative;
    align-self: ${props => props.absolute && 'flex-end;'};
    @media screen and (max-width: 850px) {
      padding: 10px;
    }
    ${media.phone`
      justify-content: space-between;
      padding: 0;
      padding-right: 10px;
    `}
    .price-container {
      width: 200px;
      @media screen and (max-width: 850px) {
        width: 180px;
      }
    }
    .liste-fiyat {
      color: #999999;
      @media screen and (max-width: 460px) {
        display: flex;
        flex-direction: column;
      }
      #underline {
        font-size: 18px;
        font-weight: 400;
        text-decoration: line-through;
        @media screen and (max-width: 850px) {
          font-size: 16px;
        }
      }
      span {
        font-size: 12px;
        font-weight: 500;
        @media screen and (max-width: 850px) {
          font-size: 10px;
        }
      }
    }
    .fiyat {
      color: black;
      font-size: 36px;
      font-weight: 600;
      @media screen and (max-width: 850px) {
        font-size: 28px;
      }
      span {
        font-size: 20px;
        font-weight: 400;
        @media screen and (max-width: 850px) {
          font-size: 16px;
        }
      }
    }
    .hemen-al {
      cursor: pointer;
      width: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 14px;
      font-weight: bold;
      padding: 10px 0;
      border-radius: 3px;
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
  }
`;

const DiscountB2b = styled(Discount)`
  figure {
    position: relative;
  }
`

class StokBilgilendirme extends Component {
  state = { stokModalOpen: false };

  handleOpen = () => {
    this.setState({ stokModalOpen: true });
  };

  handleClose = () => {
    this.setState({ stokModalOpen: false });
  };

  uyeSTB = async () => {
    const { product } = this.props;
    this.setState({ stokModalOpen: false });
    Api.get(`Products/stok_durum_bilgilendirme?no=${product.no}`);
  };

  render() {
    const { stokModalOpen } = this.state;
    const UyeBilgilendir = (
      <Modal open={stokModalOpen} onClose={this.handleClose} basic size="small">
        <Header icon="address card outline" content="Stok Bilgilendirme" />
        <Modal.Content>
          <h3>Ürün stok durumu hakkında bilgi almak için onaylayın</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.uyeSTB} inverted>
            <Icon name="checkmark" />
            {' Onay'}
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <Flex flexDirection="column">
        {UyeBilgilendir}
      </Flex>
    );
  }
}

class ProductCardB2b extends React.Component {
  state = { isLoading: false };

  addCartForm = async () => {
    const { dispatch, item } = this.props;
    this.setState({ isLoading: true });
    await dispatch(addCart({
      id: item.no,
      quantity: 1,
      name: item.name,
      gorsel: item.gorsel,
    }));
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { item, isLogin, product } = this.props;
    const slug = `/yedek-parca/${item.marka}${
      item.kategori ? `/${item.kategori.replace(/ /g, '-')}` : ''
      }/${item.stokkodu}/${item.no}`;
    const b2bPrice = item.b2b_indirim_yuzdesi === 0 || item.b2b_indirim_yuzdesi === undefined ? item.fiyat : item.fiyat - ((item.fiyat / 100) * item.b2b_indirim_yuzdesi);
    return (
      <Outer absolute={!(parseInt(item.stokdurumu, 10) > 0)}>
        {parseInt(item.stokdurumu, 10) > 0 ? '' : (
          <a className="phone-click" href="tel:08503330686">
            <div className="stok-yok">Güncel stok bilgisi için: 0850 333 0686</div>
          </a>
        )}
        <Box width={[1 / 3, 1 / 5, 1 / 10]} className="image-area">
          <Link to={`/yedek-parca${item.slug}`}>
            <ImageBg
              className="product-image"
              src={`https://resize.aloparca.com/upload/w_260,h_200,pns/${item.gorsel}`}
              alt={`${item.stokmarka} Marka ${item.parcakodu} kodlu Oto Yedek Parça ${item.tedarikci_aciklama}`}
            />
          </Link>
        </Box>

        <Flex
          width={[1, 'auto', 'auto']}
          className="content-area"
          justifyContent="space-between"
        >
          <Link to={slug} className="link-container">
            <Flex className="marka-stok-area" flexDirection="column" justifyContent="center">
              <Box className="tedarikci-aciklama">
                <DotDotDot clamp="1">
                  <TitleContent content={item.tedarikci_aciklama} />
                </DotDotDot>
              </Box>
              <Flex className="marka-stok">
                <TitleContent title="Marka" content={item.stokmarka === null || item.stokmarka === "" ? "-" : item.stokmarka} />
              </Flex>
              <Flex className="marka-parca">
                <TitleContent title="Parça No" content={item.parcakodu === null || item.parcakodu === "" ? "-" : item.parcakodu} />
              </Flex>
            <Flex className="marka-stok">

              {
                item.parca_tipi === 1 && <TitleContent title="Türü" color={"#2667ff"} content="Logolu Orijinal Yedek Parça" />
              }
              {
                item.parca_tipi === 2 && <TitleContent title="Türü" color={"#88ba00"} content="Logosuz Orijinal Yedek Parça" />
              }
              {
                item.parca_tipi === 3 && <TitleContent title="Türü" color={"#ffaa0d"} content="Muadil Yedek Parça" />
              }

            </Flex>
            </Flex>

            <Flex className="discount-container" justifyContent="space-between" alignItems="center">
              {item.marka_logo && (
                <LazyLoad>
                  <img
                    className="brandImage"
                    src={`https://resize.aloparca.com/upload/w_65${item.marka_logo}`}
                    alt={item.stokmarka}
                  />
                </LazyLoad>
              )}
              {item.b2b_indirim_yuzdesi !== 0 && (
                <div className="indirim-container">
                  <ImageBg className="indirim" src="/static/img/t/icons/indirim.svg" />
                  <span className="percent">
                    {`%${item.b2b_indirim_yuzdesi ? item.b2b_indirim_yuzdesi : 10}`}
                  </span>
                  <span className="content">indirim</span>
                </div>
              )}
            </Flex>
          </Link>
        </Flex>

        <Flex width={[2 / 3, 'auto', 'auto']} className="price-area" alignItems="center">
          <Flex className="price-container" flexDirection="column">
            {item.b2b_indirim_yuzdesi !== 0 && (
              <Box className="liste-fiyat">
                <span id="underline">{`${item.fiyat === "0.00" ? item.liste_fiyat : item.fiyat}TL `}</span>
                <span>(Yetkili Servis Fiyatı)</span>
              </Box>
            )}
            <Box className="fiyat">
              <Price price={b2bPrice} />
            </Box>
          </Flex>
          <Box>
            {parseInt(item.stokdurumu, 10) > 0 ? (
              <button
                type="button"
                onClick={this.addCartForm}
                className="hemen-al"
                disabled={isLoading}
              >
                Sepete Ekle
                {isLoading && (
                  <Spinner marginLeft={15} size="tiny" />
                )}
              </button>
            ) : (
                <StokBilgilendirme product={product} isLogin={isLogin} />
              )}
          </Box>
        </Flex>

      </Outer>
    );
  }
}

const mapStateToProps = ({ isLogin }) => ({ isLogin });
export default connect(mapStateToProps)(ProductCardB2b);
