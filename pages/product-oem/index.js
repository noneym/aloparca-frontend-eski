import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import {
  Header,
  Segment,
  TransitionablePortal,
  Modal,
  Button,
  Icon
} from 'semantic-ui-react';
import NotFound from '../../components/notfound';
import { Router } from '../../routes';
import Layout from '../../layouts/container';
import { Container, Image, ImageBg } from '../../reactor';
import { seoMeta, redirectCheck } from '../../reactor/func';
import Api from '../../api';
import { addCart, addGarage } from '../../actions';
import { Section } from '../../components/style';
import SiteFeature from '../../components/site-feature';
import ProductPage from './style';
import Spinner from '../../ui/spinner';

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  { title: 'Yıl', name: 'model_yili' },
  { title: 'Motor Hacmi', name: 'motor' },
  { title: 'Beygir Gücü', name: 'beygir' },
];

class StokBilgilendirme extends Component {
  state = { stokModalOpen: false };
  handleOpen = () => this.setState({ stokModalOpen: true });
  handleClose = () => this.setState({ stokModalOpen: false });

  uyeSTB = async () => {
    this.setState({ stokModalOpen: false });
    await Api.get(`Products/stok_durum_bilgilendirme?no=${this.props.product.no}`);
  };

  render() {
    const UyeBilgilendir = (
      <Modal open={this.state.stokModalOpen} onClose={this.handleClose} basic size="small">
        <Header icon="address card outline" content="Stok Bilgilendirme" />
        <Modal.Content>
          <h3>Ürün stok durumu hakkında bilgi almak için onaylayın</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.uyeSTB} inverted>
            <Icon name="checkmark" /> Onay
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <Box>
        {UyeBilgilendir}
        <Flex flexDirection="column" mt={20}>
          <a href="tel:08503330686">
            <div className="stok-yok">Güncel stok bilgisi için bizi arayın 0850 333 0686</div>
          </a>
        </Flex>
      </Box>
    );
  }
}
 
