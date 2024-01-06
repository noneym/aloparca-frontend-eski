/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { useState } from "react";
import styled from "styled-components";

import { Link } from "../../reactor";
import { addCart } from "../../actions";

import Outer from "./style";
import NoImg from "../../static/img/noimg.jpg";

const OemBanner = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 11em;
  position: absolute;
  left: 0;
  top: 0;
  span {
    ${(props) => (props.isOem ? "display: flex" : "display: none")};
    background-color: red;
    color: white;
    align-self: flex-start;
    z-index: 999;
    width: 100%;
    justify-content: start;
    opacity: 0.8;
    text-align: start;
    padding: 0.4em;
    font-weight: 900;
    letter-spacing: 0.1em;
  }
  span:first-child {
    padding-bottom: 0.1rem;
  }
  span:last-child {
    border-radius: 0 0 10px 0;
    padding-top: 0.1rem;
  }
`;

const ProductCard = ({ product, isCart, dispatch, onClose, swiperLazy }) => {
  if (!product.name) return null;

  const [imgSRC, setSRC] = useState(product.gorsel);
  const _imgSRC = `https://resize.aloparca.com/upload/w_260,h_200/yedekparca_img${imgSRC}`;

  const onErrImg = e => {
    e.target.onerror = null;
    e.target.src = "../../static/img/noimg.jpg";
  };

  const addCartClick = () => {
    dispatch(
      addCart({
        id: product.no,
        quantity: 1,
        name: product.name,
        gorsel: product.gorsel,
      })
    );
    // onClose();
  };

  return (
    <Outer isCart={isCart} id="for-hover">
      <Link
        to={`/yedek-parca${product.slug}`}
        className="link"
        title={product.name}
      />
      {swiperLazy ? (
        <>
          <OemBanner isOem={product.parca_tipi === 1}>
            <span>LOGOLU ORİJİNAL</span>
            <span>YEDEK PARÇA</span>
          </OemBanner>
          <img
            data-src={_imgSRC}
            onError={onErrImg}
            className="swiper-lazy"
            alt={product.name}
          />
        </>
      ) : (
        <LazyLoad>
          <>
            <OemBanner isOem={product.parca_tipi === 1}>
              <span>LOGOLU ORİJİNAL</span>
              <span>YEDEK PARÇA</span>
            </OemBanner>
            <img src={_imgSRC} onError={onErrImg} alt={product.name} />
          </>
        </LazyLoad>
      )}
      <div className="info">
        <h3 className="title">{product.name}</h3>
        <strong className="brand">{product.stokmarka}</strong>
      </div>
      <div className="commerce">
        <div className="price-wrap">
          <span className="original-price">
            {parseFloat(product.liste_fiyat).toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY"
            })}
          </span>
          <span className="sale-price">
            {parseFloat(product.fiyat).toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY"
            })}
          </span>
        </div>
      </div>
      {parseInt(product.stokdurumu, 0) > 0 ? (
        <a href="javascript:;" onClick={addCartClick} className="add-to-cart">
          SEPETE EKLE
        </a>
      ) : (
        <div className="stok-yok">
          Güncel stok bilgisi için bizi arayın 0850 333 0686K
        </div>
      )}

      {/*
        !flipper ?
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
      </div> :
      (
        parseInt(product.stokdurumu, 0) > 0 ? (
          <a href="javascript:;" onClick={addCartClick} className="add-to-cart">SEPETE EKLE</a>
        ) : (
          <div className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686K</div>
        )
      )
        */}
    </Outer>
  );
};

export default connect()(ProductCard);
