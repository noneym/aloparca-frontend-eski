import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { Form, TextArea, Select, Input, Button } from 'semantic-ui-react';
import Spinner from "../../../ui/spinner";

import { Router } from '../../../routes';
import Api from '../../../api';

const Outer = styled(Flex)`
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  color: #525355;
  .ui.form .field {
    margin-bottom: 20px;
  }
  .ui.form .field > label {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: #525355;
    margin-bottom: 10px;
  }
  .ui.dropdown > .text {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    color: #525355;
  }
  .ui.form input {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    color: #525355;
  }
`;

class DestekYeni extends React.Component {
  state = { loading: false, bolum: 'siparis' };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  newForm = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const {
      bolum, konu, mesaj, siparis,
    } = this.state;
    const fd = new FormData();
    fd.append('departman', bolum);
    fd.append('konu', konu);
    fd.append('mesaj', mesaj);
    fd.append('siparis', siparis);
    const data = await Api.post('Ticket/ticket_create', fd);
    if (data && data.audit.ticket_id) {
      Router.pushRoute('profile', { slug: 'destek-merkezi-detay', id: data.audit.ticket_id });
    } else {
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Beklenmedik bir hata oluştu.' });
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, bolum } = this.state;
    const {
      userData: { siparisler },
    } = this.props;
    let siparisOptions = [{ text: 'Seçiniz', value: null }];
    if (siparisler) {
      siparisler.forEach((item) => {
        siparisOptions = [...siparisOptions, { text: item.id, value: item.id }];
      });
    }
    return (
      <Outer flexDirection="column">
        <Form onSubmit={this.newForm}>
          <Form.Field
            control={Select}
            label="Bölüm"
            name="bolum"
            options={[
              {
                text: 'Sipariş İşlemleri ( Siparişleriniz ile ilgili sorunlar )',
                value: 'siparis',
              },
              {
                value: 'satis',
                text: 'Satış ( Satın Almak istediğiniz ürünler ile ilgili sorular. )',
              },
              { value: 'iade', text: 'İade' },
              { value: 'sikayet', text: 'Şikayet' },
            ]}
            defaultValue={bolum}
            required
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label="Konu"
            name="konu"
            required
            onChange={this.handleChange}
          />
          <Form.Field
            control={TextArea}
            label="Mesaj"
            name="mesaj"
            required
            onChange={this.handleChange}
          />
          <Form.Field
            control={Select}
            label="İlgili Sipariş"
            name="siparis"
            placeholder="Seçiniz"
            options={siparisOptions}
            defaultValue={null}
            onChange={this.handleChange}
          />
          {loading ? <Spinner /> : <Form.Field control={Button}>Gönder</Form.Field>}
        </Form>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({
  userData,
});
export default connect(mapStateToProps)(DestekYeni);
