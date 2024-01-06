import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import cx from 'classnames';
import { Modal, Button } from 'semantic-ui-react';
import Spinner from "../../../../ui/spinner";

import Api from '../../../../api';
import { getUser, setAddress } from '../../../../actions/index';
import EditAddress from './edit-address';
import SubAddressCard from './address-card';

const Outer = styled(Flex)`
  position: relative;
  border: 1px solid #dddddd;
  border-radius: 3px;
  padding: 25px 30px;
  font-size: 14px;
  color: #333333;
  a.adres-duzenle {
    margin-left: 5px;
    color: #ff8900;
  }
  a.adres-sil {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    i {
      font-size: 20px;
      color: #ff8900;
    }
  }
  a.adres-sec {
    position: absolute;
    display: flex;
    align-items: center;
    top: 10px;
    right: 10px;
    color: #ff8900;
    i {
      font-size: 20px;
      color: #ff8900;
    }
    &.active {
      color: #29a71a;
      i {
        color: #29a71a;
      }
    }
  }
  strong {
    font-weight: 500;
    color: black;
  }
  a.diger-adres {
    margin-top: 15px;
    margin-left: -30px;
    margin-right: -30px;
    margin-bottom: -25px;
    padding: 15px 30px;
    border-top: 1px solid #dddddd;
  }
`;

class AddressCard extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = { loading: false, editAddress: false, openModal: false };
  async deleteAddress(id) {
    this.setState({ loading: true });
    if (id) {
      const fd = new FormData();
      fd.append('adres_id', id);
      fd.append('sil', 1);
      const formData = await Api.post('Users/uyeadresler', fd);
      if (formData.result == '200') {
        this.props.dispatch(getUser());
        this.setState({ loading: false });
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Adres başarıyla silindi',
        });
      } else {
        this.setState({ loading: false });
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Adres silme işlemi sırasında hata oluştu',
        });
      }
    } else {
      this.setState({ loading: false });
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Adres silme işlemi sırasında hata oluştu',
      });
    }
  }
  selectAddress(id, type) {
    this.props.closeModal();
    this.props.dispatch(setAddress({ id, type }));
  }
  closeModal = () => {
    this.setState({ openModal: false });
  };
  render() {
    const {
      item, isDelete, userData, checkout, isSub, address, ilIlceNested,
    } = this.props;
    const { loading, editAddress, openModal } = this.state;
    const addressType = item && item.adres_type === 'teslimat' ? 'teslimat' : 'fatura';
    return (
      <Outer mb={2} flexDirection="column">
        {loading ? (
          <React.Fragment>
            <Spinner centered />
          </React.Fragment>
        ) : editAddress ? (
          <EditAddress
            address={item}
            type={item && item.adres_type === 'teslimat' ? 'teslimat' : 'fatura'}
            cancelAction={() => this.setState({ editAddress: false })}
            ilIlceNested={ilIlceNested}
          />
        ) : (
          <React.Fragment>
            {isDelete && (
              <a
                href="javascript:;"
                onClick={() => this.deleteAddress(item.Id)}
                className="adres-sil"
              >
                <i className="icon-x-altx-alt" />
              </a>
            )}
            {isSub && (
              <a
                href="javascript:;"
                onClick={() => this.selectAddress(item.Id, addressType)}
                className={cx('adres-sec', { active: address[addressType] === item.Id })}
              >
                {address[addressType] === item.Id ? (
                  <React.Fragment>
                    <i className="icon-check" /> Bu adres seçili
                  </React.Fragment>
                ) : (
                  'Adresi kullan'
                )}
              </a>
            )}
            <Box>
              <strong>{item && item.adres_adi}</strong>{' '}
              {!isSub && (
                <a
                  href="javascript:;"
                  onClick={() => this.setState({ editAddress: true })}
                  className="adres-duzenle"
                >
                  / Düzenle
                </a>
              )}
            </Box>
            <Box mt={1}>{item && item.isim}</Box>
            <Box mt={1}>{`${item && item.adres} ${item && item.ilce}/${item && item.sehir}`}</Box>
            <Box mt={1}>{item && item.telefon}</Box>
          </React.Fragment>
        )}
        {checkout && (
          <a
            href="javascript:;"
            onClick={() => this.setState({ openModal: true })}
            className="diger-adres"
          >
            Diğer {item && item.adres_type === 'teslimat' ? 'teslimat' : 'fatura'} adreslerim
          </a>
        )}
        <Modal size="tiny" open={openModal} onClose={this.closeModal}>
          <Modal.Header>
            {item && item.adres_type === 'teslimat' ? 'Teslimat' : 'Fatura'} Adreslerim
          </Modal.Header>
          <Modal.Content>
            <Flex flexDirection="column">
              {userData &&
                userData.user_adres_list
                  .filter(adres =>
                      adres.adres_type === addressType ||
                      (addressType === 'fatura' && !adres.adres_type))
                  .map(adres => (
                    <Box width={1} className="modal-adres" key={adres.Id}>
                      <SubAddressCard closeModal={this.closeModal} item={adres} isSub />
                    </Box>
                  ))}
            </Flex>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Kapat" onClick={() => this.setState({ openModal: false })} />
          </Modal.Actions>
        </Modal>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData, address }) => ({ userData, address });
export default connect(mapStateToProps)(AddressCard);
