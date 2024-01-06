/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Router } from '../routes';
import { media } from '../style/theme';
import { Swiper, Link } from '../reactor';

const BannerFlex = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1920px;
  ${media.tablet` 
    cursor: pointer;
    display: -webkit-flex;
    flex-direction: column;

  `};
`;

const BannerSwiper = styled.div`
  display: block;
  display: -webkit-flex;
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 50%;

  ${media.tablet`
      width: 100%;
      heigt: 50%;
      margin: 0;
  `};
`;

const Outer = styled(Swiper)`
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  margin-left: 2%;
  margin-right: 0%;
  border-radius: 9px;

  ${media.tablet`
      border-radius: 0px; 
      margin: 0;
  `};

  img {
    width: 100%;
    height: 100%;
    border-radius: 9px;

    ${media.tablet`
      border-radius: 0px; 
     
  `};
  }

  .swiper-container,
  .swiper-slide {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    border: none;
  }

  picture {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const TabletOff = styled(Box)`
  display: flex;
  display: -webkit-flex;
  margin-bottom: 0px;
  margin-top: 10px;
  margin-left: 10px;

  flex-direction: column;
  flex: 1;
  ${media.tablet`
      display: -webkit-flex;
      width: 100%;
      margin-bottom: 0px;
      margin-top: 0px; 
      margin-left: 0px; 
  `};
`;

const TabletOffBox = styled(Box)`
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  width: 100%;
  height: 100%;
  ${media.tablet`
      display: -webkit-flex;
  `};
`;

const BoxImg = styled.img`
  border-radius: 9px;
  margin-bottom: 10px;
  // height: 250px;
  height: intrinsic; // Safari web için eklendi.
  &:hover {
    transition: all 1100ms;
    transform: scale(1.016);
    cursor: pointer;
  }

  ${media.tablet`
     display: none;
     
    `};
`;

const BoxImg2 = styled.img`
  display: none;
  border-radius: 9px;
  margin-bottom: 0px;
  ${media.tablet`
     display: block;
     width: 100%;
     height: 100%;
     border-radius: 0px;
    }
    `};
`;

const Picture = styled.picture`
  position: relative;
`;

const LinkClicked = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
`;

// Home page üst sağ taraf sliderların arrayi
const arr = [
  {
    image: 'bitum-ses-yalitimi.jpg',
    link: '/yedek-parca/ALPGLOBAL/BITUM-ASFALT-SESSIZLESTIRICI/ALP-BITUM/998805098',
    alt:'Bitüm Sessizleştirici - Bitüm Ses Yalıtımı'
  },
  {
    image: 'piston-segman-nedir-aracin-neresinde-kullanilir_slayt.jpg',
    link: '/blog-detay/piston-segman-nedir-aracin-neresinde-kullanilir',
    alt:'Piston Segman Nedir? Aracın Neresinde Kullanılır?'
  },
  {
    image: 'far_onarim.jpg',
    link: '/blog-detay/sorunsuz-far-onarimi-mumkun-mu-',
    alt:'Far Onarımı Mümkün mü?'
  },
  {
    image: 'ayna-onarim.jpg',
    link: '/blog-detay/dikiz-aynasi-tamir-olur-mu-',
    alt: 'Dış Dikiz Ayna Tamiri'
  },
  {
    image: 'dogru-yedek-parca.jpg',
    link: '/',
    alt: 'Doğru oto yedek parça seçimi nasıl yapılmalı?'
  },
  {
    image: 'turkiyede-bulunmayan-oto-yedek-parca-aloparcada.jpg',
    link: '/kurumsal/toplu-parca-teklifi',
    alt: 'Türkiyede bulumayan oto yedek parça, Aloparçada'
  },
  {
    image: 'pratik-bakim-robotu.jpg',
    link: '/bakim-seti-robotu',
    alt: 'Pratik bakım robotu'
  },
  {
    image: 'silecek-kampanyasi.jpg',
    link: '/kampanyali-urunler?category=Fırsat&brand=Silecek',
    alt: 'Oto silecek kampanyası'
  },
  {
    image: 'castrol-radicool-antifriz-kampanya.jpg',
    link: '/yedek-parca/CASTROL+/Castrol-Radicool-Antifriz-3-Litre/Radicool-3-LT/898060840',
    alt: 'Castrol Radicool Antifriz Kampanyası'
  },
  {
    image: 'debriyaj-seti-son-tararim.jpg',
    link: '/kampanyali-urunler?category=SETI&brand=DEBRIYAJ',
    alt: 'Debriyaj seti kampanyası'
  },
];

// Sol üst banner link ve image pathi
const upleft = {
  img: '../static/img/t/home-banner/desktop/kampanya/castrol-5w40.jpg',
  mobileimg: '../static/img/t/home-banner/mobile/kampanya/castrol-5w40.jpg',
  link: '/yedek-parca/Castrol/Castrol-Edge-5W40-4-Lt-Motor-Yagi-Yeni-Uretim-Tari/CAST-150-EDGE-TU-04/1999999',
  alt: 'Castrol Edge 5w40 Motor Yağı En Uygun Fiyatlar ile Aloparçada'
};

// Sol alt banner link ve image pathi
const downleft = {
  img: '../static/img/t/home-banner/desktop/weekly/fren-diski-yeni-design.jpg',
  mobileimg: '../static/img/t/home-banner/mobile/weekly/fren-diski-yeni-design.jpg',
  link: '/kampanyali-urunler?category=DISKI&brand=FREN',
  alt: 'Fren disklerinde yüzde elliye varan indrim'
};

class Slider extends React.Component{
  state = { loaded: false };
  showImage = () => {
    this.setState({loaded: true});
  }
  render() {
    return (
      <>
      <BannerFlex>
          <TabletOff>
            <TabletOffBox>
              <BoxImg
                onClick={() => Router.pushRoute(upleft.link)}
                src={upleft.img}
                id="topLeft"
                alt={upleft.alt}
                width="100%"
              />
              <BoxImg2
                onClick={() => Router.pushRoute(upleft.link)}
                src={upleft.mobileimg}
                id="topLeft"
                alt={upleft.alt}
                width="100%"
              />
            </TabletOffBox>
            <TabletOffBox>
              <BoxImg
                onClick={() => Router.pushRoute(downleft.link)}
                src={downleft.img}
                id="bottomLeft"
                alt={downleft.alt}
                width="100%"
              />
              <BoxImg2
                onClick={() => Router.pushRoute(downleft.link)}
                src={downleft.mobileimg}
                id="bottomLeft"
                alt={downleft.alt}
                width="100%"
              />
            </TabletOffBox>
          </TabletOff>

          <BannerSwiper>
            <Outer
              settings={{
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: true,
                },
                loop: true,
                speed: 1000,
                preloadImages: true,
              }}
            >
              {arr.map((item) => (
                <Picture key={item.image}>
                  <source
                    className="swiper-lazy"
                    srcSet={`/static/img/t/home-banner/mobile/${item.image}`}
                    media="(max-width: 1023px)"
                  />
                  <img
                    className="swiper-lazy"
                    src={`/static/img/t/home-banner/desktop/${item.image}`}
                    alt={item.alt}
                  />
                  {item.link === '/' ? null : <LinkClicked route={item.link} />}
                </Picture>
              ))}
            </Outer>
          </BannerSwiper>
        </BannerFlex>
      </>
    );
  }
}
export default Slider;

