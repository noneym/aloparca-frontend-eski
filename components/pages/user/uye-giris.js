import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import cx from 'classnames';
import { Input } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import FacebookLogin from 'react-facebook-login';
import { isMobilePhone } from 'validator';
import GoogleLogin from 'react-google-login';

import Api from '../../../api';
import { userLogin, userLoginWithToken } from '../../../actions';
import { Link } from '../../../reactor';
import { site } from '../../../reactor/func';
import { userLogout } from '../../../actions/user';
import Spinner from '../../../ui/spinner';


const Outer = styled.form`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
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
  input {
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    color: #525355;
    border-radius: 0;
    border: solid 1px #dddddd;
    padding: 10px 15px;
  }
  .ui.input input {
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    color: #525355;
    border-radius: 0;
    border-color: #dddddd;
    padding: 10px 15px;
  }
  .error {
    background-color: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    box-shadow: none;
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
  .social-logins {
    padding-top: 20px;
    button {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      font-size: 16px !important;
      /* box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px; */
      border-radius: 2px;
    }
  }

  .social-logins {
    display: flow-root;
    box-shadow: 0px 4px 25px -13px #00000052;

    .sl {
      margin: 0;
      width: 100% !important;
      float: left;
      box-sizing: border-box;

      button {
        font-size: 14px !important;
        font-weight: 600 !important;
        letter-spacing: -0.5px !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
    }
  }
  .nonregistered {
    margin-top: 40px;
    a {
      font-size: 16px;
      color: green;
    }
  }
`;

class UyeGiris extends React.Component {
  state = { isLoading: false, getExtraInfo: false };

