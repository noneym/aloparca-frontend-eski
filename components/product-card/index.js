/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';

import { Link } from '../../reactor';
import { addCart } from '../../actions';

import Outer from './style';

const ProductCard = ({
  product, isCart, dispatch, onClose, swiperLazy,
}) => {
  if (!product.name) return null;
  
  const [imgSRC, setSRC] = useState(product.gorsel);
  const _imgSRC = `https://resize.aloparca.com/upload/w_260,h_200/yedekparca_img${imgSRC}`;

  const onErrImg = () => setSRC('/yedekparca/A27015906001000302561.JPG');

  const addCartClick = () => {
    dispatch(addCart({
      id: product.no,
      quantity: 1,
      name: product.name,
      gorsel: product.gorsel,
    }));
    onClose();
  };


  return (
    <Outer isCart={isCart} >
      <Link to={`/yedek-parca${product.slug}`} className="link" title={product.name} />
      {swiperLazy ? (
        <img data-src={_imgSRC} onError={onErrImg} className="swiper-lazy" alt={product.name} />
      ) : (
        <LazyLoad>
          <img src={_imgSRC} onError={onErrImg} alt={product.name} />
        </LazyLoad>
      )}
      <div className="info">
        <h3 className="title">{product.name}</h3>
        <strong className="brand">{product.stokmarka}</strong>
      </div>
      <div className="commerce">
        <div className="price-wrap">
          <span className="original-price">
            {parseFloat(product.liste_fiyat).toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            })}
          </span>
          <span className="sale-price">
            {parseFloat(product.fiyat).toLocaleString('tr-TR', {
              style: 'currency',
              currency: 'TRY',
            })}
          </span>
        </div>
      </div>
      {isCart ? (
        parseInt(product.stokdurumu, 0) > 0 ? (
          <a href="javascript:;" onClick={addCartClick} className="add-to-cart">SEPETE EKLE</a>
        ) : (
          <div className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686K</div>
        )
      ) : null}
    </Outer>
  );
};

export default connect()(ProductCard);
