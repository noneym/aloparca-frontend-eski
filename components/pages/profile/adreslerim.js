import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import Dimmer from "../../../ui/dimmer";
import Spinner from "../../../ui/spinner";
import { media } from '../../../style/theme';

import AddressCard from './components/address-card';
import NewAddress from './components/new-address';

const Outer = styled(Flex)`
  ${media.tablet`
    flex-direction: column;
  `};
  .adres-baslik {
    font-size: 16px;
    font-weight: 500;
    color: black;
    padding-left: 15px;
    padding-bottom: 30px;
  }
`;

class Adreslerim extends React.Component {
  state = { isLoading: true };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }
  render() {
    const { userData, ilIlceNested } = this.props;
    const { isLoading } = this.state;
    return isLoading ? (
      <Dimmer>
        <Spinner />
      </Dimmer>
    ) : (
      <Outer mx={-2}>
        <Flex width={[1, 1, 1 / 2]} px={2} my={[1, 1, 0]} flexDirection="column">
          <Box className="adres-baslik">Teslimat Adreslerim</Box>
          {userData &&
            userData.user_adres_list
              .filter(adres => adres.adres_type === 'teslimat')
              .map(adres => (
                <AddressCard item={adres} isDelete key={adres.Id} ilIlceNested={ilIlceNested} />
              ))}
          <NewAddress type="teslimat" ilIlceNested={ilIlceNested} />
        </Flex>
        <Flex width={[1, 1, 1 / 2]} px={2} mt={[3, 3, 0]} flexDirection="column">
          <Box className="adres-baslik">Fatura Adreslerim</Box>
          {userData &&
            userData.user_adres_list
              .filter(adres => adres.adres_type !== 'teslimat')
              .map(adres => (
                <AddressCard item={adres} isDelete key={adres.Id} ilIlceNested={ilIlceNested} />
              ))}
          <NewAddress type="fatura" ilIlceNested={ilIlceNested} />
        </Flex>
      </Outer>
    );
  }
}
const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(Adreslerim);
