import styled from 'styled-components';
import { border, media, color } from '../../style/theme';

const Outer = styled.header`
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  z-index: 99;
  a:hover {
    color: #ff8900;
  }
  .mobile-contact {
    display: none;

    ${media.tablet`
    display: block;
    width: 100%;
    background-color: #ff8900;
    padding: 10px 0px;
    text-align: center;
    color: #fff;
    position:relative;

    a:hover{
      color: #000;
    }
    `};
  }

  &.mobileProductDetail {
    ${media.tablet`display: none`};
  }
  .video-modal{
    height: 70% !important;
  }
  .video-wrapper {
    position: relative;
    padding-top: 56.25%;
    height: 70% !important;
  }
  
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .mobilde-gizle {
    ${media.tablet`
      display:none !important;
    `};
  }
  .top-bar {
    padding: ${props => props.theme.sp(1)} 0;
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ul {
      display: flex;
      text-transform: uppercase;
      font-size: 12px;
      li + li {
        padding-left: ${props => props.theme.sp(3)};
      }
    }
    ${media.tablet`
      display:none;
    `};
  }

  .b2b-actions {
    ${media.tablet`
      display:none;
    `};
  }

  .main {
    padding-bottom: ${props => (props.site === 'aloparca' ? '0' : props.theme.sp(2))};
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${media.tablet`
        padding-top: 15px;
        padding-bottom: 20px;
        flex-wrap: wrap;
      `};
    .b2b-actions {
      .b2b-register,
      .b2b-login {
        width: 140px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        margin-left: 20px;
        transition: 0.2s;
        &:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }
      }
      .b2b-register {
        border: 2px solid ${color.primary};
        color: ${color.primary};
      }
      .b2b-login {
        background-color: ${color.primary};
        color: white;
      }
    }
    .icon-uyelik.login {
      ${media.tablet`

        &:after{
          content: '';
          position: absolute;
          width: 7px;
          height: 7px;
          background-color: #4dd03d;
          top: -3px;
          right: -3px;
          z-index: 1;
          border-radius: 45px;
        }
      `};
    }
    .mobile-menu {
      display: none;
      ${media.tablet`
        display: flex;
        order: 1;
        align-items: center;
        i.icon-mobile-menu {
          color: #525254;
        }
      `};
    }
    .logo {
      img {
        width: 170px;
        ${media.tablet`
          width: unset;
          height: 40px;
          /*margin: 0 auto;*/
          margin-left: 0px;
        `};
      }
      ${media.tablet`
        order: 2;
        margin-left:20px;
      `};

      .mobile-contact {
        color: ${color.primary};
        width: 100%;
        text-align: center;
        margin-top: 5px;
        display: none;
        font-size: 14px;
        ${media.tablet`
          display: block;
        `};
        a {
          font-size: 16px;
        }
      }
    }

    .buttons {
      display: flex;
      color: ${props => props.theme.color.gray[1]};
      li:not(:last-child) {
        margin-right: ${props => props.theme.sp(3)};
        ${media.tablet`
          margin-right: 20px;
          `};
      }
      .icon {
        font-size: 24px;
        display: block;
        margin-bottom: 4px;

        &:before {
          opacity: 0.5;
        }

        ${media.tablet`
          font-size: 26px;
        `};
      }

      .link {
        display: flex;
        text-align: center;
        flex-direction: column;
        font-size: 12px;
        ${media.tablet`
          position: relative;
          `};
        strong.count {
          font-weight: 600;
          color: ${props => props.theme.color.black[1]};
          ${media.tablet`
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 20px;
            height: 20px;
            top: -10px;
            right: -5px;
            color: white;
            background-color: #cc0000;
            border-radius: 50%;
            line-height: 18px !important;
            display: inline-block;
            text-align: center;
            `};
        }
      }
      ${media.tablet`
        order: 2;
        .content-area:not(.hesabim-link) {
          display: none;
        }
      `};
    }
    .ui.dropdown {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .ui.list .item {
      padding: 10px;
      &:after  {
        display: none;
      }
      & + .item {
        border-top: 1px solid #eee;
      }
      .header.active {
        color: #ff8900;
      }
      &.cart-empty {
        font-family: 'Barlow', sans-serif;
        padding: 10px 15px;
        color: #ff8900;
        font-size: 14px;
        font-weight: 500;
      }
      .cart-all {
        min-width: 250px;
        display: flex;
        justify-content: center;
        font-family: 'Barlow', sans-serif;
        padding: 15px 20px;
        background-color: #ff8900;
        color: white;
        font-size: 16px;
        font-weight: 500;
        border-radius: 0.28571429rem;
      }
      &.cart-price {
        display: flex;
        justify-content: space-between;
        font-family: 'Barlow', sans-serif;
        font-size: 14px;
        color: black;
        padding-top: 15px;
        padding-bottom: 15px;
        strong.price {
          color: black;
          font-weight: 500;
        }
      }
    }
    .ui.list .list > .item .header,
    .ui.list > .item .header {
      margin-bottom: 5px;
      max-width: 500px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      ${media.tablet`
        max-width: 275px;
      `};
      ${media.mini`
        max-width: 240px;
      `};
    }
    .ui.list .list > .item .header,
    .ui.list > .item .header {
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 500;
    }
    .ui.list .list > .item .header,
    .ui.list > .item .description {
      font-family: 'Barlow', sans-serif;
      font-size: 14px;
      font-weight: 400;
    }
    .garage-item {
      cursor: pointer;
    }
    .ui.top.right.pointing.dropdown > .menu {
      width: auto;
    }
  }
  .b2b-menu,
  .bottom {
    ${props => props.site === 'aloparca' && border('t', props.theme.color.gray[3])};
    margin-top: ${props => props.theme.sp(1)};

    &.b2b-ustmenu {
      /*display: none !important; */
      margin-top: -10px;
      div.container {
        width: 100%;
        text-align: center;
        max-width: 100%;
        border-top: 1px solid #eee;

        nav {
          max-width: 1440px;
          margin: 0 auto;
          display: inherit;
        }
      }
    }

    ${media.desktop`
      margin-left: 1%;
    `};

    ul {
      display: flex;
      padding: 8px 0;
      justify-content: center;
      text-transform: uppercase;
      li {
        display: flex;
        align-items: center;
      }
      li + li:before {
        content: '';
        height: 100%;
        width: 1px;
        background-color: ${props => props.theme.color.gray[3]};
      }
      a {
        padding: 8px ${props => props.theme.sp(4)};
        color: ${props => props.theme.color.gray[1]};
        font-weight: 500;
        font-size: 13px;
        letter-spacing: 1px;
        ${media.desktop`
          padding: 8px ${props => props.theme.sp(3)};
          font-size: 11px;
        `};
        ${media.tablet`
        padding: 8px ${props => props.theme.sp(2)};
        `};
        &:hover {
          color: ${props => props.theme.color.black[1]};
        }
      }
    }
    ${media.tablet`
      display: none;
    `};
  }
  .garage {
    ${media.tablet`
      display:none;
    `};
  }
`;

export default Outer;
