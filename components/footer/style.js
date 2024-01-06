import styled from 'styled-components';
import { media } from '../../style/theme';

const Outer = styled.footer`
  background-color: #eeeeee;
  ${media.phone`
    margin-bottom:  ${props => props.onlyBasket && '6rem'} 
  `};
  &.mobileProductDetail {
    ${media.tablet`display: none`};
  }
  
  .make-list {
    padding: ${props => props.theme.sp(4)} 0;
    background-color: #eeeeee;
    border-bottom: 1px solid #d6d6d6;
    &.withPadding {
      ${media.tablet`
        padding-bottom: 100px;
      `};
    }
  }
  .social {
    padding: ${props => props.theme.sp(4)} 0;
    background-color: #d6d6d6;
    ${media.tablet`
      background-color: white;
    `};
    ul {
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      li {
        display: flex;
        align-items: center;
        padding: 0 ${props => props.theme.sp(1)};
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
        &:first-child {
          ${media.tablet`
            display: none;
          `};
        }
      }
      a {
        color: currentcolor;
        i {
          font-size: 1.8em;
          ${media.tablet`
            &.icon-facebook {
              color: #4b76bd;
            }
            &.icon-twitter {
              color: #00c6ff;
            }
            &.icon-google-plus {
              color: #fb5245;
            }
            &.icon-instagram {
              color: #ea3a57;
            }
            &.icon-youtube {
              color: #fc3831;
            }
          `};
        }
        &:hover i.icon-facebook {
          color: #4b76bd;
        }
        &:hover i.icon-twitter {
          color: #00c6ff;
        }
        &:hover i.icon-google-plus {
          color: #fb5245;
        }
        &:hover i.icon-instagram {
          color: #ea3a57;
        }
        &:hover i.icon-youtube {
          color: #fc3831;
        }
      }
    }
  }

  .bottom-menu {
    padding: ${props => props.theme.sp(5)} 0;
    ${media.tablet`
      display: none;
    `};
    .etbis {
      border-radius: 10px;
    }
    ul {
      li {
        padding: 8px 0;
        a {
          font-size: 16px;
          color: #525355;
          padding-left: 10px;
          line-height: 1.3em;
          i {
            color: #cccccc;
            font-size: 14px;
          }
        }
      }
    }
    .menu-list {
      flex-grow: 1;
    }
    .contact {
      display: flex;
      width: 290px;
      height: 82px;
      border-radius: 10px;
      color: white;
      justify-content: center;
      align-items: center;
      &.whatsapp {
        background-color: #29a71a;
      }
      &.support {
        background-color: #3b81b5;
      }
      &:first-child {
        margin-bottom: 19px;
      }
      img {
        width: 50px;
        height: 50px;
        margin: 0 15px;
      }
      .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .title {
          font-size: 16px;
          line-height: 1em;
        }
        .content-phone {
          font-size: 28px;
          font-weight: 700;
        }
      }
    }
    .app-store {
      display: flex;
      width: 250px;
      height: 82px;
      border-radius: 10px;
      background-color: white;
      justify-content: center;
      align-items: center;
      &:first-child {
        margin-bottom: 19px;
      }
      img {
        width: 220px;
      }
    }
  }
  .phone {
    display: none;
    ${media.tablet`
      display: flex;
      .contact {
        width: 100%;
        padding: 20px 0;
      }
      .whatsapp {
        background-color: #29a71a;
      }
      .support {
        background-color: #3b81b5;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        .title {
          font-size:12px;
        }
        .phone {
          font-size:20px;
          font-weight: 600;
        }
      }
    `};
  }

  .taksit {
    background-color: white;
    padding: ${props => props.theme.sp(4)} 0;
    ${media.tablet`
      display: none;
    `};
    .list {
      justify-content: space-between;
      align-items: center;
      .title {
        color: #999999;
        &:after {
          content: '';
          width: 1px;
          height: 56px;
          background-color: #dddddd;
          margin: 0 ${props => props.theme.sp(2)};
        }
        .row1 {
          font-size: 72px;
          font-weight: 700;
          line-height: 0.7em;
        }
        .row2 {
          flex-grow: 1;
          margin-left: 10px;
          .col-group {
            flex-direction: column;
            .col1 {
              font-size: 24px;
              font-weight: 700;
            }
            .col2 {
              font-size: 24px;
              font-weight: 400;
            }
          }
        }
      }
      .item {
        padding: 0 ${props => props.theme.sp(3)};
        ${media.desktop`
          padding: 0 ${props => props.theme.sp(2)};
        `};
        img {
          max-height: 50px;
        }
      }
    }
  }
  .copyright {
    padding: ${props => props.theme.sp(4)} 0;
    ${media.tablet`
      display: none;
    `};
    .group {
      align-items: center;
      .text {
        font-size: 14px;
        color: #666666;
        letter-spacing: 1px;
      }
      .menu {
        text-align: center;
        a {
          font-size: 16px;
          font-weight: 500;
          color: #999999;
        }
        a + a:before {
          display: inline-flex;
          content: '';
          width: 1px;
          height: 20px;
          background-color: currentcolor;
          margin: 0 ${props => props.theme.sp(1)};
          padding-bottom: 5px;
        }
      }
      .fabrika-medya {
        text-align: right;
        img {
          height: 40px;
        }
      }
    }
  }
`;

export default Outer;
