import {connect} from 'react-redux'
import { Flex, Box } from '@rebass/grid';
import Layout from '../../layouts/container';
import { Title } from '../../components/style';
import GoogleMap from '../../components/google-map';
import { Container } from '../../reactor';

import ContactUs from './style';

const Contact = () => (
  <Layout meta={{ title: 'İletişim' }}>
    <ContactUs>
      <Container>
        <Title>İletişim</Title>
        <Flex mx={[0, -2, -2]} className="main-area" justifyContent="center">
          <Box className="google-map" w={[1, 1 / 2, 1 / 2]} px={[0, 2, 2]}>
            <GoogleMap />
          </Box>
          <Flex w={[1, 1 / 2, 1 / 2]} px={[0, 2, 2]} flexDirection="column">
            <Flex className="box" flexDirection="column">
              <Box className="title">Yönetim Ofisi Adres</Box>
              <Box className="content">
                Topçular Mahallesi Eyüp Sultan Blv No:75 34055 Eyüp/<strong>İSTANBUL</strong>
              </Box>
              <Box>
                <a
                  href="https://maps.google.com?daddr=41.040815,28.927332"
                  className="direction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon-location-arrow" /> Yol tarifi al
                </a>
              </Box>
            </Flex>
            <Flex className="box" flexDirection="column">
              <Box className="title">Lojistik Merkezi Adres</Box>
              <Box className="content">
                Topçular Mahallesi Eyüp Sultan Blv No:75 34055 Eyüp/<strong>İSTANBUL</strong>
              </Box>
              <Box>
                <a
                  href="https://maps.google.com?daddr=41.040815,28.927332"
                  className="direction"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon-location-arrow" /> Yol tarifi al
                </a>
              </Box>
            </Flex>
            <Flex className="box" flexDirection="column">
              <Box className="title">Telefon</Box>
              <Box className="content">
                <a className="phone" href="tel:08503330686">
                  0850 333 0 686
                </a>
                <br/>Çalışma Saatleri: 08:00 - 21:00 / Cumartesi: 09:00 - 14:00
              </Box>
            </Flex>
            <Flex className="box" flexDirection="column">
              <Box className="title">Destek E-posta</Box>
              <Box className="content">
                <a className="mail" href="mailto:destek@aloparca.com">
                  destek@aloparca.com
                </a>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </ContactUs>
  </Layout>
);

export default connect()(Contact);
