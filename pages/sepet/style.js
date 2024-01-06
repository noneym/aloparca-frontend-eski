import styled from 'styled-components';
import { media } from '../../style/theme';

const CartPage = styled.div`
  margin: 0;
  padding: 25px 0 75px;
  background-color: #eeeeee;
  ${media.tablet`
    padding: 25px 0;
  `};
  .cart-title {
    margin: 0;
    font-size: 28px;
    span {
      font-size: 24px;
      line-height: 1.4em;
      color: #525355;
      margin-left: 10px;
    }
  }
  .cart-area {
    width: 100%;
    .slider{
      width: 100%;
    }
    ${media.tablet`
      flex-direction: column;
      width: 100%
      .cart-flex {
        width: 100%;
        .slider{
          width: 100%;
        }
      }
      
    `};
    ${media.phone`
      flex-direction: column;
      width: 100%
      .cart-flex {
        width: 100%;
        .slider{
          width: 100%;
          
        }
      }
    `};
    
    .loader-wrapper {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    .odeme {
      min-width: 200px;
      margin-left: -6rem;
      ${media.tablet`
        min-width: inherit;
        margin: 0;
        margin-top: 10px;
        width: 98%;
    `};
    }
    .cart-flex {
      .slider {
        width: 90%;
        // background-color: #EEEEEE;
        box-shadow: none;
        ${media.tablet`
          width: 100%;
       `}
        
      }
    }
    
  }
  .cart-empty {
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    color: #ff8900;
    font-size: 18px;
    font-weight: 500;
  }
  .cart-box {
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    .ucretsiz-kargo {
      display: block;
      margin: 20px;
      background-color: #ff8900;
      border-radius: 3px;
      font-size: 18px;
      color: white;
      padding: 15px 10px;
      text-align: center;
      span {
        font-weight: 500;
      }
      &:hover {
        background-color: #ff8900;
      }
    }
    .petrol-ofisi {
      display: block;
      margin: 20px;
      background-color: white;
      border-radius: 3px;
      font-weight: 600;
      font-size: 1.4rem;
      color: gray;
      padding: 15px 10px;
      text-align: center;
      border: solid 1px #ff8900;
      .po-innerp {
        font-size: 1rem;
        color: gray;
        span {
          margin-left: 0.2rem;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          color: #ff8900;
        }
      }
    }
    .order-title {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .order-quantity {
      font-size: 16px;
      font-weight: 500;
      color: #ff8900;
      margin-bottom: 15px;
    }
    .price-area {
      .title {
        font-size: 14px;
        font-weight: 500;
        color: #525355;
        margin-bottom: 5px;
      }
      .price {
        font-size: 20px;
        color: black;
        span {
          font-size: 36px;
          font-weight: 600;
        }
      }
    }
    .complete-shopping {
      display: inline-block;
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      padding: 15px 0.2rem;
      color: white;
      text-transform: uppercase;
      text-align: center;
      border-radius: 3px;
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    .price-box {
      .title {
        font-size: 14px;
        color: #525355;
      }
      .price {
        font-size: 18px;
        color: black;
        span {
          font-size: 24px;
          font-weight: 500;
        }
      }
      
    }
    .discount-code {
      border-radius: 3px;
      background-color: #dddddd;
      padding: 10px 0;
      font-size: 16px;
      color: #333333;
      i {
        margin-left: 10px;
      }
      .ui.input {
        display: flex;
        input {
          width: 75%;
          border: 0;
          border-radius: 0;
        }
        .ui.button {
          margin: 0;
          width: 25%;
          padding: 0;
          border: 0;
          border-radius: 0;
          color: white;
          background-color: #ff8900;
        }
      }
    }
  }
  .alisverise-devam-et {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    ${media.tablet`
      display: none;
    `};
    i {
      margin-right: 10px;
      font-size: 14px;
    }
    &:hover {
      color: #ff8900;
    }
  }
`;

export default CartPage;
