import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import Dimmer from "../../../ui/dimmer";
import Spinner from "../../../ui/spinner";
import CouponCard from './components/coupon-card';
import { media } from '../../../style/theme';

const Outer = styled(Flex)`
  font-size: 16px;
  color: #525355;
  .tablo {
    border: 1px solid #dddddd;
    border-radius: 3px;
    .satir {
      ${media.tablet`flex-direction: column;`};
      .sutun {
        padding: 15px 40px;
        ${media.tablet`flex-direction: column; padding: 15px 10px;`};
        .ui.input {
          width: 80%;
          ${media.tablet`width: 100%;`};
          input {
            font-family: 'Barlow', sans-serif;
            font-size: 16px;
            color: #525355;
            border-radius: 0;
            border-color: #dddddd;
            padding: 6px 15px;
            text-align: center;
          }
        }
        a {
          width: 100%;
          padding: 8px 0;
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          text-align: center;
          border-radius: 3px;
          background-color: #b2b2b2;
        }
        strong {
          color: black;
          font-weight: 500;
        }
        & + .sutun {
          font-size: 14px;
          border-left: 1px solid #dddddd;
          ${media.tablet`border-left: 0px;`};
        }
        &.baslik {
          padding: 20px 40px;
          font-size: 16px;
          font-weight: 500;
          color: #ff8900;
          text-transform: uppercase;
          text-align: center;
          & + .baslik {
            ${media.tablet`display: none;`};
          }
        }
      }
      & + .satir {
        border-top: 1px solid #dddddd;
      }
    }
  }
`;

class IndirimCekleri extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = { isLoading: true };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }

  render() {
    const { userData } = this.props;
    const { isLoading } = this.state;
    return isLoading ? (
      <Dimmer>
        <Spinner />
      </Dimmer>
    ) : (
      <Outer my={3} flexDirection="column">
        <Flex mb={3}>
          Kazandığınız hediye çekleri aşağıda listelenmiştir. Bu hediye çeklerini geçerlilik
          tarihleri içinde kullanmadığınızda iptal edilirler. İptal edilen hediye çekleri yeniden
          aktif edilmezler.
        </Flex>
        <Flex className="tablo" flexDirection="column">
          <Flex className="satir satir-baslik">
            <Flex justifyContent="center" className="sutun baslik" width={[1, 1, 1 / 2]}>
              İNDİRİM ÇEKİ
            </Flex>
            <Flex justifyContent="center" className="sutun baslik" width={[1, 1, 1 / 2]}>
              GEÇERLİLİK SÜRESİ
            </Flex>
          </Flex>
          {userData &&
            userData.uye_kuponlar.map(kupon => <CouponCard coupon={kupon} key={kupon.Id} />)}
        </Flex>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(IndirimCekleri);
