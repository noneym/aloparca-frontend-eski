/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import {
  Modal, Input, Button, Icon
} from 'semantic-ui-react';
import Spinner from '../../ui/spinner';
import styled from 'styled-components';
import { Router } from '../../routes';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';

import CartPage from './style';
import { Title, Section } from '../../components/style';
import ProductSlider from '../../components/product-slider';
import ProductSliderSepet from '../../components/product-slider-home';
import SiteFeature from '../../components/site-feature';
import CartProductCard from './product-card';
import Api from '../../api';
import { getCoupon, userLogout } from '../../actions';
import { media } from '../../style/theme';
import { site } from '../../reactor/func';
import FiyatFormat from '../../components/fiyat-format';

const SliderWrapper = styled.div`
  h2 {
    padding-right: 50px;
    ${media.tablet`
      font-size: 20px;
      margin-bottom: 20px;
    `};
  }
  .swiper-item {
    height: 400px !important;
    ${media.tablet`
      height: 360px !important;
    `};
  }
  .navigation {
    display: flex !important;
  }
`;

const SliderWrapperSepet = styled.div`
  padding: 0 1rem;
  max-width: 95%;
  margin: 0 50px;

  ${media.phone`
margin: 0;
max-width: 99%;
`};

  h2 {
    padding-right: 50px;
    ${media.tablet`
      font-size: 20px;
      margin-bottom: 20px;
    `};
  }
  .swiper-item {
    height: 400px !important;
    ${media.tablet`
      height: 360px !important;
    `};
  }
  .navigation {
    display: flex !important;
  }
  .swiper-slide {
    width: auto;
    height: 400px !important;
  }
  .price-wrap {
    word-wrap: break-word;
  }
  .swiper-wrapper {
    height: 400px !important;
  }
`;

const SliderSepet = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  width: 100%!important;
  box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2)!important;
  ${media.tablet`
    margin: 0;
    margin-top: 1rem;
    width: 100%;
    max-width: 100%;
  `};
`;

const FooterCart = styled.div`
  display: none;
  ${media.phone`
  background: #ffffff;
  display: block;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 6rem;
  width: 100%;
  z-index: 1000;
  border-top: 1px solid #999;
  .divFiyat {
    position: absolute;
    top: 0;
    right: 0;
    left:0;
    bottom: 0;
    height: -webkit-fill-available;
    background-color: orange;
    display: grid;
    grid-template-columns: 1fr 1fr;  
    .divToplam {
      position: relative;
      background-color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      // padding: 1rem 2rem;
      color: white;
      span {
        font-size: 1.7rem;
      }
    }
    .divBtn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        background-image: linear-gradient(to top,rgb(255,126,0) 0%,rgb(255,159,0) 100%);
        position: absolute;
        top: 0;
        right: 0;
        left:0;
        bottom: 0;
        color: white;
        font-size: 1.4rem;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        padding: 1rem 1rem;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`};
`;

const FlexFixed = styled(Flex)`
  position: sticky;
  top: 30px;
`;

const ModalCloseIcon = styled.div`
  position: absolute;
  background: #ff9f00;
  height: 50px;
  width: 50px;
  top: 0;
  right: 0;
  border-top-right-radius: .2rem;
  border-bottom-left-radius: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: #ff7e00;
  }
  i.icon {
    margin: 0;
  }
  i.white.icon {
    color: white!important;
  }
