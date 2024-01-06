import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { sp, media } from '../../../style/theme';

const Outer = styled(Flex)`
  font-size: 18px;
  margin: ${sp(4)} 0;
  ${media.giant`
    font-size: 16px;
  `};
  ${media.tablet`
    font-size: 14px;
    margin: ${sp(2)} 0;
  `};
  .categories {
    flex-wrap: nowrap;
    ${media.tablet`
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
    `};
  }
  .item {
    ${media.tablet`
      border: 1px solid #dddddd;
    `};
  }
  .content {
    ${media.tablet`
      padding: 10px 0;
      width: 100%;
      flex-direction: column;
      text-align: center;
    `};
  }
  .icon-chevron-thin-right {
    ${media.tablet`
      display: none;
    `};
  }
  .category-item {
    line-height: 1.2;
    margin-top: 2px;
    color: ${props => props.theme.color.black[1]};
    ${media.tablet`
      width: 30%;
      margin-bottom: 10px;
    `};
    strong {
      display: block;
      font-weight: 600;
    }
    .icon {
      font-size: 40px;
      margin-right: 20px;
      ${media.giant`
        font-size: 34px;
        margin-right: 10px;
      `};
      ${media.tablet`
        font-size: 30px;
        margin-bottom: 15px;
        margin-right: 0;
      `};
    }
    .arrow {
      color: ${props => props.theme.color.gray[2]};
    }
    & + .category-item:before {
      content: '';
      width: 1px;
      height: 100%;
      background-color: ${props => props.theme.color.gray[2]};
      margin: 0 15px;
      ${media.tablet`
        display: none;
      `};
    }
    &:hover {
      color: #ff8900;
    }
  }
  .button-top {
    padding-left: 40px;
    ${media.giant`
      padding-left: 20px;
    `};
    &:before {
      display: none;
    }
    ${media.tablet`
      width: 30%;
      padding-left: 0;
    `};
  }
  .button-flex {
    ${media.tablet`
      background-image: linear-gradient(to bottom, rgb(82, 159, 220) 0%, rgb(68, 135, 211) 100%);
      border-radius: 3px;
    `};
  }
  .button {
    background-image: linear-gradient(to bottom, rgb(82, 159, 220) 0%, rgb(68, 135, 211) 100%);
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: white;
    text-transform: uppercase;
    line-height: 1.2;
    font-weight: 400;
    padding: 20px 10px 20px 20px;
    border-radius: 3px;
    &.active {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    strong {
      display: block;
      font-weight: 600;
    }
    ${media.tablet`
      width: 100%;
      justify-content: center;
      background-image: none;
      text-align: center;
      padding: 0;
      font-size:13px;
    `};
    .desktop {
      ${media.giant`
        display:none;
      `};
      ${media.tablet`
        display: inline-block;
        font-size: 16px;
      `};
      ${media.mini`
        display:none;
      `};
    }
    .mobile {
      display: none;
      ${media.giant`
        display:inline-block;
        font-size: 16px;
      `};
      ${media.tablet`
        display: none;
      `};
      ${media.mini`
        display: inline-block;
        font-size: 16px;
      `};
    }
  }
  .show-all {
    background-color: rgb(68, 135, 211);
    border-radius: 3px;
    border-top-right-radius: 0;
    ${media.tablet`
      border-top-right-radius: 3px;
    `};
    .category-link {
      display: inline-flex;
      align-items: center;
      font-size: 18px;
      color: white;
      ${media.tablet`
        font-size: 16px;
      `};
      i {
        font-size: 30px;
        margin-right: 20px;
        ${media.tablet`
          font-size: 26px;
          margin-right: 10px;
        `};
      }
      &:hover {
        color: #525355;
      }
    }
  }
`;

export default Outer;
