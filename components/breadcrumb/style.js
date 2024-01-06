import styled from 'styled-components';
import { media } from '../../style/theme';

const Outer = styled.div`
  ${media.tablet`
    display: none;
  `};
  ul {
    display: flex;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      font-size: 14px;
      & + li:before {
        font-family: 'icomoon' !important;
        content: '\\\e909';
        font-size: 0.8em;
        color: #525355;
        margin: 0 ${props => props.theme.sp(1)};
      }
      a {
        color: #000000;
      }
    }
  }

  .ui.inline.dropdown > .text {
   font-weight: 400;
   color: #000000;
 }


`;

export default Outer;
