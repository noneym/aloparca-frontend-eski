import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Select, Button, Header, Icon, Modal } from 'semantic-ui-react';
import Dimmer from "../../../ui/dimmer";
import Spinner from "../../../ui/spinner";
import moment from 'moment';

import { getUser } from '../../../actions';
import { media } from '../../../style/theme';

import { Link } from '../../../reactor';
import Api from '../../../api';



const Outer = styled(Flex)`
  .siparis-header {
    font-size: 16px;
    color: #525355;
    ${media.tablet`flex-direction: column;`};
    div + div {
      ${media.tablet`margin-top: 20px;`};
    }
    .siparis-select {
      ${media.tablet`width: 100%;`};
    }
    .siparis-tarih-baslik {
      ${media.tablet`display: none;`};
    }
    strong {
      font-weight: 500;
      color: black;
    }
    .ui.selection.dropdown {
      margin-left: 5px;
      min-width: auto;
      min-height: auto;
      border-radius: 0;
      padding-top: 12px;
      padding-bottom: 12px;
      ${media.tablet`
        margin-left: 0;
        width: 100%;
      `};
    }
  }
  .siparis {
    border: 1px solid #dddddd;
    border-radius: 3px;
    ${media.tablet`flex-direction: column;`};
    & + .siparis {
      margin-top: 40px;
    }
    .siparis-tarih {
      padding: 40px 35px;
      ${media.tablet`
        padding: 10px 10px;
        `};
      .siparis-tarih-detay {
        font-size: 14px;
        ${media.tablet`flex-direction: row;`};
        strong {
          color: black;
          font-weight: 500;
        }
        span {
          color: #525355;
          margin-top: 5px;
          ${media.tablet`
            margin-top: 0;
            margin-left: 5px;
            `};
        }
        & + .siparis-tarih-detay {
          margin-top: 30px;
          ${media.tablet`
            margin-top: 10px;
            `};
        }
      }
    }
    .siparis-detay {
      border-left: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      ${media.tablet`
        border:0;
        `};
      .siparis-detay-header {
        padding: 25px 35px;
        border-bottom: 1px solid #dddddd;
        color: #ff8900;
        font-size: 16px;
        font-weight: 500;
        ${media.tablet`
          padding: 10px 10px;
          text-align: center;
        `};
        .package-image {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
      }
      .siparis-detay-content {
        flex-grow: 1;
        .urun-card {
          padding: 15px 35px;
          ${media.tablet`
            flex-direction: column;
            padding: 20px;
          `};
          img {
            max-width: 100px;
          }
          .urun-card-title {
            text-align: right;
            font-size: 16px;
            color: #525355;
            ${media.tablet`
              text-align: center;
              padding: 5px 0;
            `};
          }
          & + .urun-card {
            border-top: 1px solid #dddddd;
          }
        }
      }
      .siparis-detay-footer {
        padding: 25px 35px;
        border-top: 1px solid #dddddd;
        font-size: 13px;
        color: #999999;
        ${media.tablet`
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 15px;
          padding: 0;
        `};
        span {
          ${media.tablet`
            display: block;
            margin: 20px 0;
          `};
        }
        a {
          color: #ff8900;
          ${media.tablet`
            display: none;
          `};
          i {
            font-size: 8px;
          }
        }
      }
    }

    .siparis-link {
      padding: 45px 25px;
      
      ${media.tablet`
        padding: 10px 10px;
        `};
      a {
        width: 100%;
        padding: 15px 0;
        font-size: 14px;
        font-weight: 500;
        color: white;
        border-radius: 3px;
        text-transform: uppercase;
        text-align: center;
        & + a {
          margin-top: 20px;
        }
        &.turuncu {
          background-image: linear-gradient(0deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
        }
        &.mavi {
          background-image: linear-gradient(0deg, rgb(68, 135, 211) 0%, rgb(82, 159, 220) 100%);
        }
        &.kirmizi {
          background-image: linear-gradient(0deg, rgb(206, 28, 48) 0%, rgb(242, 77, 77) 100%);
        }
        &.gri {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
`;

