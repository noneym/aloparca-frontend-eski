import React from 'react';
import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import cx from 'classnames';

import { Swiper } from '../reactor';
import { Section } from '../components/style';
import { Title } from './style';
import { media } from '../style/theme';
import ProductCard from './product-card/index-home';

const Outer = styled(Section)`
  .desktop {
    display: flex;
    ${media.tablet`
    display:none;
  `};
  }
  .mobile {
    display: none;
    ${media.tablet`
    display: flex;
    justify-content: center;
  `};
  }
`;

const UrunSwiper = styled(Swiper)`
  .swiper-item {
    height: 360px;
    ${media.tablet`
      height: 300px;
    `};
  }
`;

const Paginations = styled(Flex)`
  align-items: center;
  a {
    content: '';
    width: 6px;
    height: 6px;
    background-color: #ccc;
    border-radius: 50%;
    & + a {
      margin-left: 15px;
    }
    &.is-active {
      width: 10px;
      height: 10px;
    }
  }
`;



class ProductSlider extends React.Component {
  state = { currentPaginate: 0, swiperSnapGridLength: [] };


  componentWillUnmount() {
    if (this.urunSwiper) this.urunSwiper.off('slideChange', this.slideChange);
  }

  preparePagination(swiper) {
    // const swiperSnapGridLength = [...Array(swiper.snapGrid.length)];
    // this.setState({ swiperSnapGridLength });
  }

  slideChange = () => {
    const {
      activeIndex,
      params: { slidesPerGroup },
    } = this.urunSwiper;
    const currentPaginate = Math.ceil(activeIndex / slidesPerGroup);
    this.setState({ currentPaginate });
  };


  
  render() {
    const {
      title, products, isCart, onClose, sectionProps,
    } = this.props;
    const { swiperSnapGridLength } = this.state;

    let _products = null;

    if (products.length === 0){
      return null;
    }else{
       _products = products.filter(p => p.name);
    }

    return (
      <Outer {...sectionProps}>
        <Flex justifyContent="space-between">
          {title && <Title>{title}</Title>}
          {swiperSnapGridLength && swiperSnapGridLength.length > 0 ? (
            <Paginations className="desktop" mb={3}>
              {swiperSnapGridLength.map((item, index) => (
                <a
                  href="javascript:;"
                  className={cx({
                    'is-active': index === this.state.currentPaginate,
                  })}
                  onClick={() => {
                    this.urunSwiper.slideTo(index * this.urunSwiper.params.slidesPerGroup);
                  }}
                  key={index}
                />
              ))}
            </Paginations>
          ) : (
            <Paginations className="desktop" mb={3} />
          )}
        </Flex>
        {_products && _products.length > 0 && (
          <UrunSwiper
            getSwiper={(n) => {
              this.urunSwiper = n;
              this.preparePagination(n);
            }}
            settings={{
              on: {
                slideChange: this.slideChange,
              },
              autoplay: {
                delay: 4000,
                disableOnInteraction: false,
              },
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
              preloadImages: false,
              lazy: true,
              loopFillGroupWithBlank: false,
              breakpoints: {
                414: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 2,
                  spaceBetween: 15,
                },
                1440: {
                  slidesPerView: 5,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
              },
            }}
          >
            {_products.map(p => (
              <ProductCard product={p} isCart={isCart} onClose={onClose} swiperLazy key={p}/>
            ))}
          </UrunSwiper>
        )}

        <Flex className="mobile">
          {swiperSnapGridLength && swiperSnapGridLength.length > 0 && (
            <Paginations my={2}>
              {swiperSnapGridLength.map((item, index) => (
                <a
                  href="javascript:;"
                  className={cx({
                    'is-active': index === this.state.currentPaginate,
                  })}
                  onClick={() => {
                    this.urunSwiper.slideTo(index * this.urunSwiper.params.slidesPerGroup);
                  }}
                  key={index}
                />
              ))}
            </Paginations>
          )}
        </Flex>
      </Outer>
    );
  }
}

ProductSlider.defaultProps = {
  sectionProps: {
    mt: [3, 3, 5],
    mb: [3, 3, 5],
  },
  products: [],
};

export default ProductSlider;
