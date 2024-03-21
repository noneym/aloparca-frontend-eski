import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Header, Segment, TransitionablePortal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DotDotDot from 'react-dotdotdot';

import { Image, Link } from '../../reactor';
import { editCart, deleteCart } from '../../actions';
import { media } from '../../style/theme';
import Spinner from '../../ui/spinner';

const Outer = styled(Flex)`
  padding: 25px;
  border-bottom: #dddddd solid 1px;
  ${media.tablet`
    padding: 15px;
  `};
  ${media.phone`
    flex-direction: column;
  `};
  .main-area {
    min-height: 150px;
    ${media.mini`
      min-height: 130px;
    `};
    .image-wrapper {
      border: 1px solid #eee;
      margin-right: 30px;
      padding: 5px;
      position: relative;
      ${media.phone`
        margin-right: 10px;
      `};
      .product-image {
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        a {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
  .cart-detail {
    ${media.phone`
      margin-top: 20px;
    `};
  }
  .title {
    font-size: 18px;
    color: #525355;
    font-weight: 500;
    order: 0;
  }
  .content {
    font-size: 16px;
    color: #525355;
    span {
      color: black;
      font-weight: 500;
    }
    &.content-1 {
      margin-bottom: 10px;
      order: 1;
      ${media.phone`
        order: 2;
      `};
    }
    &.content-2 {
      margin-bottom: 20px;
      order: 2;
      ${media.phone`
        order: 3;
        margin-bottom: 0;
      `};
    }
  }
  .delete {
    order: 3;
    margin-bottom: 5px;
    ${media.phone`
      order:1;
      flex: 1;
    `};
  }
  .delete-cart {
    display: inline-block;
    font-size: 13px;
    color: #525355;
    padding: 5px 15px;
    border: #ccc solid 1px;
    text-transform: uppercase;
    &:hover {
      color: white;
      background-color: #525355;
    }
  }
  .price {
    font-size: 18px;
    color: #999999;
    text-decoration: line-through;
    ${media.tablet`
        font-size: 16px;
    `};
  }
  .sale-price {
    font-size: 18px;
    color: black;
    ${media.tablet`
        font-size: 16px;
    `};
    span {
      font-size: 24px;
      font-weight: 600;
      ${media.tablet`
          font-size: 20px;
      `};
    }
  }
  .quantity {
    text-align: center;
    justify-content: center;

    img {
      width: 14px;
      padding: 30px 0;
      margin: 0 10px;
      cursor: pointer;
    }
    .input {
      width: 80px;
      height: 50px;
      background-color: white;
      border-radius: 3px;
      border: #dddddd solid 1px;
      input {
        width: 100%;
        border: none;
        background-color: transparent;
        text-align: center;
        color: #525355;
        font-size: 16px;
        font-weight: 600;
        margin-top: 5px;
        line-height: 1;
        height: 20px;
      }
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      span {
        font-size: 13px;
        color: #525355;
      }
    }
  }
`;

class ProductCard extends React.Component {
  state = { quantity: parseInt(this.props.product.adet, 10), openAlert: false };

  changeQuantity = async (type, max) => {
    if (!(type === 'dec' && this.state.quantity === 1)) {
      if (!(type === 'inc' && this.state.quantity === max)) {
        await this.setState(prevState => ({
          quantity: prevState.quantity + (type === 'inc' ? +1 : -1),
        }));
        this.props.dispatch(editCart({ id: this.props.product.urun_detay.no,
          quantity: this.state.quantity,
        }));
      } else {
        this.setState({ openAlert: true });
      }
    }
  };

  changeQuantityValue = (e) => {
    const quantity = parseInt(e.target.value, 10);
    if (this.state.quantity !== quantity && quantity > 0) {
      if (e.target.max >= quantity) {
        this.setState({ quantity });
        this.props.dispatch(editCart({ id: this.props.product.urun_detay.no, quantity }));
      } else {
        this.props.dispatch(editCart({ id: this.props.product.urun_detay.no, quantity: e.target.max }));
        this.setState({ quantity: e.target.max, openAlert: true });
      }
    }
  };

  alertClose = () => this.setState({ openAlert: false });

  alertOpen = () => {
    setTimeout(() => this.setState({ openAlert: false }), 5000);
  };

  // Stokta olmayan ürünleri/tükenen sepet ekranına gelmeden kaldırır.
  deleteAbsents = async () => {
    this.setState({ deleteLoading: true });
    const { product, dispatch } = this.props;
    const isAbsent = product.urun_detay.stok_adet === 0;
    if (isAbsent) {
      await dispatch(deleteCart({ id: product.urun_detay.no }));
    }
    this.setState({ deleteLoading: false });
  };

