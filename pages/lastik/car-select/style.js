import styled from 'styled-components';
import { media } from '../../../style/theme';

const Outer = styled.div`
  margin-top: -52px;
  .car-select {
    ${media.tablet`
      align-item: center;
      flex-direction: column;
      margin: 10px 0;
    `};
    .car-select-box {
      padding: 0 10px;
      ${media.tablet`
        margin: 10px 0;
        padding: 0 20px;
      `};
      &.disabled {
        ${media.tablet`
          display: none;
        `};
      }
    }
  }

  .ui.attached.menu {
    border: none;
    width: auto;
    display: inline-flex;
    align-items: flex-start;
    .item {
      font-weight: 500;
      text-transform: uppercase;
      color: white;
      border-radius: 3px 3px 0 0 !important;
      border: none;
      background-color: #ffb000;
      position: relative;
      transition: none;
      height: 50px;
      padding: 0 30px;
      box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);
      &:not(.active):before {
        content: '';
        display: block;
        background-color: #ffb000;
        height: 3px;
        width: 6px;
        position: absolute;
        top: 0;
        left: -3px;
      }
      &:first-child:before {
        left: auto;
        right: -3px;
      }
      &.active {
        background-color: ${props => props.theme.color.primary};
        font-weight: 500;
        z-index: 2;
      }
      ${media.tablet`
        font-size: 0.8em;
        padding: 0 15px;
      `};
    }
  }
  .ui.attached.tab {
    border: none;
    padding: 0 30px;
    height: 124px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: white;
    background-color: ${props => props.theme.color.primary};
    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);
    ${media.tablet`
      height: auto;
      padding: 0px;
    `};
    form {
      flex: 1;
    }
  }

  label {
    padding-bottom: 4px;
    display: block;
    ${media.tablet`
      display:none;
    `};
  }
  label,
  .ui.selection.dropdown,
  .ui.selection.dropdown .item {
    padding-left: 14px !important;
  }
  .ui.selection.dropdown {
    min-width: auto;
    display: block;
    border-radius: 0;
    border: none;
    padding-top: 12px;
    padding-bottom: 12px;
    min-height: auto;
    position: relative;
    .menu {
      border: none;
      margin: 0;
      min-width: max-content;
      width: 100%;
    }
    .icon {
      font-family: 'icomoon';
      font-size: 12px;
      padding: 12px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      margin: 0;
      &:before {
        content: '\\e903';
      }
    }
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }

  .ui.button {
    min-width: max-content;
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 38px;
  }
`;

export default Outer;