  loginForm = async (e) => {
    e.preventDefault();
    const { getExtraInfo } = this.state;
    if (getExtraInfo) {
      this.updateInfo();
      return;
    }
    const email = this.email.inputRef.current.value;
    const password = this.password.inputRef.current.value;

    if (!email || !password) {
      return this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'E-Posta adresi ve/veya şifre boş bırakılamaz.',
      });
    }
    this.setState({ isLoading: true });
    const user = {
      email,
      password,
    };
    await this.props.dispatch(userLogin(user));

    try {
      // B2B hesabıyla mı giriş yapıldı kontrol değilse logout;
      const response = await Api.post('Users/uyegiris');
      const b2bAccess = response.user !== undefined ? response.user[0].b2b_access : 0;
      // console.log("b2bAccess", b2bAccess);
      site === 'b2b' && b2bAccess !== '1' && this.props.dispatch(userLogout()) && this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Kullanıcı adı/şifre hatalı veya kurumsal kullanıcı değil',
      });
    } catch (error) {

      // console.log(error);

    }

    this.setState({ isLoading: false });
  };

  updateInfo = async () => {
    const gsmno = this.gsmno.inputElement.value;
    const sifre = this.sifre.inputRef.current.value;
    const sifre2 = this.sifre2.inputRef.current.value;

    let showError = false;
    this.setState({ errorSifre: false, errorSifre2: false, errorGsmno: false });
    let message = '';

    if (!gsmno) {
      showError = true;
      this.setState({ errorGsmno: true });
      message = 'Telefon alanı boş bırakılamaz.';
    }
    if (!isMobilePhone(gsmno.replace(/\D+/g, ''), 'tr-TR')) {
      showError = true;
      this.setState({ errorGsmno: true });
      message = 'Girdiğiniz telefon numarası hatalı lütfen kontrol ediniz.';
    }
    if (!sifre) {
      showError = true;
      this.setState({ errorSifre: true });
      message = 'Şifre alanları boş bırakılamaz.';
    }
    if (!sifre2) {
      showError = true;
      this.setState({ errorSifre2: true });
      message = 'Şifre alanları boş bırakılamaz.';
    }
    if (sifre !== sifre2) {
      showError = true;
      this.setState({ errorSifre: true, errorSifre2: true });
      message = 'Şifreniz ve Şifre Tekrarınızın aynı olması gerekmektedir.';
    }

    if (showError) {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: message,
      });
      return;
    }
    const fd = new FormData();
    fd.append('gsmno', gsmno);
    fd.append('sifre', sifre);
    Api.post('Sociallogin/uye_sifre_gsm_belirle', fd);
    const response = await Api.get('Sociallogin/facebook_get_url');
    // console.log(response);

    //   if (parseInt(uyeData.result, 10) === 200) {
    //     const user = {
    //       email,
    //       password,
    //     };
    //     this.props.dispatch(userLogin(user));
    //   } else {
    //     this.props.dispatch({
    //       type: 'FLASH_MESSAGE',
    //       payload: uyeData.text,
    //     });
    //   }
    // } else if (parseInt(uyeData.status, 10) === 200) {
    //   this.props.dispatch({
    //     type: 'FLASH_MESSAGE',
    //     payload: 'Başvurunuz başarıyla alınmıştır. En yakın zamanda size dönüş yapılacaktır.',
    //   });
    //   // Router.pushRoute('home');
    // } else {
    //   this.props.dispatch({
    //     type: 'FLASH_MESSAGE',
    //     payload: 'Bu e-posta adresiyle daha önce kayıt alınmıştır.',
    //   });
    // }
  };

  responseFacebook = async (response) => {
    const { accessToken } = response;
    // console.log(response, accessToken);
    if (accessToken) {
      const user = await Api.get(`Sociallogin/facebook_access_token?accessToken=${accessToken}`);
      // console.log('Facebook user : ', user)
      if (user.gsmno === 1 && user.password === 1) {
        await this.props.dispatch(userLoginWithToken(user.token));
      } else {
        await this.setState({ user });
        this.setState({ getExtraInfo: true });
      }
    } else {
      return this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Bir hata ile karşılaşıldı. Lütfen tekrar deneyiniz.',
      });
    }
  };

  testFacebook = async () => {
    const accessToken = 'EAAFll8oQuFQBAOchw4Css5uwkvSRny0a9JdhktRBtjZATUQZARHFL9pVp47xxazeQG4ttjXIbDGwMsRrFrDzei6lMFPZBV6YwOpFFZCghrh8YUKla9h5XKWp32pXZB8IzuZCLm0ep2rFPGktj7vKBUfShSE6ooZAcYNzfmZB1BTseqPuyM7utxzgXyK3CjjlO6nQui45pVQLjgZDZD';
    if (accessToken) {
      const user = await Api.get(`Sociallogin/facebook_access_token?accessToken=${accessToken}`);
      // console.log('Facebook user : ', user)
      if (user.gsmno === 1 && user.password === 1) {
        await this.props.dispatch(userLoginWithToken(user.token));
      } else {
        await this.setState({ user });
        this.setState({ getExtraInfo: true });
      }
    } else {
      return this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Bir hata ile karşılaşıldı. Lütfen tekrar deneyiniz.',
      });
    }
  };

  // responseGoogle = (response) => {
  //   console.log('Google', response);
  // };
  render() {
    const {
      isLoading, getExtraInfo, errorSifre, errorSifre2, errorGsmno, user,
    } = this.state;
    // console.log('Facebook user : ', user)
    return (
      <Outer onSubmit={this.loginForm} autoComplete="off">
        {!getExtraInfo ? (
          <Flex width={[1, 1, 2 / 5]} flexDirection="column">
            <Flex flexDirection="column" mb={2}>
              <label className="form-label">E-Posta</label>
              <Input
                type="email"
                name="email"
                ref={(n) => {
                  this.email = n;
                }}
              />
            </Flex>
            <Flex flexDirection="column" mb={2}>
              <label className="form-label">Şifre</label>
              <Input
                type="password"
                name="password"
                ref={(n) => {
                  this.password = n;
                }}
              />
            </Flex>

            <button type="submit" className="submit" name="btn_submit" disabled={isLoading}>
              GİRİŞ
              {' '}
              {isLoading && (
                <Spinner marginLeft={20} size="tiny" />
              )}
            </button>

            <Flex className="gks-form-buton" justifyContent="space-around">
              <Link route="profile" params={{ slug: 'yeni-uye' }} title="Yeni Üye">
                YENİ ÜYE
              </Link>
              <Link route="profile" params={{ slug: 'sifremi-unuttum' }} title="Şifremi Unuttum">
                ŞİFREMİ UNUTTUM
              </Link>
            </Flex>

            {/* {site !== 'b2b' && (
              <Flex className="social-logins" flexDirection="column">
                <Box className="sl facebook" my={1}>
                  <FacebookLogin
                    appId="393177581271124"
                    scope="public_profile"
                    fields="name,email"
                    textButton="FACEBOOK İLE GİRİŞ YAP"
                    callback={this.testFacebook}
                    language="tr_TR"
                    icon="icon-facebook"
                  />
                </Box>

                <Box className="sl google" mt={1} mb={3}>
                  <GoogleLogin
                    clientId="388478355547-4n5qd3plr5sca3t9nfgatee8qg3eqfd5.apps.googleusercontent.com"
                    buttonText="GOOGLE İLE GİRİŞ YAP"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy="single_host_origin"
                  />
                </Box>
              </Flex>
            )} */}
            {/* <Flex className="nonregistered" justifyContent="center" alignItems="center">
              <Link route="checkout-nonregistered" title="Üye Olmadan Devam Et">Üye Olmadan Devam Et -></Link>
            </Flex> */}
          </Flex>
        ) : (
          <Flex width={[1, 1, 2 / 5]} flexDirection="column">
            <Flex flexDirection="column" mb={2}>
              <label className="form-label">Yeni Şifre</label>
              <Input
                type="password"
                name="sifre"
                ref={(n) => {
                  this.sifre = n;
                }}
                className={cx({ error: errorSifre })}
              />
            </Flex>
            <Flex flexDirection="column" mb={2}>
              <label className="form-label">Yeni Şifre (Tekrar)</label>
              <Input
                type="password"
                name="sifre2"
                ref={(n) => {
                  this.sifre2 = n;
                }}
                className={cx({ error: errorSifre2 })}
              />
            </Flex>
            <Flex flexDirection="column" mb={2}>
              <label className="form-label">Cep Telefonu Numarası</label>
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
                className={cx({ error: errorGsmno })}
                ref={(n) => {
                  this.gsmno = n;
                }}
                placeholder="0(5XX) XXX XX XX"
                type="text"
              />
            </Flex>
            <button type="submit" className="submit" name="btn_submit" disabled={isLoading}>
              BİLGİLERİ GÜNCELLE
              {' '}
              {isLoading && (
              <Spinner marginLeft={20} size="tiny" />
              )}
            </button>
          </Flex>
        )}
      </Outer>
    );
  }
}
const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(UyeGiris);
