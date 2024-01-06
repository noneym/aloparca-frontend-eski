import styled from 'styled-components';
import { media } from '../../style/theme';

const KampanyaPage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    ${media.tablet`flex-direction: column;`};
    .menu {
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
      .label {
        position: relative;
        padding: 5px;
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        color: #333333;
        .mobile-menu-link {
          display: none;
          ${media.tablet`
          display: flex;
          align-items:center;
          justify-content: flex-end;
          position: absolute;
          top: 0;
          right:0;
          left:0;
          bottom:0;
          i {
            color: #333333;
            margin-right: 5px;
          }
          `};
        }
      }
      ul.submenu {
        @media (min-width: 1024px) {
          height: auto !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        li {
          padding: 15px 5px;
          & + li {
            border-top: 1px solid #dddddd;
          }
          a {
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            font-size: 15px;
            color: #888888;
            i {
              transform: rotate(-90deg);
            }
            &:hover {
              color: #ff8900;
            }
            &.active {
              font-weight: 500;
              color: black;
            }
          }
        }
      }
    }
    .content {
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
      font-size: 16px;
    }
  }
`;
export default KampanyaPage;
