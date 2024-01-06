import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

import Api from '../../../api';

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
`;

class Bilgilerim extends React.Component {
  static async getInitialProps() {
    return {};
  }
  changePassword = async () => {
    const oldPassword = this.oldPassword.inputRef.current.value;
    const newPassword = this.newPassword.inputRef.current.value;
    const reNewPassword = this.reNewPassword.inputRef.current.value;
    if (newPassword === reNewPassword) {
      const fd = new FormData();
      fd.append('eskisifre', oldPassword);
      fd.append('yenisifre', newPassword);
      const formData = await Api.post('Users/sifre_degistirme', fd);
      if (formData.result === '200') {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Şifreniz başarıyla değiştirilmiştir.',
        });
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Eski şifreniz hatalı.',
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
    return (
      <Outer alignItems="center" flexDirection="column">
        <Flex mb={4}>
          Şifrenizi değiştirmek için aşağıdaki boş alanlara sırasıyla eski şifrenizi ve yeni
          şifrenizi (2 defa) girip "Kaydet" butonuna tıklayın.
        </Flex>
        <Flex width={[1, 1, 1 / 2]} flexDirection="column">
          <Flex flexDirection="column" mb={2}>
            <label className="form-label">Eski Şifreniz</label>
            <Input
              type="password"
              ref={(n) => {
                this.oldPassword = n;
              }}
            />
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <label className="form-label">Yeni Şifreniz</label>
            <Input
              type="password"
              ref={(n) => {
                this.newPassword = n;
              }}
            />
          </Flex>
          <Flex flexDirection="column" mb={2}>
            <label className="form-label">Yeni Şifreniz Tekrar</label>
            <Input
              type="password"
              ref={(n) => {
                this.reNewPassword = n;
              }}
            />
          </Flex>

          <a href="javascript:;" onClick={this.changePassword} className="submit">
            KAYDET
          </a>
        </Flex>
      </Outer>
    );
  }
}
export default connect()(Bilgilerim);
