import styled, { css } from 'styled-components';
import { media } from '../../style/theme';

const ListPage = styled.div`
 
  padding: 50px 0;
  background-color: #eeeeee;
  
  ${media.tablet`
    padding: 0;
  `};
  .container {
    min-height: 300px;
  }

  .main-area {
    ${props =>
    (props.site === 'aloparca'
      ? css`
            width: 100%;
          `
      : css`
            width: 100%;
          `)};

    ${media.tablet`
      width: 100%;
      padding: 0 0 50px;
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
    .config-mobile {
      display: none;
      ${media.tablet`
        display: flex;
        padding: 20px 10px;
        background-color: white;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        font-size: 16px;
        .config-style {
          border-right: 1px solid #dddddd;
          margin-left:0;

          a {
            display: flex;
            align-items: center;
          }
        }
        .list-style {
          // display:none;
          &.active {
            margin-left: 20px;
            display: flex;
            padding: 0 15px;
          }
        }
        i {
          font-size: 20px;
        }
        span {
          padding-left: 10px;
        }
      `};
    }
    .product-list-header {
      margin: 30px 0;
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
        &.b2b {
          width: 100%;
          align-items: flex-start;
          flex-wrap: nowrap;
          .add-to-cart {
            border-radius: 4px;
            background-image: linear-gradient(0deg, rgba(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
            width: 160px;
            height: 45px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: 0.25s;
            &:hover {
              box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
            }
            button {
              font-size: 18px;
              font-weight: 600;
              color: white;
              cursor: pointer;
            }
          }
        }
        &.b2b h1 {
          flex-grow: 1;
          margin-bottom: 30px;
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
        ${media.tablet`
          display: none;
        `};
        &.b2b {
          display: inline-flex;
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
  .ui.list {
    padding: 10px 0;
    .order-link {
      display: block;
      min-width: 130px;
      padding: 4px 15px;
      margin: 4px 0;
      font-family: 'Barlow', sans-serif;
      font-weight: 500;
      text-align: center;
    }
  }

  .oem-ara-form {
    width: 55%;
    min-width: 199px;
    > div {
      width: 100%;
      .prompt {
      }
    }
    input {
      border-radius: 0 !important;
    }
  }
`;
export default ListPage;
