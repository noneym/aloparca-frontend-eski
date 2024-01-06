import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import Dotdotdot from 'react-dotdotdot';
import { Image, Link, Swiper } from '../../../reactor';
import { sp, color, media } from '../../../style/theme';

const Outer = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin: 0 -10px;
  ${media.mini`
    margin: 0;
  `};
  .brand {
    flex-direction: column;
    text-align: -webkit-center;
    padding: 0 10px;
    ${media.mini`
      padding: 0;
    `};
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 75px;
      img {
        height: 60px;
        max-width: 60%;
      }
    }
    h4 {
      color: ${color.black[0]};
      font-weight: 600;
      line-height: 1.3;
      font-size: 18px;
      text-align: center;
    }
    ul {
      margin-top: 10px;
      li {
        a {
          display: block;
          padding: 20px 0;
          font-size: 16px;
          color: #525355;
          text-align: center;
        }
        &:nth-child(odd) {
          background-color: #eeeeee;
        }
      }
    }
    + .brand:before {
      content: '';
      width: 1px;
      height: 100%;
      background-color: ${color.gray[2]};
      margin: 0 ${sp(2)};
      align-self: flex-end;
    }
  }
`;

const items = [
  {
    image: '/static/img/t/brands/ww.svg',
    title: 'VW',
    items: [
      { model: 'Golf', title: 'Golf Yedek Parça' },
      { model: 'Passat', title: 'Passat Yedek Parça' },
      { model: 'Jetta', title: 'Jetta Yedek Parça' },
      { model: 'Polo', title: 'Polo Yedek Parça' },
      { model: 'Tiguan', title: 'Tiguan Yedek Parça' },
      { model: 'Transporter', title: 'Transporter Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/bmw.svg',
    title: 'BMW',
    items: [
      { model: '3', title: '3 Serisi Yedek Parça' },
      { model: '5', title: '5 Serisi Yedek Parça' },
      { model: '7', title: '7 Serisi Yedek Parça' },
      { model: 'X3', title: 'X3 Serisi Yedek Parça' },
      { model: 'X5', title: 'X5 Serisi Yedek Parça' },
      { model: 'X6', title: 'X6 Serisi Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/audi.svg',
    title: 'AUDI',
    items: [
      { model: 'A3', title: 'A3 Yedek Parça' },
      { model: 'A4', title: 'A4 Yedek Parça' },
      { model: 'A5', title: 'A5 Yedek Parça' },
      { model: 'A6', title: 'A6 Yedek Parça' },
      { model: 'Q5', title: 'Q5 Yedek Parça' },
      { model: 'Q7', title: 'Q7 Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/seat.svg',
    title: 'SEAT',
    items: [
      { model: 'Cordoba', title: 'Cordoba Yedek Parça' },
      { model: 'Toledo', title: 'Toledo Yedek Parça' },
      { model: 'Altea', title: 'Altea Yedek Parça' },
      { model: 'Ibiza', title: 'Ibiza Yedek Parça' },
      { model: 'Leon', title: 'Leon Yedek Parça' },
      { model: 'Panda', title: 'Panda Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/ford.svg',
    title: 'FORD',
    items: [
      { model: 'Focus', title: 'Focus Yedek Parça' },
      { model: 'Fiesta', title: 'Fiesta Yedek Parça' },
      { model: 'Fusion', title: 'Fusion Yedek Parça' },
      { model: 'Tourneo', title: 'Tourneo Yedek Parça' },
      { model: 'C Max', title: 'C Max Yedek Parça' },
      { model: 'Transit', title: 'Transit Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/skoda.svg',
    title: 'SKODA',
    items: [
      { model: 'Fabia', title: 'Fabia Yedek Parça' },
      { model: 'Octavia', title: 'Octavia Yedek Parça' },
      { model: 'SUPERB', title: 'SUPERB Yedek Parça' },
      { model: 'Yeti', title: 'Yeti Yedek Parça' },
      { model: 'Felicia', title: 'Felicia Yedek Parça' },
      { model: 'Rapid', title: 'Rapid Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/citroen.svg',
    title: 'CITROEN',
    items: [
      { model: 'C1', title: 'C1 Yedek Parça' },
      { model: 'C2', title: 'C2 Yedek Parça' },
      { model: 'C3', title: 'C3 Yedek Parça' },
      { model: 'C4', title: 'C4 Yedek Parça' },
      { model: 'C5', title: 'C5 Yedek Parça' },
      { model: 'C6', title: 'C6 Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/hyundai.svg',
    title: 'HYUNDAI',
    items: [
      { model: 'Accent', title: 'Accent Yedek Parça' },
      { model: 'H 1', title: 'H 1 Yedek Parça' },
      { model: 'Lantra', title: 'Lantra Yedek Parça' },
      { model: 'i20', title: 'i20 Yedek Parça' },
      { model: 'i30', title: 'i30 Yedek Parça' },
      { model: 'i40', title: 'i40 Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/alfa-romeo.svg',
    title: 'ALFA ROMEO',
    items: [
      { model: 'Alfetta', title: 'Alfetta Yedek Parça' },
      { model: 'GTV', title: 'GTV Yedek Parça' },
      { model: 'Mito', title: 'Mito Yedek Parça' },
      { model: '166', title: '166 Yedek Parça' },
      { model: 'Giulietta', title: 'Giulietta Yedek Parça' },
      { model: 'Montreal', title: 'Montreal Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/fiat.svg',
    title: 'FIAT',
    items: [
      { model: 'Doblo', title: 'Doblo Yedek Parça' },
      { model: 'Punto', title: 'Punto Yedek Parça' },
      { model: 'Linea', title: 'Linea Yedek Parça' },
      { model: 'Albea', title: 'Albea Yedek Parça' },
      { model: 'Tempra', title: 'Tempra Yedek Parça' },
      { model: 'Ducato', title: 'Ducato Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/volvo.svg',
    title: 'VOLVO',
    items: [
      { model: 'S40', title: 'S40 Yedek Parça' },
      { model: 'S60', title: 'S60 Yedek Parça' },
      { model: 'V60', title: 'V60 Yedek Parça' },
      { model: 'S70', title: 'S70 Yedek Parça' },
      { model: 'S90', title: 'S90 Yedek Parça' },
      { model: '460 L', title: '460 L Yedek Parça' },
    ],
  },
  {
    image: '/static/img/t/brands/renault.svg',
    title: 'RENAULT',
    items: [
      { model: 'Clio', title: 'Clio Yedek Parça' },
      { model: 'SCÉNIC', title: 'SCÉNIC Yedek Parça' },
      { model: 'Megane', title: 'Megane Yedek Parça' },
      { model: 'Fluence', title: 'Fluence Yedek Parça' },
      { model: 'MASTER', title: 'MASTER Yedek Parça' },
      { model: 'KANGOO', title: 'KANGOO Yedek Parça' },
    ],
  },
];

const Brands = () => (
  <Outer>
    <Swiper
      settings={{

        preloadImages: false,
        lazy: true,
        slidesPerView: 1,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
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
      {items.map(brand => (
        <Flex key={brand.title} className="brand">
          <Image className="swiper-lazy" data-src={brand.image} />
          <Dotdotdot clamp={2}>
            <h4 className="title">
              {brand.title} modellerine ait <br />
              yedek parça
            </h4>
          </Dotdotdot>
          <ul>
            {brand.items.map(item => (
              <li key={item.model}>
                <Link route="listcar" params={{ marka: brand.title, model: item.model }}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
      ))}
    </Swiper>
  </Outer>
);

export default Brands;
