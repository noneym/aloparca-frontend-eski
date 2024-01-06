import styled from 'styled-components';

import { Link } from '../../reactor';
import { ImageBg } from '../../components/product';
import { cover } from '../../reactor/func';
import { border, media, color } from '../../style/theme';

const Outer = styled.div`
  ${border()};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
  background-color: white;
  ${media.tablet`
  padding: 10px;
`};
  .link {
    ${cover()};
    z-index: 2;
  }
  .image {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    ${media.tablet`
    height: 100px;
  `};
  }
  .info {
    padding: 16px 16px 24px;
    ${media.tablet`
    padding: 10px 0 0;
    min-height: 80px;
  `};
  }

  .commerce {
    padding: 0 16px 22px;
    ${media.tablet`
    padding: 20px 0 0;
  `};
  }

  .arac-uyumlulugu-area {
    display: none;
    ${media.tablet`
    display: block;
    margin-top: 10px;
    width: 100%;
    color: white;
    background-color: #a4a4a4;
    padding: 6px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5em;
    text-align: center;
    text-transform: uppercase;
    border-radius: 3px;
  `};
  }

  .title {
    margin: 0;
    font-weight: normal;
    color: ${color.black[0]};
    line-height: 1.3;
  }
  .brand {
    color: ${color.gray[1]};
    font-weight: 500;
    margin-top: 2px;
    display: block;
    text-transform: uppercase;
  }
  .title {
    font-size: 17px;
  }
  .original-price {
    color: ${color.gray[1]};
    text-decoration: line-through;
    ${media.tablet`
    font-size: 12px;
  `};
  }
  .sale-price {
    font-size: 24px;
    font-weight: 500;
    margin-left: 7px;
    color: ${color.black[0]};
    ${media.tablet`
    font-size: 18px;
  `};
  }
  .add-to-cart {
    &,
    &:focus {
      color: white;
      background-image: linear-gradient(to top, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    &:hover {
      color: white;
      background-image: linear-gradient(to bottom, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
    text-transform: uppercase;
    border-radius: 3px;
    margin-top: 16px;
    position: relative;
    width: 140px;
    height: 40px;
    z-index: 3 !important;
  }
`;

const ProductCard = ({ item }) => {
  const slug = `/yedek-parca/${item.marka}${
    item.kategori ? `/${item.kategori.replace(/ /g, '-')}` : ''
  }/${item.stokkodu}/${item.no}`;
  return (
    <Outer>
      <Link to={slug} className="link" title={item.stokadi} />
      <div>
        <ImageBg
          className="image"
          src={`https://resize.aloparca.com/upload/w_260,h_200,pns/yedekparca_img${item.resim}`}
          alt={`${item.stokkodu} kodlu Oto Yedek Parça ${item.stokadi}`}
        />
        <div className="info">
          <h3 className="title">
            {item.stokadi.length > 26 ? `${item.stokadi.substring(0, 23)}...` : item.stokadi}
          </h3>
          <strong className="brand">{item.marka}</strong>
        </div>
      </div>
      <div className="commerce">
        <div className="price-wrap">
          <span className="sale-price">{item.fiyat}TL</span>
        </div>
      </div>
      {/* <div className="arac-uyumlulugu-area">
      <Link className="arac-uyumlulugu">Araç uyumluluğunu kontrol et</Link>
    </div> */}
    </Outer>
  );
};

export default ProductCard;
