import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import cx from 'classnames';
import styled from 'styled-components';
import { Input, Select, TextArea } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';

import Api from '../../../../api';
import { getUser } from '../../../../actions/index';

const Outer = styled(Flex)`
  .form-box {
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

class EditAddress extends React.Component {
  state = {};

  changeIl = (e, { value }) => this.setState({ selectedCity: value });

  addressForm = async (e) => {
    e.preventDefault();
    const { type, address } = this.props;
    const { addressType, selectedCity = address.sehir, selectedCounty = address.ilce } = this.state;
    const adres_baslik = this.adres_baslik.inputRef.current.value;
    const ad_soyad = this.ad_soyad.inputRef.current.value;
    const adres = this.adres.ref.current.value;
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

    // console.log("type",type,"address",address,"adres_baslik",adres_baslik,"ad_soyad",ad_soyad,"adres",adres,
    // "ceptelefon",cep_telefon,"telefon",telefon,"faturafirmaad",fatura_firma_ad,"fatvergdai",fatura_vergi_dairesi,
    // "fatura_vergi_no",fatura_vergi_no)

    let showError = false;
    if (!adres_baslik) {
      showError = true;
      this.setState({ formAdresBaslik: true });
    }
    if (!ad_soyad) {
      showError = true;
     //console.log("ad_soyad")

      this.setState({ formAdSoyad: true });
    }
    if (!adres) {
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
    if (type === 'fatura') {
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
      const fd = new FormData();
      fd.append('adres_id', address.Id);
      fd.append('adres_adi', adres_baslik);
      fd.append('isim', ad_soyad);
      fd.append('sehir', selectedCity);
      fd.append('ilce', selectedCounty);
      fd.append('adres', adres);
      fd.append('evtelefonu', telefon);
      fd.append('firma', fatura_firma_ad);
      fd.append('vergidairesi', fatura_vergi_dairesi);
      fd.append('vergino', fatura_vergi_no);
      fd.append('telefon', cep_telefon);
      fd.append('adres_type', type);
      const addressData = await Api.post('Users/uyeadresler', fd);

      if (addressData.result == '200') {
        this.props.dispatch(getUser());
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Adres bilgileri başarıyla güncellendi.',
        });
        this.props.cancelAction();
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Adres bilgileri kaydedilirken hata oluştu.',
        });
      }
    }
  };

  render() {
    const {
      type, address, cancelAction, ilIlceNested,
    } = this.props;
    const {
      openForm,
      ilce,
      addressType,
      selectedCity = address.sehir,
      selectedCounty = address.ilce,
      formAdresBaslik,
      formAdSoyad,
      formAdres,
      formIlce,
      formSehir,
      formCepTelefonu,
      formVergiNo,
    } = this.state;

    // console.log(this.state, this.props);
    

    const cities = Object.keys(ilIlceNested).map(text => ({ text, value: text }));
    return (
      <Outer>
        <Flex width={1} flexDirection="column" className="form-box">
          <Flex mb={1} alignItems="flex-end" className="title">
            {type === 'teslimat' ? 'Teslimat Adresi Düzenle' : 'Fatura Adresi Düzenle'}
          </Flex>
          <form onSubmit={this.addressForm}>
            <Flex my={2} flexDirection="column">
              <label className="form-label required">Adres Başlığı</label>
              <Input
                defaultValue={address.adres_adi}
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
                Ad Soyad{type === 'fatura' ? ' / Firma Adı' : null}
              </label>
              <Input
                defaultValue={address.isim}
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
                  options={cities}
                  defaultValue={address.sehir}
                  className={cx({ error: formSehir })}
                />
              </Flex>
              <Flex width={1 / 2} px={2} flexDirection="column">
                <label className="form-label required">İlçe</label>
                <Select
                  placeholder="İlçe"
                  options={(ilIlceNested[selectedCity] || ilIlceNested[address.sehir]).map(text => ({
                      text,
                      value: text,
                    }))}
                  defaultValue={address.ilce}
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
                ref={(n) => {
                  this.adres = n;
                }}
                className={cx({ error: formAdres })}
                defaultValue={address.adres}
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
                  value={address.telefon}
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
                  value={address.evtelefonu}
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
                      defaultValue={address.vergidairesi}
                      ref={(n) => {
                        this.fatura_vergi_dairesi = n;
                      }}
                    />
                  </Flex>
                  <Flex width={1 / 2} px={2} flexDirection="column">
                    <label className="form-label required">Vergi No / T.C. Kimlik No</label>
                    <Input
                      defaultValue={address.vergino}
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
            <Flex mx={-2} justifyContent="flex-end">
              <Flex width={2 / 3} px={2} justifyContent="space-between">
                <a href="javascript:;" onClick={cancelAction} className="button-close">
                  İPTAL
                </a>
                <button type="submit" className="button-submit" name="btn_submit">
                  KAYDET
                </button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Outer>
    );
  }
}
export default connect()(EditAddress);
