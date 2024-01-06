import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import {
  Input, Checkbox, Select, Modal, Button,
} from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import cx from 'classnames';

import { media } from '../../../style/theme';
import { site } from '../../../reactor/func';
import { Link } from '../../../reactor';

import { userLogin } from '../../../actions';
import Api from '../../../api';
import b2b from './b2b.json';
import Spinner from '../../../ui/spinner';

const Outer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1.26rem 0;
  .cift-sutun {
    ${media.tablet`flex-direction: column;`};
  }
  .form-label {
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
    margin-left: 0.76rem;
    margin-bottom: 0.33rem;
    &.required:after {
      content: '*';
      color: #ff8900;
    }
  }
  input {
    font-family: 'Barlow', sans-serif;
    font-size: 1rem;
    color: #525355;
    border-radius: 0;
    border: solid 1px #dddddd;
    padding: 0.7rem 1rem;
  }
  .ui.input input {
    font-family: 'Barlow', sans-serif;
    font-size: 1.2rem;
    color: #525355;
    border-radius: 0;
    border-color: #dddddd;
    padding: 0.7rem 1rem;
  }
  .error {
    background-color: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    box-shadow: none;
  }
  .error:after {
    position: absolute;
    right: -1rem;
    content: '!';
    font-size: 1.85rem;
    color: #9f3a38;
  }
  .ui.radio.checkbox .box,
  .ui.radio.checkbox label {
    font-family: 'Barlow', sans-serif;
    font-size: 1.2rem;
    color: #525355;
    padding-left: 1.75rem;
  }
  .ui.radio.checkbox + .ui.radio.checkbox {
    margin-left: 2.8rem;
  }
  .ui.checkbox input[type='checkbox'],
  .ui.checkbox input[type='radio'] {
    width: 1.25rem;
    height: 1.25rem;
  }
  .ui.radio.checkbox .box:before,
  .ui.radio.checkbox label:before {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
  .ui.radio.checkbox input:checked ~ .box:before,
  .ui.radio.checkbox input:checked ~ label:before {
    border: 0;
    background-color: #ff8900;
  }
  .ui.radio.checkbox input:checked ~ .box:after,
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: white;
  }
  .ui.radio.checkbox .box:after,
  .ui.radio.checkbox label:after {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
  .ui.checkbox .box,
  .ui.checkbox label {
    font-family: 'Barlow', sans-serif;
    font-size: 0.88rem;
    color: #525355;
  }
  .ui.checkbox .box:before,
  .ui.checkbox label:before {
    border-radius: 0;
    width: 1.21rem;
    height: 1.21rem;
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
    width: 1.21rem;
    height: 1.21rem;
  }
  a {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.75rem;
    color: #ff8900;
  }
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.95rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
    background-image: linear-gradient(rgb(255, 159, 0) 0%, rgb(255, 126, 0) 100%);
    border-radius: 3px;
    cursor: pointer;
  }

  .form-il-ilce {
    ${media.tablet`
      display: block;
      margin-top: 0;
      margin-bottom: -0.75rem;

      >div{margin-bottom: 0.75rem; }
    `};
  }
  .tiklayiniz {
    color: black;
    font-size: 1rem;
    .kullaniciMetni {
      cursor: pointer;
      font-size: 1rem;
      padding-right: 0.4rem;
    }
    .asteriks {
      color: #ff8900;
    }
  }
  .onay {
    font-weight: bold;
  }
`;

const HiddenFileImage = styled.input`
  display: none;
`;

const FileImageFlex = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0;
  border: 1px solid #dddddd;
  padding: 0.5rem 1rem;
  border-radius: 2px;

`;

const FileImageButton = styled.button`

  background-image: linear-gradient(rgb(255,159,0) 0%,rgb(255,126,0) 100%);
  background-repeat: no-repeat;
  background-size: auto;
  padding: 0.5rem;
  color: white;
  width: 9.2rem;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  margin-right: 0.75rem;
`;

class UyeOl extends React.Component {
  state = {
    isLoading: false, ilIlceNested: {}, fileImageName: '', openModal: false, onay: false,
  };

  componentDidMount() {
    if (site === 'b2b') this.getCities();
  }

  getCities = async () => {
    const ilIlceNested = await Api.get('/Usta/ililcev2');
    this.setState({ ilIlceNested });
  };

  changeSelect = (e, { value }, type) => {
    this.setState({ [type]: value });
  };

