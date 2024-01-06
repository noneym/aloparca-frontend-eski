import cx from 'classnames';
import styled from 'styled-components';

const Outer = styled.figure`
  background-color: white !important;
`;
const ImageBg2 = ({ className, src, children }) => (
  <img className={cx(className)} src={src}>
    {children}
  </img>
);

export default ImageBg2;
