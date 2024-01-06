/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  Input, Button, Checkbox, Modal
} from 'semantic-ui-react';
import { Router } from '../routes';
import Spinner from '../ui/spinner';

import Layout from './container';
import { Container, Link } from '../reactor';
import { Title } from '../components/style';
import { media } from '../style/theme';
import { getCoupon } from '../actions';
import { site } from '../reactor/func';
import FiyatFormat from '../components/fiyat-format';

const Outer = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .checkout-area {
    ${media.tablet`
      flex-direction: column;
    `};
    a.sozlesme {
      color: #ff8900;
    }
  }
  .siparis-adim {
    .adim {
      width: 80px;
      height: 80px;
      font-size: 30px;
      font-weight: 600;
      color: #999999;
      background-color: white;
      border-radius: 50%;
      border: 1px dashed #999999;
      ${media.tablet`
        width: 60px;
        height: 60px;
        font-size: 24px;
      `};
      &.active {
        color: white;
        background-color: #ff8900;
        border: 0;
      }
      &.complete {
        font-size: 48px;
        color: white;
        background-color: #999999;
        border: 0;
        ${media.tablet`
          font-size: 36px;
        `};
      }
    }
    .cizgi {
      flex-grow: 1;
      height: 1px;
      border-top: 1px dashed #999999;
    }
  }
  .back {
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    .visa-master {
      border-top: 1px solid #dddddd;
      img {
        max-width: 100px;
        max-height: 50px;
        margin: 0 20px;
        ${media.tablet`
          max-width: 50px;
          max-height: 25px;
          margin: 0 10px;
        `};
      }
    }
  }
  .ozet {
    font-size: 14px;
    color: #525355;
    strong {
      font-weight: 500;
    }
    .ozet-baslik {
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
      color: #333333;
    }
    .ozet-urun-adet {
      font-size: 16px;
      font-weight: 500;
      color: #ff8900;
    }
    .ozet-toplam-tutar {
      font-size: 18px;
      color: black;
      strong {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: -4px;
      }
    }
    .ozet-devam-et {
      display: flex;
      justify-content: center;
      padding: 15px;
      border-radius: 3px;
      background-image: linear-gradient(0deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      font-size: 18px;
      font-weight: 500;
      color: white;
    }
    .ozet-devam-et-pasif {
      display: flex;
      justify-content: center;
      padding: 15px;
      border-radius: 3px;
      background-color: #dddddd;
      font-size: 18px;
      font-weight: 500;
      color: white;
    }
    .ozet-tutar {
      .tutar {
        font-size: 18px;
        color: black;
        strong {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: -1px;
          margin-right: 3px;
        }
      }
    }
    .indirim-kodu {
      border-radius: 3px;
      background-color: #dddddd;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      i {
        margin-left: 10px;
      }
    }
  }
  .discount-code {
    border-radius: 3px;
    background-color: #dddddd;
    padding: 10px 0;
    font-size: 16px;
    color: #333333;
    i {
      margin-left: 10px;
    }
    .ui.input {
      display: flex;
      input {
        width: 75%;
        border: 0;
        border-radius: 0;
      }
      .ui.button {
        margin: 0;
        width: 25%;
        padding: 0;
        border: 0;
        border-radius: 0;
        color: white;
        background-color: #ff8900;
      }
    }
  }
  .ui.checkbox .box:before,
  .ui.checkbox label:before {
    border-radius: 50%;
  }

  .ui.checkbox input:checked ~ .box:after,
  .ui.checkbox input:checked ~ label:after {
    content: '';
  }
  .ui.checkbox input:checked ~ .box:before,
  .ui.checkbox input:checked ~ label:before {
    border: 5px solid #ff8900;
  }
`;

const FlexFixed = styled(Flex)`
  position: sticky;
  top: 30px;
