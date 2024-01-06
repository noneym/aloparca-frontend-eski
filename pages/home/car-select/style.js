import styled from 'styled-components';
import { media, container } from '../../../style/theme';

const Outer = styled.form`
  margin-top: 0px;
  ${container()};
  color: white;
  position: relative;
  h3 {
    // box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.color.primary};
    padding-bottom: 25px;
    padding-left: 15px;
    margin-top:0;
    display: inline-flex;
    margin-bottom: -1px;
    border-radius: 3px 3px 0 0;
    text-transform: uppercase;
    font-size: 1.1rem;
    ${media.tablet`
      font-size: 0.8em;
      padding: 0 15px;
      margin-top: 15px;
    `}
  }
  .car-select {
    min-height: 138px;
    background-color: ${props => props.theme.color.primary};
    border-radius: 0 0 0.28571429rem 0.28571429rem;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);
    .container {
      ${media.tablet`
        align-item: center;
        flex-direction: column;
        margin: 10px 0;
        height: auto;
        padding: 0px;
      `};
    }
    .car-select-box {
      ${media.tablet`
       margin: 8px 0;
     `};
    }

    .car-select-box.disabled {
      ${media.tablet`
          display: none;
        `};
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
