import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { media } from '../../../style/theme';

const KunyePage = styled(Flex)`
  font-size: 15px;
  .row {
    ${media.tablet`
      flex-direction: column;
      div + div {
        margin-top: 10px;
      }
    `};
  }
`;
const Kunye = () => (
  <KunyePage flexDirection="column">
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Sahibi</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>
        Aloparca Oto Yedek Parça Elektronik Hiz. San.ve Dış Tic. A.Ş.
      </Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>E-posta</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>info@aloparca.com</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Servis Sağlayıcı</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>TÜRK TELEKOMÜNİKASYON A.Ş. TÜRK TELEKOM VERİ MERKEZİ</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Adres</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>Topçular Mahallesi Eyüp Sultan Blv No:75 34055 Eyüp/İSTANBUL</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Ticaret Odası</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>İstanbul Ticaret Sicili Memurluğu</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Ticaret Sicil No</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>774404</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Vergi Dairesi</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>Bayrampaşa</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Vergi No</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>0551697960</Box>
    </Flex>
    <Flex className="row" my={2}>
      <Box width={[1, 1, 1 / 6]}>
        <strong>Mersis No</strong>
      </Box>
      <Box width={[1, 1, 5 / 6]}>055169796000001</Box>
    </Flex>
  </KunyePage>
);
export default Kunye;
