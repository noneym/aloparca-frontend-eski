import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { media } from '../../../style/theme';

const HakkimizdaPage = styled(Flex)`
  font-size: 15px;
  text-align: justify;
  ${media.tablet`
    flex-direction: column;
  `};
  .image-area {
    ${media.tablet`
      flex-direction: column;
    `};
    .image {
      ${media.tablet`
        width: 100%;
      `};
      .responsive-img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 4px;
        ${media.tablet`
          margin-top: 20px;
          `};
      }
    }
  }
  .right-area {
    ${media.tablet`
      order: -1;
    `};
    .infographic {
      ${media.tablet`
        margin-bottom: 20px;
      `};
      .title {
        font-size: 46px;
        font-weight: 600;
        color: #ff8900;
        line-height: 1;
      }
    }
  }
`;

const Hakkimizda = () => (
  <HakkimizdaPage>
    <Flex width={[1, 1, 3 / 5]} flexDirection="column">
      <Box mb={2}>
        <p>
        "Sıradaki parça aradığı yedek parçayı bulamayanlara gelsin" sloganı ile tüm Türkiye'de araç kullanıcılarına ulaşmayı hedefleyen AloParca.com 2012 senesinde İstanbul'da kurulmuştur.
        </p>
        <p>
        Kurulduğu günden beri farklı arama motoruyla ve yenilikçi ilham veren yaklaşımı ile sektörde bir numara olan AloParca.com 2015 senesinde 14.cüsü gerçekleşen Türkiye'nin ilk ve tek bağımsız web ödülleri organizasyonu Altın Örümcek ödüllerin de yılın en iyi e-ticaret sitesi altın örümcek ödülünü almıştır.
        </p>
        <p>50 farklı otomobil markasında 500.000'in üzerinde online stoğu ile müşterilerine hizmet vermektedir.</p>
        <p>
        Müşteri odaklı yaklaşımı, deneyimli kadrosu ile her zaman müşterisinin yanında olmayı hedefleyen AloParca.com iyi fiyat, doğru hizmet ve mutlu müşteri felsefesini kendine ilke edinmiştir.
        </p>
      </Box>
      <Flex className="image-area" alignItems="center" justifyContent="space-between" mx={-1}>
        <Box className="image" px={1}>
          <img
            className="responsive-img"
            src="/static/img/hakkimizda/hakkimizda-stock.jpg"
            alt="aloparca.com"
          />
        </Box>
        <Box className="image" px={1}>
          <img
            className="responsive-img"
            src="/static/img/hakkimizda/hakkimizda-stock2.jpg"
            alt="aloparca.com"
          />
        </Box>
        <Box className="image" px={1}>
          <img
            className="responsive-img"
            src="/static/img/hakkimizda/hakkimizda-stock3.jpg"
            alt="aloparca.com"
          />
        </Box>
      </Flex>
    </Flex>
    <Flex
      className="right-area"
      width={[1, 1, 2 / 5]}
      ml={[0, 0, 3]}
      mb={[2, 0, 0]}
      flexDirection="column"
      justifyContent="space-around"
    >
      <Flex className="infographic" alignItems="flex-end">
        <Flex width={1 / 3} justifyContent="center">
          <Box>
            <img
              src="/static/img/hakkimizda/hakkimizda-infographic-1.png"
              alt="Türkiye’de 1 numara"
            />
          </Box>
        </Flex>
        <Flex width={2 / 3} flexDirection="column" ml={1}>
          <Box className="title">1</Box>
          <Box className="description">Türkiye’de 1 numara</Box>
        </Flex>
      </Flex>
      <Flex className="infographic" alignItems="flex-end">
        <Flex width={1 / 3} justifyContent="center">
          <Box>
            <img
              src="/static/img/hakkimizda/hakkimizda-infographic-2.png"
              alt="48 otomobil markası için"
            />
          </Box>
        </Flex>
        <Flex width={2 / 3} flexDirection="column" ml={1}>
          <Box className="title">48</Box>
          <Box className="description">48 otomobil markası için</Box>
        </Flex>
      </Flex>
      <Flex className="infographic" alignItems="flex-end">
        <Flex width={1 / 3} justifyContent="center">
          <Box>
            <img
              src="/static/img/hakkimizda/hakkimizda-infographic-3.png"
              alt="220 binden fazla yedek parça"
            />
          </Box>
        </Flex>
        <Flex width={2 / 3} flexDirection="column" ml={1}>
          <Box className="title">220b</Box>
          <Box className="description">220 binden fazla yedek parça</Box>
        </Flex>
      </Flex>
    </Flex>
  </HakkimizdaPage>
);

export default Hakkimizda;
