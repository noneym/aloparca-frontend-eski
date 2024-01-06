import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import {connect} from 'react-redux'

import Layout from '../layouts/container';
import { Container, Link } from '../reactor';
import { media, color } from '../style/theme';

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
      .icon-warning {
        font-size: 60px;
        color: red;
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
        font-size: 18px;
        color: #525355;
        text-align: center;
        line-height: 1.5em;
        padding: 0 10px;
        strong {
          font-weight: 500;
        }
      }
    }
    .no-data {
      width: 100%;
      min-height: 300px;
      .no-data-text {
        font-size: 20px;
        text-align: center;
      }
    }
    .return-cart {
      margin-top: 30px;
      font-size: 18px;
      text-align: center;
      color: ${color.primary};
    }
  }
`;

class CheckoutError extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = {};

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
  }

  render() {
    const { query } = this.props;
    return (
      <Layout meta={{ title: 'Ödeme Hatası' }}>
        <Outer>
          <Container>
            <Flex className="main-area" justifyContent="center">
              {query && query.mesaj ? (
                <Flex width={[1, 3 / 4]} flexDirection="column">
                  <Flex className="checkout-detail" alignItems="center" py={4} mb={4} flexDirection="column">
                    <Flex alignItems="center" pb={4} justifyContent="center">
                      <i className="icon-warning" />
                    </Flex>
                    <Box className="checkout-id">Siparişinizin ödemesi gerçekleşmedi.</Box>
                    <Box mt={2} className="checkout-text">
                      {decodeURIComponent(query.mesaj)}
                    </Box>
                    <Link className="return-cart" route="sepet">
                      Sepete Dön
                    </Link>
                  </Flex>
                </Flex>
              ) : (
                <Flex className="no-data" flexDirection="column" justifyContent="center">
                  <div className="no-data-text">Bir hata oluştu.</div>
                  <Link className="return-cart" route="sepet">
                    Sepete Dön
                  </Link>
                </Flex>
              )}
            </Flex>
          </Container>
        </Outer>
      </Layout>
    );
  }
}
const mapStateToProps = ({
  checkoutBank, checkoutType, cart, address,
}) => ({
  checkoutBank,
  checkoutType,
  cart,
  address,
});
export default connect(mapStateToProps)(CheckoutError);