  loginForm = async (e) => {
    e.preventDefault();
    const ad = this.ad.inputRef.current.value;
    const soyad = this.soyad.inputRef.current.value;
    const telefon = this.telefon.inputElement.value;
    const email = this.email.inputRef.current.value;
    const password = this.password.inputRef.current.value;
    const ticari_unvan = this.ticari_unvan ? this.ticari_unvan.inputRef.current.value : null;
    const vergi_dairesi = this.vergi_dairesi ? this.vergi_dairesi.inputRef.current.value : null;
    const vergi_no = this.vergi_no ? this.vergi_no.inputRef.current.value : null;
    const vergi_levhasi = await (this.vergi_levhasi && this.vergi_levhasi.files[0] !== undefined
    && this.vergi_levhasi.files[0] !== null ? this.vergi_levhasi.files[0] : null);
    const { companyType, selectedCity, selectedTown } = this.state;

    let showError = false;
    this.setState({
      formAd: false,
      formSoyad: false,
      formEmail: false,
      formPassword: false,
      formTelefon: false,
      formIl: false,
      formIlce: false,
      formSirketTipi: false,
      formTicariUnvan: false,
      formVergiDairesi: false,
      formVergiLevhasi: false,
      formVergiNo: false,
    });

    if (!ad) {
      showError = true;
      this.setState({ formAd: true });
    }

    if (!soyad) {
      showError = true;
      this.setState({ formSoyad: true });
    }

    if (!telefon) {
      showError = true;
      this.setState({ formTelefon: true });
    }

    if (!email) {
      showError = true;
      this.setState({ formEmail: true });
    }

    if (!password) {
      showError = true;
      this.setState({ formPassword: true });
    }
    if (site === 'b2b') {
      if (!selectedCity) {
        showError = true;
        this.setState({ formIl: true });
      }

      if (!selectedTown) {
        showError = true;
        this.setState({ formIlce: true });
      }

      if (!companyType) {
        showError = true;
        this.setState({ formSirketTipi: true });
      }

      if (!ticari_unvan) {
        showError = true;
        this.setState({ formTicariUnvan: true });
      }

      if (!vergi_dairesi) {
        showError = true;
        this.setState({ formVergiDairesi: true });
      }

      if (!vergi_no) {
        showError = true;
        this.setState({ formVergiNo: true });
      }

      if (!vergi_levhasi) {
        showError = true;
        this.setState({ formVergiLevhasi: true });
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
      if (site === 'aloparca') {
        fd.append('uyeadi', ad);
        fd.append('uyesoyadi', soyad);
        fd.append('uyemailadresi', email);
        fd.append('uyegirissifresi', password);
        fd.append('uyegsm', telefon);
      } else {
        fd.append('isim', ad);
        fd.append('soyisim', soyad);
        fd.append('mail', email);
        fd.append('password', password);
        fd.append('gsm', telefon);
        fd.append('sehir', selectedCity);
        fd.append('ilce', selectedTown);
        fd.append('sirket_tipi', companyType);
        fd.append('ticari_unvan', ticari_unvan);
        fd.append('vergi_levhasi', vergi_levhasi);
        fd.append('vergi_dairesi', vergi_dairesi);
        fd.append('vergi_no', vergi_no);
      }

      const uyeData = await Api.post(
        site === 'aloparca' ? 'Users/uyeolustur' : 'B2b/b2b_basvuru',
        fd,
      );

      if (site === 'aloparca') {
        if (parseInt(uyeData.result, 10) === 200) {
          const user = {
            email,
            password,
          };
          this.props.dispatch(userLogin(user));
        } else {
          this.props.dispatch({
            type: 'FLASH_MESSAGE',
            payload: uyeData.text,
          });
        }
      } else if (parseInt(uyeData.status, 10) === 200) {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Başvurunuz başarıyla alınmıştır. En yakın zamanda size dönüş yapılacaktır.',
        });

        // Router.pushRoute('home');
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Bu e-posta adresiyle daha önce kayıt alınmıştır.',
        });
      }
      this.setState({ isLoading: false });
    }
  };

  handleCheckbox = () => {
    this.setState({ onay: !this.state.onay });
    // console.log(this.state);
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  renderLabel = () => <a className="kullaniciMetni" onClick={() => this.setState({ openModal: true })}>Kullanıcı Bilgilendirme Metnini</a>;

  render() {
    const {
      onay,
      openModal,
      isLoading,
      formAd,
      formSoyad,
      formEmail,
      formPassword,
      formTelefon,
      formIl,
      formIlce,
      formSirketTipi,
      formTicariUnvan,
      formVergiDairesi,
      formVergiLevhasi,
      formVergiNo,
      ilIlceNested,
      selectedCity,
      companyType,
    } = this.state;
    const cities = Object.keys(ilIlceNested).map((text) => ({ text, value: text }));

    return (
      <Outer onSubmit={this.loginForm} autoComplete="off">
        <Flex width={[1, 1, 1 / 2]} flexDirection="column">
          <Flex className="cift-sutun" mx={[0, 0, -2]} mb={2}>
            <Flex width={[1, 1, 1 / 2]} px={[0, 0, 2]} mb={[2, 2, 0]} flexDirection="column">
              <label className="form-label required">Ad</label>
              <Input
                name="ad"
                ref={(n) => {
                  this.ad = n;
                }}
                required
                className={cx({ error: formAd })}
              />
            </Flex>
            <Flex width={[1, 1, 1 / 2]} px={[0, 0, 2]} flexDirection="column">
              <label className="form-label required">Soyad</label>
              <Input
                name="soyad"
                ref={(n) => {
                  this.soyad = n;
                }}
                required
                className={cx({ error: formSoyad })}
              />
            </Flex>
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <label className="form-label required">E-Posta</label>
            <Input
              name="email"
              ref={(n) => {
                this.email = n;
              }}
              required
              className={cx({ error: formEmail })}
            />
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <label className="form-label required">Şifre</label>
            <Input
              name="password"
              type="password"
              ref={(n) => {
                this.password = n;
              }}
              required
              className={cx({ error: formPassword })}
            />
          </Flex>
          <Flex mb={2} flexDirection="column">
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
                this.telefon = n;
              }}
              required
              className={cx({ error: formTelefon })}
              placeholder="0(5XX) XXX XX XX"
              type="text"
            />
          </Flex>
          {site === 'b2b' && (
            <>
              <Flex className="form-il-ilce" my={2} mx={-2}>
                <Flex width={[1, 1, 1 / 2]} px={2} flexDirection="column">
                  <label className="form-label required">Şehir</label>
                  <Select
                    placeholder="Şehir"
                    onChange={(e, params) => this.changeSelect(e, params, 'selectedCity')}
                    options={cities}
                    className={cx({ error: formIl })}
                    required
                  />
                </Flex>
                <Flex width={[1, 1, 1 / 2]} px={2} flexDirection="column">
                  <label className="form-label required">İlçe</label>
                  <Select
                    placeholder="İlçe"
                    onChange={(e, params) => this.changeSelect(e, params, 'selectedTown')}
                    options={
                      selectedCity
                        ? ilIlceNested[selectedCity].map((text) => ({
                          text,
                          value: text,
                        }))
                        : []
                    }
                    className={cx({ error: formIlce })}
                    required
                    key={selectedCity}
                  />
                </Flex>
              </Flex>

              <Flex my={2} flexDirection="column">
                <label className="form-label required">Şirket Tipi</label>
                <Select
                  placeholder="Şirket Tipi"
                  onChange={(e, params) => this.changeSelect(e, params, 'companyType')}
                  options={b2b.companyTypes}
                  className={cx({ error: formSirketTipi })}
                />
              </Flex>
              {companyType && (
                <>
                  <h3>Firma Detayları</h3>
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label required">Ticari Ünvan</label>
                    <Input
                      name="ticari_unvan"
                      ref={(n) => {
                        this.ticari_unvan = n;
                      }}
                      className={cx({ error: formTicariUnvan })}
                      required
                    />
                  </Flex>
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label required">Vergi Dairesi</label>
                    <Input
                      name="vergi_dairesi"
                      ref={(n) => {
                        this.vergi_dairesi = n;
                      }}
                      className={cx({ error: formVergiDairesi })}
                      required
                    />
                  </Flex>
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label required">Vergi Numarası</label>
                    <Input
                      name="vergi_no"
                      type="number"
                      ref={(n) => {
                        this.vergi_no = n;
                      }}
                      className={cx({ error: formVergiNo })}
                      required
                    />
                  </Flex>
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label required">Vergi Levhası</label>
                    <HiddenFileImage
                      className={cx({ error: formVergiLevhasi })}
                      name="vergi_levhasi"
                      type="file"
                      id="fileImage"
                      accept="image/png, image/jpeg"
                      onChange={(e) => this.setState({ fileImageName: e.target.files[0].name })}
                      ref={(n) => {
                        this.vergi_levhasi = n;
                      }}
                    />
                    <FileImageFlex>
                      <FileImageButton type="button" onClick={() => document.getElementById('fileImage').click()}>Dosya Seç</FileImageButton>

                      {
                        this.state.fileImageName === '' ? (
                          <div>
                            Dosya seçilmedi.
                          </div>
                        ) : (
                          <div>
                            {this.state.fileImageName}
                          </div>
                        )
                      }
                    </FileImageFlex>
                  </Flex>
                  <Flex mb={2} flexDirection="column">
                    <label className="form-label">İş Türü</label>
                    <Select
                      placeholder="İş Türü"
                      onChange={(e, params) => this.changeSelect(e, params, 'workType')}
                      options={b2b.workTypes.map((type) => ({ value: type, text: type }))}
                    />
                  </Flex>
                  <Flex mb={2} flexDirection="column">
                    <label className="form-label">İş Yeri Büyüklüğü</label>
                    <Select
                      placeholder="İş Yeri Büyüklüğü"
                      onChange={(e, params) => this.changeSelect(e, params, 'workArea')}
                      options={b2b.workAreas.map((area) => ({ value: area, text: area }))}
                    />
                  </Flex>
                  <Flex mb={2} flexDirection="column">
                    <label className="form-label">Çalışılan Araç Grupları</label>
                    <Select
                      multiple
                      placeholder="Çalışılan Araç Grupları"
                      onChange={(e, params) => this.changeSelect(e, params, 'workCars')}
                      options={b2b.workCars.map((car) => ({ value: car, text: car }))}
                    />
                  </Flex>
                </>
              )}
            </>
          )}

          {/* <Flex flexDirection="column" mb={1}>
            <Checkbox
              className="onay"
              label="Önemli kampanyalardan eposta ile haberdar olmak istiyorum."
            />
          </Flex>
          <Flex flexDirection="column" mb={4}>
            <Checkbox
              className="onay"
              label="Önemli kampanyalardan SMS ile haberdar olmak istiyorum."
            />
          </Flex> */}
          <Flex flexDirection="row" mb={1}>
            <Checkbox
              className="onay"
              // label="Kullanıcı metnini okumak için"
              onChange={() => this.handleCheckbox()}
            />
            <div className="tiklayiniz">
              {' '}
              {this.renderLabel()}
              okudum, kabul ediyorum. <span className="asteriks">*</span>
            </div>
          </Flex>
          <Modal size="tiny" open={openModal} onClose={this.closeModal}>
            <Modal.Header>Kullanıcı Bilgilendirme Metni</Modal.Header>
            <Modal.Content>
              <p>- Üyenin Aloparca web sitesinde üçüncü şahıslardan aldığı mal ve hizmetler için 'ALOPARÇA'nın herhangi bir sorumluluğu yoktur</p>
              <p>- Üye üçüncü şahıslardan aldığı mal ve hizmetlerdeki  ayıplarla ilgili “ALOPARCA’nın  herhangi bir sorumluluğu bulunmadığını, Tüketicinin Korunması Hakkındaki Kanun ve ilgili sair mevzuat kapsamındaki her türlü talep ve sorumluluğun muhatabının ilgili mal ve hizmetin satıcısına ait olduğunu ve bunlara ilişkin olarak her tür sorumluluk ve yükümlülükten “ALOPARÇA”yı  ibra ettiğini kabul ve taahhüt eder.</p>
              <p>- Üyelerin Aloparca web sitesinde  üçüncü şahıslardan aldığı hizmetten dolayı  uğradıkları veya uğrayabilecekleri zararlardan dolayı 'ALOPARÇA' doğrudan ve/veya dolaylı olarak hiçbir şekilde sorumlu tutulamaz.</p>
              <Button onClick={() => this.closeModal()}>Kapat</Button>
            </Modal.Content>
          </Modal>

          <button type="submit" className="submit" name="btn_submit" disabled={!onay || isLoading}>
            ONAYLA
            {' '}
            {isLoading && (
              <Spinner marginLeft={20} size="tiny" />
            )}
          </button>

          <Flex className="gks-form-buton" justifyContent="space-around" mb={4}>
            <Link route="profile" params={{ slug: 'giris' }} title="Giriş Yap">
              ÜYE GİRİŞİ
            </Link>
            <Link route="profile" params={{ slug: 'sifremi-unuttum' }} title="Şifremi Unuttum">
              ŞİFREMİ UNUTTUM
            </Link>
          </Flex>
        </Flex>
      </Outer>
    );
  }
}
export default connect()(UyeOl);
