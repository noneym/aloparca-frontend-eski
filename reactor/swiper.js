import styled from 'styled-components';
import cx from 'classnames';
import { connect } from 'react-redux';

import { color } from '../style/theme';

const Outer = styled.div`
  width: 100%;
  position: relative;
  direction: ltr;
  overflow: hidden;
  .swiper-container,
  .swiper-wrapper,
  .swiper-slide {
    height: 100%;
  }
  .swiper-wrapper {
    display: flex;
    flex-direction: row;
  }
  .swiper-slide {
    direction: ${props => (props.lang === 'ar' ? 'rtl' : 'ltr')};
    flex: 0 0 auto;
    width: 100%;
  }
  .navigation {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;
    .icon {
      width: 30px;
      height: 30px;
      color: #333;
      font-size: 20px;
      cursor: pointer;
      &.swiper-button-disabled {
        opacity: 0.2;
        cursor: default;
      }
    }
  }
`;

class Slider extends React.Component {
  state = {};

  componentDidMount() {
    this.getSwiper();
    this.initSwiper();
  }
  getSwiper = async () => {
    if (!this.Swiper) {
      const s = await import('swiper');
      this.Swiper = s.default;
    }
  };
  initSwiper = () => {
    const sI = setInterval(() => {
      if (typeof this.Swiper !== 'undefined') {
        const swiper = new this.Swiper(this.refs.container, {
          loop: false,
          slidesPerView: 1,
          ...this.props.settings,
          navigation: {
            nextEl: '.icon-chevron-thin-right',
            prevEl: '.icon-chevron-thin-left',
          },
        });
        this.swiper = swiper;
        this.setState({ init: true });
        if (this.props.getSwiper) {
          this.props.getSwiper(this.swiper);
        }
        clearInterval(sI);
      } else {
      }
    }, 20);
  };

  render() {
    const {
      className, children, extras, lang,
    } = this.props;
    // console.log(this.props);
    
    let items;
    if (Array.isArray(children)) {
      items = children;
    } else {
      items = [children];
    }

    // const linkArray = [
    //   {}
    // ]

    const { init } = this.state;
    return (
      <Outer lang={lang} className={cx(className, { init })}>
        <div className="swiper-container" ref="container">
          <div className="swiper-wrapper">
            {items.map((c, i) => (
              <div className="swiper-slide" key={`swiper-slide-${i}`}>
                {c}
              </div>
            ))}
          </div>
          <div className="navigation">
            <div className="icon icon-chevron-thin-left" />
            <div className="icon icon-chevron-thin-right" />
          </div>
          {extras &&
            this.swiper &&
            extras.map((Extra, i) => <Extra key={i} swiper={this.swiper} />)}
        </div>
      </Outer>
    );
  }
}

const mapStateToProps = ({ lang }) => ({ lang });

export default connect(mapStateToProps)(Slider);
