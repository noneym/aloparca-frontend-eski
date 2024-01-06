import styled from 'styled-components';
import { media } from '../../style/theme';

const AccessoriesPage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  ${media.tablet`
    padding: 30px 0;
  `};
  .left-area {
    width: 285px;
    ${media.tablet`
      display: none;
    `};
    .car-select {
      background-color: #ff8900;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
      margin-bottom: 20px;
      padding: 20px;
      color: white;
      .label {
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        color: white;
      }
      .ui.selection.dropdown {
        width: 100%;
        border: none;
        border-radius: 0;
        background-color: white;
      }
      .ui.button {
        height: 38px;
        color: white;
        text-transform: uppercase;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .sasi-ara {
      background-color: #ffb000;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
      .label {
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        color: white;
      }
      .ui.input input {
        font-family: 'Barlow', sans-serif;
        height: 40px;
        border: none;
        border-radius: 0;
        background-color: white;
        font-size: 1rem;
      }
      .ui.button {
        width: 100%;
        height: 40px;
        padding: 0px;
        color: white;
        text-transform: uppercase;
        border-radius: 0 3px 3px 0;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .button {
        width: 50px;
      }
    }
    .muadil-ara {
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
      margin-bottom: 20px;
      padding: 20px;
      ul > li {
        padding: 5px;
        & + li {
          padding-top: 10px;
        }
        .ui.checkbox .box,
        .ui.checkbox label {
          font-size: 16px;
          font-weight: 500;
        }
        .ui.checkbox .box,
        .ui.checkbox label {
          padding-left: 20px;
        }
        .ui.checkbox .box:before,
        .ui.checkbox label:before {
          border-radius: 0;
          width: 12px;
          height: 12px;
          top: 3px;
        }
        .ui.checkbox .box:after,
        .ui.checkbox label:after {
          border-radius: 0;
          width: 12px;
          height: 12px;
          top: 3px;
          font-size: 10px;
          color: white;
          line-height: 1.3em;
        }
        .ui.checkbox input:checked ~ .box:after,
        .ui.checkbox input:checked ~ label:after {
          background-color: #ff8900;
        }
      }
    }
  }
  .main-area {
    width: calc(100% - 285px);
    .mobile-dropdown {
      display: none;
      margin-bottom: 1rem;
      ${media.tablet`
        display: block;
      `};
    }
    ${media.tablet`
      width: 100%;
      padding: 0;
    `};
    .info-text {
      margin: 15px 0;
      padding: 15px 30px;
      border: #dddddd solid 1px;
      border-radius: 3px;
      background-color: white;
      font-size: 14px;
      line-height: 1.3em;
      color: #525355;
      strong {
        font-weight: 500;
        color: black;
      }
      a {
        font-weight: 500;
        text-decoration: underline;
      }
    }
    .parca-ara-bilgi {
      display: none;
      ${media.tablet`
        display: flex;
        padding: 20px 0;
        color: #525355;
        background-color: white;
        .title {
          font-weight: 500;
          color: black;
        }
        i {
          color: #999999;
        }
        a {
          display: block;
          color: white;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          padding: 15px 0;
          text-transform: uppercase;
          text-align: center;
          &.arac {
            background-color: #ff8900;
          }
          &.sasi {
            background-color: #ffb000;
          }
        }
      `};
    }
    .product-list-header {
      margin-bottom: 30px;
      .title {
        h1 {
          display: flex;
          align-items: flex-end;
          font-size: 20px;
          color: #999999;
          margin: 0;
          &:before {
            content: '';
            width: 15px;
            height: 3px;
            background-color: #ff8900;
            margin: 0 10px 5px 0;
          }
          span {
            margin-left: 10px;
            font-size: 16px;
            color: #525355;
            ${media.tablet`display: none;`};
          }
        }
      }
      .config {
        color: #525355;
        a {
          display: inline-flex;
          align-items: center;
        }
        a.active,
        a:hover {
          color: #ff8900;
        }
        i {
          font-size: 20px;
        }
        .config-style {
          display: flex;
          align-items: center;
          i {
            margin-right: 10px;
          }
          &:after {
            content: '';
            width: 1px;
            background-color: #dddddd;
            height: 28px;
            margin-left: 20px;
          }
        }
      }
    }
    .grid-card-wrapper {
      width: 25%;
      padding-bottom: 20px;
      ${media.desktop`
        width: 33.3333%;
      `}
      ${media.tablet`
        width: 50%;
      `}
    }
  }
`;
export default AccessoriesPage;