`;

class Sepet extends React.Component {
  static async getInitialProps() {
    try {
      const response = await Api.get('Products/kargoyu_bedava_yapan_urunler');
      
      if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`);
      }
  
      
      const onerilenUrunler = await response.json();
      return { onerilenUrunler };
    } catch (error) {
      console.error('API çağrısında hata:', error);
      return { onerilenUrunler: [] }; // API hata verirse boş bir dizi döndür
    }
  }
  

  state = {
    isLoadingDiscount: false,
    isLoading: true,
    openModal: true,
    openDiscount: false,
    dataStatus: null,
    urunler: [],
    cokSatan: [],
    isSepet: true,
  };

  componentDidMount() {
    this.firstReq();

    

    // const locStoreToken = localStorage.getItem("customerToken");
    // const locStorePersist = localStorage.getItem("persist:aloparca");
    // console.log(locStoreToken, locStorePersist);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.cokSatan.length >= 1, prevState.urunler.length >= 1);
    // console.log( "prevState.urunler",prevState.urunler , "prevState.cokSatan",prevState.cokSatan );
    
    // const getCart = cart === null ? [] : cart.urunler;
    // console.log(getCart);

    // const { onerilenUrunler, cart } = this.props;
    // let getNoAllOnerilen = [];
    // onerilenUrunler.urunler.map((item) => {
    //   getNoAllOnerilen.push(item.no);
    // });
    // const getCart = cart === null ? [] : cart.urunler;
    // console.log(getCart);
    
    // getCart.map((item) => {
    //   getNoAllOnerilen.includes(item.urun_detay.no) && this.setState({ openModal: false });
    // });
    

    if (
      this.state.urunler !== prevState.urunler
      || this.state.cokSatan !== prevState.cokSatan
    ) {
      this.state.cokSatan.length === 0
        && this.state.urunler.length === 0
        && this.forRefresh();
    }
    // console.log("this.state.urunler",this.state.urunler , "this.state.cokSatan",this.state.cokSatan );
  }

  componentWillUnmount() {
    this.setState({ isSepet: false });
  }

  firstReq = async () => {
    const { isLogin, dispatch } = this.props;
    const { dataStatus } = this.state;

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
    let urunler_ = [];
    let cokSatan_ = [];
    let filteredUrunler = [];
    let filteredCokSatan = [];
    if (isLogin) {
      const data = await Api.get('/Users/sepet_check');
      (await data.status) != undefined
        && data.status === false
        && dispatch(userLogout())
        && dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Lütfen önce giriş yapınız!',
        })
        && Router.pushRoute('profile');
      await this.setState({ dataStatus: data.status });
      if (dataStatus !== false) {
        dispatch({ type: 'GET_CART', payload: data.result });
        data.result.tavsiye_urunler.map((urunList) => {
          urunler_ = urunler_.concat(urunList);
        });
        data.result.cok_satanlar.map((cokSatanList) => {
          cokSatan_ = cokSatan_.concat(cokSatanList);
        });
      }
      filteredUrunler = urunler_.filter((item) => item.stok_adet != 0);
      filteredCokSatan = cokSatan_.filter((item) => item.stok_adet != 0);
    }
    await dispatch({ type: 'BASKET_ON', payload: true });
    this.setState({
      urunler: filteredUrunler,
      cokSatan: filteredCokSatan,
      isLoading: false,
    });
  };

  forRefresh = async () => {
    const { isLogin, dispatch } = this.props;
    const { dataStatus } = this.state;

    let urunler_ = [];
    let cokSatan_ = [];
    let filteredUrunler = [];
    let filteredCokSatan = [];
    if (isLogin) {
      const data = await Api.get('/Users/sepet_check');
      (await data.status) != undefined
        && data.status === false
        && dispatch(userLogout())
        && dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Lütfen önce giriş yapınız!',
        })
        && Router.pushRoute('profile');
      await this.setState({ dataStatus: data.status });
      if (dataStatus !== false) {
        dispatch({ type: 'GET_CART', payload: data.result });
        data.result.tavsiye_urunler.map((urunList) => {
          urunler_ = urunler_.concat(urunList);
        });
        data.result.cok_satanlar.map((cokSatanList) => {
          cokSatan_ = cokSatan_.concat(cokSatanList);
        });
      }
      filteredUrunler = urunler_.filter((item) => item.stok_adet != 0);
      filteredCokSatan = cokSatan_.filter((item) => item.stok_adet != 0);
    }

    await dispatch({ type: 'BASKET_ON', payload: true });
    setTimeout(() => {
      this.setState({
        urunler: filteredUrunler,
        cokSatan: filteredCokSatan,
        isLoading: false,
      });
    }, 2500);
  };

  modalOpen = () => this.setState({ openModal: true });

  modalClose = () => this.setState({ openModal: false });

  discountForm = async (e) => {
    e.preventDefault();
    const data = { coupon: this.coupon.inputRef.current.value };
    this.setState({ isLoadingDiscount: true });
    await this.props.dispatch(getCoupon(data));
    this.setState({ isLoadingDiscount: false });
  };

  render() {
    // const urunlerVarMi = onerilenUrunler && onerilenUrunler.length > 0;

    const {
      openModal,
      openDiscount,
      isLoading,
      isLoadingDiscount,
      urunler,
      cokSatan,
      isSepet,
    } = this.state;
    const {
      onerilenUrunler, cart, coupon, isLogin,
    } = this.props;
    // this.forRefresh();
    // console.log(urunler,cokSatan);
    // let getNoAllOnerilen = [];
    // onerilenUrunler.urunler.map((item) => {
    //   getNoAllOnerilen.push(item.no);
    // });
  
    // const getCart = cart === null ? [] : cart.urunler;
    // let onerilenForModal = [];
    // if(typeof getCart !== 'undefined'){
    //   onerilenForModal = getCart.filter((item) => {
    //     return getNoAllOnerilen.includes(item.urun_detay.no);
    //   });
    // }
    
    return (
      <Layout meta={{ title: 'Sepet', isSepet }}>
        <CartPage>
          <Container>
            {cart === null ? null : (
              <Section mt={1} mb={1}>
                <Flex
                  width={[1, 1, 4 / 5]}
                  mb={2}
                  pr={[0, 0, 2]}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Title className="cart-title">
                    Sepetim
                    {' '}
                    <span>
                      (
                      {cart ? (cart.urunler ? cart.urunler.length : 0) : 0}
                      {' '}
                      Ürün)
                    </span>
                  </Title>
                  <Link className="alisverise-devam-et">
                    <i className="icon-arrow-left" />
                    {' '}
                    <span>Alışverişe Devam Et</span>
                  </Link>
                </Flex>

                <Flex className="cart-area" alignItems="flex-start" justifyContent="space-between">
                  {isLoading ? (
                    <div className="loader-wrapper">
                      <Spinner />
                    </div>
                  ) : (
                    <Flex
                      className="cart-flex"
                      flexDirection="column"
                      width={[0.76]}
                    >
                      {cart && cart.urunler ? (
                        <Box
                          className="cart-box"
                          width={[1, 1, 1]}
                          mx={[0, 0, 1]}
                        >
                          {cart.urunler
                            .sort((a, b) => {
                              const nameA = a.urun_detay.name.toUpperCase();
                              const nameB = b.urun_detay.name.toUpperCase();
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }
                              return 0;
                            })
                            .map(
                              (item) => item.urun_detay && (
                              <CartProductCard
                                product={item}
                                key={item.urun_detay.no}
                              />
                              ),
                            )}
                          {cart.kargo !== 0 && site === 'aloparca' && parseInt(cart.subtotal) < 200 && (
                            <a
                              href="javascript:;"
                              onClick={this.modalOpen}
                              className="ucretsiz-kargo"
                            >
                              Önerilen ürünlerden sepetine ekle, kargo ücreti
                              ödeme.
                              {' '}
                              <span>Tıkla!</span>
                            </a>
                          )}
                          {/*
                            cart
                            && cart.subtotal
                            && Number(cart.subtotal.split(',')[0]) <= 350 && (
                              <div className="petrol-ofisi">
                                Petrol Ofisi'nden 30 TL Hediye Yakıt Puan
                                Fırsatını Kaçırma! Alışverişini 350 TL'ye
                                Tamamla, 30 TL Hediye Yakıt Puan kazan!
                                {' '}
                                <p className="po-innerp">
                                  Kampanya koşullarını okumak için
                                  <span
                                    onClick={() => Router.pushRoute('petrol-ofisi-kampanya')}
                                  >
                                    Tıkla!
                                  </span>
                                </p>
                              </div>
                          )
                            */}
                        </Box>
                      ) : (
                        <Flex
                          className="cart-empty"
                          width={1}
                          py={5}
                          alignItems="center"
                          justifyContent="center"
                        >
                          Sepetinizde ürün bulunamadı
                        </Flex>
                      )}
                      <SliderSepet className="cart-box slider">
                        {(site === 'b2b' && urunler === [])
                        || urunler === null ? null : (
                          <SliderWrapperSepet>
                            <ProductSliderSepet
                              title="Sizin için tavsiyelerimiz"
                              products={urunler}
                              size={5}
                              titlesize={28}
                              isCart
                              onClose="false"
                            />
                          </SliderWrapperSepet>
                          )}
                      </SliderSepet>
                      <SliderSepet className="cart-box slider">
                        {(site === 'b2b' && cokSatan === [])
                        || cokSatan === null ? null : (
                          <SliderWrapperSepet>
                            <ProductSliderSepet
                              title="Çok satan ürünler"
                              products={cokSatan}
                              size={5}
                              titlesize={28}
                              isCart
                              onClose="false"
                            />
                          </SliderWrapperSepet>
                          )}
                      </SliderSepet>
                    </Flex>
                  )}

                  <FlexFixed
                    className="cart-box odeme"
                    width={[1, 1, 1 / 5]}
                    mx={[0, 0, 1]}
                    mt={[2, 2, 0]}
                    p={2}
                    flexDirection="column"
                  >
                    <Box className="order-title">Sipariş Özeti</Box>
                    <Box className="order-quantity">
                      {cart ? (cart.urunler ? cart.urunler.length : 0) : 0}
                      {' '}
                      Ürün
                    </Box>
                    <Flex className="price-area" py={1} flexDirection="column">
                      <Box className="title">Ödenecek Tutar</Box>
                      {site === 'aloparca' ? (
                        <Box className="price">
                          <span>
                            {cart
                              ? cart.total.split('.')[0].replace(',', '.')
                              : 0}
                          </span>
                          {`,${cart ? cart.total.split('.')[1] : '00'}TL`}
                        </Box>
                      ) : (
                        <Box className="price">
                          <span>
                            {cart
                              ? cart.subtotal.split('.')[0].replace(',', '.')
                              : 0}
                          </span>
                          {`,${cart ? cart.subtotal.split('.')[1] : '00'}TL`}
                        </Box>
                      )}
                    </Flex>
                    {cart && cart.urunler && (
                      <Box my={2}>
                        <Link
                          route={
                            isLogin === false
                              ? 'profile'
                              : 'satin-al/adres-secim'
                          }
                          className="complete-shopping"
                        >
                          Alışverişi Tamamla
                        </Link>
                      </Box>
                    )}
                    {cart && cart.urunler && (
                      <FooterCart>
                        <div className="divFiyat">
                          <div className="divToplam">
                            <h3>Sepet Toplamı:</h3>
                            <span>
                              {cart
                                ? ` ${cart.total
                                  .split('.')[0]
                                  .replace(',', '.')},${cart.total
                                  .split('.')[1]
                                  .replace(',', '.')} TL`
                                : `${0}`}
                            </span>
                          </div>
                          <div className="divBtn">
                            <button
                              onClick={() => Router.pushRoute(
                                isLogin === false
                                  ? 'profile'
                                  : 'satin-al/adres-secim',
                              )}
                            >
                              ALIŞVERİŞİ TAMAMLA
                            </button>
                          </div>
                        </div>
                      </FooterCart>
                    )}
                    <Flex className="price-box" flexDirection="column" my={2}>
                      <Box className="title">Ürünler Toplamı (KDV Dahil)</Box>
                      <Box className="price">
                        <span>
                          {cart
                            ? cart.subtotal.split('.')[0].replace(',', '.')
                            : 0}
                        </span>
                        {`,${cart ? cart.subtotal.split('.')[1] : '00'}TL`}
                      </Box>
                    </Flex>
                    {cart && cart.indirim && cart.indirim.indirim && (
                      <Flex className="price-box" flexDirection="column" mb={2}>
                        <Box className="title">İndirim</Box>
                        <Box className="price">
                          <span>
                            {
                              `${FiyatFormat(cart.indirim.indirim)} TL`
                            }
                          </span>
                        </Box>
                      </Flex>
                    )}

                    <Flex className="price-box" flexDirection="column" mb={2}>
                      <Box className="title">Kargo Ücreti</Box>
                      {site === 'aloparca' ? (
                        <Box className="price">
                          <span>
                            {
                              `${FiyatFormat(cart.kargo)} TL`
                            }
                          </span>
                        </Box>
                      ) : (
                        <Box>Ücretsiz</Box>
                      )}
                    </Flex>
                    {cart && cart.urunler && (
                      <Flex
                        className="discount-code"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <a
                            href="javascript:;"
                            onClick={() => this.setState({ openDiscount: !openDiscount })}
                          >
                            İndirim Çeki Kullan
                          </a>
                          <i className="icon-caret-right" />
                        </Flex>

                        {openDiscount && (
                          <Flex m={1} mt={2}>
                            <form
                              onSubmit={this.discountForm}
                              autoComplete="off"
                            >
                              <Input
                                ref={(n) => {
                                  this.coupon = n;
                                }}
                                defaultValue={coupon}
                                name="discount"
                                type="text"
                              >
                                <input />
                                <Button
                                  type="submit"
                                  name="btn_submit"
                                  disabled={isLoadingDiscount}
                                >
                                  {isLoadingDiscount ? (
                                    <Spinner size="tiny"/>
                                  ) : (
                                    'EKLE'
                                  )}
                                </Button>
                              </Input>
                            </form>
                          </Flex>
                        )}
                      </Flex>
                    )}
                  </FlexFixed>
                </Flex>
              </Section>
            )}

            <SiteFeature />
          </Container>

          {/* {typeof getCart !== 'undefined' && getCart.length !== 0 && onerilenForModal.length === 0 && openModal && site === 'aloparca' && parseInt(cart.subtotal) < 200 &&(
            <Modal
              size="large"
              dimmer="blurring"
              open={openModal}
              onClose={this.modalClose}
              className="products-slider"
            >
              <Modal.Content style={{ padding: '50px' }}>
                <ModalCloseIcon onClick={this.modalClose}>
                  <Icon name='close' size='large' color="white" />
                </ModalCloseIcon>
                <SliderWrapper>
                  <ProductSlider
                    title="Kargoyu Ücretsiz Yapan Ürünler"
                    products={onerilenUrunler.urunler.filter(
                      (p) => p.stok_adet != 0,
                    )}
                    size={4}
                    titlesize={28}
                    isCart
                    onClose={this.modalClose}
                  />
                </SliderWrapper>
              </Modal.Content>
            </Modal>
          )} */}
        </CartPage>
      </Layout>
    );
  }
}
const mapStateToProps = ({
  cart, coupon, isLogin, userData,
}) => ({
  cart,
  coupon,
  isLogin,
  userData,
});
export default connect(mapStateToProps)(Sepet);
