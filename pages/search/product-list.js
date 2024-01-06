import { connect } from 'react-redux';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import {
  Modal,
  Select,
  Header,
  Button,
  Icon,
  Form,
  Input,
} from 'semantic-ui-react';
import cx from 'classnames';
import MaskedInput from 'react-text-mask';
import { media } from '../../style/theme';
import { Link } from '../../reactor';
import { TitleContent, Price, ImageBg } from '../../components/product';
import { addCart, addGarage } from '../../actions';
import Api from '../../api';


const StokYok = styled.div`
  min-height: 4em;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  font-family: 'Barlow',sans-serif;
  font-weight: 600;
  line-height: 1.2;
  font-family: 'Barlow',sans-serif;
  background-image: linear-gradient(120deg, #fda365 0%, #fda085 100%);
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const Outer = styled(Flex)`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-top: 30px;
  margin-bottom: 30px;

  .mobilde-goster-stok {
    display: none;
    ${media.tablet`
    display: block;
    .hemen-al {
      display: block;
      text-align: center;
      text-transform: uppercase;
      color: white;
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
      border-radius: 3px;
      margin-bottom: 0.3em;
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
  `};
  }
  
  ${media.tablet`
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #dddddd;
    margin-top: 20px;
  `};
  .image-area {
    height: 260px;
    padding: 10px;
    ${media.tablet`
    height: auto;
    min-height: 200px;
    max-height: 265px;
    position: relative;
  `};
    .product-image {
      width: 100%;
      height: 100%;
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      
    }
  }
  .content-area {
    padding: 25px 20px;
    background-color: #f3f3f3;
    ${media.tablet`
    padding: 15px;
    background-color: white;
  `};
    .title {
      font-size: 20px;
      font-weight: 500;
      color: #525355;
      margin: 0;
      &:hover {
        color: #ff8900;
      }
    }
    .marka-stok-area {
      ${media.tablet`
      flex-direction: column;
      align-items: flex-start;
    `};
      .marka-stok {
        font-size: 16px;
        color: #525355;
        ${media.tablet`
        font-size: 14px;
        & + .marka-stok {
          margin-top: 5px;
        }
      `};
        strong {
          font-weight: 500;
          color: black;
          margin-right: 5px;
        }
        & + .marka-stok:before {
          display: block;
          content: '';
          width: 1px;
          height: 20px;
          margin: 0 50px;
          background-color: #999999;
          ${media.tablet`
          display: none;
        `};
        }
      }
    }
    .tedarikci-aciklama {
      font-size: 16px;
      color: #525355;
      ${media.tablet`
      display: none;
    `};
      strong {
        font-weight: 500;
        color: black;
      }
    }
    .arac-uyumlulugu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: white;
      background-color: #a4a4a4;
      padding: 7px 0px;
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
      border-radius: 3px;
      text-align: center;
      ${media.tablet`
      margin-top: 0.3rem;
      font-size: 12px;
      padding: 1em 0;

    `};
      &:hover {
        background-color: #ff8900;
      }
      &.active {
        background-color: #29a71a;
      }
      .icon-uyumlu {
        font-size: 26px;
        margin-right: 10px;
      }
      strong {
        font-weight: 600;
        margin-right: 5px;
      }
    }
  }
 
  .mobilde-gizle-stok{
    display: block;
    ${media.tablet`
    display: none;
    `}
  }
  .mobile-price-area {
    display: none;
    ${media.tablet`
    display: flex;
    align-items: flex-end;
    .liste-fiyat {
      color: #999999;
      font-size: 14px;
      text-decoration: line-through;
      margin-bottom: 2px;
    }
    .fiyat {
      color: black;
      font-size: 26px;
      font-weight: 600;
      margin-left: 5px;
      span {
        font-size: 18px;
        font-weight: 400;
      }
    }
  `};
  }
  .price-area {
    padding: 25px 15px;
    position: relative;
    align-self: center;
    
    ${media.tablet`
    display: none;
  `};
    .liste-fiyat {
      color: #999999;
      font-size: 18px;
      text-decoration: line-through;
      margin: 0 0 10px 10px;
      line-height: 1em;
    }
    .fiyat {
      color: black;
      font-size: 36px;
      font-weight: 600;
      margin: 0 0 15px 10px;
      line-height: 1em;
      text-align: center;

      span {
        font-size: 20px;
        font-weight: 400;
      }
    }
    .hemen-al {
      display: block;
      text-align: center;
      text-transform: uppercase;
      color: white;
      height: 4em;      
      font-size: 1.5em;
      font-weight: bold;
      padding: 1.4em 0;
      border-radius: 3px;
      background-image: -moz-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -webkit-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
      background-image: -ms-linear-gradient(90deg, rgb(255, 126, 0) 0%, rgb(255, 159, 0) 100%);
    }
  }
