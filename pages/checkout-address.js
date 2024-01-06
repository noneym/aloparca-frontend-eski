import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Checkbox } from 'semantic-ui-react';
import Spinner from "../ui/spinner";
import styled from 'styled-components';

import Layout from '../layouts/checkout';
import { media } from '../style/theme';

import { setAddress } from '../actions';
import AddressCard from '../components/pages/profile/components/address-card';
import NewAddress from '../components/pages/profile/components/new-address';
import Api from '../api';

const Outer = styled(Flex)`
  .loader-wrapper {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
  .address-area {
    ${media.tablet`
      flex-direction: column;
    `};
    .adresler {
      .adres-baslik {
        font-size: 18px;
        font-weight: 500;
        color: black;
        padding-left: 10px;
      }
      .adres {
        border: 1px solid #dddddd;
        border-radius: 3px;
        .adres-icerik {
          position: relative;
          padding: 35px 45px;
          border-bottom: 1px solid #dddddd;
          font-size: 16px;
          color: #525355;
          strong {
            color: black;
            font-weight: 500;
          }
          .duzenle {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 13px;
            font-weight: bold;
            color: #ff8900;
          }
        }
        .adres-sec {
          margin: 10px 45px;
          font-size: 13px;
          color: #999999;
        }
      }
      .yeni-adres {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        font-size: 18px;
        color: #333333;
        background-color: #dddddd;
        border-radius: 3px;
      }
    }
  }
  .kargo-baslik {
    font-size: 18px;
    font-weight: 500;
    color: black;
  }
  .kargo-text {
    font-size: 16px;
    font-weight: 500;
    color: #525355;
  }
  .visa-master {
    border-top: 1px solid #dddddd;
    img {
      max-width: 100px;
      max-height: 50px;
      margin: 0 20px;
    }
  }
  .ui.checkbox .box,
  .ui.checkbox label {
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #525355;
  }
  .ui.checkbox .box:before,
  .ui.checkbox label:before {
    border-radius: 0;
    width: 19px;
    height: 19px;
  }
  .ui.checkbox input:checked ~ .box:before,
  .ui.checkbox input:checked ~ label:before {
    background-color: #ff8900;
    border: 0;
  }
  .ui.checkbox input:checked ~ .box:after,
  .ui.checkbox input:checked ~ label:after {
    color: white;
  }
  .ui.checkbox .box:after,
  .ui.checkbox label:after {
    width: 19px;
    height: 19px;
  }
`;

class CheckoutAddress extends React.Component {
  static async getInitialProps() {
    const ilIlceNested = await Api.get('/Usta/ililcev2');
    return { ilIlceNested };
  }

  state = { isLoading: true };
  async componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 100);
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    const { userData, dispatch } = this.props;
    if (userData && userData.user_adres_list) {
      const teslimat = userData.user_adres_list.filter(adres => adres.adres_type === 'teslimat');
      const fatura = userData.user_adres_list.filter(adres => adres.adres_type === 'fatura');
      if (teslimat.length) {
        dispatch(setAddress({ id: teslimat[teslimat.length - 1].Id, type: 'teslimat' }));
        dispatch(setAddress({ id: fatura[fatura.length - 1].Id, type: 'fatura' }));
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
  }

  render() {
    const {
      userData, address, cart, ilIlceNested,
    } = this.props;
    const { isLoading } = this.state;
    const userTeslimat = userData
      ? userData.user_adres_list.find(adres => adres.Id == address.teslimat)
      : null;
    const userFatura = userData
      ? userData.user_adres_list.find(adres => adres.Id == address.fatura)
      : null;
    return (
      <Layout
        title="Teslimat/Fatura Bilgileri"
        step="1"
        route="checkout-payment"
        checkoutFunc={
          !address.teslimat || !address.fatura
            ? () => {
                this.props.dispatch({
                  type: 'FLASH_MESSAGE',
                  payload: 'Lütfen teslimat ve fatura adreslerini giriniz seçiniz.',
                });
              }
            : null
        }
      >
        <Outer width={1} p={[2, 2, 3]} flexDirection="column">
          {isLoading ? (
            <div className="loader-wrapper">
              <Spinner />
            </div>
          ) : (
            <Flex className="address-area" width={1}>
              <Flex
                className="adresler"
                width={[1, 1, 1 / 2]}
                px={[0, 0, 2]}
                mb={[3, 3, 0]}
                flexDirection="column"
              >
                <Box mb={2} className="adres-baslik">
                  Teslimat Adresi
                </Box>
                {userTeslimat ? (
                  <AddressCard item={userTeslimat} ilIlceNested={ilIlceNested} checkout />
                ) : null}
                <NewAddress type="teslimat" ilIlceNested={ilIlceNested} checkout />
              </Flex>
              <Flex
                className="adresler"
                width={[1, 1, 1 / 2]}
                px={[0, 0, 2]}
                mb={[3, 3, 0]}
                flexDirection="column"
              >
                <Box mb={2} className="adres-baslik">
                  Fatura Adresi
                </Box>
                {userFatura ? (
                  <AddressCard item={userFatura} ilIlceNested={ilIlceNested} checkout />
                ) : null}
                <NewAddress type="fatura" ilIlceNested={ilIlceNested} checkout />
              </Flex>
            </Flex>
          )}

          {/* <Flex m={[1, 1, 3]}>
            <Checkbox label="Fatura adresim teslimat adresimle aynı olsun." checked />
          </Flex> */}
          <Flex className="kargo-baslik" mx={3} my={2}>
            Kargo Firması
          </Flex>
          <Flex mx={[1, 1, 3]} my={1} alignItems="center">
            <Box>
              <Checkbox checked />
            </Box>
            <Box mx={[1, 1, 2]}>
              <img src="/static/img/yurtici-kargo.svg" width="100" alt="Yurtiçi Kargo" />
            </Box>
            <Box className="kargo-text">Yurtiçi Kargo ({cart && cart.kargo}TL)</Box>

          </Flex>
        </Outer>
      </Layout>
    );
  }
}
const mapStateToProps = ({ userData, address, cart }) => ({ userData, address, cart });
export default connect(mapStateToProps)(CheckoutAddress);