`;

class CheckoutLayout extends React.Component {
  state = {
    isLoading: false,
    openDiscount: false,
    mesafeli: true,
    kvkk: true,
    openModal: false,
    openKumbara: false,
    isKumbaraChecked: false,
  };

  componentDidMount() {
    const { cart } = this.props;
    cart === null ? null : cart.subtotal === '0.00' && Router.pushRoute('/sepet');
  }

  discountForm = async (e) => {
    e.preventDefault();
    const data = { coupon: this.coupon.inputRef.current.value };
    this.setState({ isLoading: true });
    await this.props.dispatch(getCoupon(data));
    this.setState({ isLoading: false });
  };

  render() {
    const {
      openDiscount, mesafeli, kvkk, openModal, isLoading,
    } = this.state;
    const {
      title,
      step,
      children,
      route,
      cart,
      checkoutFunc,
      coupon,
      userData,
    } = this.props;

    // const kkKes = String(this.props.kkartKes).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
    let kkKes = String(parseFloat(this.props.kkartKes));
    kkKes = kkKes.split('.')[1] === undefined || kkKes.split('.')[1] === null ? `${kkKes}.00` : kkKes;

    const cartTot = cart === null ? null : cart.subtotal;
    let total;
    this.props.userData && this.props.userData.user[0].b2b_access !== '1' && cartTot !== null ? total = cartTot : total = kkKes;


    let checkoutFuncProps = {};
    if (checkoutFunc) {
      checkoutFuncProps = {
        nativeLink: true,
        nativeProps: {
          onClick: checkoutFunc,
        },
      };
    }
    return (
      <Layout meta={{ title }}>
        <Outer>
          <Container>
            {cart === null ? null : (
              <Flex flexDirection="column">
                <Flex width={[1, 1, 4 / 5]} mb={4} justifyContent="center">
                  <Flex
                    className="siparis-adim"
                    width={[1, 1, 1 / 2]}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Flex
                      className={cx('adim', {
                        active: step == 1,
                        complete: step > 1,
                      })}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {step > 1 ? <i className="icon-check" /> : '1'}
                    </Flex>
                    <Flex className="cizgi" />
                    <Flex
                      className={cx('adim', {
                        active: step == 2,
                        complete: step > 2,
                      })}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {step > 2 ? <i className="icon-check" /> : '2'}
                    </Flex>
                    <Flex className="cizgi" />
                    <Flex
                      className={cx('adim', {
                        active: step == 3,
                        complete: step > 3,
                      })}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {step > 3 ? <i className="icon-check" /> : '3'}
                    </Flex>
                  </Flex>
                </Flex>
                <Title>{title}</Title>
                <Flex className="checkout-area" mx={-1} alignItems="flex-start">
                  <Flex
                    flexDirection="column"
                    className="back"
                    width={[1, 1, 4 / 5]}
                    mx={[0, 0, 1]}
                  >
                    {children}
                    <Flex
                      mt={2}
                      p={3}
                      className="visa-master"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img src="/static/img/visa.svg" alt="Visa" />
                      <img
                        src="/static/img/verified-by-visa.svg"
                        alt="Verified By Visa"
                      />
                      <img src="/static/img/mastercard.svg" alt="MasterCard" />
                      <img
                        src="/static/img/mastercard-securecode.svg"
                        alt="MasterCard SecureCode"
                      />
                      <img src="/static/img/rapid-ssl.svg" alt="Rapid SSL" />
                    </Flex>
                  </Flex>
                  <FlexFixed
                    className="back ozet"
                    width={[1, 1, 1 / 5]}
                    p={2}
                    mx={[0, 0, 1]}
                    mt={[2, 2, 0]}
                    flexDirection="column"
                  >
                    <Box className="ozet-baslik">Sipariş Özeti</Box>
                    <Box className="ozet-urun-adet" mt={1}>
                      {`${
                        cart && cart.urunler ? cart.urunler.length : '0'
                      } Ürün`}
                    </Box>
                    <Box mt={3} mb={1}>
                      <strong>Ödenecek Tutar</strong>
                    </Box>

                    {site === 'aloparca' && (
                      <Flex alignItems="flex-end" className="ozet-toplam-tutar">
                        <strong>
                          {cart && cart.total ? cart.total.split('.')[0] : 0}
                        </strong>
                        {`,${cart && cart.total ? cart.total.split('.')[1] : 0}TL`}
                      </Flex>
                    )}

                    {site === 'b2b' && (
                      <>
                        <Flex
                          alignItems="flex-end"
                          className="ozet-toplam-tutar"
                        >
                          <strong>
                            {String(cart.subtotal)
                              ? String(cart.subtotal).split('.')[0]
                              : 0}
                          </strong>
                          {`,${cart.subtotal ? String(cart.subtotal).split('.')[1] : 0}TL`}
                        </Flex>
                        <br />
                        <Flex
                          className="ozet-tutar"
                          mb={2}
                          flexDirection="column"
                        >
                          <Box>Kumbaradan ödenecek</Box>

                          <Flex className="tutar" alignItems="flex-end">
                            <strong>
                              {this.props.kumbKes
                                ? this.props.kumbKes
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                  .split('.')[0]
                                : 0}
                            </strong>
                            {`,${this.props.kumbKes ? this.props.kumbKes.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')[1] : 0}TL`}
                          </Flex>
                        </Flex>
                        <Flex
                          className="ozet-tutar"
                          mb={2}
                          flexDirection="column"
                        >
                          {this.props.havaledeKumb ? (
                            <Box>Havale ile ödenecek</Box>
                          ) : (
                            <Box>Kredi kartından ödenecek</Box>
                          )}
                          <Flex className="tutar" alignItems="flex-end">
                            {cart ? (
                              <>
                                <strong>{kkKes.split('.')[0]}</strong>
                                {`,${kkKes.split('.')[1]}TL`}
                              </>
                            ) : (
                              <>
                                <strong>0</strong>
                                ,00TL
                              </>
                            )}
                          </Flex>
                        </Flex>
                      </>
                    )}

                    <Box my={3}>
                      {mesafeli && kvkk ? (
                        <Link
                          route={route}
                          className="ozet-devam-et"
                          {...checkoutFuncProps}
                        >
                          DEVAM ET
                        </Link>
                      ) : (
                        <div className="ozet-devam-et-pasif">DEVAM ET</div>
                      )}
                    </Box>
                    {step == 2 ? (
                      <Flex width={1} flexDirection="column">
                        <Box mb={3}>
                          <Checkbox
                            label={(
                              <label>
                                {'Mesafeli satış sözleşmesini '}
                                <a
                                  href="javascript:;"
                                  onClick={() => this.setState({ openModal: true })}
                                  className="sozlesme"
                                >
                                okudum kabul ediyorum.
                                </a>
                              </label>
                            )}
                            checked={mesafeli}
                            onChange={() => this.setState({ mesafeli: !mesafeli })}
                          />
                        </Box>
                        <Box mb={3}>
                          <Checkbox
                            label={(
                              <label>
                                {'Kişisel verilerin korunması kanunu '}
                                <a
                                  href="/kurumsal/kisisel-verilerin-korunmasi"
                                  target="_blank"
                                  className="sozlesme"
                                >
                                  okudum kabul ediyorum.
                                </a>
                              </label>
                            )}
                            checked={kvkk}
                            onChange={() => this.setState({ kvkk: !kvkk })}
                          />
                        </Box>
                      </Flex>
                    ) : null}
                    <Flex className="ozet-tutar" mb={2} flexDirection="column">
                      <Box>Ürünler Toplamı (KDV Dahil)</Box>
                      <Flex className="tutar" alignItems="flex-end">
                        <strong>
                        {FiyatFormat(cart.subtotal)}
                        </strong>
                        TL
                      </Flex>
                    </Flex>
                    {cart && cart.indirim && cart.indirim.indirim && (
                       <Flex className="ozet-tutar" mb={2} flexDirection="column">
                        <Box>İndirim</Box>
                        <Flex className="tutar" alignItems="flex-end">
                          <strong>
                          {FiyatFormat(cart.indirim.indirim)}
                          </strong>
                          TL
                        </Flex>
                     </Flex>
                    )}
                    <Flex className="ozet-tutar" mb={2} flexDirection="column">
                      <Box>Kargo Ücreti</Box>
                      <Flex className="tutar" alignItems="flex-end" mt="0.1em">
                        <>
                          {site === 'aloparca' ? (
                            <>
                              <strong>
                                {cart.kargo.toString().split('.')[0]}
                              </strong>
                              ,
                              {cart.kargo.toString().split('.')[1]}
                              TL
                            </>
                          ) : (
                            <>Ücretsiz</>
                          )}
                        </>
                      </Flex>
                    </Flex>
                  </FlexFixed>
                </Flex>
              </Flex>
            )}
            <Modal
              open={openModal}
              onClose={() => this.setState({ openModal: false })}
              closeIcon
            >
              <Modal.Header>SATIŞ SÖZLEŞMESİ</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <p>
                    <span>Bu belgede&nbsp;</span>
                    <a href="https://www.aloparca.com/">aloparca.com</a>
                    &nbsp;olarak geçen Aloparca Oto Yedekparça Elektronik Hiz.
                    San.ve Dış Tic. Ltd. Şti. ile Müşteri arasındaki Sanal
                    Ortamda Mesafeli Satış Sözleşmesi &#39;dir.
                  </p>

                  <p>
                    <span>Madde - 1</span>
                  </p>

                  <p>
                    <span>
                      İş bu sözleşmenin konusu, satıcının, alıcıya satışını
                      yaptığı, aşağıda nitelikleri ve satış fiyatı belirtilen
                      ürünün satışı ve teslimi ile ilgili olarak 4077 sayılı
                      Tüketicilerin Korunması Hakkındaki Kanunun; Mesafeli
                      Sözleşmeleri Uygulama Esas ve Usulleri Hakkında Yönetmelik
                      hükümleri gereğince tarafların hak ve yükümlülüklerinin
                      kapsamaktadır.
                    </span>
                  </p>

                  <p>
                    <span>Madde - 2</span>
                  </p>

                  <p>
                    <span>SATICI BİLGİLERİ</span>
                  </p>

                  <p>
                    <span>
                      ünvanı: Aloparca Oto Yedekparça Elektronik Hiz. San.ve Dış
                      Tic. Ltd. Şti (Bundan sonra&nbsp;
                    </span>
                    <a href="https://www.aloparca.com/">
                      https://www.aloparca.com
                    </a>
                    &nbsp;veya SATICI olarak anılacaktır)
                  </p>

                  <p>
                    <span>
                      Adresi: Fevzipaşa Cad. Dervişali Mah. Aktarkerim Sok.
                      No:25/1 Edirnekapı/ Fatih/ İstanbul
                    </span>
                  </p>

                  <p>
                    <span>Madde - 3</span>
                  </p>

                  <p>
                    <span>ALICI BİLGİLERİ</span>
                  </p>

                  <p>
                    <span>Adi -Soyadı/ünvanı:</span>
                  </p>

                  <p>
                    <span>Adresi :</span>
                  </p>

                  <p>
                    <span>Telefon:</span>
                  </p>

                  <p>
                    <span>Faks:</span>
                  </p>

                  <p>
                    <span>E-mail:</span>
                  </p>

                  <p>
                    <span>Madde - 4</span>
                  </p>

                  <p>
                    <span>SöZLEŞME KONUSU VE üRüN BİLGİLERİ:</span>
                  </p>

                  <p>
                    <span>Mal / ürün/Hizmet Türü:</span>
                  </p>

                  <p>
                    <span>Marka/Model:</span>
                  </p>

                  <p>
                    <span>Rengi:</span>
                  </p>

                  <p>
                    <span>Adedi:</span>
                  </p>

                  <p>
                    <span>Satış Fiyatı (KDV dahil) :</span>
                  </p>

                  <p>
                    <span>Kargo ücreti:</span>
                  </p>

                  <p>
                    <span>ödeme Sekli:</span>
                  </p>

                  <p>
                    <span>Teslimat Adresi :</span>
                  </p>

                  <p>
                    <span>Teslim Edilecek Kişi:</span>
                  </p>

                  <p>
                    <span>Fatura Adresi:</span>
                  </p>

                  <p>
                    <span>Madde - 5</span>
                  </p>

                  <p>
                    <span>GENEL HüKüMLER</span>
                  </p>

                  <p>
                    <span>
                      5.1- ALICI, www.aloparca.com internet sitesinde sözleşme
                      konusu ürünlerin temel nitelikleri, satış fiyatı ve ödeme
                      şekli ile teslimata ilişkin ön bilgileri okuyup bilgi
                      sahibi olduğunu ve elektronik ortamda gerekli teyidi
                      verdiğini beyan eder.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.2- Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak
                      koşulu ile her bir ürün için ALICI&#39;nın yerleşim
                      yerinin uzaklığına bağlı olarak internet sitesinde ön
                      bilgiler içinde açıklanan süre içinde ALICI veya
                      gösterdiği adresteki kişi/kuruluşa teslim edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.3- Sözleşme konusu ürün, ALICI&#39;dan başka bir
                      kişi/kuruluşa teslim edilecek ise, teslim edilecek
                      kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu
                      tutulamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.4- SATICI, sözleşme konusu ürünün sağlam, eksiksiz,
                      siparişte belirtilen niteliklere uygun ve varsa garanti
                      belgeleri ve kullanım kılavuzları ile teslim edilmesinden
                      sorumludur.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.5- Sözleşme konusu ürünün teslimatı için ürün(ler)
                      bedelinin ALICI&#39;nın tercih ettiği ödeme şekli ile
                      ödenmiş olması şarttır. Herhangi bir nedenle ürün bedeli
                      ödenmez veya banka kayıtlarında iptal edilir ise, SATICI
                      ürünün teslimi yükümlülüğünden kurtulmuş kabul edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.6- ürünün tesliminden sonra ALICI&#39;ya ait kredi
                      kartının ALICI&#39;nın kusurundan kaynaklanmayan bir
                      sekilde yetkisiz kişilerce haksız veya hukuka aykırı
                      olarak kullanılması nedeni ile ilgili banka veya finans
                      kuruluşun ürün bedelini SATICI&#39;ya ödememesi halinde,
                      ALICI&#39;nın kendisine teslim edilmiş olması kaydıyla
                      ürünün 3 gün içinde SATICI&#39;ya gönderilmesi zorunludur.
                      Bu takdirde nakliye giderleri ALICI&#39;ya aittir.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.7- SATICI mücbir sebepler veya nakliyeyi engelleyen hava
                      muhalefeti, ulaşımın kesilmesi gibi olağanüstü durumlar
                      nedeni ile sözleşme konusu ürünü süresi içinde teslim
                      edemez ise, durumu ALICI&#39;ya bildirmekle yükümlüdür. Bu
                      takdirde ALICI siparişin iptal edilmesini, sözleşme konusu
                      ürünün varsa emsali ile değiştirilmesini ve/veya teslimat
                      süresinin engelleyici durumun ortadan kalkmasına kadar
                      ertelenmesi haklarından birini kullanabilir. ALICI&#39;nın
                      siparişi iptal etmesi halinde ödediği tutar 10 gün içinde
                      kendisine nakden ve defaten ödenir.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.8- Garanti belgesi ile satılan ürünlerden olan veya
                      olmayan ürünlerin arızalı veya bozuk olanlar, garanti
                      şartları içinde gerekli onarımın yapılması için
                      SATICI&#39;ya gönderilebilir, bu takdirde kargo giderleri
                      SATICI tarafından karşılanacaktır.
                    </span>
                  </p>

                  <p>
                    <span>
                      5.9- Tipografi hatalar ve yanlış fiyat girilmesinden
                      firmamız sorumlu tutulamaz.
                    </span>
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    <span>Madde - 6</span>
                  </p>

                  <p>
                    <span>CAYMA HAKKI:</span>
                  </p>

                  <p>
                    <span>
                      Alıcı, sözleşme konusu ürünün kendisine veya gösterdiği
                      adresteki kişi/kuruluşa tesliminden itibaren on dört (14)
                      gün içinde cayma hakkına sahiptir. Cayma hakkinin
                      kullanılabilmesi için bu süre içinde SATICI&#39;ya faks
                      veya elektronik posta ile bildirimde bulunulması ve ürünün
                      7. madde hükümleri çerçevesinde kullanılmamış ve
                      ambalajının zarar görmemiş olması şarttır. Bu hakkın
                      kullanılması halinde, 3. kişiye veya Alıcı&#39;ya teslim
                      edilen ürünün SATICI&#39;ya gönderildiğine dair kargo
                      teslim tutanağı örneği ile satış faturası aslinin iadesi
                      zorunludur. Bu belgelerin ulaşmasını takip eden 5 gün
                      içinde ürün bedelinin ALICI&#39;nin hesabına iade edilmesi
                      için SATICI ilgili banka nezdinde girişimde bulunur. ürün
                      bedelinin iadesinde banka tarafındaki aksaklıklardan
                      dolayı SATICI sorumlu tutulamaz. Satış faturasının aslının
                      gönderilmemesi durumunda katma değer vergisi ve varsa
                      diğer yasal yükümlülükler iade edilmez. Cayma hakki nedeni
                      ile iade edilen ürünün kargo bedeli ALICI&#39;ya aittir.
                      İade edilecek her türlü ürünün ambalajının açılmamış,
                      bozulmamış ve ürünün kullanılmamış olmasa şartına
                      bağlıdır.
                    </span>
                  </p>

                  <p>
                    <span>Madde - 7</span>
                  </p>

                  <p>
                    <span>YETKİLİMAHKEME:</span>
                  </p>

                  <p>
                    <span>
                      İş bu sözleşmenin uygulanmasında, Sanayi ve Ticaret
                      Bakanlığınca ilan edilen değere kadar Tüketici Hakem
                      Heyetleri ile ALICI&#39;nin veya SATICI&#39;nın yerleşim
                      yerindeki TüKETİCİ MAHKEMELERİ yetkilidir. Siparişin
                      elektronik ortamda onaylanması durumunda, ALICI iş bu
                      sözleşmenin tüm hükümlerini kabul etmiş sayılır.
                    </span>
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    <span>
                      4822 SAYILI KANUNLA DEĞİŞİKLİK ve 4077 SAYILI TüKETİCİNİN
                      KORUNMASI HAKKINDA KANUN
                    </span>
                  </p>

                  <p>
                    <span>BIRINCI KISIM</span>
                  </p>

                  <p>
                    <span>Amaç, Kapsam, Tanımlar</span>
                  </p>

                  <p>
                    <span>Amaç</span>
                  </p>

                  <p>
                    <span>
                      Madde 1- Bu Kanunun amacı, kamu yararına uygun olarak
                      tüketicinin sağlık ve güvenliği ile ekonomik çıkarlarını
                      koruyucu, aydınlatıcı, eğitici, zararlarını tazmin edici,
                      çevresel tehlikelerden korunmasını sağlayıcı önlemleri
                      almak ve tüketicilerin kendilerini koruyucu girişimlerini
                      özendirmek ve bu konudaki politikaların oluşturulmasında
                      gönüllü örgütlenmeleri teşvik etmeye ilişkin hususları
                      düzenlemektir.
                    </span>
                  </p>

                  <p>
                    <span>Kapsam</span>
                  </p>

                  <p>
                    <span>
                      Madde 2- Bu Kanun, birinci maddede belirtilen amaçlarla
                      mal ve hizmet piyasalarında tüketicinin taraflardan birini
                      oluşturduğu her türlü tüketici işlemini kapsar.
                    </span>
                  </p>

                  <p>
                    <span>İKİNCİ KISIM</span>
                  </p>

                  <p>
                    <span>Tüketicinin Korunması ve Aydınlatılması</span>
                  </p>

                  <p>
                    <span>Ayıplı mal</span>
                  </p>

                  <p>
                    <span>
                      Madde 4- Ambalajında, etiketinde, tanıtma ve kullanma
                      kılavuzunda ya da reklam ve il&acirc;nlarında yer alan
                      veya satıcı tarafından bildirilen veya standardında veya
                      teknik düzenlemesinde tespit edilen nitelik veya niteliği
                      etkileyen niceliğine aykırı olan ya da tahsis veya
                      kullanım amacı bakımından değerini veya tüketicinin ondan
                      beklediği faydaları azaltan veya ortadan kaldıran maddi,
                      hukuki veya ekonomik eksiklikler içeren mallar, ayıplı mal
                      olarak kabul edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici, malin teslimi tarihinden itibaren otuz gün
                      içerisinde ayıbı satıcıya bildirmekle yükümlüdür. Tüketici
                      bu durumda, bedel iadesini de içeren sözleşmeden dönme,
                      malin ayıpsız misliyle değiştirilmesi veya ayıp oranında
                      bedel indirimi ya da ücretsiz onarım isteme haklarına
                      sahiptir. Satıcı, tüketicinin tercih ettiği bu talebi
                      yerine getirmekle yükümlüdür. Tüketici bu seçimlik
                      haklarından biri ile birlikte ayıplı malin neden olduğu
                      ölüm ve/veya yaralanmaya yol açan ve/veya kullanımdaki
                      diğer mallarda zarara neden olan hallerde
                      imalatçı-üreticiden tazminat isteme hakkına da sahiptir.
                    </span>
                  </p>

                  <p>
                    <span>
                      İmalatçı-üretici, satıcı, bayi, acente, ithalatçı ve 10
                      uncu maddenin besinci fıkrasına göre kredi veren ayıplı
                      maldan ve tüketicinin bu maddede yer alan seçimlik
                      haklarından dolayı müteselsilen sorumludur. Ayıplı malin
                      neden olduğu zarardan dolayı birden fazla kimse sorumlu
                      olduğu takdirde bunlar müteselsilen sorumludurlar. Satılan
                      malin ayıplı olduğunun bilinmemesi bu sorumluluğu ortadan
                      kaldırmaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bu madde ile ayıba karşı sorumlu tutulanlar, ayıba karşı
                      daha uzun bir süre ile sorumluluk üstlenmemişlerse, ayıplı
                      maldan sorumluluk, ayıp daha sonra ortaya çıkmış olsa bile
                      malin tüketiciye teslimi tarihinden itibaren iki yıllık
                      zaman asımına tabidir. Bu süre konut ve tatil amaçlı
                      taşınmaz mallarda beş yıldır. Ayıplı malin neden olduğu
                      her türlü zararlardan dolayı yapılacak talepler ise üç
                      yıllık zaman aşımına tabidir. Bu talepler zarara sebep
                      olan malin piyasaya sürüldüğü günden başlayarak on yıl
                      sonra ortadan kalkar. Ancak, satılan malin ayıbı,
                      tüketiciden satıcının ağır kusuru veya hile ile
                      gizlenmişse zaman aşımı süresinden yararlanılamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Ayıplı malin neden olduğu zararlardan sorumluluğa ilişkin
                      hükümler dışında, ayıplı olduğu bilinerek satın alınan
                      mallar hakkında yukarıdaki hükümler uygulanmaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satışa sunulacak ayıplı mal üzerine ya da ambalajına,
                      imalatçı veya satıcı tarafından tüketicinin kolaylıkla
                      okuyabileceği şekilde &quot;özürlüdür&quot; ibaresini
                      içeren bir etiket konulması zorunludur. Yalnızca ayıplı
                      mal satılan veya bir kat ya da reyon gibi bir bölümü
                      sürekli olarak ayıplı mal satışına, tüketicinin
                      bilebileceği şekilde tahsis edilmiş yerlerde bu etiketin
                      konulma zorunluluğu yoktur. Malin ayıplı olduğu hususu,
                      tüketiciye verilen fatura, fiş veya satış belgesi üzerinde
                      gösterilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Güvenli olmayan mallar, piyasaya özürlüdür etiketiyle dahi
                      arz edilemez. Bu ürünlere, 4703 sayılı ürünlere İlişkin
                      Teknik Mevzuatın Hazırlanması ve Uygulanmasına Dair Kanun
                      hükümleri uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bu hükümler, mal satışına ilişkin her türlü tüketici
                      işleminde de uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>Ayıplı hizmet</span>
                  </p>

                  <p>
                    <span>
                      Madde 4/A- Sağlayıcı tarafından bildirilen reklam ve
                      il&acirc;nlarında veya standardında veya teknik kuralında
                      tespit edilen nitelik veya niteliği etkileyen niceliğine
                      aykırı olan ya da yararlanma amacı bakımından değerini
                      veya tüketicinin ondan beklediği faydaları azaltan veya
                      ortadan kaldıran maddi, hukuki veya ekonomik eksiklikler
                      içeren hizmetler, ayıplı hizmet olarak kabul edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici, hizmetin ifa edildiği tarihten itibaren otuz gün
                      içerisinde bu ayıbı sağlayıcıya bildirmekle yükümlüdür.
                      Tüketici bu durumda, sözleşmeden dönme, hizmetin yeniden
                      görülmesi veya ayıp oranında bedel indirimi haklarına
                      sahiptir. Tüketicinin sözleşmeyi sona erdirmesi, durumun
                      gereği olarak haklı görülemiyorsa, bedelden indirim ile
                      yetinilir. Tüketici, bu seçimlik haklarından biri ile
                      birlikte 4 üncü maddede belirtilen şartlar çerçevesinde
                      tazminat da isteyebilir. Sağlayıcı, tüketicinin seçtiği bu
                      talebi yerine getirmekle yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Sağlayıcı, bayi, acente ve 10 uncu maddenin besinci
                      fıkrasına göre kredi veren, ayıplı hizmetten ve ayıplı
                      hizmetin neden olduğu her türlü zarardan ve tüketicinin bu
                      maddede yer alan seçimlik haklarından dolayı müteselsilen
                      sorumludur. Sunulan hizmetin ayıplı olduğunun bilinmemesi
                      bu sorumluluğu ortadan kaldırmaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Daha uzun bir süre için garanti verilmemiş ise, ayıp daha
                      sonra ortaya çıkmış olsa bile ayıplı hizmetten dolayı
                      yapılacak talepler hizmetin ifasından itibaren iki yıllık
                      zaman aşımına tabidir. Ayıplı hizmetin neden olduğu her
                      türlü zararlardan dolayı yapılacak talepler ise üç yıllık
                      zaman aşımına tabidir. Ancak, sunulan hizmetin ayıbı,
                      tüketiciden sağlayıcının ağır kusuru veya hile ile
                      gizlenmişse zaman aşımı süresinden yararlanılamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Ayıplı hizmetin neden olduğu zararlardan sorumluluğa
                      ilişkin hükümler dışında, ayıplı olduğu bilinerek edinilen
                      hizmetler hakkında yukarıdaki hükümler uygulanmaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bu hükümler, hizmet sağlamaya ilişkin her türlü tüketici
                      işleminde de uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>Satıştan kaçınma</span>
                  </p>

                  <p>
                    <span>
                      Madde 5- Hizmet sağlamada da haklı bir sebep olmaksızın
                      kaçınılamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Aksine bir teamül, ticari örf veya adet yoksa, satıcı bir
                      mal veya hizmetin satışını o mal veya hizmetin kendisi
                      tarafından belirlenen miktar, sayı veya ebat gibi
                      koşullara ya da başka bir mal veya hizmetin satın
                      alınmasına bağlı kılamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Diğer mal satışı ve hizmet sağlama sözleşmelerinde de bu
                      hüküm uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>Sözleşmelerdeki haksız şartlar</span>
                  </p>

                  <p>
                    <span>
                      Madde 6- Satıcı veya sağlayıcının tüketiciyle müzakere
                      etmeden, tek taraflı olarak sözleşmeye koyduğu, tarafların
                      sözleşmeden doğan hak ve yükümlülüklerinde iyi niyet
                      kuralına aykırı düşecek biçimde tüketici aleyhine
                      dengesizliğe neden olan sözleşme koşulları haksız şarttır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Taraflardan birini tüketicinin oluşturduğu her türlü
                      sözleşmede yer alan haksız şartlar tüketici için bağlayıcı
                      değildir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Eğer bir sözleşme şartı önceden hazırlanmışsa ve özellikle
                      standart sözleşmede yer alması nedeniyle tüketici
                      içeriğine etki edememişse, o sözleşme şartının tüketiciyle
                      müzakere edilmediği kabul edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Sözleşmenin bütün olarak değerlendirilmesinden, standart
                      sözleşme olduğu sonucuna varılırsa, bu sözleşmedeki bir
                      şartın belirli unsurlarının veya münferit bir hükmünün
                      müzakere edilmiş olması, sözleşmenin kalan kısmına bu
                      maddenin uygulanmasını engellemez.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bir satıcı veya sağlayıcı, bir standart şartın münferiden
                      tartışıldığını ileri sürüyorsa, bunu ispat yükü ona
                      aittir.
                    </span>
                  </p>

                  <p>
                    <span>
                      6/A, 6/B, 6/C, 7, 9, 9/A, 10, 10/A ve 11/A maddelerinde
                      yazılı olarak düzenlenmesi öngörülen tüketici sözleşmeleri
                      en az on iki punto ve koyu siyah harflerle düzenlenir ve
                      sözleşmede bulunması gereken şartlardan bir veya
                      birkaçının bulunmaması durumunda eksiklik sözleşmenin
                      geçerliliğini etkilemez. Bu eksiklik satıcı veya sağlayıcı
                      tarafından derhal giderilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık standart sözleşmelerde yer alan haksız şartların
                      tespit edilmesine ve bunların sözleşme metninden
                      çıkartılmasının sağlanmasına ilişkin usul ve esasları
                      belirler.
                    </span>
                  </p>

                  <p>
                    <span>Taksitle satış</span>
                  </p>

                  <p>
                    <span>
                      Madde 6/A- Taksitle satış, satım bedelinin en az iki
                      taksitle ödendiği ve malin veya hizmetin sözleşmenin
                      düzenlendiği anda teslim veya ifa edildiği satım türüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Taksitle satış sözleşmesinin yazılı şekilde yapılması
                      zorunludur. Sözleşmede bulunması gereken asgari koşullar
                      aşağıda gösterilmiştir:
                    </span>
                  </p>

                  <p>
                    <span>
                      a) Tüketicinin ve satıcı veya sağlayıcının isim, unvan,
                      açık adresleri ve varsa erişim bilgileri,
                    </span>
                  </p>

                  <p>
                    <span>
                      b) Malin veya hizmetin Türk Lirası olarak vergiler dahil
                      pesin satış fiyatı,
                    </span>
                  </p>

                  <p>
                    <span>
                      c) Vadeye göre faiz ile birlikte ödenecek Türk Lirası
                      olarak toplam satış fiyatı,
                    </span>
                  </p>

                  <p>
                    <span>
                      d) Faiz miktarı, faizin hesaplandığı yıllık oran ve
                      sözleşmede belirlenen faiz oranının yüzde otuz fazlasını
                      geçmemek üzere gecikme faizi oranı,
                    </span>
                  </p>

                  <p>
                    <span>e) Peşinat tutarı,</span>
                  </p>

                  <p>
                    <span>f) ödeme planı,</span>
                  </p>

                  <p>
                    <span>
                      g) Borçlunun temerrüde düşmesinin hukuki sonuçları.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı veya sağlayıcı, bu bilgilerin sözleşmede yer
                      almasını sağlamak ve taraflar arasında akdedilen
                      sözleşmenin bir nüshasını tüketiciye vermekle yükümlüdür.
                      Sözleşmeden ayrı olarak kıymetli evrak niteliğinde senet
                      düzenlenecekse, bu senet, her bir taksit ödemesi için ayrı
                      ayrı olacak şekilde ve sadece nama yazılı olarak
                      düzenlenir. Aksi takdirde, kambiyo senedi geçersizdir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Taksitle satışlarda; tüketici, borçlandığı toplam miktarı
                      önceden ödeme hakkına sahiptir. Tüketici ayni zamanda, bir
                      taksit miktarından az olmamak şartıyla bir veya birden
                      fazla taksit ödemesinde bulunabilir. Her iki durumda da
                      satıcı, ödenen miktara göre gerekli faiz indirimini
                      yapmakla yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı veya sağlayıcı, taksitlerden birinin veya
                      birkaçının ödenmemesi halinde kalan borcun tümünün ifasını
                      talep etme hakkini saklı tutmuşsa, bu hak; ancak satıcının
                      veya sağlayıcının bütün edimlerini ifa etmiş olması
                      durumunda ve tüketicinin birbirini izleyen en az iki
                      taksiti ödemede temerrüde düşmesi ve ödenmeyen taksit
                      toplamının satış bedelinin en az onda biri olması halinde
                      kullanılabilir. Ancak satıcının veya sağlayıcının bu
                      hakkini kullanabilmesi için en az bir hafta süre vererek
                      muacceliyet uyarısında bulunması gerekir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Sözleşme şartları tüketici aleyhine hiçbir şekilde
                      değiştirilemez.
                    </span>
                  </p>

                  <p>
                    <span>Kapıdan satış</span>
                  </p>

                  <p>
                    <span>Madde 8</span>
                  </p>

                  <p>
                    <span>
                      Kapıdan satış; iş yeri, fuar, panayır gibi satış mekanları
                      dışında yapılan satımlardır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, kapıdan satış yapacaklarda aranılacak
                      nitelikleri, bu Kanuna tabi olan ve olmayan kapıdan
                      satışları ve kapıdan satışlara ilişkin uygulama usul ve
                      esaslarını belirler.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bu tür satışlarda; tüketici, teslim aldığı tarihten
                      itibaren yedi gün içinde mali kabul etmekte veya hiçbir
                      gerekçe göstermeden ve hiçbir yükümlülük altına girmeden
                      reddetmekte serbesttir. Hizmetlerin satımında ise bu süre,
                      sözleşmenin imzalandığı tarihten itibaren baslar. Bu süre
                      dolmadan satıcı veya sağlayıcı, kapıdan satış işlemine
                      konu mal veya hizmet karşılığında tüketiciden herhangi bir
                      isim altında ödeme yapmasını veya borç altına sokan
                      herhangi bir belge vermesini isteyemez. Satıcı, cayma
                      bildirimi kendisine ulaştığı andan itibaren yirmi gün
                      içerisinde mali geri almakla yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici, malin mutat kullanımı sebebiyle meydana gelen
                      değişiklik ve bozulmalarından sorumlu değildir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Taksitle yapılan kapıdan satışlarda 6/A maddesi,
                      kampanyalı kapıdan satışlarda 7&rsquo;nci madde hükümleri
                      ayrıca uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Kapıdan satışlarda satıcının ve sağlayıcının yükümlülüğü
                    </span>
                  </p>

                  <p>
                    <span>Madde 9</span>
                  </p>

                  <p>
                    <span>
                      Kapıdan satış sözleşmelerinde, sözleşmede bulunması
                      gereken diğer unsurlara ilave olarak mal veya hizmetin
                      nitelik ve niceliğine ilişkin açıklayıcı bilgiler, cayma
                      bildiriminin yapılacağı açık adres ve en az on altı punto
                      ve koyu siyah harflerle yazılmış aşağıdaki ibare yer almak
                      zorundadır:
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketicinin hiçbir hukuki ve cezai sorumluluk
                      üstlenmeksizin ve hiçbir gerekçe göstermeksizin teslim
                      aldığı veya sözleşmenin imzalandığı tarihten itibaren yedi
                      gün içerisinde mali veya hizmeti reddederek sözleşmeden
                      cayma hakkinin var olduğunu ve cayma bildiriminin
                      satıcı/sağlayıcıya ulaşması tarihinden itibaren mali geri
                      almayı taahhüt ederiz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici, sahip olduğu haklarının da yazılı bulunduğu
                      sözleşmeyi imzalar ve kendi el yazısı ile tarihini yazar.
                      Satıcı veya sağlayıcı, bu bilgilerin sözleşmede yer
                      almasını sağlamak ve taraflar arasında akdedilen
                      sözleşmenin bir nüshasını tüketiciye vermekle yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bu madde hükümlerine göre düzenlenmiş bir sözleşmenin ve
                      malin tüketiciye teslim edildiğini ispat satıcıya veya
                      sağlayıcıya aittir. Aksi takdirde, tüketici cayma hakkini
                      kullanmak için yedi günlük süre ile bağlı değildir.
                    </span>
                  </p>

                  <p>
                    <span>Mesafeli sözleşmeler</span>
                  </p>

                  <p>
                    <span>Madde 9/A</span>
                  </p>

                  <p>
                    <span>
                      Mesafeli sözleşmeler; yazılı, görsel, telefon ve
                      elektronik ortamda veya diğer iletişim araçları
                      kullanılarak ve tüketicilerle karşı karşıya gelinmeksizin
                      yapılan ve malin veya hizmetin tüketiciye anında veya
                      sonradan teslimi veya ifası kararlaştırılan
                      sözleşmelerdir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Mesafeli satış sözleşmesinin akdinden önce, ayrıntıları
                      Bakanlıkça çıkarılacak tebliğle belirlenecek bilgilerin
                      tüketiciye verilmesi zorunludur. Tüketici, bu bilgileri
                      edindiğini yazılı olarak teyit etmedikçe sözleşme
                      akdedilemez. Elektronik ortamda yapılan sözleşmelerde
                      teyit işlemi, yine elektronik ortamda yapılır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı ve sağlayıcı, tüketicinin siparişi kendisine
                      ulaştığı andan itibaren otuz gün içerisinde edimini yerine
                      getirir. Bu süre, tüketiciye daha önceden yazılı olarak
                      bildirilmek koşuluyla en fazla on gün uzatılabilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı veya sağlayıcı elektronik ortamda tüketiciye teslim
                      edilen gayri madd&icirc; malların veya sunulan hizmetlerin
                      teslimatının ayıpsız olarak yapıldığını ispatla
                      yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Cayma hakki süresince sözleşmeye konu olan mal veya hizmet
                      karşılığında tüketiciden herhangi bir isim altında ödeme
                      yapmasının veya borç altına sokan herhangi bir belge
                      vermesinin istenemeyeceğine ilişkin hükümler dışında
                      kapıdan satışlara ilişkin hükümler mesafeli sözleşmelere
                      de uygulanır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı veya sağlayıcı cayma bildiriminin kendisine
                      ulaştığı tarihten itibaren on gün içinde almış olduğu
                      bedeli, kıymetli evrakı ve tüketiciyi bu hukuk&icirc;
                      işlemden dolayı borç altına sokan her türlü belgeyi iade
                      etmek ve yirmi gün içerisinde de mali geri almakla
                      yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>Fiyat etiketi</span>
                  </p>

                  <p>
                    <span>Madde 10</span>
                  </p>

                  <p>
                    <span>
                      Perakende satışa arz edilen malların veya ambalajlarının
                      yahut kaplarının üzerine kolaylıkla görülebilir,
                      okunabilir şekilde o malla ilgili tüm vergiler dahil
                      fiyat, üretim yeri ve ayırıcı özelliklerini içeren etiket
                      konulması, etiket konulması mümkün olmayan hallerde ayni
                      bilgileri kapsayan listelerin görülebilecek şekilde uygun
                      yerlere asılması zorunludur.
                    </span>
                  </p>

                  <p>
                    <span>
                      Hizmetlerin tarife ve fiyatlarını gösteren listeler de
                      birinci fıkraya göre düzenlenerek asılır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Etiket, fiyat ve tarife listelerinde belirtilen fiyat ile
                      kasa fiyatı arasında fark olması durumunda tüketici lehine
                      olan fiyat üzerinden satış yapılır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Fiyatı; Bakanlar Kurulu, kamu kurum ve kuruluşları veya
                      kamu kurumu niteliğinde meslek kuruluşları tarafından
                      belirlenen mal veya hizmetlerin, belirlenen bu fiyatın
                      üzerinde bir fiyatla satışa sunulması yasaktır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, etiket ve tarife listelerinin seklini,
                      içeriğini, usul ve esaslarını bir yönetmelikle düzenler.
                      Bakanlık ve belediyeler, bu madde hükümlerinin uygulanması
                      ve izlenmesine ilişkin isleri yürütmekle ayrı ayrı
                      görevlidirler.
                    </span>
                  </p>

                  <p>
                    <span>Garanti belgesi</span>
                  </p>

                  <p>
                    <span>Madde 11</span>
                  </p>

                  <p>
                    <span>
                      İmalatçı veya ithalatçılar ithal ettikleri veya
                      ürettikleri sanayi malları için Bakanlıkça onaylı garanti
                      belgesi düzenlemek zorundadır. Mala ilişkin faturanın
                      tarih ve sayısını içeren garanti belgesinin tekemmül
                      ettirilerek tüketiciye verilmesi sorumluluğu satıcı, bayi
                      veya acenteye aittir. Garanti süresi malin teslim
                      tarihinden itibaren baslar ve asgari iki yıldır. Ancak,
                      özelliği nedeniyle bazı malların garanti şartları,
                      Bakanlıkça başka bir ölçü birimi ile belirlenebilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Satıcı; garanti belgesi kapsamındaki malların, garanti
                      süresi içerisinde arızalanması halinde mali isçilik
                      masrafı, değiştirilen parça bedeli ya da başka herhangi
                      bir ad altında hiçbir ücret talep etmeksizin tamir ile
                      yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici onarım hakkini kullanmışsa, garanti süresi
                      içerisinde sik arızalanması nedeniyle maldan
                      yararlanamamanın süreklilik arz etmesi veya tamiri için
                      gereken azami sürenin aşılması veya tamirinin mümkün
                      bulunmadığının anlaşılması hallerinde, 4 üncü maddede yer
                      alan diğer seçimlik haklarını kullanabilir. Satıcı bu
                      talebi reddedemez. Tüketicinin bu talebinin yerine
                      getirilmemesi durumunda satıcı, bayi, acente,
                      imalatçı-üretici ve ithalatçı müteselsilen sorumludur.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketicinin mali kullanım kılavuzunda yer alan hususlara
                      aykırı kullanmasından kaynaklanan arizalar, iki ve üçüncü
                      fıkra hükümleri kapsamı dışındadır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, hangi sanayi mallarının garanti belgesi ile
                      satılmak zorunda bulunduğunu ve bu malların arızalarının
                      tamiri için gereken azami süreleri Türk Standartları
                      Enstitüsünün görüsünü alarak tespit ve il&acirc;nla
                      görevlidir.
                    </span>
                  </p>

                  <p>
                    <span>Tanıtma ve kullanma kılavuzu</span>
                  </p>

                  <p>
                    <span>Madde 12</span>
                  </p>

                  <p>
                    <span>
                      Yurt içinde üretilen veya ithal edilen sanayi mallarının
                      tanıtım, kullanım, bakim ve basit onarımına ilişkin Türkçe
                      kılavuzla ve gerektiğinde uluslararası sembol ve
                      işaretleri kapsayan etiketle satılması zorunludur.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, sanayi mallarından hangilerinin tanıtma ve
                      kullanım kılavuzu ve etiket ile satılmak zorunda
                      bulunduğunu ve bunlarda bulunması gereken asgari unsurları
                      Türk Standartları Enstitüsünün görüsünü alarak tespit ve
                      il&acirc;nla görevlidir.
                    </span>
                  </p>

                  <p>
                    <span>Satış sonrası hizmetler</span>
                  </p>

                  <p>
                    <span>
                      Madde 13- İmalatçı veya ithalatçılar, sattıkları,
                      ürettikleri veya ithal ettikleri sanayi malları için o
                      malin Bakanlıkça tespit ve il&acirc;n edilen kullanım ömrü
                      süresince, yeterli teknik personel ve yedek parça stoku
                      bulundurmak suretiyle bakim ve onarım hizmetlerini sunmak
                      zorundadırlar.
                    </span>
                  </p>

                  <p>
                    <span>
                      İmalatçı veya ithalatçıların bulundurmaları gereken yedek
                      parça stok miktarı Bakanlıkça belirlenir.
                    </span>
                  </p>

                  <p>
                    <span>
                      İthalatçının herhangi bir şekilde ticari faaliyetinin sona
                      ermesi halinde, kullanım ömrü süresince bakim ve onarım
                      hizmetlerini, o malin yeni ithalatçısı sunmak zorundadır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, hangi mallar için servis istasyonları
                      kurulmasının zorunlu olduğu ile servis istasyonlarının
                      kuruluş ve işleyişine dair usul ve esasları Türk
                      Standartları Enstitüsünün görüsünü alarak tespit ve
                      il&acirc;nla görevlidir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Garanti belgesiyle satılmak zorunda olan bir sanayi
                      malinin garanti süresi sonrasında arızalanması durumunda,
                      o malin Bakanlıkça belirlenen azami tamir süresi
                      içerisinde onarımı zorunludur.
                    </span>
                  </p>

                  <p>
                    <span>Ticari reklam ve ilanlar</span>
                  </p>

                  <p>
                    <span>
                      Madde 14- Ticari reklam ve il&acirc;nların kanunlara,
                      Reklam Kurulunca belirlenen ilkelere, genel ahlaka, kamu
                      düzenine, kişilik haklarına uygun, dürüst ve doğru
                      olmaları esastır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketiciyi aldatıcı, yanıltıcı veya onun tecrübe ve bilgi
                      noksanlıklarını istismar edici, tüketicinin can ve mal
                      güvenliğini tehlikeye düşürücü, şiddet hareketlerini ve
                      suç islemeyi özendirici, kamu sağlığını bozucu, hastaları,
                      yaşlıları çocukları ve özürlüleri istismar edici reklam ve
                      il&acirc;nlar ve örtülü reklam yapılamaz.
                    </span>
                  </p>

                  <p>
                    <span>
                      Ayni ihtiyaçları karşılayan ya da ayni amaca yönelik rakip
                      mal ve hizmetlerin karşılaştırmalı reklamları yapılabilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Reklam veren, ticari reklam veya il&acirc;nda yer alan
                      somut iddiaları ispatla yükümlüdür.
                    </span>
                  </p>

                  <p>
                    <span>
                      Reklam verenler, reklamcılar ve mecra kuruluşları bu madde
                      hükümlerine uymakla yükümlüdürler.
                    </span>
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    <span>Tehlikeli mal ve hizmetler</span>
                  </p>

                  <p>
                    <span>
                      Madde 15- Tüketicinin kullanımına sunulan mal ve
                      hizmetlerin kişi beden ve ruh sağlığı ile çevreye zararlı
                      veya tehlikeli olabilmesi durumunda, bu malların emniyetle
                      kullanılabilmesi için üzerine veya ekli kullanım
                      kılavuzlarına, bu durumla ilgili açıklayıcı bilgi ve
                      uyarılar, açıkça görülecek ve okunacak şekilde konulur
                      veya yazılır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık, hangi mal veya hizmetlerin açıklayıcı bilgi ve
                      uyarıları taşıması gerektiğini ve bu bilgi ve uyarıların
                      seklini ve yerini ilgili bakanlık ve diğer kuruluşlarla
                      birlikte tespit ve il&acirc;nla görevlidir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Madde 16- Tüketiciye sunulan mal ve hizmetler; ilgili
                      bakanlıklar tarafından Resmi Gazetede yayımlanarak mecburi
                      uygulamaya konulan standartlar dahil olmak üzere uyulması
                      zorunlu olan teknik düzenlemeye uygun olmalıdır.
                    </span>
                  </p>

                  <p>
                    <span>
                      İlgili bakanlıklar, bu esaslara göre denetim yapmak veya
                      yaptırmakla görevlidir. Mal ve hizmet denetimine ilişkin
                      usul ve esaslar her bir ilgili bakanlıkça ayrı ayrı tespit
                      ve il&acirc;n edilir.
                    </span>
                  </p>

                  <p>&nbsp;</p>

                  <p>
                    <span>üçüNCü KISIM</span>
                  </p>

                  <p>
                    <span>Tüketici Kuruluşları</span>
                  </p>

                  <p>
                    <span>Tüketici sorunları hakem heyeti</span>
                  </p>

                  <p>
                    <span>
                      Madde 17- Bakanlık, il ve ilçe merkezlerinde, bu Kanunun
                      uygulamasından doğan uyuşmazlıklara çözüm bulmak amacıyla
                      en az bir tüketici sorunları hakem heyeti oluşturmakla
                      görevlidir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Başkanlığı Sanayi ve Ticaret İl Müdürü veya
                      görevlendireceği bir memur tarafından yürütülen tüketici
                      sorunları hakem heyeti; belediye başkanının konunun uzmanı
                      belediye personeli arasından görevlendireceği bir üye,
                      baronun mensupları arasından görevlendireceği bir üye,
                      ticaret ve sanayi odası ile esnaf ve sanatkar odalarının
                      görevlendireceği bir üye ve tüketici örgütlerinin
                      seçecekleri bir üye olmak üzere başkan dahil beş üyeden
                      oluşur. Ticaret ve sanayi odası ya da ayrı ayrı kurulduğu
                      yerlerde ticaret odası ile esnaf ve sanatkar odalarının
                      görevlendireceği üye, uyuşmazlığın satıcı tarafını
                      oluşturan kişinin tacir veya esnaf ve sanatkar olup
                      olmamasına göre ilgili odaca görevlendirilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Bakanlık taşra teşkilatının bulunmadığı il ve ilçelerde
                      tüketici sorunları hakem heyetinin başkanlığı en büyük
                      mülki amir ya da görevlendireceği bir memur tarafından
                      yürütülür. Tüketici örgütü olmayan yerlerde tüketiciler,
                      tüketim kooperatifleri tarafından temsil edilir. Tüketici
                      sorunları hakem heyetinin oluşumunun sağlanamadığı
                      yerlerde noksan üyelikler, belediye meclislerince
                      re&#39;sen doldurulur.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici sorunları hakem heyetlerinde heyetin
                      çalışmalarına ve kararlarına esas olacak dosyaları
                      hazırlamak ve uyuşmazlığa ilişkin raporu sunmak üzere en
                      az bir raportör görevlendirilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Değeri 792,12 (yediyüzdoksanikitlonikikr) nin altında
                      bulunan uyuşmazlıklarda tüketici sorunları hakem
                      heyetlerine başvuru zorunludur. Bu uyuşmazlıklar da
                      heyetin vereceği kararlar tarafları bağlar. Bu kararlar
                      İcra ve İflas Kanununun ilamların yerine getirilmesi
                      hakkındaki hükümlerine göre yerine getirilir. Taraflar bu
                      kararlara karşı on beş gün içinde tüketici mahkemesine
                      itiraz edebilirler. İtiraz, tüketici sorunları hakem
                      heyeti kararının icrasını durdurmaz. Ancak, talep edilmesi
                      şartıyla hakim, tüketici sorunları hakem heyeti kararının
                      icrasını tedbir yoluyla durdurabilir. Tüketici sorunları
                      hakem heyeti kararlarına karşı yapılan itiraz üzerine
                      tüketici mahkemesinin vereceği karar kesindir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Değeri beşyüzmilyontürklirası ve üstündeki uyuşmazlıklarda
                      tüketici sorunları hakem heyetlerinin verecekleri
                      kararlar, tüketici mahkemelerinde delil olarak ileri
                      sürülebilir. Kararların bağlayıcı veya delil olacağına
                      ilişkin parasal sınırlar her yılın Ekim ayı sonunda Devlet
                      İstatistik Enstitüsünün Toptan Eşya Fiyatları Endeksinde
                      meydana gelen yıllık ortalama fiyat artışı oranında artar.
                      Bu durum, Bakanlıkça her yıl Aralık ayı içinde Resmi
                      Gazetede il&acirc;n edilir.
                    </span>
                  </p>

                  <p>
                    <span>
                      25 inci maddede cezai yaptırıma bağlanmış hususlar
                      dışındaki tüm uyuşmazlıklar, tüketici sorunları hakem
                      heyetlerinin görev ve yetkileri kapsamındadır.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici Sorunları Hakem Heyetleri Başkan ve üyeleri ile
                      raportörlere verilen huzur hakki veya huzur ücretinin
                      ödenmesine ilişkin esas ve usuller, bir ayda ödenecek
                      tutar 2000 gösterge rakamının memur aylık katsayısıyla
                      çarpımı sonucu bulunacak miktarı geçmemek üzere Maliye
                      Bakanlığının uygun görüsü alınarak Bakanlıkça belirlenir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Tüketici sorunları hakem heyetlerinin kurulması, çalışma
                      usul ve esasları ile diğer hususlar Bakanlıkça çıkarılacak
                      bir yönetmelikte düzenlenir.
                    </span>
                  </p>

                  <p>
                    <span>
                      Siparişin gerçekleşmesi durumunda ALICI işbu sözleşmenin
                      tüm koşullarını kabul etmiş sayılır.
                    </span>
                  </p>

                  <p>
                    <span>SATICI</span>
                  </p>

                  <p>
                    <span>
                      Aloparca Oto Yedekparça Elektronik Hiz. San.ve Dış Tic.
                      Ltd. Şti (www.aloparca.com )
                    </span>
                  </p>

                  <p>
                    <span>ALICI</span>
                  </p>

                  <p>
                    <span>Adı/Soyadı :</span>
                  </p>

                  <p>
                    <span>Tarih :</span>
                  </p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Container>
        </Outer>
      </Layout>
    );
  }
}
const mapStateToProps = ({
  cart, coupon, userData, address, kumbaraOk, kumbKes, kkartKes, havaledeKumb, isLogin,
}) => ({
  cart,
  coupon,
  userData,
  address,
  kumbaraOk,
  kumbKes,
  kkartKes,
  havaledeKumb,
  isLogin,
});
export default connect(mapStateToProps)(CheckoutLayout);
