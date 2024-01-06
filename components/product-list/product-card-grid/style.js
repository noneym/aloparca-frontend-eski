import styled from 'styled-components';

import { cover } from '../../../reactor/func';
import { border, media, color } from '../../../style/theme';

const Outer = styled.div`
  ${border()};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
  background-color: white;
  ${media.tablet`
    padding: 10px;
  `};
  .link {
    ${cover()};
    z-index: 2;
  }
  .hemen-al {
    position: relative;
    display: block;
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
    margin: 10px;
    border-radius: 3px;
    background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    z-index: 3;
    ${media.tablet`
      font-size: 16px;
      margin: 5px;
    `};
  }
  .stok-yok {
    position: relative;
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: bold;
    padding: 5px 0;
    margin: 10px;
    border-radius: 3px;
    z-index: 3;
    color: white;
    background-color: #e81111;
    font-size: 12px;
    ${media.tablet`
      margin: 5px;
    `};
  }
  .image {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    ${media.tablet`
      height: 100px;
    `};
  }
  .info {
    padding: 16px 16px 24px;
    ${media.tablet`
      padding: 10px 0 0;
      min-height: 60px;
    `};
  }

  .commerce {
    padding: 0 16px 22px;
    ${media.tablet`
      padding: 5px 0 5px;
    `};
  }

  .arac-uyumlulugu-area {
    display: none;
    ${media.tablet`
      display: block;
      margin-top: 10px;
      width: 100%;
      color: white;
      background-color: #a4a4a4;
      padding: 6px 0;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.5em;
      text-align: center;
      text-transform: uppercase;
      border-radius: 3px;
    `};
  }

  .title {
    margin: 0;
    font-weight: normal;
    color: ${color.black[0]};
    line-height: 1.3;
  }
  .brand {
    color: ${color.gray[1]};
    font-weight: 500;
    margin-top: 2px;
    display: block;
    text-transform: uppercase;
  }
  .title {
    font-size: 17px;
  }
  .original-price {
    color: ${color.gray[1]};
    text-decoration: line-through;
    ${media.tablet`
      font-size: 12px;
    `};
  }
  .sale-price {
    font-size: 24px;
    font-weight: 500;
    margin-left: 7px;
    color: ${color.black[0]};
    ${media.tablet`
      font-size: 18px;
    `};
  }
  .add-to-cart {
    &,
    &:focus {
      color: white;
      background-image: linear-gradient(to top, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    &:hover {
      color: white;
      background-image: linear-gradient(to bottom, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    text-transform: uppercase;
    border-radius: 3px;
    margin-top: 16px;
    position: relative;
    width: 140px;
    height: 40px;
    z-index: 3 !important;
  }
`;

export default Outer;
