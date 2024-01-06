import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';
import { Input } from 'semantic-ui-react';

import Layout from '../layouts/container';
import { Container } from '../reactor';
import { Router } from '../routes';
import { Title } from '../components/style';
import Api from '../api';

const Outer = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
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
  .no-code {
    font-size: 14px;
    color: red;
    margin-top: 2.5px;
  }
`;

class ForgotPassword extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const { isLogin } = this.props;
    if (isLogin) Router.pushRoute('profile', { slug: 'sifremi-degistir' });
  }

  changePassword = async () => {
    const secureCode = this.secureCode.inputRef.current.value;
    const newPassword = this.newPassword.inputRef.current.value;
    const reNewPassword = this.reNewPassword.inputRef.current.value;
    if (!secureCode) {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Güvenlik kodu göndermeniz zorunludur.',
      });
    } else if (newPassword && newPassword === reNewPassword) {
      const fd = new FormData();
      fd.append('mail_token', secureCode);
      fd.append('yenisifre', newPassword);
      const formData = await Api.post('Users/sifre_degistirme', fd);
      if (formData.result === '200') {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Şifreniz başarıyla değiştirilmiştir.',
        });
        Router.pushRoute('profile');
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Hatalı güvenlik kodu.',
        });
      }
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Yeni şifreniz ve yeni şifrenizin tekrarı uyuşmuyor',
      });
    }
  };

  render() {
    const { query } = this.props;
    return (
      <Layout meta={{ title: 'Yeni Şifrenizi Belirleyin' }}>
        <Outer>
          <Container>
            <Flex flexDirection="column">
              <Title>Yeni Şifrenizi Belirleyin</Title>
              <Flex className="main-area" p={[2, 2, 4]} justifyContent="center">
                <Flex width={[1, 1, 1 / 2]} flexDirection="column">
                  {query && query.code ? (
                    <Input
                      type="hidden"
                      defaultValue={query.code}
                      ref={(n) => {
                        this.secureCode = n;
                      }}
                    />
                  ) : (
                    <Flex flexDirection="column" mb={2}>
                      <label className="form-label">Güvenlik Kodu</label>
                      <Input
                        type="text"
                        ref={(n) => {
                          this.secureCode = n;
                        }}
                        required
                      />
                      <div className="no-code">
                      Mailinize gelen güvenlik kodunu bu alana giriniz.
                      </div>
                    </Flex>
                  )}
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label">Yeni Şifreniz</label>
                    <Input
                      type="password"
                      ref={(n) => {
                        this.newPassword = n;
                      }}
                      required
                    />
                  </Flex>
                  <Flex flexDirection="column" mb={2}>
                    <label className="form-label">Yeni Şifreniz Tekrar</label>
                    <Input
                      type="password"
                      ref={(n) => {
                        this.reNewPassword = n;
                      }}
                      required
                    />
                  </Flex>
                  <a href="javascript:;" onClick={this.changePassword} className="submit">
                    GÜNCELLE
                  </a>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Outer>
      </Layout>
    );
  }
}

const mapStateToProps = ({ isLogin }) => ({ isLogin });
export default connect(mapStateToProps)(ForgotPassword);
