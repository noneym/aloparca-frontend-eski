import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { PhotoSwipe } from "react-photoswipe";
import { Swiper } from "../../reactor";
import { media } from "../../style/theme";

const Outer = styled(Flex)`
  background-color: white;
  flex-direction: column;
  position: relative;
  .drift-zoom-pane {
    z-index: 999;
    left: 600px;
    width: 800px;
    border: #f3f3f3 solid 10px;
    ${media.tablet`
      display: none;
      `};
    &.drift-open,
    &.drift-opening {
      display: block;
    }
  }
  .thumbs {
    justify-content: center;
    padding: 30px 0;
    .thumb {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #dddddd;
      cursor: pointer;
      img {
        border-radius: 50%;
      }
      &.active:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
      }
    }
  }
`;

const BigImage = styled(Swiper)`
  max-width: 500px;
  margin: 0 auto;
  ${media.tablet`
    width: 100%;
    max-width: 100%;
  `};
  .swiper-wrapper {
    align-items: center;
    .image-big {
      width: 500px;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      ${media.tablet`
        width: 100%;
        height: 100%;
      `};
      img {
        max-width: 500px;
        max-height: 500px;
        ${media.tablet`
          max-width: 100%;
          max-height: 100%;
        `};
      }
    }
  }
`;

const ThumbsImage = styled(Swiper)`
  display: flex;
  justify-content: center;
  padding: 30px 0;
  .swiper-slide {
    width: 60px;
    margin: 0 10px;
    &.swiper-slide-active .thumb:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
    .thumb {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #dddddd;
      cursor: pointer;
      img {
        border-radius: 50%;
      }
    }
  }
`;

const OemBanner = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 11em;
  position: absolute;
  left: 0;
  top: 0;
  span {
    ${props => (props.isOem ? "display: flex" : "display: none")};
    background-color: red;
    color: white;
    align-self: flex-start;
    z-index: 999;
    width: 100%;
    justify-content: start;
    opacity: 0.8;
    text-align: start;
    padding: 0.4em;
    font-weight: 900;
    letter-spacing: 0.1em;
  }
  span:first-child {
    padding-bottom: 0.1rem;
  }
  span:last-child {
    border-radius: 0 0 10px 0;
    padding-top: 0.1rem;
  }
`;
class Slider extends React.Component {
  state = {
    isOpen: false
  };

  async componentDidMount() {
    const width = window.innerWidth;
    if (width > 1024) {
      this.Drift = await require("drift-zoom").default;
      this.imageZoom();
    }
  }

  onErrImg = e => {
    e.target.onerror = null;
    e.target.src =
      "/static/img/noimg.jpg";
  };

  gettingData = (gallery, index, item) => {
    if (item.w < 1 || item.h < 1) {
      // unknown size
      const img = new Image();
      img.onload = () => {
        item.w = this.width;
        item.h = this.height;
        gallery.invalidateCurrItems();
        gallery.updateSize(true);
      };
      img.src = item.src;
    }
  };

  togglePhotoSwipe = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  imageZoom = () => {
    const zoomItems = document.querySelectorAll(".zoom-items");
    for (let i = 0; i < zoomItems.length; i += 1) {
      /* eslint-disable no-new */
      new this.Drift(zoomItems[i], {
        paneContainer: document.querySelector(".image-area"),
        inlinePane: 900,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: true
      });
    }
  };

  render() {
    const { images, name ,isOem} = this.props;
    const { isOpen } = this.state;
    const handleParseImage = (image) => {
      let pimage;
      try {
        pimage = JSON.parse(image);
      } catch (err) {
        pimage = [image];
      }
      return pimage;
    };
    const sliderImages = handleParseImage(images);
    return (
      <Outer className="image-area" width={[1, 1, 3 / 7]}>
        <OemBanner isOem={isOem}>
          <span>LOGOLU ORİJİNAL</span>
          <span>YEDEK PARÇA</span>
        </OemBanner>

        {!images && (
          <Box className="big-image">
            <div>
              <img
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  padding: '100px',
                  margin: '0 auto',
                }}
                src="./static/img/noimg.jpg"
                data-zoom="./static/img/noimg.jpg"
                onError={this.onErrImg}
                alt={name}
              />
            </div>
          </Box>
        )}
        {/* {sliderImages} */}
        <PhotoSwipe
          close={ps => this.bigSlider.slideTo(ps.getCurrentIndex())}
          onClose={this.togglePhotoSwipe}
          isOpen={isOpen}
          items={
            sliderImages &&
            sliderImages.map(image => ({
              src: `https://resize.aloparca.com/upload/w_600,pns/v2/${image}`,
              w: 0,
              h: 0
            }))
          }
          options={{
            shareEl: false,
            fullscreenEl: false,
            captionEl: false,
            index: this.bigSlider ? this.bigSlider.activeIndex : 1
          }}
          gettingData={this.gettingData}
        />

        {(
          <Box className="big-image">
            <BigImage
              settings={{
                preloadImages: false,
                lazy: true,
                on: {
                  slideChange: () => {
                    this.thumbSlider.slideTo(this.bigSlider.activeIndex);
                  }
                }
              }}
              getSwiper={n => {
                this.bigSlider = n;
              }}
            >
              {sliderImages &&
                sliderImages.map(item => (
                  <div
                    className="image-big"
                    key={item}
                    onClick={this.togglePhotoSwipe}
                  >
                    <img
                      className="zoom-items swiper-lazy"
                      data-src={`https://docimages.aloparca.com/${item}`}
                      data-zoom={`https://docimages.aloparca.com/${item}`}
                      onError={this.onErrImg}
                      alt={name}
                    />
                  </div>
                ))}
              {/* {JSON.stringify(images)} */}
            </BigImage>
          </Box>
        )}
        {images && sliderImages && sliderImages.length > 1 && (
          <Box>
            <ThumbsImage
              settings={{
                centeredSlides: true,
                slideToClickedSlide: true,
                touchRatio: 0,
                width: "60px"
              }}
              getSwiper={n => {
                this.thumbSlider = n;
              }}
            >
              {sliderImages.map((item, index) => (
                <a
                  href="javascript:;"
                  onClick={() => this.bigSlider.slideTo(index)}
                  key={item}
                >
                  <div
                    className="thumb"
                    style={{
                      backgroundImage: `url('https://docimages.aloparca.com/${item}')`
                    }}
                  />
                </a>
              ))}
            </ThumbsImage>
          </Box>
        )}

      </Outer>
    );
  }
}

export default Slider;