`;


class StokBilgilendirme extends Component {
  state = { stokModalOpen: false };

  handleOpen = () => this.setState({ stokModalOpen: true });

  handleClose = () => this.setState({ stokModalOpen: false });

  uyeSTB = async () => {
    this.setState({ stokModalOpen: false });
    await Api.get(`Products/stok_durum_bilgilendirme?no=${this.props.product.no}`);
  };


  ziyaretciSTB = async () => {
  };

  render() {
    const { product, isLogin } = this.props;
    const { formEmail, formTelefon } = this.state;

    const UyeBilgilendir = (
      <Modal open={this.state.stokModalOpen} onClose={this.handleClose} basic size="small">
        <Header icon="address card outline" content="Stok Bilgilendirme" />
        <Modal.Content>
          <h3>Ürün stok durumu hakkında bilgi almak için onaylayın</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.uyeSTB} inverted>
            <Icon name="checkmark" />
            {' '}
            Onay
          </Button>
        </Modal.Actions>
      </Modal>
    );

    const ZiyaretciBilgilendir = (
      <Modal open={this.state.stokModalOpen} onClose={this.handleClose} size="small">
        <Modal.Header>Stok Bilgilendirme</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label className="form-label required">E-Posta</label>
                <Input
                  name="email"
                  ref={(n) => {
                    this.email = n;
                  }}
                  required
                  className={cx({ error: formEmail })}
                />
              </Form.Field>
              <Form.Field>
                <label className="form-label required">Cep Telefonu</label>
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    ' ',
                    '(',
                    /\d/,
                    /\d/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                  ]}
                  guide
                  ref={(n) => {
                    this.telefon = n;
                  }}
                  required
                  className={cx({ error: formTelefon })}
                  placeholder="0(5XX) XXX XX XX"
                  type="text"
                  name="input_search"
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={this.handleClose}>
            Vazgeç
          </Button>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" />
            {' '}
            Onay
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <Box>
        {isLogin ? UyeBilgilendir : ZiyaretciBilgilendir}
        <Flex flexDirection="column" mt={20}>
          <a href="tel:08503330686">
            <StokYok className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686</StokYok>
          </a>
        </Flex>
      </Box>
    );
  }
}


const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  { title: 'Yıl', name: 'model_yili' },
  { title: 'Motor Hacmi', name: 'motor' },
  { title: 'Beygir Gücü', name: 'beygir' },
];


class ProductCard extends React.Component {
  state = {
    openModal: false,
    options: {
      marka: { opts: [] },
    },
  };

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
  };


  selectComplete = async () => {
    const { options } = this.state;
    const params = parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue = typeof selected === 'string' ? selected.replace(/\s/g, '_') : selected;
        let newName = item.name;
        if (item.name === 'model_yili') {
          newName = 'yil';
        }
        return { ...prevParams, [newName]: selectedValue };
      }
      return prevParams;
    }, {});
    if (options.beygir && options.beygir.selected) {
      const data = {
        marka: options.marka.selected,
        model: options.model.selected,
        kasa: options.kasa.selected,
        yil: options.model_yili.selected,
        motor: options.motor.selected,
        beygir: options.beygir.selected,
      };
      const fd = new FormData();
      fd.append('marka', options.marka.selected);
      fd.append('model', options.model.selected);
      fd.append('kasa', options.kasa.selected);
      fd.append('model_yili', options.model_yili.selected);
      fd.append('motor', options.motor.selected);
      fd.append('beygir', options.beygir.selected);
      fd.append('urun_no', this.props.item.no);
      const results = await Api.post('Products/arac_uyumluluk_kontrol', fd);
      this.setState({ result: results.result });
      this.props.dispatch(addGarage(data));
    }
  };

  async optionsData(name, value) {
    const { options } = this.state;

    if (value && options[name].selected === value) return;

    const index = parents.findIndex((item) => item.name === name);

    const currentSelected = { [name]: { ...options[name], selected: value } };

    const prevStateOptionsFiltered = Object.keys(options).filter((key) => {
      const prevIndex = parents.findIndex((item) => item.name === key);
      return prevIndex < index;
    });
    const prevStateOptions = prevStateOptionsFiltered.reduce(
      (obj, key) => ({ ...obj, [key]: options[key] }),
      {},
    );

    let nextOptions = {};

    if (index !== parents.length - 1) {
      let dataUrl = 'Products/araclar';
      if (value) {
        if (index > 0) {
          dataUrl += prevStateOptionsFiltered.reduce(
            (prevDataURL, prevName) => `${prevDataURL}/${prevName}/${prevStateOptions[prevName].selected}`,
            '',
          );
        }
        let newName = name;
        if (name === 'yil') {
          newName = 'model_yili';
        }
        dataUrl += `/${newName}/${encodeURIComponent(value)}`;
      }

      const nextParent = parents[index + (value ? 1 : 0)];
      if (nextParent) {
        const {
          results: { opts },
        } = await Api.get(dataUrl);
        const data = opts.map((text) => ({ text, value: text }));
        nextOptions = { [nextParent.name]: { opts: data } };
      }
    }

    await this.setState({
      options: {
        ...prevStateOptions,
        ...currentSelected,
        ...nextOptions,
      },
    });

    if (index === parents.length - 1) {
      this.selectComplete();
    }
  }

  modalOpen = () => {
    const { name } = parents[0];
    this.optionsData(name);
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  addCartForm = () => {
    const { dispatch, item } = this.props;
    dispatch(addCart({
      id: item.no,
      quantity: 1,
      name: item.name,
      gorsel: item.gorsel,
    }));
  };

  render() {
    const { item, isLogin } = this.props;
    const { openModal, result } = this.state;
    const slug = `/yedek-parca${item.slug}`;
    return (
      <Outer>
        <Box width={[1 / 3, 1 / 3, 1 / 4]} className="image-area">
          <Link to={slug}>
            <ImageBg
              className="product-image"
              src={`https://resize.aloparca.com/upload/w_260,h_200,pns/${item.gorsel}`}
              alt={`${item.stokmarka} Marka ${item.parcakodu} kodlu Oto Yedek Parça ${item.tedarikci_aciklama}`}
            />
          </Link>
        </Box>
        <Flex
          width={[2 / 3, 2 / 3, 11 / 20]}
          className="content-area"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
              <Link className="title" to={slug}>
                {item.name}
              </Link>
          </Box>
          <Flex className="marka-stok-area" alignItems="center">
            <Flex className="marka-stok">
              <TitleContent title="Marka" content={item.stokmarka} />
            </Flex>
            <Flex className="marka-stok">
              <TitleContent title="Stok Kodu" content={item.parcakodu} />
            </Flex>
          </Flex>
          <Box className="tedarikci-aciklama">
            <TitleContent title="Tedariçi Açıklaması" content={item.tedarikci_aciklama} />
          </Box>

          <Box className="mobile-price-area">
            <Box className="fiyat">
              <Price price={item.fiyat} />
            </Box>
          </Box>

          <Box className="mobilde-goster-stok">
            {parseInt(item.stokdurumu, 10) === 0 && isLogin ? (
              <StokBilgilendirme product={item} isLogin={isLogin} />) : (
              parseInt(item.stokdurumu, 10) === 0
                ? (
                  <a href="tel:08503330686">
                    <StokYok className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686</StokYok>
                  </a>
                )
                : (
                  <a href="javascript:;" onClick={this.addCartForm} className="hemen-al">
                    SEPETE EKLE
                  </a>
                ))}
          </Box>
          <Box>
            {item.uyumlu_marka !== '' && (
              <a href="javascript:;" onClick={this.modalOpen} className="arac-uyumlulugu">
                Araç uyumluluğunu kontrol et
              </a>
            )}
          </Box>
        </Flex>
        <Flex width={1.23 / 5} className="price-area" flexDirection="column" justifyContent="flex-end">
          <Box className="fiyat">
            <Price price={item.fiyat} />
          </Box>
          <Box>
            {
            parseInt(item.stokdurumu, 10) === 0 && isLogin ? (
              <StokBilgilendirme product={item} isLogin={isLogin} />) : (
              parseInt(item.stokdurumu, 10) === 0
                ? (
                  <a href="tel:08503330686">
                    <StokYok className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686</StokYok>
                  </a>
                )
                : (
                  <a href="javascript:;" onClick={this.addCartForm} className="hemen-al">
                    SEPETE EKLE
                  </a>
                ))
          }
          </Box>
        </Flex>
        <Modal size="tiny" open={openModal} onClose={this.closeModal} closeIcon>
          <Modal.Header>{`${item.stokmarka !== undefined ? item.stokmarka : ''} / ${item.tedarikci_aciklama !== undefined ? item.tedarikci_aciklama : ''}  - Araç Uyumluluğu`}</Modal.Header>
          <Modal.Content>
            <Flex flexDirection="column">
              {parents.map(({ name, title }) => {
                const select = this.state.options[name] || {};
                const options = select.opts || [];
                if (options.length) {
                  return (
                    <Box px={2} mb={1} key={title}>
                      <Select
                        name={name}
                        placeholder={`${title} Seçiniz`}
                        disabled={options.length === 0}
                        options={options}
                        onChange={this.onChange}
                        value={select.selected || ''}
                        style={{ width: '100%' }}
                      />
                    </Box>
                  );
                }
              })}
              {result
                && (result == '200' ? (
                  <Box my={3} style={{ textAlign: 'center', color: 'green' }}>
                    Aracınız ile %100 uyumludur.
                  </Box>
                ) : (
                  <Box my={3} style={{ textAlign: 'center', color: 'red' }}>
                    Aracınız ile uyumlu değildir.
                  </Box>
                ))}
            </Flex>
          </Modal.Content>
        </Modal>
      </Outer>
    );
  }
}
const mapStateToProps = ({ isLogin }) => ({ isLogin });

export default connect(mapStateToProps)(ProductCard);
