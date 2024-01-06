import styled from 'styled-components';
import { Link } from '../../../reactor';
import { media } from '../../../style/theme';

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
        font-family: "icomoon" !important;
        content: "\\\e909";
        font-size: 0.8em;
        color: #525355;
        margin: 0 ${(props) => props.theme.sp(1)};
      }
      a {
        color: #000000;
      }
    }
  }
`;

const BreadCrumb = ({ items }) => {
  let pageUrl = '/blog';
  return (
    <Outer>
      <ul>
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link route="blog">Blog</Link>
        </li>
        {items
          && items
            .filter((item) => item.name !== '')
            .map((item) => {
              pageUrl = `${pageUrl}/${item.slug}`;
              return (
                <li key={item.slug}>
                  <Link to={pageUrl}>{item.name}</Link>
                </li>
              );
            })}
      </ul>
    </Outer>
  );
};
export default BreadCrumb;
