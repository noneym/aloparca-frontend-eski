import styled from 'styled-components';
import { media } from '../../style/theme';
import { Swiper, Link, ImageBg } from '../../reactor';

const Outer = styled(Swiper)`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  height: auto;

  ${media.tablet`
    /* height: 450px; */
  `};
  .slider {
    background-position: center !important;
    background-size: cover !important;
    /* height: 450px;*/
    width: 100%;
    height: auto;

    @media (max-height: 1000px) {
      /* height: 400px;*/
    }
    ${media.tablet`
      height: auto;
      width: 100%;
      background-position: center top !important;
    `};
    &.desktop {
      ${media.phone`
        display: none;
      `};
    }
    &.mobile {
      display: none;
      ${media.phone`
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
        disableOnInteraction: false,
      },
      autoHeight: true,
      loop: true,
      effect: 'fade',
      speed: 1000,
    }}
  >
    {['3', '4', '5', '6'].map(item => (
      <div key={item}>
        <picture>
          <source
            className="swiper-lazy"
            srcSet={`/static/img/t/home-banner/mobile/${item}.png`}
            media="(max-width: 1023px)"
          />
          <img className="swiper-lazy" data-src={`/static/img/t/home-banner/desktop/${item}.png`} />
        </picture>

        <Link />
      </div>
    ))}
  </Outer>
);

export default Slider;
