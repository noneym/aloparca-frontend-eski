import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import Spinner from "../ui/spinner";
import styled from 'styled-components';

import Layout from '../layouts/container';
import { Container, Link } from '../reactor';
import { media } from '../style/theme';
import Api from '../api';
import { getUser, deleteAllCart } from '../actions';

const Outer = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    padding: 50px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    ${media.tablet`
      padding: 25px;
    `};
    .checkout-detail {
      border: 1px solid #dddddd;
      border-radius: 5px;
      .icon-uyumlu {
        font-size: 60px;
        color: #29a71a;
      }
      .checkout-id {
        font-size: 30px;
        font-weight: 500;
        color: #525355;
        text-align: center;
        ${media.tablet`
          font-size: 24px;
        `};
        ${media.mini`
          font-size: 20px;
        `};
      }
      .checkout-text {
        font-size: 16px;
        color: #525355;
        text-align: center;
        line-height: 1.5em;
        padding: 0 10px;
        strong {
          font-weight: 500;
        }
      }
      .link {
        a {
          width: 100%;
          font-size: 18px;
          color: #333333;
          background-color: #dddddd;
          padding: 15px;
          text-align: center;
          border-radius: 3px;
          &:hover {
            background-color: #cccccc;
          }
        }
      }
    }
    .service {
      border: 1px solid #dddddd;
      border-radius: 5px;
      line-height: 1.5em;
      .title {
        font-size: 26px;
        color: #ff8900;
        line-height: 1.3;
        ${media.tablet`
          font-size: 20px;
        `};
        ${media.mini`
          font-size: 18px;
        `};
        i {
          font-size: 20px;
          margin-right: 10px;
        }
      }
      .show-more {
        font-size: 18px;
        font-weight: 500;
        color: #ff8900;
      }
      .service-list {
        ${media.mini`
          padding: 10px 0;
        `};
        .line {
          ${media.mini`
            flex-direction: column;
          `};
          .left,
          .right {
            ${media.mini`
              width: 100% !important;
            `}
          }
        }
      }
    }
    .bank-detail {
      .bank-title {
        font-size: 20px;
        font-weight: 500;
        color: black;
        border-bottom: 1px solid #dddddd;
      }
      .bank-content {
        border-bottom: 1px solid #dddddd;
        .bank-iban {
          font-size: 20px;
          font-weight: 500;
          color: #525355;
        }
        .bank-account {
          font-size: 14px;
          color: #525355;
          text-align: center;
          line-height: 1.5em;
          ${media.tablet`
            text-align:left;
          `};
          strong {
            font-weight: 500;
          }
        }
        .bank-alert {
          font-size: 18px;
          color: #fe4e50;
          ${media.mini`
            font-size: 16px;
          `};
          i {
            font-size: 24px;
            margin-right: 10px;
          }
          strong {
            font-weight: 500;
          }
        }
      }
    }
  }
  .iade-icon {
    ${media.mini`
      flex-direction: column;
      margin-bottom: 10px;
    `};
    .iade-item {
      ${media.mini`
        width: 100%;
        padding: 0;
        margin-bottom: 20px;
      `};
      img {
        width: 50%;
        margin-bottom: 20px;
        ${media.mini`
          width: 75px;
          margin-bottom: 10px;
        `};
      }
      .notice {
        text-align: center;
        ${media.mini`
          font-size: 14px;
        `};
      }
    }
  }
