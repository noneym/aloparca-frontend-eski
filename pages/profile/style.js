import styled from 'styled-components';
import { media } from '../../style/theme';

const ProfilePage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    ${media.tablet`flex-direction: column;`};
    .menu {
      background-color: white;
      border-radius: 3px;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
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
      .main-category {
        overflow: hidden;
        @media (min-width: 1024px) {
          height: auto !important;
        }

        ${media.tablet`


          &.active {

          }
        `};

        li {
          padding: 15px 5px;
          & + li {
            border-top: 1px solid #dddddd;
          }
          a {
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            font-size: 15px;
            font-weight: 500;
            color: #525355;
            &.active {
              color: black;
            }
            &:hover {
              color: #ff8900;
            }
          }
          & .sub-category {
            margin-top: 10px;
            li {
              padding: 10px 10px;
              border-bottom: 0;
              a {
                font-weight: 400;
              }
            }
          }
          &.logout a {
            color: #ff8900;
          }
          &.logout i.icon-logout {
            font-size: 20px;
            color: #ff8900;
          }
        }
      }
    }
    .content {
      background-color: white;
      border-radius: 3px;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
      font-size: 16px;
      position: relative;
      min-height: 300px;
    }
  }
`;
export default ProfilePage;
