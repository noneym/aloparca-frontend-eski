import styled from 'styled-components';
import cx from 'classnames';

import { container } from '../style/theme';

const Outer = styled.div`
  ${container()};
`;

const Container = ({ children, className }) => (
  <Outer className={cx('container', className)}>{children}</Outer>
);
export default Container;
