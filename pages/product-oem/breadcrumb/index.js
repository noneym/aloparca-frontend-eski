import { Link } from '../../../reactor';

import Outer from './style';

const Breadcrumb = ({ items }) => (
  <Outer>
    <ul>
      {items.map(item => (
        <li key={item.title}>
          <Link>{item.title}</Link>
        </li>
      ))}
    </ul>
  </Outer>
);

export default Breadcrumb;
