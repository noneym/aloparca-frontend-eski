import styled from 'styled-components';
import { media } from '../../style/theme';

const ListBrandPage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .alphabet {
    border: 1px solid #dddddd;
    border-radius: 3px;
    ${media.tablet`
      display:none;
    `};
    a {
      width: 100%;
      padding: 10px;
      background-color: white;
      text-align: center;
      ${media.desktop`
        padding: 10px 5px;
      `};
      &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }
      & + a {
        border-left: 1px solid #dddddd;
      }
      &:hover {
        color: #666666;
        background-color: #eeeeee;
      }
      &.active {
        background-color: #ff8900;
        color: white;
      }
    }
  }
  .mobile-dropdown {
    display: none;
    margin-bottom: 1rem;
    ${media.tablet`
      display: block;
    `};
  }
  .sol {
    width: 285px;
    ${media.tablet`
      display: none;
    `};
  }
  .sag {
    width: calc(100% - 285px);
    ${media.tablet`
      width: 100%;
    `};
  }
  .brand-wrapper {
    width: 20%;
    ${media.desktop`
      width: 25%;
    `};
    ${media.tablet`
      width: 33.33%;
    `};
    ${media.phone`
      width: 50%;
    `};
    ${media.mini`
      width: 100%;
    `};
    .brand {
      width: 100%;
      height: 100%;
      min-height: 150px;
      background-color: white;
      border-radius: 3px;
      border: 1px solid #dddddd;
      padding: 10px;
      a {
        img {
          max-width: 100%;
          max-height: 70px;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: 0.3s;
        }
        &:hover {
          img {
            filter: none;
            opacity: 1;
          }
        }
      }
    }
  }
`;

export default ListBrandPage;
