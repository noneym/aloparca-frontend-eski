import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { Checkbox, Input } from 'semantic-ui-react';
import Spinner from "../../../ui/spinner";
import MaskedInput from 'react-text-mask';

import { media } from '../../../style/theme';

import Api from '../../../api';
import { getUser } from '../../../actions/index';

const Outer = styled(Flex)`
  font-size: 16px;
  color: #525355;
  .iban-tablo {
    border: 1px solid #dddddd;
    border-radius: 3px;
    .tablo-satir {
      ${media.tablet`
        flex-direction: column;
      `};
      & + .tablo-satir {
        border-top: 1px solid #dddddd;
      }
      &.header {
        ${media.tablet`
          display: none;
        `};
      }
      .sutun {
        padding: 15px 20px;
        .ui.input input {
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          color: #525355;
          border-radius: 0;
          border-color: #dddddd;
          padding: 10px 15px;
        }
        input.iban {
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          color: #525355;
          border-radius: 0;
          border: solid 1px #dddddd;
          padding: 10px 15px;
          width: 80%;
        }
        &.checkbox {
          ${media.tablet`
            display: none;
          `};
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
        }
        &.baslik {
          font-weight: 500;
          color: #ff8900;
          text-transform: uppercase;
        }
        &.hesap {
          border-left: 1px solid #dddddd;
          border-right: 1px solid #dddddd;
          font-weight: 500;
          color: black;
          ${media.tablet`
            border-left: 0;
            border-right: 0;
          `};
        }
        &.banka {
          font-weight: 500;
          color: black;
        }
        &.iban {
          span {
            width: 100%;
            &:before {
              content: 'TR';
              color: black;
              font-weight: 500;
              margin-right: 10px;
            }
            .ui.input {
              width: 80%;
            }
          }
        }
        &.islem {
          a {
            width: 100%;
            padding: 8px 0;
            color: white;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            text-align: center;
            border-radius: 3px;
            &.turuncu {
              background-color: #ff8900;
            }
            &.gri {
              background-color: #b2b2b2;
            }
          }
        }
        &.baslik {
          font-weight: 500;
          color: #ff8900;
          text-transform: uppercase;
        }
      }
    }
  }
`;

class Iban extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = { addLoading: false };
  addIban = async () => {
    this.setState({ addLoading: true });
    const iban = this.iban.inputElement.value;
    const hesap = this.hesap.inputRef.current.value;
    const banka = this.banka.inputRef.current.value;
    if (iban && hesap && banka) {
      const fd = new FormData();
      fd.append('iban', `TR${iban}`);
      fd.append('banka', banka);
      fd.append('isim', hesap);
      const formData = await Api.post('Users/iban_ekle', fd);
      this.setState({ addLoading: false });
      if (formData.result === '200') {
        this.props.dispatch(getUser());
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'IBAN bilgileri başarıyla eklendi',
        });
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'IBAN bilgileri eklenirken hata oluştu',
        });
      }
    } else {
      this.setState({ addLoading: false });
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Alanları eksiksiz doldurun!',
      });
    }
  };
  async deleteIban(id) {
    if (id) {
      const fd = new FormData();
      fd.append('iban_id', id);
      fd.append('sil', 1);
      const formData = await Api.post('Users/iban_ekle', fd);
      if (formData.result === '200') {
        this.props.dispatch(getUser());
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'IBAN başarıyla silindi',
        });
      } else {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'IBAN silme işlemi sırasında hata oluştu',
        });
      }
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'IBAN silme işlemi sırasında hata oluştu',
      });
    }
  }
  render() {
    const { userData } = this.props;
    const { addLoading } = this.state;
    return (
      <Outer flexDirection="column">
        <Flex>
          Sipariş iptali / ürün iadesi nedeniyle hesabınıza geri ödeme yapılabilmesi için IBAN
          numaranızı seçin.
        </Flex>
        <Flex>
          Sistemde kayıtlı bir IBAN numaranızı yoksa ya da kendi adınıza ait farklı bir IBAN
          numarasına geri ödeme yapılmasını istiyorsanız, yeni IBAN girişi alanından kayıt
          yapabilirsiniz. Sonraki işlemlerinizde aynı IBAN numarasının kullanılmasını istiyorsanız
          varsayılan alanını işaretleyin.
        </Flex>
        <Flex my={2}>Girdiğiniz IBAN numarası vadeli bir hesaba ait olmamalıdır.</Flex>
        <Flex className="iban-tablo" flexDirection="column" mt={2}>
          <Flex alignItems="stretch" className="tablo-satir header" width={1}>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun checkbox"
              width={1 / 17}
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun iban baslik"
              width={6 / 17}
            >
              IBAN
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun hesap baslik"
              width={4 / 17}
            >
              Hesap Sahibi
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun banka baslik"
              width={4 / 17}
            >
              Banka
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun islem"
              width={2 / 17}
            />
          </Flex>
          {userData &&
            userData.iban_listesi.map(iban => (
              <Flex alignItems="stretch" className="tablo-satir" width={1} key={iban.Id}>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun checkbox"
                  width={[1, 1, 1 / 17]}
                >
                  <Checkbox />
                </Flex>
                <Flex alignItems="center" className="sutun iban" width={[1, 1, 6 / 17]}>
                  <span>{iban.iban && iban.iban.replace('TR', '')}</span>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun hesap"
                  width={[1, 1, 4 / 17]}
                >
                  {iban.isim}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun banka"
                  width={[1, 1, 4 / 17]}
                >
                  {iban.banka}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun islem"
                  width={[1, 1, 2 / 17]}
                >
                  <a href="javascript:;" onClick={() => this.deleteIban(iban.Id)} className="gri">
                    Sil
                  </a>
                </Flex>
              </Flex>
            ))}
          <Flex alignItems="stretch" className="tablo-satir" width={1}>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun checkbox"
              width={[1, 1, 1 / 17]}
            >
              <Checkbox />
            </Flex>
            <Flex alignItems="center" className="sutun iban" width={[1, 1, 6 / 17]}>
              <span>
                <MaskedInput
                  mask={[
                    /[1-9]/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                  ]}
                  className="iban"
                  guide
                  ref={(n) => {
                    this.iban = n;
                  }}
                  placeholder="IBAN numarası"
                />
              </span>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun hesap"
              width={[1, 1, 4 / 17]}
            >
              <Input
                ref={(n) => {
                  this.hesap = n;
                }}
                placeholder="Hesap Sahibi"
              />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun banka"
              width={[1, 1, 4 / 17]}
            >
              <Input
                ref={(n) => {
                  this.banka = n;
                }}
                placeholder="Banka"
              />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              className="sutun islem"
              width={[1, 1, 2 / 17]}
            >
              {addLoading ? (
                <span>
                  <Spinner centered />
                </span>
              ) : (
                <a href="javascript:;" onClick={this.addIban} className="turuncu">
                  Kaydet
                </a>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(Iban);
