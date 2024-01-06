import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import cx from 'classnames';
import { Input, Select, TextArea, Checkbox } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';

import Api from '../../../../api';
import { getUser, setAddress } from '../../../../actions/index';
import Spinner from '../../../../ui/spinner';

const Outer = styled(Flex)`
  .adres-ekle {
    width: 100%;
    height: 146px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dddddd;
    border-radius: 3px;
    padding: 25px 30px;
    font-size: 15px;
    font-weight: 500;
    color: black;
    i {
      font-size: 20px;
      margin-right: 10px;
    }
    &:hover {
      color: #ff8900;
    }
  }
  .adres-ekle-checkout {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    font-size: 18px;
    color: #333333;
    background-color: #dddddd;
    border-radius: 3px;
    i {
      font-size: 20px;
      margin-right: 10px;
    }
    &:hover {
      color: #ff8900;
    }
  }
  .form-box {
    border: 1px solid #dddddd;
    border-radius: 3px;
    padding: 25px 30px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #999999;
      &:before {
        content: '';
        width: 15px;
        height: 2px;
        background-color: #ff8900;
        margin: 0 10px 4px 0;
      }
    }
    .form-label {
      font-size: 14px;
      font-weight: 500;
      color: black;
      margin-left: 10px;
      margin-bottom: 5px;
      &.required:after {
        content: '*';
        color: #ff8900;
      }
    }
    .ui.input input {
      font-family: 'Barlow', sans-serif;
      font-size: 16px;
      color: #525355;
      border-radius: 0;
      border-color: #dddddd;
      padding: 8px 10px;
    }
    input {
      font-family: 'Barlow', sans-serif;
      font-size: 16px;
      color: #525355;
      border-radius: 0;
      border: solid 1px #dddddd;
      padding: 8px 10px;
    }
    textarea {
      font-family: 'Barlow', sans-serif;
      font-size: 16px;
      color: #525355;
      border-radius: 0;
      border-color: #dddddd;
      padding: 8px 10px;
      resize: none;
      &::placeholder {
        opacity: 0.4;
      }
    }
    .ui.input.error input {
      background-color: #fff6f6;
      border-color: #e0b4b4;
      color: #9f3a38;
      box-shadow: none;
    }
    .ui.input.error:after {
      position: absolute;
      right: -15px;
      content: '!';
      font-size: 30px;
      color: #9f3a38;
    }
    .ui.selection.dropdown.error {
      background: #fff6f6;
      border-color: #e0b4b4;
    }
    .ui.selection.dropdown.error:after {
      position: absolute;
      right: -15px;
      content: '!';
      font-size: 30px;
      color: #9f3a38;
    }
    textarea.error {
      background-color: #fff6f6;
      border-color: #e0b4b4;
      color: #9f3a38;
      box-shadow: none;
    }
    textarea.error:before {
      position: absolute;
      left: -15px;
      content: '!';
      font-size: 30px;
      color: #9f3a38;
    }
    .ui.selection.dropdown {
      font-family: 'Barlow', sans-serif;
      font-size: 16px;
      color: #525355;
      border-radius: 0;
      border-color: #dddddd;
      padding: 10px 10px;
      min-width: inherit;
      min-height: inherit;
    }
    .button-submit {
      background-image: linear-gradient(rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      margin-left: 20px;
      width: 100%;
      border-radius: 3px;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button-close {
      background: #b2b2b2;
      width: 100%;
      border-radius: 3px;
      padding: 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: white;
      cursor: pointer;
      text-align: center;
    }
  }
`;

class NewAddress extends React.Component {
  state = { isLoading: false };

  cities = Object.keys(this.props.ilIlceNested).map(text => ({ text, value: text }));

  changeIl = (e, { value }) => this.setState({ selectedCity: value });
  changeIlce = (e, { value }) => this.setState({ selectedCounty: value });
  newAddress = (e, { value }) => this.setState({ newAddress: value});

  changeType = () => this.setState({ addressType: !this.state.addressType });

