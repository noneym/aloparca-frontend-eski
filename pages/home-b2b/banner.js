import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { media, color } from '../../style/theme';
import { ImageBg, Container, Link } from '../../reactor';

const Outer = styled.section`
  max-width: 1920px;
  margin: 0 auto;
  ${media.tablet`
    height: 300px;
  `};
  .banner {
    background-position: center !important;
    background-size: cover !important;
    height: 500px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.25);
    }
    @media (max-height: 1000px) {
      height: 400px;
    }
    ${media.tablet`
      height: 300px;
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

    .b2b-actions a {
      ${media.tablet`
        width: 50% !important;
        min-width: 50% !important;
        max-width: 50%;
      `};
    }

    .b2b-actions {
      ${media.tablet`
        width: 96% !important;
      `};
    }

    .container {
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      color: white;
      .slogan {
        font-size: 36px;
        font-weight: 700;
        width: 50%;

        ${media.tablet`
          font-size: 24px;
          width: 100%;
          text-align: center;
          padding: 0 30px;
        `};
      }
      .notice {
        margin: 30px 0;
        font-size: 20px;

        ${media.tablet`
          font-size: 15px;
          text-align: center;
        `};
      }
      .b2b-actions {
        .b2b-action {
          color: white;
          width: 140px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          margin-right: 20px;
          transition: 0.2s;
          background-color: ${color.primary};
          &:hover {
            background-color: #ffb300;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
  }
`;

const Slider = () => {
  const renderBannerContent = () => (
    <Container>
      <div className="slogan">
        Aloparça Kurumsal Üyelik sayesinde yedek parçada %50'ye varan tasarruf sağlayın.
      </div>
      <div className="notice">*Sadece filo şirketleri ve ustalar başvurabilir</div>
      <Flex className="b2b-actions" alignItems="center">
        <Link className="b2b-action" route="profile" params={{ slug: 'yeni-uye' }} title="Üye Ol">
          ÜYE OL
        </Link>
        <Link className="b2b-action" route="profile" params={{ slug: 'giris' }} title="Giriş Yap">
          GİRİŞ
        </Link>
      </Flex>
    </Container>
  );

  return (
    <Outer>
      <ImageBg className="banner desktop" src="/static/b2b/home/banner-desktop.png">
        {renderBannerContent()}
      </ImageBg>
      <ImageBg className="banner mobile" src="/static/b2b/home/banner-mobile.png">
        {renderBannerContent()}
      </ImageBg>
    </Outer>
  );
};

export default Slider;
