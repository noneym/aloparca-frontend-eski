import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { Router } from '../../../routes';
import Api from '../../../api';
import { Link } from '../../../reactor';
import Spinner from '../../../ui/spinner';

const Outer = styled(Flex)`
  margin: 20px 0;
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
  a {
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    color: #ff8900;
  }
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    color: white;
    background-image: linear-gradient(rgb(255, 159, 0) 0%, rgb(255, 126, 0) 100%);
    border-radius: 3px;
    cursor: pointer;
  }
`;

class SifremiUnuttum extends React.Component {
  state = { isLoading: false };
  sendPassword = async () => {
    const email = this.email.inputRef.current.value;
    if (email) {
      this.setState({ isLoading: true });
      const fd = new FormData();
      fd.append('mailadresi', email);
      const formData = await Api.post('Users/sifremi_unuttum', fd);
      if (parseInt(formData.result, 10) === 200) {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Şifre yenileme talimatları e-posta adresinize gönderilmiştir.',
        });
        Router.pushRoute('forgot-password');
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: `E-posta adresi (${email}) sisteme kayıtlı değildir.`,
        });
      }
      this.setState({ isLoading: false });
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'E-posta adresinizi giriniz.',
      });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Outer width={1} alignItems="center" flexDirection="column">
        <Flex width={[1, 1, 1 / 2]} flexDirection="column">
          <Flex flexDirection="column" mb={2}>
            <label className="form-label">E-Posta</label>
            <Input
              ref={(n) => {
                this.email = n;
              }}
            />
          </Flex>

          <button type="button" onClick={this.sendPassword} className="submit" disabled={isLoading}>
            YENİ ŞİFREMİ GÖNDER{' '}
            {isLoading && (
              <Spinner marginLeft={20} size="tiny" />
            )}
          </button>

          <Flex className="gks-form-buton" justifyContent="space-around" mb={4}>
            <Link route="profile" params={{ slug: 'giris' }} title="Giriş Yap">
              ÜYE GİRİŞİ
            </Link>
            <Link route="profile" params={{ slug: 'yeni-uye' }} title="Yeni Üye">
              YENİ ÜYE
            </Link>
          </Flex>
        </Flex>
      </Outer>
    );
  }
}
export default connect()(SifremiUnuttum);
