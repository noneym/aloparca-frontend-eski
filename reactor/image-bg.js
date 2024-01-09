import cx from 'classnames';
import styled from 'styled-components';
import { asset } from './func';

const Outer = styled.figure`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.color.gray[3]};
`;
const ImageBg = ({
  className, size, src, children, innerRef,
}) => (
  <Outer
    innerRef={innerRef}
    className={cx(className)}
    style={{ backgroundImage: `url('${asset(src, size)}')` }}
  >
    {children}
  </Outer>
);

export default ImageBg;