`;

class CheckoutSuccess extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = {
    data: null,
    bank: null,
    serviceList: [],
    listLimit: 3,
  };

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    const {
      address,
      checkoutBank,
      checkoutCargo,
      checkoutType,
      query,
      cart,
      userData,
      kumbKes,
    } = this.props;
    if (!userData) return;
    if (!query.id) {
      let data = null;
      let bank = null;

      const silinecek = userData && userData.siparisler ? userData.siparisler[userData.siparisler.length - 1].id : null;

      const kumbaradanDusulecek = await kumbKes === '0.00' || await kumbKes === 0 ? 0 : kumbKes;
      if (cart.urunler && cart.urunler.length > 0) {
        const fd = new FormData();
        console.log(cart);
        console.log('chekou success');
        fd.append('teslimat_adres_id', address.teslimat);
        fd.append('fatura_adres_id', address.fatura);
        fd.append('havale_bankasi', checkoutBank);
        fd.append('kargo_firmasi', checkoutCargo);
        if(cart.indirim){
          fd.append('kupon', (typeof cart.indirim.kupon === undefined? null : cart.indirim.kupon));
        }
        kumbaradanDusulecek !== 0 && fd.append('kubaradan_odenecek_tutar', kumbaradanDusulecek);
        kumbaradanDusulecek === 0 ? fd.append('odemetipi', checkoutType) : fd.append('odemetipi', 9);
        data = await Api.post('Users/siparis_olustur', fd);
        this.props.dispatch(deleteAllCart());
      } else {
        data = {
          siparis_no:
            userData && userData.siparisler
              ? userData.siparisler[userData.siparisler.length - 1].id
              : 0,
        };
      }
      const { result } = await Api.get('Users/banka_hesap_bilgileri');
      bank = result.find((item) => item.Banka === checkoutBank);
      await this.setState({ data, bank });
    }

    const siparisId = query.id ? query.id : this.state.data.siparis_no;
    const siparisForm = new FormData();
    siparisForm.append('siparis_id', siparisId);
    const siparisAnalytics = await Api.post('Users/siparis_detay', siparisForm);
    if (
      siparisAnalytics.transactionTotal > 0
      && typeof window !== 'undefined'
      && window.dataLayer
    ) {
      window.dataLayer.push({
        event: 'checkout',
        ecommerce: {
          currencyCode: 'TRY',
          purchase: {
            actionField: {
              id: siparisAnalytics.transactionId,
              affiliation: 'Online Store',
              revenue: siparisAnalytics.transactionTotal,
              shipping: siparisAnalytics.transactionShipping,
            },
            products: siparisAnalytics.urunler.urun.map((urun) => ({
              name: urun.stok_kodu,
              id: urun.id,
              price: urun.fiyat,
              quantity: urun.adet,
            })),
          },
        },
      });
      try {
        const ADMITAD = window.ADMITAD || {};
        ADMITAD.Invoice = ADMITAD.Invoice || {};
        ADMITAD.Tracking = ADMITAD.Tracking || {};
        // ADMITAD.Invoice.broker = 'adm';
        ADMITAD.Invoice.category = '1';
        const orderedItem = [];
        siparisAnalytics.urunler.urun.forEach((urun) => {
          orderedItem.push({
            Product: {
              productID: urun.id,
              category: '1',
              price: urun.fiyat,
              priceCurrency: 'TRY',
            },
            orderQuantity: urun.adet,
            additionalType: 'sale',
          });
        });
        ADMITAD.Invoice.referencesOrder = ADMITAD.Invoice.referencesOrder || [];
        ADMITAD.Invoice.referencesOrder.push({
          orderNumber: siparisAnalytics.transactionId,
          orderedItem,
        });
        ADMITAD.Tracking.processPositions = ADMITAD.Tracking.processPositions || (() => {});
        ADMITAD.Tracking.processPositions();
      } catch (err) {
        // console.log('Checkout Success err:', err);
      }
    }
    // const addressList = userData.user_adres_list.find((item) => item.Id == address.teslimat);
    // const serviceList = await Api.get(`Usta/ustalistesi?il=${addressList.sehir}&ilce=${addressList.ilce}&limit=6`);
    // this.setState({ serviceList });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
    this.props.dispatch({ type: 'KUMB_KESILECEK', payload: 0 });
  }

  render() {
    const {
      data, bank, serviceList, listLimit,
    } = this.state;
    const { query, userData } = this.props;
    return (
      <Layout meta={{ title: 'Sipariş' }}>
        <Outer>
          <Container>
            {query && query.id ? (
              <Flex className="main-area" justifyContent="center">
                <Flex width={[1, 3 / 4]} flexDirection="column">
                  <Flex className="checkout-detail" alignItems="center" py={4} mb={4} flexDirection="column">
                    <Flex alignItems="center" pb={4} justifyContent="center">
                      <i className="icon-uyumlu" />
                    </Flex>
                    <Box className="checkout-id">
                      #
                      {query.id}
                      {' '}
                      numaralı siparişiniz onaylandı.
                    </Box>
                    <Box mt={2} className="checkout-text">
                      <strong>Siparişiniz en kısa sürede kargolanacaktır.</strong>
                      <br />
                      Sipariş detayları
                      {' '}
                      <strong>{userData && userData.user[0].uyemailadresi}</strong>
                      {' '}
                      adresine
                      gönderildi.
                    </Box>
                  </Flex>
                  {serviceList.length > 0 ? (
                    <Flex className="service" p={[1, 2, 4]} flexDirection="column">
                      <Flex w={1} className="title" justifyContent="center" alignItems="center" mb={[1, 2]}>
                        <i className="icon-hesabim-bilgilerimi-guncelle" />
                        {' '}
                        Aldığınız Ürünlerin
                        Montajı için Size En Yakın Servis Noktaları
                      </Flex>
                      {serviceList.slice(0, listLimit).map((item) => (
                        <Flex className="service-list" key={item.Id} py={2} flexDirection="column">
                          <Flex className="line">
                            <Box className="left" width={1 / 5}>
                              <strong>Firma Adı:</strong>
                            </Box>
                            <Box className="right" width={4 / 5}>
                              {item.name}
                            </Box>
                          </Flex>
                          <Flex className="line" mt={1}>
                            <Box className="left" width={1 / 5}>
                              <strong>Adres:</strong>
                            </Box>
                            <Box className="right" width={4 / 5}>
                              {item.adres}
                            </Box>
                          </Flex>
                          <Flex className="line" mt={1}>
                            <Box className="left" width={1 / 5}>
                              <strong>Telefon:</strong>
                            </Box>
                            <Box className="right" width={4 / 5}>
                              {item.telefon}
                            </Box>
                          </Flex>
                          {JSON.parse(item.hizmetler).length > 0 && (
                            <Flex className="line" mt={1}>
                              <Box className="left" width={1 / 5}>
                                <strong>Hizmetler:</strong>
                              </Box>
                              <Box className="right" width={4 / 5}>
                                {JSON.parse(item.hizmetler)
                                  .slice(0, 6)
                                  .join(', ')}
                              </Box>
                            </Flex>
                          )}
                        </Flex>
                      ))}
                      {serviceList.length > listLimit && (
                        <Flex w={1} mt={3} className="show-more" justifyContent="center" alignItems="center">
                          <a
                            href="javascript:;"
                            onClick={() => this.setState({ listLimit: serviceList.length })}
                          >
                            Daha fazla servis göster
                          </a>
                        </Flex>
                      )}
                    </Flex>
                  ) : null}
                  <Flex className="checkout-detail" alignItems="center" py={4} mt={4} flexDirection="column">
                    <Flex className="iade-icon" width={1} mb={3}>
                      <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                        <img src="/static/img/kullanilmis-urun.svg" alt="Kullanılmış Ürün" />
                        <Box className="notice">KULLANILMIŞ ÜRÜN</Box>
                      </Flex>
                      <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                        <img src="/static/img/hasarli-urun.svg" alt="Hasarlı Ürün" />
                        <Box className="notice">HASARLI ÜRÜN</Box>
                      </Flex>
                      <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                        <img
                          src="/static/img/ambalaji-zarar-gormus-urun.svg"
                          alt="Ambalajı Zarar Görmüş Ürün"
                        />
                        <Box className="notice">AMBALAJI ZARAR GÖRMÜŞ ÜRÜN</Box>
                      </Flex>
                    </Flex>
                    <Box className="checkout-text">
                      <strong>Değerli müşterimiz,</strong>
                      <br />
                      Aldığınız ürünü iade edebilmeniz için;
                      {' '}
                      <strong>orijinal faturası</strong>
                      {' '}
                      ile
                      birlikte,
                      <br />
                      <strong>ürün poşetinin</strong>
                      {' '}
                      veya
                      {' '}
                      <strong>kutusunun yırtılmamış</strong>
                      {' '}
                      ve
                      {' '}
                      <strong>ürünün kullanılmamış</strong>
                      {' '}
                      olması gerekmektedir.
                    </Box>
                    <Flex className="link" width={5 / 8} mt={3}>
                      <Link route="kurumsal" params={{ slug: 'garanti-ve-iade' }}>
                        İade Şartları için Tıklayın
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex className="main-area" justifyContent="center">
                {data ? (
                  <Flex width={[1, 3 / 4]} flexDirection="column">
                    {data.siparis_no ? (
                      <Flex className="checkout-detail" alignItems="center" py={4} mb={4} flexDirection="column">
                        <Flex alignItems="center" pb={4} justifyContent="center">
                          <i className="icon-uyumlu" />
                        </Flex>
                        <Box className="checkout-id">
                          #
                          {data.siparis_no}
                          {' '}
                          numaralı siparişiniz onaylandı.
                        </Box>
                        <Box mt={2} className="checkout-text">
                          <strong>Siparişiniz en kısa sürede kargolanacaktır.</strong>
                          <br />
                          Sipariş detayları
                          {' '}
                          <strong>{userData.user[0].uyemailadresi}</strong>
                          {' '}
                          adresine gönderildi
                        </Box>
                      </Flex>
                    ) : null}
                    {bank ? (
                      <Flex className="bank-detail" flexDirection="column">
                        <Box className="bank-title" width={1} py={1}>
                          Banka Bilgileri
                        </Box>
                        <Flex className="bank-content" mt={3} pb={3} alignItems="center" flexDirection="column">
                          <Box className="bank-iban" mb={1}>
                            {bank.Banka}
                            {' '}
                            / IBAN:
                            {' '}
                            {bank.iban}
                          </Box>
                          <Box className="bank-account" mb={2}>
                            <strong>Alıcı:</strong>
                            {' '}
                            {bank.Alici}
                            <br />
                            <strong>Şube Adı:</strong>
                            {' '}
                            {bank.Sube}
                            {' '}
                            -
                            {' '}
                            <strong>Şube Kodu:</strong>
                            {' '}
                            {bank.Sube_Kodu}
                            {' '}
                            -
                            {' '}
                            <strong>Hesap No:</strong>
                            {' '}
                            {bank.Hesap_No}
                          </Box>
                          <Flex className="bank-alert" alignItems="center">
                            <i className="icon-star-o" />
                            <Box>
                              Havale/EFT yaparken
                              <strong> açıklama kısmına sadece sipariş numaranızı yazınız.</strong>
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    ) : null}
                    {/* serviceList.length > 0 ? (
                      <Flex className="service" mt={4} p={[1, 2, 4]} flexDirection="column">
                        <Flex w={1} className="title" justifyContent="center" alignItems="center" mb={[1, 2]}>
                          <i className="icon-hesabim-bilgilerimi-guncelle" />
                          {' '}
                          Aldığınız Ürünlerin
                          Montajı için Size En Yakın Servis Noktaları
                        </Flex>
                        {serviceList.slice(0, listLimit).map((item) => (
                          <Flex className="service-list" key={item.Id} py={2} flexDirection="column">
                            <Flex className="line">
                              <Box className="left" width={1 / 5}>
                                <strong>Firma Adı:</strong>
                              </Box>
                              <Box className="right" width={4 / 5}>
                                {item.name}
                              </Box>
                            </Flex>
                            <Flex className="line" mt={1}>
                              <Box className="left" width={1 / 5}>
                                <strong>Adres:</strong>
                              </Box>
                              <Box className="right" width={4 / 5}>
                                {item.adres}
                              </Box>
                            </Flex>
                            <Flex className="line" mt={1}>
                              <Box className="left" width={1 / 5}>
                                <strong>Telefon:</strong>
                              </Box>
                              <Box className="right" width={4 / 5}>
                                {item.telefon}
                              </Box>
                            </Flex>
                            {JSON.parse(item.hizmetler).length > 0 && (
                              <Flex className="line" mt={1}>
                                <Box className="left" width={1 / 5}>
                                  <strong>Hizmetler:</strong>
                                </Box>
                                <Box className="right" width={4 / 5}>
                                  {JSON.parse(item.hizmetler)
                                    .slice(0, 6)
                                    .join(', ')}
                                </Box>
                              </Flex>
                            )}
                          </Flex>
                        ))}
                        {serviceList.length > listLimit && (
                          <Flex w={1} mt={3} className="show-more" justifyContent="center" alignItems="center">
                            <a
                              href="javascript:;"
                              onClick={() => this.setState({ listLimit: serviceList.length })}
                            >
                              Daha fazla servis göster
                            </a>
                          </Flex>
                        )}
                      </Flex>
                        ) : null */}
                    <Flex className="checkout-detail" alignItems="center" py={4} mt={4} flexDirection="column">
                      <Flex className="iade-icon" width={1} mb={3}>
                        <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                          <img src="/static/img/kullanilmis-urun.svg" alt="Kullanılmış Ürün" />
                          <Box className="notice">KULLANILMIŞ ÜRÜN</Box>
                        </Flex>
                        <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                          <img src="/static/img/hasarli-urun.svg" alt="Hasarlı Ürün" />
                          <Box className="notice">HASARLI ÜRÜN</Box>
                        </Flex>
                        <Flex className="iade-item" width={1 / 3} px={2} alignItems="center" flexDirection="column">
                          <img
                            src="/static/img/ambalaji-zarar-gormus-urun.svg"
                            alt="Ambalajı Zarar Görmüş Ürün"
                          />
                          <Box className="notice">AMBALAJI ZARAR GÖRMÜŞ ÜRÜN</Box>
                        </Flex>
                      </Flex>
                      <Box className="checkout-text">
                        <strong>Değerli müşterimiz,</strong>
                        <br />
                        Aldığınız ürünü iade edebilmeniz için;
                        {' '}
                        <strong>
                          orijinal faturası
                        </strong>
                        {' '}
                        ile birlikte,
                        <br />
                        <strong>ürün poşetinin</strong>
                        {' '}
                        veya
                        {' '}
                        <strong>kutusunun yırtılmamış</strong>
                        {' '}
                        ve
                        {' '}
                        <strong>ürünün kullanılmamış</strong>
                        {' '}
                        olması gerekmektedir.
                      </Box>
                      <Flex className="link" width={5 / 8} mt={3}>
                        <Link route="kurumsal" params={{ slug: 'garanti-ve-iade' }}>
                          İade Şartları için Tıklayın
                        </Link>
                      </Flex>
                    </Flex>
                  </Flex>
                ) : (
                  <Spinner />
                )}
              </Flex>
            )}
          </Container>
        </Outer>
      </Layout>
    );
  }
}
const mapStateToProps = ({
  userData,
  address,
  checkoutBank,
  checkoutCargo,
  checkoutType,
  cart,
  kumbKes,
}) => ({
  userData,
  address,
  checkoutBank,
  checkoutCargo,
  checkoutType,
  cart,
  kumbKes,
});
export default connect(mapStateToProps)(CheckoutSuccess);
