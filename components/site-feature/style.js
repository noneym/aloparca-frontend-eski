import styled from 'styled-components';
import { media } from '../../style/theme';
import { Section } from '../../components/style';

const Outer = styled(Section)`
  .icons {
    ${media.tablet`
      flex-direction: column;
    `};
    .item {
      ${media.tablet`
        border-bottom: 1px solid #dddddd;
        &:first-child {
          border-top: 1px solid #dddddd;
        }
        `};
      a {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        ${media.tablet`
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          padding: 20px 0;
        `};
      }
      .icon-chevron-thin-right {
        display: none;
        ${media.tablet`
          display: block;
        `};
      }
      .desktop {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        ${media.tablet`
          display: none;
        `};
        .icon {
          font-size: 60px;
          color: white;
        }
      }
      .mobile {
        display: none;
        ${media.tablet`
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            display: block;
            font-size: 24px;
          }
        `};
      }
      h3 {
        color: #999999;
        font-weight: 500;
        font-size: 18px;
        ${media.tablet`
          margin: 0;
          flex-grow: 1;
        `};
      }
    }
  }
`;

export default Outer;
