import { createGlobalStyle } from 'styled-components';
import { color, font } from './theme';
import { cover } from '../reactor/func';

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        outline: 0;
    }

    html {
      font-size: 14px;
    }

    body {
        font-family: ${font.content};
        font-weight: 400;
        line-height: 1.2;
        background: #fff;
        color: ${color.gray[0]};
        font-size: 14px;
        &.no-scroll {
          overflow-y: hidden;
          ${cover('fixed')};
        }

    }

    h1,h2,h3,h4,h5,h6 {
      font-family: ${font.heading};
      line-height: 1.3;
      font-weight: 400;
    }

    ul {
      padding:0;
      margin: 0;
      list-style: none;
    }

    figure {
      margin: 0;
      img {
        display: block;
      }
    }

    button {
      padding:0;
      margin:0;
      border:none;
      background:transparent;
      &:disabled{
        opacity: 0.5;
      }
    }

    a {
        color: inherit;
        text-decoration: none;

        &:hover {
          text-decoration: none;
          color: ${color.primary};
        }
    }

    b, strong {
      font-weight: bold;
    }

    pre {
        background: #ccc;
        padding: 25px;
    }

    button, input, optgroup, select, textarea {
      font-family: inherit;
    }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
      textarea,
      input[type="text"] {
        font-size: 16px !important;
      }
    }
    .ui.wide.left.sidebar {
      width: 300px;
    }
    .mobile-menu-overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
      &.active {
        display: block;
      }
    }
    .ui.modal .content>.description {
      padding: 0 !important;
    }
    .modal-header {
      display: flex;
      align-items: center;
      span.icon-filtre {
        margin-right: 10px;
      }
    }
    .modal-description {
      height: 80vh !important;
      .ui.selection.dropdown {
        width: 60%;
        border-radius: 0;
        font-family: 'Barlow',sans-serif;
        font-size: 14px;
      }
      .ui.checkbox label, .ui.checkbox+label, .ui.checkbox input:active~label {
        color: white !important;
      }
    }
    .modal-actions {
      display: flex;
      a {
        display: block;
        width: 50%;
        padding: 10px 0;
        text-align: center;
      }
      a.clear {
        color: white;
        border: 1px solid white;
      }
      a.submit {
        color: black;
        border: 1px solid white;
        background-color: white;
      }
    }
    .service-list + .service-list {
      border-top: 1px solid #dddddd;
    }
    .ui.input input {
      font-family: 'Barlow',sans-serif;
    }
    .warning-title {
      font-size: 18px;
      font-weight: 500;
      color: #ce1b31;
      i {
        font-size: 24px;
        margin-right: 20px;
      }
    }
    .warning-content {
      color: #ce1b31;
      text-align: center;
      line-height: 2em;
    }

    /*** iPhone and iOS Form Input Zoom Fixes ***/
/* Fix Input Zoom on devices older than iPhone 5: */
@media screen and (device-aspect-ratio: 2/3) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px !important; }
}

/* Fix Input Zoom on iPhone 5, 5C, 5S, iPod Touch 5g */
@media screen and (device-aspect-ratio: 40/71) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px !important; }
}

/* Fix Input Zoom on iPhone 6, iPhone 6s, iPhone 7  */
@media screen and (device-aspect-ratio: 375/667) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px !important; }
}

/* Fix Input Zoom on iPhone 6 Plus, iPhone 6s Plus, iPhone 7 Plus, iPhone 8, iPhone X, XS, XS Max  */
@media screen and (device-aspect-ratio: 9/16) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px !important; }
}
`;
