import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import Spinner from '../../../ui/spinner';
import Api from '../../../api';

const Outer = styled(Flex)`
  font-size: 16px;
  color: #525355;
  .kart-tablo {
    border: 1px solid #dddddd;
    border-radius: 3px;
    .tablo-satir {
      & + .tablo-satir {
        border-top: 1px solid #dddddd;
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
        input.kart {
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          color: #525355;
          border-radius: 0;
          border: solid 1px #dddddd;
          padding: 10px 15px;
          width: 80%;
        }
        &.checkbox {
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
          & + .baslik {
            border-left: 1px solid #dddddd;
          }
        }
        &.hesap {
          border-left: 1px solid #dddddd;
          font-weight: 500;
          color: black;
        }
        &.banka {
          font-weight: 500;
          color: black;
          & + .banka {
            border-left: 1px solid #dddddd;
          }
        }
        &.kart {
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
          border-left: 1px solid #dddddd;
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

class KrediKarti extends React.Component {
  state = { loading: true, cardList: [] };
  async componentDidMount() {
    const cardList = await Api.get('Users/kredi_karti_list');
    this.cardListState(cardList);
  }
  cardListState = async (cardList) => {
    await this.setState({ loading: false, cardList });
  };

  deleteCard = async (cardId) => {
    const fd = new FormData();
    fd.append('kart_id', cardId);
    fd.append('sil', '1');
    try {
      const response = await Api.post('Users/kredi_karti_kayit', fd);
      if (parseInt(response.result, 10) === 200) {
        const { cardList } = this.state;
        this.cardListState(cardList.filter(card => card.Id !== cardId));
        this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Kartınız başarıyla silindi.' });
      } else {
        throw response;
      }
    } catch (e) {
      //console.log(e);
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Kart silinemedi. Lütfen daha sonra tekrar deneyiniz.',
      });
    }
  };

  render() {
    const { loading, cardList } = this.state;
    return (
      <Outer flexDirection="column">
        <Flex>
          Kredi kartı bilgileriniz Aloparça tarafından saklanmamaktadır, bankaların ödeme altyapısı
          tarafından sağlanmaktadır.
        </Flex>
        <Flex mt={2}>
          Siparişleriniz sırasında kredi kartı bilgilerinizi sisteme kaydedebilirsiniz. Sonraki
          siparişlerinizde bu bilgilerinizi kullanarak hızlı alışveriş yapabilirsiniz.
        </Flex>
        {loading ? (
          <Flex py={3} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        ) : cardList && cardList.length > 0 ? (
          <Flex className="kart-tablo" flexDirection="column" mt={2}>
            <Flex alignItems="stretch" className="tablo-satir" width={1}>
              <Flex alignItems="center" justifyContent="center" className="sutun kart baslik" width={3 / 10}>
                Kart Sahibi
              </Flex>
              <Flex alignItems="center" justifyContent="center" className="sutun kart baslik" width={3 / 10}>
                Kart Numarası
              </Flex>
              <Flex alignItems="center" justifyContent="center" className="sutun hesap baslik" width={3 / 10}>
                Son Kullanım Tarihi
              </Flex>
              <Flex alignItems="center" justifyContent="center" className="sutun islem" width={1 / 10} />
            </Flex>
            {cardList.map(card => (
              <Flex alignItems="stretch" className="tablo-satir" width={1} key={card.Id}>
                <Flex alignItems="center" justifyContent="center" className="sutun banka" width={3 / 10}>
                  {card.name}
                </Flex>
                <Flex alignItems="center" justifyContent="center" className="sutun banka" width={3 / 10}>
                  {card.cc_number}
                </Flex>
                <Flex alignItems="center" justifyContent="center" className="sutun banka" width={3 / 10}>
                  {card.exdate}
                </Flex>
                <Flex alignItems="center" justifyContent="center" className="sutun islem" width={1 / 10}>
                  <a href="javascript:;" onClick={() => this.deleteCard(card.Id)} className="gri">
                    Sil
                  </a>
                </Flex>
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex py={3} justifyContent="center" alignItems="center">
            Kayıtlı kartınız bulunmamaktadır.
          </Flex>
        )}
      </Outer>
    );
  }
}
export default connect()(KrediKarti);
