import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { Input, Checkbox } from 'semantic-ui-react';
import Spinner from "../../../ui/spinner";
import MaskedInput from 'react-text-mask';
import cx from 'classnames';

import Api from '../../../api';
import { getUser } from '../../../actions/index';

const Outer = styled(Flex)`
  margin: 20px 0;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: black;
    margin-left: 10px;
    margin-bottom: 5px;
    &:after {
      content: '*';
      color: #ff8900;
    }
  }
  .ui.input input {
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    color: #525355;
    border-radius: 0;
    border-color: #dddddd;
    padding: 10px 15px;
  }
  .ui.radio.checkbox .box,
  .ui.radio.checkbox label {
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    color: #525355;
    padding-left: 27px;
  }
  .ui.radio.checkbox + .ui.radio.checkbox {
    margin-left: 45px;
  }
  .ui.checkbox input[type='checkbox'],
  .ui.checkbox input[type='radio'] {
    width: 20px;
    height: 20px;
  }
  .ui.radio.checkbox .box:before,
  .ui.radio.checkbox label:before {
    width: 18px;
    height: 18px;
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
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .ui.checkbox .box,
  .ui.checkbox label {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
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
  .submit {
    display: flex;
    justify-content: center;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    color: white;
    background-image: linear-gradient(rgb(255, 159, 0) 0%, rgb(255, 126, 0) 100%);
    border-radius: 3px;
  }
  input {
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    color: #525355;
    border-radius: 0;
    border: solid 1px #dddddd;
    padding: 10px 15px;
  }
  .input {
    position: relative;
    input {
      appearance: none;
    }
  }
`;

class Bilgilerim extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = this.getInitialState();

  getInitialState() {
    const { userData } = this.props;
    const user = userData && userData.user;
    return {
      formUyeAdi: false,
      formUyeSoyadi: false,
      formUyeMail: false,
      formUyeTelefon: false,
      formUyeSmsOnay: user ? parseInt(user[0].smsalmak, 10) : 0,
      formUyeMailOnay: user ? parseInt(user[0].mailalmak, 10) : 0,
    };
  }

  userForm = async (e) => {
    e.preventDefault();
    const { formUyeMailOnay, formUyeSmsOnay } = this.state;
    const uyeadi = this.uyeadi.inputRef.current.value;
    const uyesoyadi = this.uyesoyadi.inputRef.current.value;
    const uyemail = this.uyemail.inputRef.current.value;
    const telefon = this.telefon.inputElement.value;
    let showError = false;
    if (!uyeadi) {
      showError = true;
      this.setState({ formUyeAdi: true });
    }
    if (!uyesoyadi) {
      showError = true;
      this.setState({ formUyeSoyadi: true });
    }
    if (!uyemail) {
      showError = true;
      this.setState({ formUyeMail: true });
    }
    if (!telefon) {
      showError = true;
      this.setState({ formUyeTelefon: true });
    }
    if (showError) {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Zorunlu form alanları boş bırakılamaz.',
      });
    } else {
      const fd = new FormData();
      fd.append('uyeadi', uyeadi);
      fd.append('uyesoyadi', uyesoyadi);
      fd.append('uyemailadresi', uyemail);
      fd.append('uyegsm', telefon);
      fd.append('eposta_onay', formUyeMailOnay);
      fd.append('sms_onay', formUyeSmsOnay);
      const addressData = await Api.post('Users/uye_guncelle', fd);
      if (!addressData.status) {
        this.props.dispatch(getUser());

        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Bilgileriniz başarıyla güncellendi',
        });
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: addressData.message,
        });
      }
    }
  };

  render() {
    const { userData } = this.props;
    const {
      formUyeAdi,
      formUyeSoyadi,
      formUyeMail,
      formUyeTelefon,
      formUyeSmsOnay,
      formUyeMailOnay,
    } = this.state;
    return (
      <Outer alignItems="center" flexDirection="column">
        {userData ? (
          <form onSubmit={this.userForm}>
            <Flex width={[1, 1, 1 / 2]} flexDirection="column">
              <Flex mx={[-1, -1, -2]} mb={2}>
                <Flex width={1 / 2} px={[1, 1, 2]} flexDirection="column">
                  <label className="form-label">Ad</label>
                  <Input
                    defaultValue={userData.user[0].uyeadi}
                    required
                    ref={(n) => {
                      this.uyeadi = n;
                    }}
                    className={cx({ error: formUyeAdi })}
                  />
                </Flex>
                <Flex width={1 / 2} px={[1, 1, 2]} flexDirection="column">
                  <label className="form-label">Soyad</label>
                  <Input
                    defaultValue={userData.user[0].uyesoyadi}
                    required
                    ref={(n) => {
                      this.uyesoyadi = n;
                    }}
                    className={cx({ error: formUyeSoyadi })}
                  />
                </Flex>
              </Flex>
              <Flex flexDirection="column" mb={2}>
                <label className="form-label">E-Posta</label>
                <Input
                  defaultValue={userData.user[0].uyemailadresi}
                  required
                  ref={(n) => {
                    this.uyemail = n;
                  }}
                  className={cx({ error: formUyeMail })}
                />
              </Flex>
              <Flex mx={-2} mb={2}>
                <Flex width={1} px={2} flexDirection="column">
                  <label className="form-label">Cep Telefonu</label>
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
                    required
                    ref={(n) => {
                      this.telefon = n;
                    }}
                    value={userData.user[0].uyetelefonu}
                    className={cx({ error: formUyeTelefon })}
                    placeholder="0(5XX) XXX XX XX" type="text"
                  />
                </Flex>
                {/* <Flex width={1 / 2} px={2} flexDirection="column">
                <div className="input">
                  <span className="icon-date" />
                  <Datepicker name="start" placeholder="Başlangıç" size="10" />
                </div>
              </Flex> */}
              </Flex>
              {/* <Flex mx={-2} mb={3}>
              <Flex width={1 / 2} px={2} flexDirection="column">
                <label className="form-label">Cinsiyet</label>
                <Flex mt={1}>
                  <Checkbox
                    name="cinsiyet"
                    radio
                    label="Kadın"
                    value="erkek"
                    checked={gender ? gender === 'erkek' : userData.user[0].mailalmak === 'erkek'}
                    onChange={this.genderSelect}
                  />
                  <Checkbox
                    name="cinsiyet"
                    radio
                    label="Erkek"
                    value="kadin"
                    checked={gender ? gender === 'kadin' : userData.user[0].mailalmak === 'kadin'}
                    onChange={this.genderSelect}
                  />
                </Flex>
              </Flex>
            </Flex> */}
              <Flex flexDirection="column" mb={1}>
                <Checkbox
                  className="onay"
                  label="Önemli kampanyalardan eposta ile haberdar olmak istiyorum."
                  checked={formUyeMailOnay === 1}
                  onChange={() => this.setState({ formUyeMailOnay: formUyeMailOnay === 1 ? 0 : 1 })}
                />
              </Flex>
              <Flex flexDirection="column" mb={4}>
                <Checkbox
                  className="onay"
                  label="Önemli kampanyalardan SMS ile haberdar olmak istiyorum."
                  checked={formUyeSmsOnay === 1}
                  onChange={() => this.setState({ formUyeSmsOnay: formUyeSmsOnay === 1 ? 0 : 1 })}
                />
              </Flex>
              <button type="submit" className="submit" name="btn_submit">
                KAYDET
              </button>
            </Flex>
          </form>
        ) : (
          <span>
            <Spinner centered />
          </span>
        )}
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(Bilgilerim);
