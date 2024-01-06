import cx from 'classnames';
import styled from 'styled-components';

const Outer = styled.figure`
  background-color: white !important;
`;
const ImageBg = ({ className, src, children }) => (
  <Outer className={cx(className)} style={{ background: `url('${src}') center/contain no-repeat` }}>
    {children}
  </Outer>
);

export default ImageBg;
