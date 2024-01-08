import React from 'react';
import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

import { Modal } from 'semantic-ui-react';
import Layout from '../../layouts/container';
import {
  Container, Image, Link, Swiper,
} from '../../reactor';
import { seoMeta } from '../../reactor/func';

import { MainTitle, Title, Section } from '../../components/style';
import ProductSlider from '../../components/product-slider-home';
import SiteFeature from '../../components/site-feature';
import { media } from '../../style/theme';

import Slider from '../../components/home-slider';
import CarSelect from './car-select';
import Categories from './categories';
import SeoText from './seo-text';
// import WorkHours from './work-hours';
import Brands from './brands';

import Api from '../../api';

const HomeContainer = styled(Container)`
  max-width: 1340px;
  .desktop {
    ${media.tablet`
      display: none;
    `};
  }
  .mobile {
    display: none;
    ${media.tablet`
      display: flex;
      figure {
        width: 100%;
      }
    `};
  }
  .double-banners {
    img {
      width: 100%;
    }
  }
  .youtube-container {
    ${media.tablet`
      margin-top: 1vh;
      height: 35vh;
    `}
  }
`;

const CokSatanYedekParcalar = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  padding: 15px;
  display: flex;
  flex-direction: column;
  img {
    height: 60px;
    max-width: 60%;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.color.black[0]};
  }
  p {
    font-size: 16px;
    a {
      font-weight: 600;
      color: ${(props) => props.theme.color.black[0]};
    }
  }
`;


const cokSatanYedekParcalar = require('./data/cokSatanYedekParcalar.json');

class Home extends React.Component {
  static async getInitialProps({ res }) {
    let sonEklenenUrunler = [];
    try {
      sonEklenenUrunler = await Api.get('Anasayfa/soneklenen/limit/20');
    } catch (e) {
      // console.log(e);
    }

    const motorYagListesi = await Api.get('MadeniYaglar/urunList/katId/3');
    const motorYaglar = Object.values(motorYagListesi.urunler).reduce(
      (prev, item) => [...prev, ...item],
      [],
    );

    let categories = [];
    try {
      categories = await Api.get('Anasayfa/kategoriler/');
    } catch (e) {
      // console.log(e);
    }

    const meta = res ? await seoMeta(res.req.url) : {};

    return {
      sonEklenenUrunler,
      categories,
      meta,
      motorYaglar,
    };
  }


  render() {
    const {
      sonEklenenUrunler, categories, meta, motorYaglar,
    } = this.props;

    return (
      <Layout meta={meta}>
        <Slider />
        <CarSelect />
        <HomeContainer>
          {categories.length > 0 && <Categories categories={categories} />}
          <SeoText />
          
          <Flex className="double-banners" flexWrap="wrap" mx={[0, 0, -2]}>
            <Box width={[1, 1, 1 / 2]} px={[0, 0, 2]}>
              <Link route="motor-oil" params={{ id: 7 }}>
                <LazyLoad>
                  <Image fluid src="/static/img/t/banner/motor-katkilari.jpg" alt="Motor yağlarında en uygun fiyatlar aloparca.com'da"/>
                </LazyLoad>
              </Link>
            </Box>
            <Box width={[1, 1, 1 / 2]} px={[0, 0, 2]} mt={[2, 0, 0]}>
              <a href="https://www.youtube.com/channel/UCjvosQ4Scra1tS_4qTR29gQ" target="_blank"><Image fluid src="/static/img/t/banner/aloparca-youtube-kanali.jpg" alt="Youtube kanalımıza abone olmayı unutmayın"/></a>
            </Box>
          </Flex>
          <ProductSlider
            title="Son Eklenen Ürünler"
            products={sonEklenenUrunler.filter((p) => p.stok_adet != 0)}
          />
          <Section mt={[3, 3, 5]} mb={[3, 3, 5]}>
            <Flex className="double-banners" flexWrap="wrap" mx={[0, 0, -2]}>
              <Box width={[1, 1, 1 / 2]} px={[0, 0, 2]}>
                <Link route="bakimseti">
                  <LazyLoad>
                    <Image
                      fluid
                      src="/static/img/t/banner/bakim-seti-robotu.jpg"
                      alt="Bakı seti robotu ile araç bakımı için ihtiyaç duyulan hava filtresi, yağ filtresi ve diğer parçalara kolayca en uygun fiyata sahip olursunuz"
                    />
                  </LazyLoad>
                </Link>
              </Box>
              <Box width={[1, 1, 1 / 2]} px={[0, 0, 2]} mt={[2, 0, 0]}>
                <Link route="campaign">
                  <LazyLoad>
                    <Image
                      fluid
                      src="/static/img/t/banner/yedek-parca-outlet.jpg"
                      alt="Türkiye'de en uygun oto yedek parça sitesi"
                    />
                  </LazyLoad>
                </Link>
              </Box>
            </Flex>
          </Section>
          <ProductSlider
            title="Motor Yağları"
            products={motorYaglar.filter((p) => p.stok_adet != 0)}
          />

          <Section mt={[3, 3, 5]} mb={[3, 3, 5]}>
            <MainTitle>Oto Yedek Parça</MainTitle>
            <Brands />
          </Section>

          <Section mt={[3, 3, 5]} mb={[3, 3, 5]}>
            <Title>Çok Satan Yedek Parçalar</Title>
            <Flex mx={-1} flexWrap="wrap">
              <Swiper
                settings={{
                  slidesPerView: 1,
                  autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                  },
                  preloadImages: false,
                  lazy: true,
                  breakpoints: {
                    414: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1023: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 5,
                      slidesPerGroup: 1,
                    },
                  },
                }}
              >
                {cokSatanYedekParcalar.map((p) => (
                  <Flex px={1} key={p.title}>
                    <CokSatanYedekParcalar>
                      <Image className="swiper-lazy" fluid data-src={p.image} />
                      <h3>{p.title}</h3>
                      <p>
                        {p.content}
                        <Link route="listcar" params={{ marka: p.marka }}>
                          {' '}
                          buraya tıklayın.
                        </Link>
                      </p>
                    </CokSatanYedekParcalar>
                  </Flex>
                ))}
              </Swiper>
            </Flex>
          </Section>

          <SiteFeature />
        </HomeContainer>
      </Layout>
    );
  }
}
export default connect()(Home);
