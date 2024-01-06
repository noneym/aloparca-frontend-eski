import styled from 'styled-components';
import { media } from '../../style/theme';

const ContactUs = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    padding: 50px;
    .google-map {
      width: 100%;
    }
    ${media.tablet`
      padding: 25px;
      flex-direction: column;
      .google-map {
        margin-bottom: 25px;
      }
    `};
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
    .box {
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 15px 30px;
      ${media.tablet`padding: 10px 10px;`};
      & + .box {
        margin-top: 30px;
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        color: black;
        padding: 15px;
        border-bottom: 1px solid #dddddd;
      }
      .content {
        font-size: 18px;
        color: #525355;
        padding: 15px;
        strong {
          font-weight: 500;
          color: black;
        }
        .phone {
          font-size: 30px;
          font-weight: 500;
        }
        span {
          margin-left: 15px;
          margin-right: 10px;
        }
        .mail {
          color: #fe4e50;
          font-weight: 500;
        }
      }
      .direction {
        font-size: 18px;
        padding: 15px;
        color: #ff8900;
        font-weight: 500;
      }
    }
  }
`;

export default ContactUs;