const ModalImage = styled.div`
  width: 100%;
  padding-top: 100%;
`;

const SelectDate = [
  {
    text: 'Son 30 Gün',
    value: 30,
  },
  {
    text: 'Son 60 Gün',
    value: 60,
  },
  {
    text: 'Son 90 Gün',
    value: 90,
  },
  {
    text: 'Tüm Siparişler',
    value: 3650,
  },
];

class Siparislerim extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = {
    date: 30,
    isLoading: true,
    isOpen: false,
    activeOrder: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
    this.props.dispatch(getUser());
  }

  changeDate = (e, { name, value }) => {
    this.setState({ date: value });
  };

  urunIptal = async (id) => {
    // console.log("Sipariş iptal: ", id)

    const fd = new FormData();
    fd.append('siparis_id', id);
    const formData = await Api.post('Users/siparis_iptal', fd);
    if (formData.query) {
      this.setState({ isLoading: true });
      this.props.dispatch(getUser());
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: formData.query,
      });
      this.setState({ isLoading: false });

    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'İşlem sırasında beklenmedik bir hata oluştu.',
      });
      this.setState({ isLoading: false });
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

  toggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { userData } = this.props;
    const {
      date, isLoading, isOpen, activeOrder,
    } = this.state;

    const ModalCancel = (id) => (
      <Modal trigger={<Button style={{
        backgroundImage: "linear-gradient(0deg,rgb(206,28,48) 0%,rgb(242,77,77) 100%)",
        color: "white",
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "inherit",
        marginTop: "20px",
        padding: "15px 0"
      }}>SİPARİŞ İPTAL</Button>} 
      basic size='large' 
      closeIcon>
        <Header icon='exclamation triangle' content='Siparişinizi iptal etmek istediğinizden emin misiniz?' />

        <Modal.Actions>
          <Button color='red' onClick={() => this.urunIptal(id.id)} inverted>
            <Icon name='checkmark' /> Evet
          </Button>
        </Modal.Actions>
      </Modal>
    )



    return isLoading ? (
      <Dimmer>
        <Spinner />
      </Dimmer>
    ) : (
        <Outer flexDirection="column">
          <Flex className="siparis-header" mb={3} justifyContent="space-between" alignItems="center">
            {userData && userData.siparisler && userData.siparisler.length > 0 ? (
              <Box>
                {date === 3650 ? <strong>Tüm zamanlar</strong> : <strong>Son {date} gün</strong>}{' '}
              içinde toplam{' '}
                <strong>
                  {
                    userData.siparisler.filter(siparis =>
                      siparis.siparistarihi >=
                      moment()
                        .day(-date)
                        .format()).length
                  }{' '}
                sipariş
              </strong>
              </Box>
            ) : (
                <Box>Kayıtlı sipariş bulunamadı.</Box>
              )}
            <Box className="siparis-select">
              <strong className="siparis-tarih-baslik">Sipariş Tarihi:</strong>
              <Select defaultValue={date} options={SelectDate} onChange={this.changeDate} />
            </Box>
          </Flex>
          {userData &&
            userData.siparisler &&
            userData.siparisler.length > 0 &&
            userData.siparisler
              .filter(siparis =>
                siparis.siparistarihi >=
                moment()
                  .day(-date)
                  .format())
              .sort((prev, next) => next.id - prev.id)
              .map(siparis => (
                <Flex className="siparis" key={siparis.id}>
                  <Flex className="siparis-tarih" width={[1, 1, 2 / 9]} flexDirection="column">
                    <Flex className="siparis-tarih-detay" flexDirection="column">
                      <strong>Sipariş Veriliş Tarihi:</strong>
                      <span>{moment(siparis.siparistarihi).format('DD MMMM YYYY, HH:mm')}</span>
                    </Flex>
                    <Flex className="siparis-tarih-detay" flexDirection="column">
                      <strong>Sipariş No:</strong>
                      <span>{siparis.id}</span>
                    </Flex>
                    <Flex className="siparis-tarih-detay" flexDirection="column">
                      <strong>Toplam Tutar:</strong>
                      <span>
                        {parseFloat(siparis.urunler.toplam_tutar).toLocaleString('tr-TR', {
                          style: 'currency',
                          currency: 'TRY',
                        })}
                      </span>
                    </Flex>
                  </Flex>
                  {siparis.urunler.urun ? (
                    <Flex className="siparis-detay" width={[1, 1, 5 / 9]} flexDirection="column">
                      <Flex
                        className="siparis-detay-header"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>Siparişiniz {this.orderStatus(siparis.siparisdurumu)}</Box>
                        {siparis.siparis_resim_url && (
                          <Box
                            onClick={() => {
                              this.setState({ activeOrder: siparis });
                              this.toggleModal();
                            }}
                            style={{
                              background: `url('${
                                siparis.siparis_resim_url
                                }') center/cover no-repeat`,
                            }}
                            className="package-image"
                          />
                        )}
                      </Flex>
                      <Flex
                        className="siparis-detay-content"
                        flexDirection="column"
                        justifyContent="center"
                      >
                        {siparis.urunler.urun.slice(0, 2).map(urun => (
                          <Flex
                            className="urun-card"
                            justifyContent="space-between"
                            alignItems="center"
                            key={urun.id}
                          >
                            <Box>
                              <img
                                src={`https://resize.aloparca.com/upload/w_100,h_75/${
                                  urun.resim
                                  }`}
                                alt={urun.aciklama}
                              />
                            </Box>
                            <Flex flexDirection="column" justifyContent="flex-end">
                              <Box className="urun-card-title">{urun.aciklama}</Box>
                              <Box className="urun-card-title">{urun.adet} adet</Box>
                            </Flex>
                          </Flex>
                        ))}
                      </Flex>

                      <Box className="siparis-detay-footer">
                        {siparis.urunler.urun.length > 2 && (
                          <span>
                            Toplam {siparis.urunler.urun.length} üründen 2 ürün gösteriliyor.{' '}
                          </span>
                        )}
                        <Link route="profile" params={{ slug: 'siparis-detay', id: siparis.id }}>
                          Sipariş detayı için tıklayınız <i className="icon-chevron-thin-right" />
                        </Link>
                      </Box>
                    </Flex>
                  ) : (
                      <Box width={[1, 1, 5 / 9]} />
                    )}
                  <Flex className="siparis-link" width={[1, 1, 2 / 9]} flexDirection="column">
                    <Link
                      route="profile"
                      params={{ slug: 'siparis-detay', id: siparis.id }}
                      className="turuncu"
                    >
                      Sipariş Detayı
                  </Link>
                    {siparis.KARGO_TAKIP_URL && (
                      <a href={siparis.KARGO_TAKIP_URL} target="_blank" className="mavi">
                        Kargo Takip
                      </a>
                    )}
                    {siparis.iade_edilerbilir === 1 && siparis.siparisdurumu == '3' && (
                      <Link
                        route="profile"
                        params={{ slug: 'siparis-iade', id: siparis.id }}
                        className="kirmizi"
                      >
                        Kolay İade
                      </Link>
                    )}
                    {/*console.log("sipariş",siparis)*/}
                    {siparis.siparisdurumu != '3' && siparis.siparisdurumu != '2' && siparis.siparisdurumu != '5' && (

                      <ModalCancel className="siparis-iptal" id={siparis.id} />
                    )}
                  </Flex>
                </Flex>
              ))}
          {activeOrder && (
            <Modal size="tiny" open={isOpen} onClose={this.toggleModal} closeIcon>
              <Modal.Header>{`${activeOrder.id} no'lu siparişiniz paketlendi.`}</Modal.Header>
              <Modal.Content>
                <ModalImage
                  className="modal-image"
                  style={{
                    background: `url('${activeOrder.siparis_resim_url}') center/cover no-repeat`,
                  }}
                />
              </Modal.Content>
            </Modal>
          )}
        </Outer>
      );
  }
}

const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(Siparislerim);
