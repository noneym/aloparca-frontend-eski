import styled from 'styled-components';
// import { Box } from '@rebass/grid';
// import { Router } from '../routes';
import { media } from '../style/theme';
import {  Swiper, Link, ImageBg  } from '../reactor';


const Outer = styled(Swiper)`
  max-width: 1920px;
  margin: 0 auto;
  ${media.tablet`
    height: 300px;
  `};
  .slider {
    background-position: center;
    height: 560px;
    ${media.tablet`
      height: 300px;
      background-position: center top;
    `};
    &.desktop {
      ${media.tablet`
        display: none;
      `};
    }
    &.mobile {
      display: none;
      ${media.tablet`
        display: block;
      `};
    }
  }
`;

const Slider = () => (
  <Outer
    settings={{
      autoplay: {
        delay: 5000,
      },
      loop: true,
      effect: 'fade',
      speed: 1000,
    }}
  >
    {['1', '2', '3', '4', '5', '6', '7'].map(item => (
      <div key={item}>
        <ImageBg
          className="slider desktop"
          src={`/static/img/t/home-banner/desktop/aloparca-banner-${item}.png`}
        />
        <ImageBg
          className="slider mobile"
          src={`/static/img/t/home-banner/mobile/aloparca-banner-${item}.png`}
        />
        <Link />
      </div>
    ))}
  </Outer>
);

export default Slider;
