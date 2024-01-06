import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Checkbox, Select, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import Spinner from '../../../ui/spinner';
import Dimmer from '../../../ui/dimmer';

import { media, color } from '../../../style/theme';
import { Link } from '../../../reactor';
import Api from '../../../api';
import { getUser } from '../../../actions';

const Outer = styled(Flex)`
  .siparis-link {
    font-size: 16px;
    font-weight: 500;
    color: #ff8900;
    i {
      margin-right: 5px;
    }
  }
  .siparis-header {
    padding: 20px 35px;
    font-size: 14px;
    color: #525355;
    border: 1px solid #dddddd;
    border-radius: 3px;
    strong {
      font-weight: 500;
      color: black;
    }
    span {
      margin-top: 5px;
      a.cargo {
        color: #ff8900;
        font-weight: 500;
      }
    }
    ${media.tablet`
      flex-direction: column;
      padding: 10px;
    `};
    .siparis-header-content {
      ${media.tablet`
        flex-direction: row;
      `};
      span {
        ${media.tablet`
          margin-top: 0;
          margin-left: 10px;
        `};
      }
      & + .siparis-header-content {
        ${media.tablet`
          margin-top: 10px;
        `};
      }
    }
  }
  .product-return {
    width: 100%;
    padding: 35px;
    border: 1px solid #dddddd;
    margin: 20px 0;
    ${media.phone`
      padding: 20px;
    `};
    .product-return-status {
      font-weight: 500;
      font-size: 18px;
      color: black;
      padding-right: 15px;
    }
    .product-return-notice {
      padding-right: 15px;
    }
    .product-return-code {
      color: white;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
      background-color: ${color.primary};
      font-size: 20px;
      font-weight: 700;
    }
  }
  .urunler {
    border: 1px solid #dddddd;
    border-radius: 3px;
    .product-card {
      font-size: 16px;
      color: #525355;
      ${media.tablet`
        flex-direction: column;
        padding: 15px 0;
        text-align: center;
      `};
      & + .product-card {
        border-top: 1px solid #dddddd;
      }
      .resim {
        border-left: 1px solid #dddddd;
        padding: 20px 0;
        ${media.tablet`
          border-left: 0px;
        `};
        img {
          max-width: 100px;
        }
      }
      .yorum {
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        ${media.tablet`
          border-left: 0px;
          border-right: 0px;
        `};
        a {
          padding: 15px 25px;
          background-color: #b2b2b2;
          color: white;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
      .tutar {
        font-weight: 500;
        border-left: 1px solid #dddddd;
        ${media.tablet`
          border-left: 0px;
        `};
      }
    }
  }
  .siparis-toplam {
    color: #525355;
    font-size: 16px;
    strong {
      color: black;
      font-weight: 500;
    }
  }
  .iade {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    background-color: #ff8900;
    border-radius: 3px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
    color: white;
    i {
      font-size: 24px;
      margin-right: 10px;
    }
  }
  .adresler {
    .adres-baslik {
      font-size: 16px;
      font-weight: 500;
      color: black;
      padding-left: 15px;
      padding-bottom: 30px;
    }
    .adres-icerik {
      border: 1px solid #dddddd;
      border-radius: 3px;
      padding: 25px 30px;
      font-size: 14px;
      color: #333333;
      a {
        margin-left: 5px;
        color: #ff8900;
      }
      strong {
        font-weight: 500;
        color: black;
      }
    }
  }
  .iade-text {
    color: #ff8900;
  }
  .iade-button {
    color: white !important;
    background-color: #ff8900 !important;
    margin-left: 10px;
  }
  .ui.selection.dropdown,
  .ui.selection.active.dropdown .menu {
    border-color: #dddddd !important;
  }
`;

class SiparisIade extends React.Component {
  state = {
    isLoading: true,
    checkboxes: {},
    status: false,
    loading: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }

  onChange = (e, { name, value }) => {
    this.setState({ selectbox: value });
  };

  check(id) {
    this.setState(prevState => ({
      checkboxes: { ...prevState.checkboxes, [id]: !prevState.checkboxes[id] },
    }));
  }

