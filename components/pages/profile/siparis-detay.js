import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import moment from 'moment';
import Spinner from "../../../ui/spinner";
import Dimmer from "../../../ui/dimmer";

import { media, color } from '../../../style/theme';
import { Link } from '../../../reactor';

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
      & + .product-card {
        border-top: 1px solid #dddddd;
      }
      .baslik {
        text-align: center;
        margin: 5px 0;
      }
      .adet {
        border-left: 1px solid #dddddd;
      }
      .resim {
        padding: 20px;
        img {
          max-width: 100px;
        }
      }
      .yorum {
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
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
      .durum {
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        text-align: center;
      }
      .tutar {
        font-weight: 500;
        border-left: 1px solid #dddddd;
        ${media.tablet`
          border-left: 0;
          margin: 10px 0 20px;
        `};
      }
      ${media.tablet`
        flex-direction: column;
      `};
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
      ${media.tablet`
        margin-left: 10px;
      `};
    }
  }
  .adresler {
    ${media.tablet`
      flex-direction: column;
    `};
    .adres-baslik {
      font-size: 16px;
      font-weight: 500;
      color: black;
      padding-left: 15px;
      padding-bottom: 30px;
      ${media.tablet`
        padding-bottom: 15px;
      `};
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
    .adres + .adres {
      ${media.tablet`
        margin-top: 30px;
      `};
    }
  }
  .address-card {
    position: relative;
    border: 1px solid #dddddd;
    border-radius: 3px;
    padding: 25px 30px;
    font-size: 14px;
    color: #333333;
    ${media.tablet`
      padding: 15px;
      `};
  }
`;

class SiparisDetay extends React.Component {
  state = {
    isLoading: true,
    siparis:
      this.props.userData && this.props.userData.siparisler.find(item => item.id === this.props.id),
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }
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

  productStatus = (data) => {
    switch (data) {
      case null:
      case 0:
        return 'Tedarik sürecinde';
      case 1:
        return 'Kargoya hazır';
      case 2:
        return 'İade edildi';
      default:
        return null;
    }
  };

  render() {
    const { isLoading, siparis } = this.state;
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
          {siparis.urunler.urun.map(item => (
            <Flex className="product-card" key={item.id}>
              <Flex
                alignItems="center"
                justifyContent="center"
                className="resim"
                width={[1, 1, 1 / 6]}
                px={2}
              >
                <img
                  src={`https://resize.aloparca.com/upload/w_100,h_75/${item.resim}`}
                  alt={item.aciklama}
                />
              </Flex>
              <Flex
                mt={[1, 0]}
                mb={[2, 0]}
                px={2}
                alignItems="center"
                justifyContent="center"
                className="durum"
                width={[1, 1, 1 / 6]}
              >
                {this.productStatus(parseInt(item.urun_durumu, 10) || null)}
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                width={[1, 1, 2 / 6]}
                px={2}
                mt={[1, 0]}
              >
                <Box className="baslik">{item.aciklama}</Box>
              </Flex>
              <Flex
                className="adet"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                width={[1, 1, 1 / 6]}
                px={2}
                mt={[1, 0]}
              >
                {item.adet} adet
              </Flex>
              <Flex
                px={2}
                alignItems="center"
                justifyContent="center"
                className="tutar"
                width={[1, 1, 1 / 6]}
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
            {parseFloat(siparis.urunler.toplam_tutar).toLocaleString('tr-TR', {
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
        <Link className="iade" route="profile" params={{ slug: 'siparis-iade', id: siparis.id }}>
          <i className="icon-rotate" />
          Satın almış olduğunuz ürünlerle ilgili iade ve diğer başvuru işlemleri için lütfen buraya
          tıklayın.
        </Link>
        <Flex className="adresler" mx={[-1, -2]} my={2}>
          <Flex className="adres" width={[1, 1, 1 / 2]} px={[1, 2]} flexDirection="column">
            <Box className="adres-baslik">Teslimat Adresim</Box>
            <Flex className="address-card" flexDirection="column">
              <Box>{siparis.t_isim}</Box>
              <Box mt={1}>{`${siparis.tadres} ${siparis.t_ilce}/${siparis.t_il}`}</Box>
              <Box mt={1}>{siparis.t_telefon}</Box>
            </Flex>
          </Flex>
          <Flex className="adres" width={[1, 1, 1 / 2]} px={[1, 2]} flexDirection="column">
            <Box className="adres-baslik">Fatura Adresim</Box>
            <Flex className="address-card" flexDirection="column">
              <Box>{siparis.f_isim}</Box>
              <Box mt={1}>{`${siparis.fadres} ${siparis.f_ilce}/${siparis.f_il}`}</Box>
              <Box mt={1}>{siparis.f_telefon}</Box>
            </Flex>
          </Flex>
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
export default connect(mapStateToProps)(SiparisDetay);
