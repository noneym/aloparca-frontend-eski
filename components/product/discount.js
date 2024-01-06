import styled from 'styled-components';
import { ImageBg } from '../../reactor';
import { media } from '../../style/theme';

const Outer = styled(ImageBg)`
  position: absolute;
  top: ${(props) => (props.type === 'list' ? '65px' : '10px')};
  ${(props) => (props.type !== 'list' && 'right: 10px')};
  width: ${(props) => (props.type === 'list' ? '56px' : '42px')};
  height: ${(props) => (props.type === 'list' ? '67px' : '51px')};
  background-color: transparent !important;
  color: white;
  text-align: center;
  padding-top: ${(props) => (props.type === 'list' ? '20px' : '14px')};
  overflow: hidden;
  ${({ mobile }) => (mobile && 'display: none')};
  ${media.desktop`
    ${(props) => (props.type === 'list' && 'top: 15px')};
    ${(props) => (props.type === 'list' && 'right: unset')};
    ${(props) => (props.type === 'list' && 'left: 50%')};
    ${(props) => (props.type === 'list' && 'transform: translateX(-50%)')};
  `};
  ${media.tablet`
    ${({ mobile }) => (mobile && 'display: block')};
    ${(props) => (props.type === 'list' && 'top: 65px')};
    ${(props) => (props.type === 'list' && 'right: 15px')};
    ${(props) => (props.type === 'list' && 'width: 42px')};
    ${(props) => (props.type === 'list' && 'height: 51px')};
    ${(props) => (props.type === 'list' && 'padding-top: 14px')};
    left: initial;
    transform: initial;
  `};
  .percent {
    display: block;
    font-size: ${(props) => (props.type === 'list' ? '24px' : '18px')};
    font-weight: 700;
    line-height: ${(props) => (props.type === 'list' ? '1.5em' : '1.8em')};
    ${media.tablet`
      font-size: 18px;
      text-align: center;
    `};
  }
  .content {
    display: block;
    font-size: ${(props) => (props.type === 'list' ? '16px' : '12px')};
    line-height: 1em;
    ${media.tablet`
      font-size: 12px;
      text-align: center;
    `};
  }
`;

const Discount = ({ percent, type = 'list', mobile }) => {
  if (!percent || percent < 1) return null;
  return (
    <Outer mobile={mobile} src="/static/img/t/icons/indirim.svg" type={type} id="discount-container">
      <span className="percent">{`%${percent}`}</span>
      {/*<span className="content">indirim</span>*/}
    </Outer>
  );
};

export default Discount;
