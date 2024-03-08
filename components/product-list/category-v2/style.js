import styled from 'styled-components';

const Outer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-bottom: 20px;
  .label {
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: #333333;
  }
  .search-box {
    .ui.input {
      width: 100%;
      input {
        font-family: 'Barlow', sans-serif;
        height: 40px;
        border-radius: 0;
        background-color: white;
        font-size: 1rem;
        color: #525355;
      }
    }
    .ui.input input:focus,
    .ui.input.focus input {
      border-color: rgba(34, 36, 38, 0.15);
    }
    .ui.vertical.menu {
      width: 100%;
      box-shadow: none;
      &.ui.menu {
        font-family: 'Barlow', sans-serif;
        border: 0;
      }
    }
    .ui.accordion.menu .item .title > .dropdown.icon {
      transform: rotate(0deg);
    }
    .ui.accordion.menu .item .active.title > .dropdown.icon {
      transform: rotate(90deg);
    }
    .ui.accordion.menu .item .active.title {
      padding-bottom: 0px;
    }
    .ui.accordion .title:not(.ui) {
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: 525355;
      padding: 15px 10px;
    }
    .ui.checkbox .box,
    .ui.checkbox label {
      font-size: 14px;
    }
    .ui.menu .item {
      padding: 0;
      .content {
        width: 100%;
        max-height: 300px;
        margin: 20px 0;
        padding: 0 10px;
        overflow-y: auto;
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: #dddddd;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .content ul li {
        .sub-menu {
          font-size: 14px;
          color: #525355;
          display: inline-flex;
          align-items: center;
          &:hover {
            color: #ff8900;
          }
          &:before {
            content: '';
            width: 14px;
            height: 14px;
            border: #cccccc solid 1px;
            border-radius: 50%;
            margin-right: 5px;
          }
          &.active:before {
            border: #ff8900 solid 4px;
            margin-top: 1px 5px 1px 0;
          }
          &.select:before {
            border: 4px solid #dddddd;
            border-top: 4px solid #ff8900;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        & + li {
          padding-top: 14px;
        }
      }
    }
    .ui.accordion.menu .item .title > .dropdown.icon {
      margin-left: 0;
    }
  }
`;

export default Outer;