  componentDidMount() {
    this.deleteAbsents();
  }

  deleteCart = async () => {
    this.setState({ deleteLoading: true });
    const { product, dispatch } = this.props;
    await dispatch(deleteCart({ id: product.urun_detay.no }));
    this.setState({ deleteLoading: false });
  };

  handleImages = (images) => {
    let img;
    let imgUrl = 'https://resize.aloparca.com/upload/w_200,h_150/';
    try {
      img = JSON.parse(images);
      imgUrl += 'v2/';
    } catch (err) {
      img = [images];
    }

    if (!images) return 'https://resize.aloparca.com/upload/w_200,h_150/null';
    return `${imgUrl}${img?.[0]}`;
  };

  render() {
    const { product } = this.props;
    const { openAlert, quantity, deleteLoading } = this.state;
    const price = parseFloat(product.urun_detay.liste_fiyat * quantity).toFixed(2);
    const salePrice = parseFloat(product.urun_detay.fiyat * quantity).toFixed(2);
    return (
      <Outer>
        <Flex className="main-area" width={[1, 2 / 3]}>
          {/* {JSON.stringify(product.urun_detay.version == 'v2')} */}
          <Box className="image-wrapper" width={1 / 3}>
            <Box
              className="product-image"
              style={{
                backgroundImage: `url('${this.handleImages(product.urun_detay.gorsel)}')`,
              }}
            >
              <Link className="product-image-link" to={`/yedek-parca${product.urun_detay.slug}`} />
            </Box>
          </Box>
          <Flex width={2 / 3} mx={1} justifyContent="space-between" flexDirection="column">
            <Box className="title" mb={1} flex={1}>
              <Link to={`/yedek-parca${product.urun_detay.version == 'v2'?'-v2':''}${product.urun_detay.slug}`}>
                <DotDotDot clamp={2}>{product.urun_detay.name}</DotDotDot>
              </Link>
            </Box>
            <Box className="content content-1">
              <span>Marka:</span> {product.urun_detay.stokmarka}
            </Box>
            <Box className="content content-2">
              <span>Stok Kodu:</span> {product.urun_detay.parcakodu}
            </Box>
            <Box className="delete">
              {deleteLoading ? (
                <Spinner />
              ) : (
                <a href="javascript:;" onClick={this.deleteCart} className="delete-cart">
                  Sil
                </a>
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex className="cart-detail" width={[1, 1 / 3]} justifyContent="space-between">
          <Flex className="quantity" width={1 / 2} mx={1} alignItems="center">
            <Box
              onClick={() => this.changeQuantity('dec', parseInt(product.urun_detay.stok_adet, 10))}
            >
              <Image src="/static/img/t/icons/eksi.svg" />
            </Box>
            <Box className="input">
              <input
                name="adet"
                type="number"
                value={quantity}
                onChange={this.changeQuantityValue}
                onFocus={e => e.target.select()}
                max={parseInt(product.urun_detay.stok_adet, 10)}
              />
              <span>adet</span>
            </Box>
            <Box
              onClick={() => this.changeQuantity('inc', parseInt(product.urun_detay.stok_adet, 10))}
            >
              <Image src="/static/img/t/icons/arti.svg" />
            </Box>
          </Flex>
          <Flex width={1 / 2} ml={2} justifyContent="center" alignItems="center" flexDirection="column">
            <Box className="price" mb={1}>
              {price}TL
            </Box>
            <Box className="sale-price">
              <span>{salePrice.toString().split('.')[0]}</span>.{salePrice.toString().split('.')[1]}
              TL
            </Box>
          </Flex>
        </Flex>
        <TransitionablePortal onClose={this.alertClose} open={openAlert} onOpen={this.alertOpen}>
          <Segment
            style={{
              left: '40%',
              position: 'fixed',
              top: '10%',
              zIndex: 1000,
            }}
          >
            <Header>Stok Miktarı Hakkında</Header>
            <p>
              <strong>{product.urun_detay.name}</strong> için maksimum{' '}
              <strong>{product.urun_detay.stok_adet} adet</strong> ürün satın alabilirsiniz.
            </p>
            <p>Daha fazla ürün temini için lütfen bizimle iletişime geçiniz.</p>
          </Segment>
        </TransitionablePortal>
      </Outer>
    );
  }
}

export default connect()(ProductCard);
