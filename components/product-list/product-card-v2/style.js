import { Flex } from '@rebass/grid';
import styled from 'styled-components';
import { media } from '../../../style/theme';

const Outer = styled(Flex)`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-top: 30px;
  position: relative;
  ${media.tablet`
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #dddddd;
    margin-top: 20px;
  `};
  .image-area {
    height: 260px;
    padding: 10px;
    margin: auto;
    ${media.tablet`
      height: 225px;
    `};
    .product-image {
      width: 100%;
      height: 100%;
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .stok-bilgilendirme-buton {
    width: 100%;
    margin: 5px 0;
    background-color: #f28f6c;
    color: #fff;
    letter-spacing: 1;
    font-size: 12px;

    .uye {
    }
    .ziyaretci {
    }
  }
  .content-area {
    padding: 25px 20px;
    background-color: #f3f3f3;
    ${media.tablet`
      padding: 15px;
      background-color: white;
    `};
    .title-wrapper {
      margin-bottom: 15px;
      h4 {
        margin: 0;
        .title {
          font-size: 20px;
          font-weight: 500;
          color: #525355;
          margin: 0;
          &:hover {
            color: #ff8900;
          }
          ${media.mini`
            font-size: 18px;
          `};
        }
      }
      .brand {
        max-width: 100px;
        max-height: 40px;
        margin-left: 10px;
        ${media.mini`
          max-width: 75px;
          max-height: 30px;
        `};
      }
    }

    .marka-stok-area {
      ${media.tablet`
        flex-direction: column;
        align-items: flex-start;
      `};
      .marka-stok {
        font-size: 16px;
        color: #525355;
        ${media.tablet`
          font-size: 14px;
          & + .marka-stok {
            margin-top: 5px;
          }
        `};
        strong {
          font-weight: 500;
          color: black;
          margin-right: 5px;
        }
        & + .marka-stok:before {
          display: block;
          content: '';
          width: 1px;
          height: 20px;
          margin: 0 50px;
          background-color: #999999;
          ${media.tablet`
            display: none;
          `};
        }
      }
    }
    .tedarikci-aciklama {
      font-size: 16px;
      color: #525355;
      ${media.tablet`
        display: none;
      `};
      strong {
        font-weight: 500;
        color: black;
      }
      div{
        margin: 0.5rem 0;
      }
    }
    .arac-uyumlulugu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: white;
      background-color: #a4a4a4;
      padding: 7px 0px;
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
      border-radius: 3px;
      text-align: center;
      margin-top: 15px;
      ${media.tablet`
        font-size: 12px;
        padding: 8px 10px;
      `};
      &:hover {
        background-color: #ff8900;
      }
      &.active {
        background-color: #29a71a;
      }
      .icon-uyumlu {
        font-size: 26px;
        margin-right: 10px;
      }
      strong {
        font-weight: 600;
        margin-right: 5px;
      }
    }
    .hemen-al-mobile,
    .stok-yok {
      display: none;
      ${media.tablet`
        display:block;
        cursor: pointer;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 7px 4px;
        border-radius: 3px;
        background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
        background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
        background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
        margin-top: 5px;
      `}
    }
    .stok-yok {
      cursor: default;
      background-image: none;
      background-color: #e81111;
      text-align: center;
    }
  }
  .mobile-price-area {
    display: none;
    ${media.tablet`
      display: flex;
      align-items: flex-end;
      .liste-fiyat {
        color: #999999;
        font-size: 14px;
        text-decoration: line-through;
        margin-bottom: 2px;
      }
      .fiyat {
        color: black;
        font-size: 26px;
        font-weight: 600;
        margin-left: 5px;
        span {
          font-size: 18px;
          font-weight: 400;
        }
      }
    `};
  }
  .price-area {
    padding: 25px 15px;
    position: relative;
    ${media.tablet`
      display: none;
    `};
    
    .price-block {
      position: absolute;
      top: 65px;
      right: 15px;
      
      ${media.desktop`
        width: 70%;
        right: unset;
      `};

      .liste-fiyat {
        color: #999999;
        font-size: 18px;
        text-decoration: line-through;
        margin: 0 0 10px 10px;
        line-height: 1em;
        ${media.desktop`
          font-size: 16px;
        `};
      }
      .fiyat {
        color: black;
        font-size: 36px;
        font-weight: 600;
        margin: 0 0 15px 10px;
        line-height: 1em;
        span {
          font-size: 20px;
          font-weight: 400;
        }
        ${media.desktop`
         font-size: 32px;
        
        `};
      }
      ${media.desktop`
        margin: 10px 10px 10px 10px;
        top: 95px;
        text-align: center;
      `};
    }
    .hemen-al {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      color: white;
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
      border-radius: 3px;
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    .stok-yok {
      text-align: center;
      font-weight: 500;
      border-radius: 3px;
      padding: 10px;
      position: relative;
      z-index: 3 !important;
      color: white;
      background-color: #e81111;
      font-size: 12px;
    }
  }
`;

export default Outer;