  addressForm = async (e) => {
    e.preventDefault();
    const { type } = this.props;
    const { addressType, selectedCity, selectedCounty, newAddress } = this.state;
    const adres_baslik = this.adres_baslik.inputRef.current.value;
    const ad_soyad = this.ad_soyad.inputRef.current.value;
    // const adres = this.adres.inputRef.current.value;
    const cep_telefon = this.cep_telefon.inputElement.value;
    const telefon = this.telefon.inputElement.value;
    let fatura_firma_ad = '';
    let fatura_vergi_dairesi = '';
    let fatura_vergi_no = '';
    if (type === 'fatura' || (type === 'teslimat' && addressType)) {
      // fatura_firma_ad = this.fatura_firma_ad.inputRef.current.value;
      fatura_firma_ad = ad_soyad;
      fatura_vergi_dairesi = this.fatura_vergi_dairesi.inputRef.current.value;
      fatura_vergi_no = this.fatura_vergi_no.inputRef.current.value;
    }
    let showError = false;
    if (!adres_baslik) {
      showError = true;
      this.setState({ formAdresBaslik: true });
    }
    if (!ad_soyad) {
      showError = true;
      this.setState({ formAdSoyad: true });
    }
    if (!newAddress) {
      showError = true;
      this.setState({ formAdres: true });
    }
    if (!cep_telefon) {
      showError = true;
      this.setState({ formCepTelefonu: true });
    }
    if (!selectedCounty) {
      showError = true;
      this.setState({ formIlce: true });
    }
    if (!selectedCity) {
      showError = true;
      this.setState({ formSehir: true });
    }
    if (type === 'fatura' || (type === 'teslimat' && addressType)) {
      if (!fatura_vergi_no) {
        showError = true;
        this.setState({ formVergiNo: true });
      }
    }
    if (showError) {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Zorunlu form alanları boş bırakılamaz.',
      });
    } else {
      this.setState({ isLoading: true });
      const fd = new FormData();
      fd.append('adres_adi', adres_baslik);
      fd.append('isim', ad_soyad);
      fd.append('sehir', selectedCity);
      fd.append('ilce', selectedCounty);
      fd.append('adres', newAddress);
      fd.append('evtelefonu', telefon);
      fd.append('firma', fatura_firma_ad);
      fd.append('vergidairesi', fatura_vergi_dairesi);
      fd.append('vergino', fatura_vergi_no);
      fd.append('telefon', cep_telefon);
      fd.append('adres_type', type);
      const addressData = await Api.post('Users/uyeadresler', fd);

      if (parseInt(addressData.result, 10) === 200) {
        if (!addressType) this.props.dispatch(getUser());
        if (!addressType) this.setState({ openForm: false });
        if (!addressType) {
          this.props.dispatch({
            type: 'FLASH_MESSAGE',
            payload: 'Adres bilgileri başarıyla eklendi',
          });
        }
        this.props.dispatch(setAddress({ id: addressData.adres_id, type: addressData.data.adres_type }));
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Adres bilgileri kaydedilirken hata oluştu.',
        });
      }
      if (addressType) {
        fd.set('adres_type', type === 'fatura' ? 'teslimat' : 'fatura');
        const addressDataSecond = await Api.post('Users/uyeadresler', fd);

        if (parseInt(addressDataSecond.result, 10) === 200) {
          this.props.dispatch(getUser());
          this.setState({ openForm: false });
          this.props.dispatch({
            type: 'FLASH_MESSAGE',
            payload: 'Adres bilgileri başarıyla eklendi',
          });
          this.props.dispatch(setAddress({ id: addressDataSecond.adres_id, type: addressDataSecond.data.adres_type }));
        } else {
          this.props.dispatch({
            type: 'FLASH_MESSAGE',
            payload: 'Adres bilgileri kaydedilirken hata oluştu.',
          });
        }
      }
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { type, checkout, ilIlceNested } = this.props;
    const {
      isLoading,
      openForm,
      ilce,
      addressType,
      selectedCity,
      formAdresBaslik,
      formAdSoyad,
      formAdres,
      formIlce,
      formSehir,
      formCepTelefonu,
      formVergiNo,
    } = this.state;
    return (
      <Outer>
        {openForm ? (
          <Flex width={1} flexDirection="column" className="form-box">
            <Flex mb={1} alignItems="flex-end" className="title">
              {type === 'teslimat' ? 'Yeni Teslimat Adresi' : 'Yeni Fatura Adresi'}
            </Flex>
            <form onSubmit={this.addressForm}>
              <Flex my={2} flexDirection="column">
                <label className="form-label required">Adres Başlığı</label>
                <Input
                  placeholder="Örn: Ev Adresi - İş Adresi"
                  required
                  className={cx({ error: formAdresBaslik })}
                  ref={(n) => {
                    this.adres_baslik = n;
                  }}
                />
              </Flex>
              <Flex my={2} flexDirection="column">
                <label className="form-label required">
                  Ad Soyad
                  {type === 'fatura' || (type === 'teslimat' && addressType)
                    ? ' / Firma Adı'
                    : null}
                </label>
                <Input
                  required
                  className={cx({ error: formAdSoyad })}
                  ref={(n) => {
                    this.ad_soyad = n;
                  }}
                />
              </Flex>
              <Flex my={2} mx={-2}>
                <Flex width={1 / 2} px={2} flexDirection="column">
                  <label className="form-label required">Şehir</label>
                  <Select
                    placeholder="Şehir"
                    onChange={this.changeIl}
                    options={this.cities}
                    className={cx({ error: formSehir })}
                  />
                </Flex>
                <Flex width={1 / 2} px={2} flexDirection="column">
                  <label className="form-label required">İlçe</label>
                  <Select
                    placeholder="İlçe"
                    disabled={!selectedCity}
                    options={(ilIlceNested[selectedCity] || []).map(text => ({
                      text,
                      value: text,
                    }))}
                    onChange={this.changeIlce}
                    key={selectedCity}
                    className={cx({ error: formIlce })}
                  />
                </Flex>
              </Flex>
              <Flex my={2} flexDirection="column">
                <label className="form-label required">Adres</label>
                <TextArea
                  rows={3}
                  placeholder="Mahalle, sokak, cadde ve diğer bilgiler"
                  required
                  onChange={this.newAddress}
                  ref={(n) => {
                    this.adres = n;
                  }}
                  className={cx({ error: formAdres })}
                />
              </Flex>
              <Flex my={2} mx={-2}>
                <Flex width={1 / 2} px={2} flexDirection="column">
                  <label className="form-label required">Cep Telefonu</label>
                  <MaskedInput
                    mask={[
                      /[0-9]/,
                      ' ',
                      '(',
                      /\d/,
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                    ]}
                    guide
                    ref={(n) => {
                      this.cep_telefon = n;
                    }}
                    required
                    className={cx({ error: formCepTelefonu })}
                    placeholder="0(5XX) XXX XX XX" type="text"
                  />
                </Flex>
                <Flex width={1 / 2} px={2} flexDirection="column">
                  <label className="form-label">Telefon</label>
                  <MaskedInput
                    mask={[
                      /[0-9]/,
                      ' ',
                      '(',
                      /\d/,
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                    ]}
                    guide
                    ref={(n) => {
                      this.telefon = n;
                    }}
                    placeholder="0(XXX) XXX XX XX"
                  />
                </Flex>
              </Flex>
              {type === 'fatura' && (
                <React.Fragment>
                  <Flex my={2} mx={-2}>
                    <Flex width={1 / 2} px={2} flexDirection="column">
                      <label className="form-label">Vergi Dairesi</label>
                      <Input
                        ref={(n) => {
                          this.fatura_vergi_dairesi = n;
                        }}
                      />
                    </Flex>
                    <Flex width={1 / 2} px={2} flexDirection="column">
                      <label className="form-label required">Vergi No / T.C. Kimlik No</label>
                      <Input
                        required
                        ref={(n) => {
                          this.fatura_vergi_no = n;
                        }}
                        className={cx({ error: formVergiNo })}
                      />
                    </Flex>
                  </Flex>
                </React.Fragment>
              )}
              {type === 'teslimat' && addressType && (
                <React.Fragment>
                  <Flex my={2} mx={-2}>
                    <Flex width={1 / 2} px={2} flexDirection="column">
                      <label className="form-label">Vergi Dairesi</label>
                      <Input
                        ref={(n) => {
                          this.fatura_vergi_dairesi = n;
                        }}
                      />
                    </Flex>
                    <Flex width={1 / 2} px={2} flexDirection="column">
                      <label className="form-label required">Vergi No / T.C. Kimlik No</label>
                      <Input
                        required
                        ref={(n) => {
                          this.fatura_vergi_no = n;
                        }}
                        className={cx({ error: formVergiNo })}
                      />
                    </Flex>
                  </Flex>
                </React.Fragment>
              )}
              <Flex my={2} flexDirection="column">
                <Checkbox
                  label="Teslimat ve Fatura adresim aynı olsun"
                  checked={addressType}
                  onChange={this.changeType}
                />
              </Flex>
              <Flex mx={-2} justifyContent="flex-end">
                <Flex width={2 / 3} px={2} justifyContent="space-between">
                  <a
                    href="javascript:;"
                    onClick={() => this.setState({ openForm: false })}
                    className="button-close"
                  >
                    İPTAL
                  </a>
                  <button type="submit" className="button-submit" name="btn_submit" disabled={isLoading}>
                    KAYDET{' '}
                    {isLoading && (
                      <Spinner marginLeft={7.5} size="tiny" />
                    )}
                  </button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        ) : (
          <a
            href="javascript:;"
            onClick={() => this.setState({ openForm: true })}
            className={cx({ 'adres-ekle': !checkout, 'adres-ekle-checkout': checkout })}
          >
            <i className={cx({ 'icon-add': checkout, 'icon-plus-circle': !checkout })} />
            {type === 'teslimat' ? 'Yeni Teslimat Adresi Ekle' : 'Yeni Fatura Adresi Ekle'}
          </a>
        )}
      </Outer>
    );
  }
}
export default connect()(NewAddress);
