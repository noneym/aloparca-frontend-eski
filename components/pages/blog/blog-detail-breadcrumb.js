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

const BreadCrumb = ({ blog }) => (
  <Outer>
    {typeof blog !== 'undefined' &&(
    <ul>
      <li>
        <Link to="/">Anasayfa</Link>
      </li>
      <li>
        <Link route="blog">Blog</Link>
      </li>
      <li>
        <Link to={`/blog/${blog.kategori_slug}`}>{blog.kategori}</Link>
      </li>
      <li>
        <Link to={`/blog-detay/${blog.url}`}>{blog.baslik}</Link>
      </li>
    </ul>
    )}
  </Outer>
);
export default BreadCrumb;
