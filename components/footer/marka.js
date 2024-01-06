import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { Swiper, Container, Link } from '../../reactor';
import { media } from '../../style/theme';
import Api from '../../api';

const Outer = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    ${media.mini`
      padding: 0;
    `};
  }
  .swiper {
    height: 75px;
    margin: 0 20px;
    ${media.tablet`
      height:60px;
    `};
    ${media.mini`
      height: 50px;
    `};
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &:hover img {
      opacity: 1;
      filter: none;
    }
  }
  img {
    max-width: 150px;
    max-height: 60px;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: 0.3s;
    ${media.tablet`
      max-width: 120px;
    `};
    ${media.mini`
      max-height: 50px;
    `};
  }
  .arrow {
    flex: 0 0 auto;
    cursor: pointer;
    ${media.mini`
      display: none;
    `};
    &.left {
      transform: rotate(-180deg);
    }
  }
`;

const Arrow = ({ direction, onClick }) => (
  <svg width="32" height="32" className={`arrow ${direction}`} onClick={onClick}>
    <circle fill="#ccc" cx="16" cy="16" r="16" />
    <svg x="14" y="12">
      <polygon fill="white" points="0 0, 0 8, 6 4" />
    </svg>
  </svg>
);

class CarFooter extends React.Component {
  state = { MarkaList: null };

  async componentDidMount() {
    const MarkaList = await Api.get('Products/araclar');
    this.changeState(MarkaList);
  }

  changeState = (MarkaList) => {
    this.setState({ MarkaList });
  };

  render() {
    const { MarkaList } = this.state;
    return (
      <Outer>
        {MarkaList && (
          <Container>
            <Arrow direction="left" onClick={() => this.certificateSwiper.slidePrev()} />
            <Swiper
              getSwiper={(n) => {
                this.certificateSwiper = n;
              }}
              className="swiper"
              settings={{
                loop: false,
                autoplay: {
                  delay: 5000,
                },
                slidesPerView: 2,
                spaceBetween: 10,
                preloadImages: false,
                lazy: true,
                breakpoints: {
                  375: {
                    spaceBetween: 20,
                  },
                  600: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1200: {
                    spaceBetween: 40,
                    slidesPerView: 6,
                    slidesPerGroup: 3,
                  },
                },
              }}
            >
              {MarkaList.results.opts.map(item => (
                <Link
                  route="listcar"
                  params={{ marka: item.replace(/\s/g, '_') }}
                  title={item}
                  key={item}
                >
                  <img
                    className="swiper-lazy"
                    data-src={`/static/img/logolar/markalar/marka_${item
                      .replace(/\s/g, '')
                      .toLowerCase()}.svg`}
                    alt={item}
                  />
                </Link>
              ))}
            </Swiper>
            <Arrow direction="right" onClick={() => this.certificateSwiper.slideNext()} />
          </Container>
        )}
      </Outer>
    );
  }
}

export default CarFooter;
