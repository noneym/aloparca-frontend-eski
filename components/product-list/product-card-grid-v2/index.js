import { connect } from 'react-redux';
import DotDotDot from 'react-dotdotdot';
import { Link } from '../../../reactor';
import { ImageBg, Discount } from '../../product';
import { addCart } from '../../../actions';

import Outer from './style';

const ProductCard = ({ item, dispatch }) => (
  <Outer>
    <Link to={`/yedek-parca-v2${item.slug}`} className="link" title={item.name} />
    <div style={{ padding: '7.5px' }}>
      
      <ImageBg
        className="image"
        src={`https://resize.aloparca.com/upload/w_260,h_200,pns/v2/${item.gorsel}`}
        alt={`${item.stokmarka} Marka ${item.parcakodu} kodlu Oto Yedek Parça ${item.tedarikci_aciklama}`}
      />
      <Discount percent={parseInt((1 - item.fiyat / item.liste_fiyat) * 100, 10)} type="grid" />
      <div className="info">
        <h3 className="title">
          <DotDotDot clamp={2}>{item.name}</DotDotDot>
        </h3>
        <strong className="brand">{item.stokmarka}</strong>
      </div>
    </div>
    <div className="commerce">
      <div className="price-wrap">
        {item.liste_fiyat !== item.fiyat && (
          <span className="original-price">{item.liste_fiyat}TL</span>
        )}
        <span className="sale-price">{item.fiyat}TL</span>
      </div>
    </div>
    {parseInt(item.stokdurumu, 10) > 0 ? (
      <a
        href="javascript:;"
        onClick={() => dispatch(addCart({ id: item.no, quantity: 1, name: item.name, gorsel: item.gorsel }))}
        className="hemen-al"
      >
        SEPETE EKLE
      </a>
    ) : (
      <div className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686</div>
    )}
  </Outer>
);

export default connect()(ProductCard);
