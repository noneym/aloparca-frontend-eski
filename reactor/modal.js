import styled from 'styled-components';
import { coverAbsolute } from './func';

const Outer = styled.div`
  ${coverAbsolute('fixed')};
  z-index: 1042;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled.div`
  background-color: #0b0b0b;
  opacity: 0.8;
  ${coverAbsolute()};
`;

const CloseBtn = styled.a`
  color: white;
  position: absolute;
  font-size: 2em;
  top: -1.2em;
  right: 2px;
  &:hover {
    text-decoration: none;
  }
`;

const Content = styled.div`
  z-index: 2;
  position: relative;
  line-height: 0;
  width: 100%;
  max-width: 900px;
  padding: 0 8px;
`;

const Modal = ({ children, close }) => (
  <Outer>
    <Backdrop onClick={close} />
    <Content>
      <CloseBtn className="icon-close" href="javascript:;" onClick={close} />
      {children}
    </Content>
  </Outer>
);

export default Modal;
