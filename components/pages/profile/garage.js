import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import Spinner from "../../../ui/spinner";
import Dimmer from "../../../ui/dimmer";
import { media } from '../../../style/theme';
import { Router } from '../../../routes';
import { deleteGarage } from '../../../actions/index';
import CarSelect from './components/car-select';

const Outer = styled(Flex)`
  font-size: 16px;
  color: #525355;
  .garage-tablo {
    border: 1px solid #dddddd;
    border-radius: 3px;
    .tablo-satir {
      ${media.tablet`
        flex-wrap: wrap;
      `};
      & + .tablo-satir {
        border-top: 1px solid #dddddd;
      }
      .sutun {
        padding: 15px 20px;
        ${media.tablet`
          padding: 15px;
        `};
        &.arac {
          color: black;
          text-transform: uppercase;
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
      }
    }
  }
  .baslik {
    font-weight: 500;
    color: #ff8900;
    text-transform: uppercase;
  }
`;

class Garage extends React.Component {
  state = {
    deleteLoading: [],
    isLoading: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }
  delete(id) {
    if (id) {
      this.setState(prevState => ({ deleteLoading: [...prevState.deleteLoading, id] }));
      this.props.dispatch(deleteGarage(id));
    } else {
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Araç silme işlemi sırasında hata oluştu',
      });
    }
  }
  selectCar(car) {
    const {
      Id, uyeid, not, resim, sasi, ...carList
    } = car;
    this.props.dispatch({ type: 'ADD_GARAGE', payload: carList });
    Router.pushRoute('listcar', carList);
  }
  render() {
    const { userData } = this.props;
    const { isLoading, deleteLoading } = this.state;
    return isLoading ? (
      <Dimmer>
        <Spinner />
      </Dimmer>
    ) : (
      <Outer flexDirection="column">
        <Flex>
          Araç bilgileri ile arama yaptığınızda seçtiğiniz araç garajınıza eklenir. Garajda bulunan
          araçlar ile Aloparça'da hızlı arama yapabilir ve parça uyumluluğunu otomatik olarak
          kontrol edebilirsiniz.
        </Flex>
        <Flex className="garage-tablo" flexDirection="column" mt={2}>
          <Flex alignItems="stretch" className="tablo-satir" width={1}>
            <Flex alignItems="center" className="sutun baslik" width={1}>
              ARAÇ
            </Flex>
          </Flex>
          {userData &&
            userData.uye_garaj.map(arac => (
              <Flex alignItems="stretch" className="tablo-satir" width={1} key={arac.Id}>
                <Flex alignItems="center" className="sutun arac" width={[1, 1, 7 / 10]}>
                  {`${arac.marka} ${arac.model} ${arac.yil} ${arac.kasa} ${arac.motor} ${
                    arac.beygir
                  } KV`}
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun islem"
                  width={[2 / 3, 2 / 3, 2 / 10]}
                >
                  <a href="javascript:;" onClick={() => this.selectCar(arac)} className="turuncu">
                    Ürünleri Listele
                  </a>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className="sutun islem"
                  width={[1 / 3, 1 / 3, 1 / 10]}
                >
                  {deleteLoading.includes(arac.Id) ? (
                    <Spinner />
                  ) : (
                    <a href="javascript:;" onClick={() => this.delete(arac.Id)} className="gri">
                      Sil
                    </a>
                  )}
                </Flex>
              </Flex>
            ))}
        </Flex>
        <Flex mt={3} flexDirection="column">
          <Flex alignItems="center" className="baslik" width={1}>
            YENİ ARAÇ EKLE
          </Flex>
          <CarSelect />
        </Flex>
      </Outer>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(Garage);
