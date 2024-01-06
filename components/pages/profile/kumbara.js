import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Link } from '../../../reactor';
import { Input, Label, Icon, Table } from 'semantic-ui-react';
import Dimmer from "../../../ui/dimmer";
import Spinner from "../../../ui/spinner";
import Api from '../../../api';
import { getUser } from '../../../actions/index';

import KrediKarti from '../../../components/credit-card-payment';
import { media, color } from '../../../style/theme';

const Outer = styled.div`
  .bakiye {
    font-size: 24px;
    .label {
      color: #999;
      margin-right: 10px;
    }
    .value {
      font-weight: 700;
    }
  }
  h3 {
    font-weight: 700;
    color: ${color.primary};
    margin-top: 30px;
  }

  .eklenecek-tutar {
    display: block;
    position: relative;
    height: 50px;
    margin-top: -30px;
    font-size: 14px;
    color: #8a8a8a;
  }

  .odeme-yap {
    display: flex;
    justify-content: center;
    padding: 15px;
    border-radius: 3px;
    background-image: linear-gradient(0deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
  .odeme-yap-pasif {
    display: flex;
    justify-content: center;
    padding: 15px;
    border-radius: 3px;
    background-color: #dddddd;
    font-size: 18px;
    font-weight: 500;
    color: white;
    margin-top: 20px;
  }

  table .not {
    text-align: right;
    ${media.phone`
      font-size: 14px;
      text-align:left;
    `}
  }

  .ui.table th.collapsing,
  .ui.table td.collapsing {
      white-space: normal;
   } 

`;

class IndirimCekleri extends React.Component {
  static async getInitialProps({ reduxStore }) {
    const { result } = await Api.get('Users/banka_hesap_bilgileri');
    reduxStore.dispatch({ type: 'ADD_BANK', payload: result[0].Banka });
    return { banka: result };
  }

  state = { isLoading: true, openModal: false };

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    if(!this.props.isLogin)
      return;
    this.loadKumbaraLog();
    await this.props.dispatch(getUser());
    this.setState({ isLoading: false });
  }

  loadKumbaraLog = async () => {
    this.props.dispatch(getUser());
    await this.setState({kumbaraLogLoading: true})
    const kumbaraLog = await Api.get('Kumbara/kumbara_log');
    this.setState({ kumbaraLog, price: 0, kumbaraLogLoading:false });
  }

  onSuccess = () => {
    this.props.dispatch(getUser());
    this.loadKumbaraLog();
  }

  render() {
    const {
      userData,
      route,
      checkoutFunc,
    } = this.props;
    const {
      isLoading, price, priceLocked, openModal, kumbaraLog,kumbaraLogLoading
    } = this.state;

    let checkoutFuncProps = {};
    if (price > 0) {
      checkoutFuncProps = {
        nativeLink: true,
        nativeProps: {
          onClick: () => {
            this.KrediKarti.modalOpen();
          },
        },
      };
    }


    return isLoading || !userData ? (
        <Outer>
          <Dimmer>
            <Spinner />
          </Dimmer>
        </Outer>
    ) : (
      <Outer>
        <Flex className="bakiye">
          <Box className="label">Bakiye:</Box>
          <Box className="value">
            {`${parseFloat(userData.kumbara_tutar).toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            })}`}
          </Box>
        </Flex>
        <h3>Kumbaraya Para Ekle</h3>
        <Box mb={3}>
          <Input
            labelPosition="left"
            type="number"
            max="999999999"
            maxLength="9"
            placeholder="Tutar"

            onChange={(e) => {
              this.setState({ price: e.target.value });
            }}
          >
            <Label basic>₺</Label>
            <input />
          </Input>
        </Box>

          <div className="eklenecek-tutar">
            {price > 0 && (
              <p>
                Kredi kartınızdan kumbaraya eklenecek tutar:{' '}
                <strong>
                  {parseFloat(price).toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </strong>
              </p>
            )}
          </div>



          <Flex mx={[0,0,-4]} flexWrap="wrap">
            <Box px={[0,0,2]} width={[1,1,1]} mx={[1,1,1]}>
              <KrediKarti
                innerRef={(n) => {
                  this.KrediKarti = n;
                }}
                cart={this.props.cart}
                address={this.props.address}
                dispatch={this.props.dispatch}
                taksitGoster={false}
                kumbaraTotal={price}
                onSuccess={this.onSuccess}
              />

              {price > 0 ? (
                <Box my={3}>
                  <Link route={route} className="odeme-yap" {...checkoutFuncProps}>
                    ÖDEME YAP
                  </Link>
                </Box>
              ) : (
                <div className="odeme-yap-pasif">ÖDEME YAP</div>
              )}
            </Box>

            <Box mt={[3,3,0]} px={[0,0,2]} width={[1,1,1]} mx={[1,1,1]} mt={1}>
              <Table celled striped>
                <Table.Header>
                  <Table.Row >
                    <Table.HeaderCell colSpan="3">Kumbara Geçmişi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {kumbaraLogLoading ? <Table.Row>
                    <Table.Cell textAlign="center" colSpan={3}>
                      <Spinner />
                    </Table.Cell>
                  </Table.Row> :

                    <>
                    {kumbaraLog &&
                      kumbaraLog.map(item => (
                        <Table.Row key={item.tahsilat_id} >
                          <Table.Cell collapsing>
                            <Icon name={item.gelir_gider == 'gelir' ? 'add square' : 'add to cart'} />{' '}
                            {item.gelir_gider}
                          </Table.Cell>
                          <Table.Cell>{item.tutar} TL</Table.Cell>
                          <Table.Cell  className="not">
                            <p>{item.not}</p>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </>
                  }
                </Table.Body>
              </Table>
            </Box>
          </Flex>


      </Outer>
    );
  }
}

const mapStateToProps = ({
  userData, isLogin, checkoutBank, checkoutType, cart, address, kumbara,
}) => ({
  userData,
  isLogin,
  checkoutBank,
  checkoutType,
  cart,
  address,
  kumbara,
});
export default connect(mapStateToProps)(IndirimCekleri);