class Product extends React.Component {
  static async getInitialProps({ query, res }) {
    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const { slug } = query;
      const product = await Api.get(`Products/product/?no=OEM${slug}`);
      const meta = res ? await seoMeta(res.req.url) : {};
      const ilIlceNested = await Api.get('/Usta/ililcev2');
      return {
        product,
        meta,
        slug,
        ilIlceNested,
      };
    } catch (e) {
      if (res) {
        const redirect = await redirectCheck(res);
        if (redirect) return redirect;
      }
      return { err: true, query };
    }
  };

  state = {
    isLoading: false,
    meta: this.props.meta,
    quantity: 1,
    minimumSatis: 1,
    openAlert: false,
    activeIndex: 0,
    uyumluKontrol: false,
    carLimit: 10,
    openModal: false,
    openModalServices: false,
    serviceList: null,
    options: {
      marka: { opts: [] },
    },
  };

  async componentDidMount() {
    this.getMeta();
    const { router : { query : { slug } } } = Router;
    const { product, garage, err } = this.props;

    if(err || product.status === false){
      return await Router.push(`/arama/q/${slug}`);
   }

    if (err) return;
    let uyumluArac = product.araclar;
    if (garage && garage.marka && garage.model && product.araclar) {
      uyumluArac = product.araclar.filter(arac => arac.CAR_BRANDS === garage.marka && arac.MODEL_CAR === garage.model);
      if (uyumluArac.length > 0) {
        this.changeState({ uyumluKontrol: true });
      } else {
        uyumluArac = product.araclar;
      }
    }
    this.changeState({ uyumluArac });

    const { name } = parents[0];
    this.optionsData(name);
  }

  UNSAFE_componentWillReceiveProps({ slug }) {
    if (JSON.stringify(this.props.slug) !== JSON.stringify(slug)) {
      this.getMeta(true);
    }
  }

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
  };

  getMeta = async (force = false) => {
    const { meta } = this.props;
    let remeta;
    if (Object.keys(meta).length === 0 || force) {
      remeta = await seoMeta(Router.router.asPath);
    }
    this.setState({ meta: remeta });
  };

  changeIl = (e, { value }) => this.setState({ selectedCity: value });

  changeIlce = async (e, { value }) => {
    const serviceList = await Api.get(`Usta/ustalistesi?il=${this.state.selectedCity}&ilce=${value}&limit=6`);
    this.setState({ serviceList });
  };

  selectComplete = async () => {
    const { options } = this.state;
    const params = parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue =
          typeof selected === 'string' ? selected.replace(/\s/g, '_') : selected;
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
      fd.append('urun_no', this.props.product.no);
      const results = await Api.post('Products/arac_uyumluluk_kontrol', fd);
      this.setState({ result: results.result });
      this.props.dispatch(addGarage(data));
    }
  };

  async optionsData(name, value) {
    const { options } = this.state;

    if (value && options[name].selected === value) return;

    const index = parents.findIndex(item => item.name === name);

    const currentSelected = { [name]: { ...options[name], selected: value } };

    const prevStateOptionsFiltered = Object.keys(options).filter((key) => {
      const prevIndex = parents.findIndex(item => item.name === key);
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
            (prevDataURL, prevName) =>
              `${prevDataURL}/${prevName}/${prevStateOptions[prevName].selected}`,
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
        const data = opts.map(text => ({ text, value: text }));
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

  changeState = obj => this.setState(obj);

  changeQuantity = (type, max) => {
    if (!(type === 'dec' && this.state.quantity === 1)) {
      if (
        !(
          type === 'inc' &&
          (this.state.quantity > max || this.state.quantity + this.state.minimumSatis > max)
        )
      ) {
        this.setState(prevState => ({
          quantity:
            prevState.quantity +
            (type === 'inc' ? +this.state.minimumSatis : -this.state.minimumSatis),
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
      } else {
        this.setState({ quantity: e.target.max, openAlert: true });
      }
    }
  };

  alertClose = () => this.setState({ openAlert: false });

  alertOpen = () => {
    setTimeout(() => this.setState({ openAlert: false }), 5000);
  };

  accordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  historyBack = () => Router.back();

  addCartForm = async (e) => {
    e.preventDefault();
    const { dispatch, product } = this.props;
    this.setState({ isLoading: true });
    await dispatch(addCart({
      id: `OEM${product.no}`,
      quantity: this.adet.value,
      name: product.name,
      gorsel: product.gorsel,
    }));

    this.setState({ isLoading: false });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  closeModalServices = () => {
    this.setState({ openModalServices: false });
  };

  selectLogo = (item) => {
    if (item.includes('otosan')) return '/static/img/logolar/markalar/marka_fordotosan.svg';
    if (item.includes('usa')) return '/static/img/logolar/markalar/marka_fordusa.svg';
    if (item.includes('alfa')) return '/static/img/logolar/markalar/marka_alfaromeo.svg';
    if (item.includes('anadol')) return '/static/img/logolar/markalar/marka_anadol.svg';
    if (item.includes('aston')) return '/static/img/logolar/markalar/marka_astonmartin.svg';
    if (item.includes('audi')) return '/static/img/logolar/markalar/marka_audi.svg';
    if (item.includes('bentley')) return '/static/img/logolar/markalar/marka_bentley.svg';
    if (item.includes('bmw')) return '/static/img/logolar/markalar/marka_bmw.svg';
    if (item.includes('bugatti')) return '/static/img/logolar/markalar/marka_bugatti.svg';
    if (item.includes('cadillac')) return '/static/img/logolar/markalar/marka_cadillac.svg';
    if (item.includes('chery')) return '/static/img/logolar/markalar/marka_chery.svg';
    if (item.includes('chevrolet')) return '/static/img/logolar/markalar/marka_chevrolet.svg';
    if (item.includes('chrysler')) return '/static/img/logolar/markalar/marka_chrysler.svg';
    if (item.includes('citroen')) return '/static/img/logolar/markalar/marka_citroen.svg';
    if (item.includes('dacia')) return '/static/img/logolar/markalar/marka_dacia.svg';
    if (item.includes('daewoo')) return '/static/img/logolar/markalar/marka_daewoo.svg';
    if (item.includes('daf')) return '/static/img/logolar/markalar/marka_daf.svg';
    if (item.includes('daihatsu')) return '/static/img/logolar/markalar/marka_daihatsu.svg';
    if (item.includes('dodge')) return '/static/img/logolar/markalar/marka_dodge.svg';
    if (item.includes('ferrari')) return '/static/img/logolar/markalar/marka_ferrari.svg';
    if (item.includes('fiat')) return '/static/img/logolar/markalar/marka_fiat.svg';
    if (item.includes('geely')) return '/static/img/logolar/markalar/marka_geely.svg';
    if (item.includes('gmc')) return '/static/img/logolar/markalar/marka_gmc.svg';
    if (item.includes('honda')) return '/static/img/logolar/markalar/marka_honda.svg';
    if (item.includes('hummer')) return '/static/img/logolar/markalar/marka_hummer.svg';
    if (item.includes('hyundai')) return '/static/img/logolar/markalar/marka_hyundai.svg';
    if (item.includes('infiniti')) return '/static/img/logolar/markalar/marka_infiniti.svg';
    if (item.includes('isuzu')) return '/static/img/logolar/markalar/marka_isuzu.svg';
    if (item.includes('iveco')) return '/static/img/logolar/markalar/marka_iveco.svg';
    if (item.includes('jaguar')) return '/static/img/logolar/markalar/marka_jaguar.svg';
    if (item.includes('jeep')) return '/static/img/logolar/markalar/marka_jeep.svg';
    if (item.includes('kia')) return '/static/img/logolar/markalar/marka_kia.svg';
    if (item.includes('lamborghini')) return '/static/img/logolar/markalar/marka_lamborghini.svg';
    if (item.includes('lancia')) return '/static/img/logolar/markalar/marka_lancia.svg';
    if (item.includes('landrover')) return '/static/img/logolar/markalar/marka_landrover.svg';
    if (item.includes('lincoln')) return '/static/img/logolar/markalar/marka_lincoln.svg';
    if (item.includes('maserati')) return '/static/img/logolar/markalar/marka_maserati.svg';
    if (item.includes('mazda')) return '/static/img/logolar/markalar/marka_mazda.svg';
    if (item.includes('benz')) return '/static/img/logolar/markalar/marka_mercedesbenz.svg';
    if (item.includes('mercedes')) return '/static/img/logolar/markalar/marka_mercedes.svg';
    if (item.includes('mini')) return '/static/img/logolar/markalar/marka_mini.svg';
    if (item.includes('mitsubishi')) return '/static/img/logolar/markalar/marka_mitsubishi.svg';
    if (item.includes('nissan')) return '/static/img/logolar/markalar/marka_nissan.svg';
    if (item.includes('opel')) return '/static/img/logolar/markalar/marka_opel.svg';
    if (item.includes('peugeot')) return '/static/img/logolar/markalar/marka_peugeot.svg';
    if (item.includes('porsche')) return '/static/img/logolar/markalar/marka_porsche.svg';
    if (item.includes('ranger')) return '/static/img/logolar/markalar/marka_ranger.svg';
    if (item.includes('trucks')) return '/static/img/logolar/markalar/marka_renaulttrucks.svg';
    if (item.includes('renault')) return '/static/img/logolar/markalar/marka_renault.svg';
    if (item.includes('rollsroyce')) return '/static/img/logolar/markalar/marka_rollsroyce.svg';
    if (item.includes('rover')) return '/static/img/logolar/markalar/marka_rover.svg';
    if (item.includes('saab')) return '/static/img/logolar/markalar/marka_saab.svg';
    if (item.includes('seat')) return '/static/img/logolar/markalar/marka_seat.svg';
    if (item.includes('shelby')) return '/static/img/logolar/markalar/marka_shelby.svg';
    if (item.includes('skoda')) return '/static/img/logolar/markalar/marka_skoda.svg';
    if (item.includes('smart')) return '/static/img/logolar/markalar/marka_smart.svg';
    if (item.includes('ssangyong')) return '/static/img/logolar/markalar/marka_ssangyong.svg';
    if (item.includes('subaru')) return '/static/img/logolar/markalar/marka_subaru.svg';
    if (item.includes('suzuki')) return '/static/img/logolar/markalar/marka_suzuki.svg';
    if (item.includes('tofas')) return '/static/img/logolar/markalar/marka_tofas.svg';
    if (item.includes('toyota')) return '/static/img/logolar/markalar/marka_toyota.svg';
    if (item.includes('vauxhall')) return '/static/img/logolar/markalar/marka_vauxhall.svg';
    if (item.includes('volvo')) return '/static/img/logolar/markalar/marka_volvo.svg';
    if (item.includes('vw')) return '/static/img/logolar/markalar/marka_vw.svg';
    return '/static/img/logolar/markalar/marka_vw.svg';
  };

  isOriginal = (item) => {
    if (item.parca_tipi === 1) return '/static/b2b/orijinal.svg';
    if (item.parca_tipi === 3) return '/static/b2b/yansanayi.svg';
    return '/static/b2b/logosuz-orijinal.svg';
  };

  
  duzeltme = () => {
    let pNo = product.parcakodu
        switch (pNo) {
        case "15932938":
          return "5W40 MOTOR YAĞI (BENZİNLİ) 229.3 5LT"
         
        case "15932936":
          return "5W40 MOTOR YAĞI (BENZİNLİ) 229.3 1LT"
         
        default:
          return product.name;
      }
  };


  render() {
    const {
      product, err, isLogin
    } = this.props;
    if (err) {
      return <NotFound />;
    }
    const {
      isLoading,
      meta,
      openAlert
    } = this.state;
    const { kredikarti, ...tutarlar } = product.taksit;
      
    const b2bPrice = product.b2b_indirim_yuzdesi === 0 || null || undefined ? product.fiyat : product.fiyat - ((product.fiyat / 100) * product.b2b_indirim_yuzdesi);

    return (
      <Layout meta={meta} isProductDetail hasFixedAddCart={parseInt(product.stokdurumu, 10) !== 0}>
        <ProductPage>
          <Container>
            <Section className="product" my={1}>
              <Flex className="product-top">
                <Flex width={[1, 1, 3 / 7]}>
                  <img
                    className="marka-logo"
                    src={this.selectLogo(product.arac_marka.toLowerCase())}
                    alt={product.arac_marka}
                  />
                </Flex>

                <Flex width={[1, 1, 4 / 7]} className="detail" justifyContent="space-between">
                  <Flex
                    className="title-wrapper"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <h1>
                      {duzeltme()}
                    </h1>
                    <img
                      className="brand"
                      src={this.isOriginal(product.orjinal_yan.toLowerCase())}
                      alt={product.stokmarka}
                    />
                  </Flex>
                  <Flex className="marka-stok" mt={2}>
                    <Box className="marka">
                      <span>Marka: </span> {product.arac_marka}
                    </Box>
                    <Box className="marka">
                      <span>Stok Kodu:</span> {product.parcakodu}
                    </Box>
                  </Flex>
                  <Flex mt={2} className="rating">
                    <Box>
                      <Image
                        src={
                          product.orjinal_yan === 'Orjinal'
                            ? '/static/img/t/icons/rating-full.svg'
                            : '/static/img/t/icons/rating.svg'
                        }
                        alt="Rating"
                      />
                    </Box>
                  </Flex>
                  <Flex mt={3} className="price-wrapper">
                    <Box className="price">
                      <Flex>
                        {product.b2b_indirim_yuzdesi && product.b2b_indirim_yuzdesi >= 1 ? (
                          <Box mr={1}>
                            <ImageBg className="indirim" src="/static/img/t/icons/indirim.svg">
                              <span>%{product.b2b_indirim_yuzdesi}</span>
                              <p>indirim</p>
                            </ImageBg>
                          </Box>
                        ) : ''}
                        <Flex mt={2} className="price-area">
                          {product.liste_fiyat !== product.fiyat && (
                            <div>
                              <Box className="sale b2b">
                                {product.liste_fiyat}TL
                              </Box>
                            </div>
                          )}

                          <Box className="sold-price">
                            <span>{b2bPrice}</span>
                            {' '}
                            TL
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    {parseInt(product.stokdurumu, 10) === 0 ? (
                      <StokBilgilendirme product={product} isLogin={isLogin} />
                    ) : (
                        <Box className="satinal" mt={2}>
                          <form onSubmit={this.addCartForm}>
                            <Flex>
                              <Flex className="quantity">
                                <Box
                                  onClick={() =>
                                    this.changeQuantity('dec', parseInt(product.stok_adet, 10))
                                  }
                                >
                                  <Image src="/static/img/t/icons/eksi.svg" />
                                </Box>
                                <Box className="input">
                                  <input
                                    name="adet"
                                    type="number"
                                    value={this.state.quantity}
                                    onChange={this.changeQuantityValue}
                                    onFocus={e => e.target.select()}
                                    max={product.stok_adet}
                                    min={this.state.minimumSatis}
                                    ref={(n) => {
                                      this.adet = n;
                                    }}
                                  />
                                  <span>adet</span>
                                </Box>
                                <Box
                                  onClick={() =>
                                    this.changeQuantity('inc', parseInt(product.stok_adet, 10))
                                  }
                                >
                                  <Image src="/static/img/t/icons/arti.svg" />
                                </Box>
                              </Flex>
                              <Flex ml={2} className="add-to-cart">
                                <button type="submit" name="btn_submit" disabled={isLoading}>
                                  SEPETE EKLE{' '}
                                  {isLoading && (
                                    <Spinner marginLeft={15} size="tiny" />
                                  )}
                                </button>
                              </Flex>
                            </Flex>
                          </form>
                        </Box>
                      )}
                  </Flex>
                  {product.b2b_indirim_yuzdesi !== 0 && (
                    <div className="b2b-aciklama-urundetay">
                       <p>B2B Müşterilerine Özel Ekstra %{product.b2b_indirim_yuzdesi} İndirimli Fiyat</p> 
                       <p>Toplam indirim oranı: <b>%{(100-(100*b2bPrice/Number(product.liste_fiyat))).toFixed(0)}</b></p> 
                    </div>
                  )}
                  <Flex mt={3} className="icon-list">
                    <Flex className="item">
                      <Box className="icon">
                        <Image src="/static/product-icons/kolay-iade.svg" />
                      </Box>
                      <Box className="text">KOLAY İADE</Box>
                    </Flex>
                    <Flex className="item">
                      <Box className="icon">
                        <Image src="/static/product-icons/9-taksit-imkani.svg" />
                      </Box>
                      <Box className="text">9 TAKSİT İMKANI</Box>
                    </Flex>
                    <Flex className="item">
                      <Box className="icon">
                        <Image src="/static/product-icons/garantili-urun.svg" />
                      </Box>
                      <Box className="text">GARANTİLİ ÜRÜN</Box>
                    </Flex>
                    <Flex className="item">
                      <Box className="icon">
                        <Image src="/static/product-icons/guvenli-alisveris.svg" />
                      </Box>
                      <Box className="text">GÜVENLİ ALIŞVERİŞ</Box>
                    </Flex>
                    <Flex className="item">
                      <Box className="icon">
                        <Image src="/static/product-icons/24-saatte-kargo.svg" />
                      </Box>
                      <Box className="text">24 SAATTE KARGO</Box>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Section>
            <div className="site-feature">
              <SiteFeature />
            </div>
            {parseInt(product.stokdurumu, 10) !== 0 && (
              <Flex className="fixed-checkout">
                <Flex width={1 / 2} className="quantity">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    className="inc-dec"
                    onClick={() => this.changeQuantity('dec', parseInt(product.stok_adet, 10))}
                  >
                    <Image src="/static/img/t/icons/eksi.svg" />
                  </Flex>
                  <Box className="input">
                    <input
                      name="adet"
                      type="number"
                      value={this.state.quantity}
                      onChange={this.changeQuantityValue}
                      onFocus={e => e.target.select()}
                      max={product.stok_adet}
                    />
                    <span>adet</span>
                  </Box>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    className="inc-dec"
                    onClick={() => this.changeQuantity('inc', parseInt(product.stok_adet, 10))}
                  >
                    <Image src="/static/img/t/icons/arti.svg" />
                  </Flex>
                </Flex>
                <Flex
                  className="addtocart"
                  width={1 / 2}
                  alignItems="center"
                  justifyContent="center"
                  onClick={this.addCartForm}
                >
                  Sepete Ekle
                </Flex>
              </Flex>
            )}
          </Container>
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
                <strong>{product.name}</strong> için maksimum{' '}
                <strong>{product.stok_adet} adet</strong> ürün satın alabilirsiniz.
              </p>
              <p>Daha fazla ürün temini için lütfen bizimle iletişime geçiniz.</p>
            </Segment>
          </TransitionablePortal>
        </ProductPage>
      </Layout>
    );
  }
}
const mapStateToProps = ({ garage, isLogin }) => ({ garage, isLogin });
export default connect(mapStateToProps)(Product);
