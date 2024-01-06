import cx from 'classnames';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';


const onErrImg = (e) => {
  e.target.onerror = null;
  e.target.src = '../../static/img/noimg.jpg';
};

const ImageBg = ({ className, src, alt,children }) => (
  <LazyLoad>
    <Outer className={cx(className)}>
      <img src={src} onError={onErrImg} alt={alt}/>
    </Outer>
  </LazyLoad>
);

const Outer = styled.figure`
  img {
    object-fit: contain;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

export default ImageBg;
