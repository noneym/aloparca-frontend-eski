import styled from 'styled-components';
import { media, color } from '../../style/theme';


const ProductPage = styled.div`
  background-color: #eeeeee;
  padding-bottom: 50px;

  &.b2b {
    padding-top: 10px;
  }

  .servismodal-select {
    display: block;

    > div {
      display: block;
      margin-bottom: 10px;
    }
  }

  .brand-tooltip {
    opacity: 1 !important;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    padding: 20px !important;
  }
  .breadcrumb-wrapper {
    ${media.tablet`
      display: none;
    `};
  }

  .product-no-image {
    display: grid;
    background: white;
    height: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    opacity: 0.4;

    img {
    }
    span {
      font-size: 12px;
    }
  }

  .b2b-aciklama-urundetay {
    display: block;
    margin: 20px 0 -30px;
    text-decoration: underline;
    font-size: 16px;
    font-weight: 500;
    color: #1ed044;
  }

  .product-header {
    display: none;
    ${media.tablet`
      display: none;
    `};
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    i {
      font-size: 24px;
      color: #999999;
      & + i {
        margin-left: 20px;
      }
    }
    .go-back {
      color: #525355;
      font-size: 20px;
      text-transform: uppercase;
      ${media.tablet`
        font-size: 16px;
      `};
      i {
        font-size: 30px;
        color: #525355;
        margin-right: 5px;
        ${media.tablet`
          font-size:14px;
          margin-top: 2.5px;
        `};
      }
    }
  }

  .share:not(:last-child) {
    padding-right : 20px!important;
    
  }
  

  .product {
    background-color: #f3f3f3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    ${media.tablet`
      box-shadow: none;
      background-color: transparent;
      margin-top: 0px;
      `};
    .product-top {
      ${media.tablet`flex-direction: column; padding-top: 20px;`};
      .image-area {
        background-color: white;
        flex-direction: column;
        ${media.tablet`
          border: 1px solid #ddd;
        `};
        .big-image {
          padding: 50px 50px 0;
          ${media.tablet`padding: 10px 10px 0;`};
        }
        .thumb {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid #dddddd;
          cursor: pointer;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      .detail {
        padding: 45px 55px;
        flex-direction: column;
        justify-content: space-between;
        width:100%;
        ${media.tablet`
          padding: 20px 0px;
          align-items: center;
        `};
        .campaign-wrapper {
          width: 100%;
          min-height: 60px;
          background: url('/static/img/kampanya-bg.png') left center/cover no-repeat;
          margin-bottom: 20px;
          padding: 20px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(45deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
          }
          .campaign-text {
            color: white;
            font-size: 18px;
            font-weight: 700;
            padding-right: 20px;
            position: relative;
            z-index: 2;
            ${media.tablet`
              font-size: 15px;
            `};
          }
          .campaign-end {
            color: white;
            font-size: 20px;
            font-weight: 700;
            min-width: max-content;
            width: 120px;
            position: relative;
            z-index: 2;
            text-align: center;
            ${media.tablet`
              font-size: 18px;
            `};
            .campaign-end-text {
              font-size: 13px;
            }
          }
        }
        .title-wrapper {
          margin-bottom: 15px;
          h1 {
            font-size: 20px;
            font-weight: 500;
            color: #525355;
            margin: 0;
            ${media.mini`
              font-size: 18px;
            `};
          }
          .brand {
            max-width: 100px;
            max-height: 40px;
            margin-left: 10px;
            cursor: help;
          }
        }
        .marka-stok {
          ${media.tablet`
            flex-direction: column;
            `};
          .marka {
            font-size: 16px;
            color: #525355;
            display: inline-flex;
            ${media.tablet`
              justify-content: center;
              `};
            span {
              font-weight: 600;
              color: #000000;
              margin-right: 5px;
            }
            & + .marka:before {
              content: '';
              width: 1px;
              height: 100%;
              background-color: #999999;
              margin: 0 ${props => props.theme.sp(4)};
              ${media.tablet`
                display: none;
                `};
            }
          }
        }
        .rating {
          align-items: center;
          img {
            height: 25px;
          }
          .text {
            font-size: 13px;
            color: #525355;
            margin-top: 5px;
            margin-left: 15px;
          }
        }
        .price-wrapper {
          align-items: center;
          ${media.desktop`
            flex-direction: column;
            align-items: flex-start;
          `};
          ${media.tablet`
            align-items:center;
          `};
          .price {
            flex-grow: 1;
            .indirim {
              width: 70px;
              height: 84px;
              background-position: center !important;
              background-size: contain !important;
              background-color: transparent !important;
              color: white;
              text-align: center;
              padding-top: 25px;
              span {
                font-size: 30px;
                font-weight: 700;
                line-height: 1em;
              }
              p {
                font-size: 20px;
                line-height: 1em;
              }
            }
            .price-area {
              flex-direction: column;
              .sale {
                font-size: 18px;
                text-decoration: line-through;
                color: #999999;

                &.b2b {
                  margin-top: -20px;
                }
              }
              .sold-price {
                font-size: 32px;
                color: black;
                span {
                  font-weight: 700;
                }
              }
              .campain-sold-price {
                font-size: 28px;
                color: black;
                span {
                  font-weight: 500;
                }
              }
            }
          }
          .no-stock {
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            color: white;
            font-weight: bold;
            border-radius: 3px;
            background-color: #e81111;
            padding: 0 5px;
            font-size: 14px;
            text-align: center;
            width: 200px;
            height: 60px;
            ${media.desktop`margin-top: 20px;`};
          }
          .satinal {
            ${media.tablet`display: none;`};
            .quantity {
              width: 160px;
              height: 60px;
              background-color: #d0d0d0;
              border-radius: 4px;
              padding: 0 15px;
              justify-content: space-between;
              align-items: center;
              text-align: center;

              img {
                width: 17px;
                padding: 30px 0;
                cursor: pointer;
              }
              .input {
                width: 80px;
                height: 50px;
                background-color: white;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-bottom: 3px;
                input {
                  -moz-appearance:textfield;
                  width: 100%;
                  border: none;
                  background-color: transparent;
                  text-align: center;
                  color: #525355;
                  font-size: 16px;
                  font-weight: 600;
                }
                input[type='number']::-webkit-inner-spin-button,
                input[type='number']::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                span {
                  font-size: 13px;
                  color: #525355;
                }
              }
            }
          }
        }

        .add-to-cart {
          border-radius: 4px;
          background-image: linear-gradient(0deg, rgba(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
          width: 200px;
          height: 60px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: 0.25s;
          &:hover {
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
          }
          button {
            position: relative;
            height: 100%;
            width: 100%;
            font-size: 18px;
            font-weight: 600;
            color: white;
            cursor: pointer;
          }
        }
      }
      .descriptionOrjYed {
        flex-grow: 1;
        font-size: 16px;
        color: #525355;
        margin-top: 45px;
        line-height: 1.5em;
        span {
          color: black;
          font-weight: 600;
        }
      }
      .description {
        flex-grow: 1;
        font-size: 16px;
        color: #525355;
        margin-top: 10px;
        line-height: 1.5em;
        span {
          color: black;
          font-weight: 600;
        }
      }
      .icon-list {
        align-items: center;
        justify-content: space-around;
        ${media.tablet`
          width: 100%;
          justify-content: space-between;
          `};
        .item {
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          .icon img {
            width: 60px;
            height: 60px;
            background-color: transparent;
            ${media.tablet`
              width: 50px;
              height: 50px;
              `};
          }
          .text {
            font-family: 'Barlow', sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 1.3em;
            color: #525355;
            margin-top: 10px;
            max-width: 60px;
            text-align: center;
          }
        }
      }
      .car {
        text-align: center;
        border-radius: 4px;
        background-color: #a4a4a4;
        color: white;
        font-size: 18px;
        font-weight: 500;
        padding: 20px 0;
        margin-top: 20px;
        ${media.tablet`
          order: -1;
          margin-top:0;
          margin-bottom: 20px;
          width: 100%;
          `};
        &:hover {
          background-color: #ff8900;
        }
        &.active {
          background-color: #29a71a;
          & i {
            font-size: 26px;
            margin-right: 10px;
          }
        }
      }
      .services {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 4px;
        background-color: #3b81b5;
        color: white;
        font-size: 18px;
        font-weight: 500;
        padding: 20px 0;
        margin-top: 15px;
        width: 100%;
        &:hover {
          background-color: #2d638c;
        }
        i {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  .product-detail {
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    margin-top: 50px;
    padding: 30px;
    ${media.tablet`
      display: none;
      `};
    .taksit-mobile {
      display: none;
    }
    .ui.pointing.secondary.menu {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #dddddd;
      margin: 0;
      a.item {
        font-family: 'Barlow', sans-serif;
        font-size: 18px;
        font-weight: 400;
        color: #999999;
        margin-bottom: 1px;
        padding: 0 0 26px;
        & + a.item {
          margin-left: 60px;
        }
        &.active {
          font-family: 'Barlow', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          border-bottom: 4px solid currentcolor;
          margin-bottom: -1px;
        }
      }
    }
    .ui.segment {
      background-color: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      margin: 0;
      .tab-detail {
        padding: 50px 30px;
        font-size: 16px;
        line-height: 1.6em;
        color: #525355;
      }
      .brand {
        border: none;
        // border: 1px solid #dddddd;
        padding: 40px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        .brand-title {
          font-size: 14px;
          font-weight: 500;
          color: black;
          text-transform: uppercase;
        }
        .brand-text {
          font-size: 14px;
          color: #525355;
          line-height: 1.5em;
          margin-top: 20px;
        }
      }
      .ui.table tr td {
        border-bottom: none;
      }
      .ui.table td {
        border-top: none;
      }
      .ui.basic.table tbody tr {
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
      }
      .ui.celled.striped.very.basic.table {
        margin-top: 30px;

        th,
        td {
          text-align: center;
          img.ui.image {
            width: auto;
            height: 1em;
          }
        }
        th {
          font-size: 16px;
        }
      }
      .ui.celled.striped.very.basic.table.taksit {
        th,
        td {
          border-left: none;
          &:first-child {
            border-right: 1px solid #dddddd;
            font-weight: 600;
          }
        }
        th {
          padding: 0;
          border-radius: 0;
        }
        .taksit-secenek {
          height: 44px;
          &:after {
            content: '';
            display: inline-block;
            padding: 0;
            background-image: url('/static/product-icons/all-card.png');
            width: 100px;
            height: 44px;
          }
          &.bonus {
            background-color: #9cc435;
            &:after {
              background-position: -500px 0px;
            }
          }
          &.maximum {
            background-color: #c12a72;
            &:after {
              background-position: -600px 0px;
            }
          }
          &.paraf {
            background-color: #00ddff;
            &:after {
              background-position: 0px 0px;
            }
          }
          &.axess {
            background-color: #ffc20e;
            &:after {
              background-position: -300px 0px;
            }
          }
          &.cardfinans {
            background-color: #001b59;
            &:after {
              background-position: -200px 0px;
            }
          }
          &.asyacard {
            background-color: #45c3d9;
            &:after {
              background-position: -400px 0px;
            }
          }
          &.world {
            background-color: #650c6f;
            &:after {
              background-position: -100px 0px;
            }
          }
        }
      }
      .ui.striped.very.basic.tab-ozellikler {
        margin-top: 30px;
        th {
          font-size: 16px;
          &:first-child {
            width: 30%;
          }
        }
      }
      .ui.striped.very.basic.tab-oem {
        margin-top: 30px;
        th {
          font-size: 16px;
          &:first-child {
            width: 30%;
          }
        }
      }
    }
  }
  .product-detail-mobile {
    display: none;
    .taksit {
      ${media.tablet`
          display: none;
        `};
    }
    ${media.tablet`
      display: block;
      .taksit-secenek {
        height: 44px;
        border-radius: 5px;
        &:after {
          content: '';
          display: inline-block;
          padding: 0;
          background-image: url('/static/product-icons/all-card.png');
          width: 100px;
          height: 44px;
        }
        &.bonus {
          background-color: #9cc435;
          &:after {
            background-position: -500px 0px;
          }
        }
        &.maximum {
          background-color: #c12a72;
          &:after {
            background-position: -600px 0px;
          }
        }
        &.paraf {
          background-color: #00ddff;
          &:after {
            background-position: 0px 0px;
          }
        }
        &.axess {
          background-color: #ffc20e;
          &:after {
            background-position: -300px 0px;
          }
        }
        &.cardfinans {
          background-color: #001b59;
          &:after {
            background-position: -200px 0px;
          }
        }
        &.asyacard {
          background-color: #45c3d9;
          &:after {
            background-position: -400px 0px;
          }
        }
        &.world {
          background-color: #650c6f;
          &:after {
            background-position: -100px 0px;
          }
        }
      }
      table tr td {
        padding: 10px 0;
      }
      .ui.vertical.menu {
        width: 100%;
        box-shadow: none;
        border-radius: 0;
        border: 0;
      }
      .ui.vertical.menu .item {
        padding: 20px;
      }
      .ui.vertical.menu .item + .item {
        padding-top: 0;
      }
      .ui.accordion.menu .item .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #ff8900;
        color: white;
        font-family: 'Barlow', sans-serif;
        font-size: 16px;
        font-weight: 500;
        border-radius: 5px;
        text-transform: uppercase;
        i {
          font-size: 24px;
        }
      }
      .ui.menu .item:before {
        display: none;
      }
      .ui.accordion .accordion .active.content,
      .ui.accordion .active.content {
        font-family: 'Barlow', sans-serif;
        font-size: 14px;
        padding: 10px;
        thead {
          display: none;
        }
        p {
          line-height: 1.8em;
        }
        .brand {
          border: 1px solid #dddddd;
          padding: 10px;
          margin-top: 20px;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          .brand-title {
            font-size: 14px;
            font-weight: 500;
            color: black;
            text-transform: uppercase;
          }
          .brand-text {
            font-size: 14px;
            color: #525355;
            line-height: 1.5em;
            margin-top: 20px;
          }
        }
      }
    `};
  }
  .site-feature {
    ${media.tablet`display: none;`};
  }
  .fixed-checkout {
    display: none;
    ${media.tablet`
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.15);
    z-index: 100;
    .quantity {
      height: 60px;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      padding: 0 10px;
      .inc-dec {
        width:100%;
        height:100%;
        img {
          width: 17px;
          cursor: pointer;
        }
      }
      .input {
        width: 80px;
        height: 50px;
        background-color: white;
        input {
          width: 100%;
          border: none;
          background-color: transparent;
          text-align: center;
          color: #525355;
          font-size: 16px;
          font-weight: 600;
        }
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        span {
          font-size: 13px;
          color: #525355;
        }
      }
    }
    .addtocart {
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      color: white;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
    }
    `};
  }
  .tumunu-goster {
    border-radius: 3px;
    background-color: #a4a4a4;
    color: white;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 20px;
    text-transform: uppercase;
  }
  .stok-yok {
    text-align: center;
    font-weight: 500;
    border-radius: 3px;
    margin: 10px 0;
    padding: 10px;
    position: relative;
    z-index: 3 !important;
    color: white;
    background-color: #e81111;
    font-size: 12px;
  }
`;



export default ProductPage;