  urunIade = async () => {
    this.setState({ loading: true });
    const { checkboxes, selectbox } = this.state;
    const urunData = Object.keys(checkboxes).filter(item => checkboxes[item]);
    const iadeData = urunData.reduce(
      (obj, key) => ({
        ...obj,
        [key]: selectbox,
      }),
      {},
    );
    const fd = new FormData();
    fd.append('siparis_id', this.props.id);
    fd.append('urun_id', JSON.stringify(urunData));
    fd.append('iade_nedeni', JSON.stringify(iadeData));
    const formData = await Api.post('Users/musteri_iade', fd);
    this.setState({ loading: false });
    if (formData.query) {
      this.setState({ status: true });
      this.props.dispatch(getUser());
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'İade talebiniz alınmıştır. En kısa sürede işleminiz gerçekleşecektir.',
      });
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'İşlem sırasında beklenmedik bir hata oluştu.',
      });
    }
  };

  returnStatus = (data) => {
    switch (data) {
      case '9':
        return 'İade talebi alındı';
      case '1':
        return 'İade ürün elimize ulaştı';
      case '3':
        return 'Para iadesi yapıldı';
      case '8':
        return 'İade reddedildi';
      default:
        return null;
    }
  };
  orderStatus = (data) => {
    switch (data) {
      case '0':
        return 'Hazırlanıyor';
      case '1':
        return 'Onaylandı';
      case '2':
        return 'İptal Edildi';
      case '3':
        return 'Kargolandı';
      case '4':
        return 'Paketlendi';
      case '5':
        return 'İçin İptal Talebi Alındı';
      default:
        return null;
    }
  };
  paymentStatus = (data) => {
    switch (data) {
      case '1':
        return 'Kredi Kartı ile ödeme';
      case '2':
        return 'Havale/EFT ile ödeme';
      case '5':
        return 'N11 Siparişi';
      case '3':
        return 'Kapıda Ödeme';
      case '8':
        return 'Hepsi Burada Siparişi';
      case '6':
        return 'Krediden Ödeme';
      case '4':
        return 'Elden Ödeme';
      case '9':
        return 'Havale/EFT + Kumbara Kredisi ile ödeme';
      default:
        return null;
    }
  };
  render() {
    const { id, userData } = this.props;
    const {
      isLoading, checkboxes, selectbox, loading, status,
    } = this.state;
    const siparis = userData ? userData.siparisler.find(item => item.id === id) : [];
    return isLoading ? (
      <Dimmer>
        <Spinner />
      </Dimmer>
    ) : (
      <Outer flexDirection="column">
        <Flex my={1} alignItems="center" justifyContent="flex-end">
          <Link route="profile" params={{ slug: 'siparislerim' }} className="siparis-link">
            <i className="icon-level-up" /> Siparişlerim Sayfasına geri dön
          </Link>
        </Flex>
        {Object.values(checkboxes).some(item => item) ? (
          status ? (
            <Flex className="iade-text">
              İade talebiniz alınmıştır. En kısa sürede işleminiz gerçekleşecektir.
            </Flex>
          ) : (
            <Flex>
              <Select
                placeholder="İade Nedeni"
                name="iade-nedeni"
                options={[
                  { value: 'Ürünü Beğenmedim', text: 'Ürünü Beğenmedim' },
                  { value: 'Ürün Uyumsuz', text: 'Ürün Uyumsuz' },
                  { value: 'Ürün Arızalı', text: 'Ürün Arızalı' },
                  { value: 'Ürün Geç Geldi', text: 'Ürün Geç Geldi' },
                ]}
                onChange={this.onChange}
              />
              {selectbox && loading ? (
                <Box ml={2}>
                  <Spinner />
                </Box>
              ) : (
                <Button className="iade-button" onClick={this.urunIade}>
                  İade Et
                </Button>
              )}
            </Flex>
          )
        ) : siparis.urunler.urun.some(item => item.iade_durumu === '0') ? (
          <Flex className="iade-text">İade etmek istediğiniz ürün veya ürünleri seçiniz.</Flex>
        ) : (
          <Flex className="iade-text">Siparişinizde iade edilecek ürün bulunmamaktadır.</Flex>
        )}
        <Flex className="siparis-header" justifyContent="space-between" my={2}>
          <Flex className="siparis-header-content" flexDirection="column">
            <strong>Sipariş No:</strong>
            <span>{siparis.id}</span>
          </Flex>
          <Flex className="siparis-header-content" flexDirection="column">
            <strong>Sipariş Veriliş Tarihi:</strong>
            <span>{moment(siparis.siparistarihi).format('DD MMMM YYYY, dddd')}</span>
          </Flex>
          <Flex className="siparis-header-content" flexDirection="column">
            <strong>Ödeme Yöntemi:</strong>
            <span>{this.paymentStatus(siparis.odemeturu)}</span>
          </Flex>
          <Flex className="siparis-header-content" flexDirection="column">
            <strong>Durumu:</strong>
            {siparis.KARGO_TAKIP_URL ? (
              <React.Fragment>
                <span>{siparis.KARGO_STATU_ACIKLAMA}</span>
                <span>
                  <a href={siparis.KARGO_TAKIP_URL} target="_blank" className="cargo">
                    Kargo Takip
                  </a>
                </span>
              </React.Fragment>
            ) : (
              <span>Siparişiniz {this.orderStatus(siparis.siparisdurumu)}</span>
            )}
          </Flex>
        </Flex>
        {siparis.iade_kodu && (
          <Flex
            className="product-return"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box width={[1, 1 / 6]} className="product-return-status">
              İade Bekleniyor
            </Box>
            <Box my={['15px', '0px']} width={[1, 4 / 6]} className="product-return-notice">
              Ürünlerinizi yandaki kodla Yurtiçi Kargoya iade edebilirsiniz.
            </Box>

            <Box width={[1, 1 / 6]} className="product-return-code">
              {siparis.iade_kodu}
            </Box>
          </Flex>
        )}
        <Flex className="urunler" flexDirection="column" my={2}>
          {siparis.urunler &&
            siparis.urunler.urun.map(item => (
              <Flex className="product-card" key={item.id}>
                <Flex width={[1, 3 / 12]} alignItems="center" justifyContent="center" px={2}>
                  {parseInt(item.iade_durumu, 10) === 0 ? (
                    <Checkbox
                      label="Ürünü iade et"
                      onChange={() => this.check(item.id)}
                      checked={checkboxes[item.id]}
                    />
                  ) : (
                    <React.Fragment>{this.returnStatus(item.iade_durumu)}</React.Fragment>
                  )}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="resim"
                  width={[1, 2 / 12]}
                >
                  <img
                    src={`https://resize.aloparca.com/upload/w_100,h_75/yedekparca_img${
                      item.resim
                    }`}
                    alt={item.aciklama}
                  />
                </Flex>
                <Flex
                  justifyContent="center"
                  alignItems={['center', 'flex-end']}
                  flexDirection="column"
                  className="baslik"
                  width={[1, 5 / 12]}
                  px={2}
                >
                  <Box mb={[1, 0]}>{item.aciklama}</Box>
                  <Box mb={[1, 0]}>{item.adet} adet</Box>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="tutar"
                  width={[1, 2 / 12]}
                >
                  {parseFloat(item.fiyat).toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </Flex>
              </Flex>
            ))}
        </Flex>
        <Flex className="siparis-toplam" flexDirection="column" alignItems="flex-end" mb={2}>
          <Box>
            <strong>Toplam:</strong>{' '}
            {siparis.urunler &&
              parseFloat(siparis.urunler.toplam_tutar).toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })}
          </Box>
          {siparis.kargo && parseFloat(siparis.kargo) > 0 ? (
            <Box mt={1}>
              <strong>Kargo:</strong>{' '}
              {parseFloat(siparis.kargo).toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })}
            </Box>
          ) : (
            <Box mt={1}>KARGO BEDAVA</Box>
          )}
        </Flex>

        <Flex my={1} alignItems="center" justifyContent="flex-end">
          <Link route="profile" params={{ slug: 'siparislerim' }} className="siparis-link">
            <i className="icon-level-up" /> Siparişlerim Sayfasına geri dön
          </Link>
        </Flex>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(SiparisIade);
