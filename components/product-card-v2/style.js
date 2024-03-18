import styled from 'styled-components';

import { cover } from '../../reactor/func';
import { border, color, media } from '../../style/theme';

const Outer = styled.div`
  ${border()};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: white;
  padding: 5px;
  max-width: 100%;
  .link {
    ${cover()};
    z-index: 2;
  }

  img {
    height: 220px;
    padding: 10px;
    width: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
    ${media.tablet`
        max-height: 170px;
    `};
  }
  .info {
    padding: ${props => (props.isCart ? '16px 16px 0px' : '16px 16px 24px')};
    width: 100%;
    ${media.tablet`
      padding: 5px;
    `};
  }

  .commerce {
    padding: ${props => (props.isCart ? '0 16px' : '0 16px 22px')};
    ${media.tablet`
      padding: 5px;
      .price-wrap{
        display: flex;
        flex-direction: column;
      }
    `};
  }

  .title {
    margin: 0;
    font-weight: normal;
    color: ${color.black[0]};
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  .sale-price {
    color: ${color.black[0]};
  }
  .original-price {
    color: ${color.gray[1]};
    text-decoration: line-through;
  }
  .sale-price {
    font-size: 24px;
    font-weight: 500;
    margin-left: 7px;
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
    width: 90%;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px 0;
    position: relative;
    z-index: 3 !important;
  }
  .stok-yok {
    width: 90%;
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px 0;
    position: relative;
    z-index: 3 !important;
    color: white;
    background-color: #e81111;
    font-size: 12px;
  }
`;

export default Outer;
