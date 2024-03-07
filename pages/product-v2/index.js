import React, { Component } from "react";
import { connect } from "react-redux";
import { Flex, Box } from "@rebass/grid";
import {
  Tab,
  Header,
  Segment,
  TransitionablePortal,
  Modal,
  Select,
  Accordion,
  Menu,
  Button,
  Icon,
  Form,
  Input
} from "semantic-ui-react";
import styled from "styled-components";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";
import cx from "classnames";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import MaskedInput from "react-text-mask";
import Countdown from "react-countdown-now";
import { isMobile } from "react-device-detect";
import NotFound from "../../components/notfound";
import { Router } from "../../routes";
import Layout from "../../layouts/container";
import { Container, Image, ImageBg, Link } from "../../reactor";
import { seoMeta, redirectCheck, site } from "../../reactor/func";
import Api from "../../api";
import { addCart, addGarage } from "../../actions";
import { Section } from "../../components/style";
import ProductSlider from "../../components/product-slider";
import SiteFeature from "../../components/site-feature";
import ProductPage from "./style";
import BreadCrumb from "../../components/breadcrumb";
import Slider from "./slider";
import Taksit from "./tabs/taksit";
import UyumluArac from "./tabs/uyumlu-arac";
import Ozellikler from "./tabs/ozellikler";
import OemKod from "./tabs/oem";
import SeoContent from "../../components/product-list/seo-content";

import { media } from "../../style/theme";
import Spinner from "../../ui/spinner";

const RatingAndMadeni = styled(Flex)`
  align-items: flex-start !important;

  ${media.desktop`
    flex-direction: column;
  `};

  ${media.tablet`
    align-items: center !important;
  `};
`;

const MadenYag = styled(Box)`
  margin-left: auto;
  display: flex;
  align-items: center;

  ${media.desktop`
    margin-top: 20px;
    margin-left: 0;
  `};
`;

const MYIconCard = styled.div`
  border-radius: 15px;
  border: 1px solid #ff8900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 60px;
  width: 140px;
  box-shadow: 0 0 5px rgba(255, 137, 0, 0.3);
  margin-right: 30px;

  ${media.mini`
    width: 130px;
    margin-right: 20px;
  `};
`;

const MYIconCardLink = styled(Link)`
  border-radius: 15px;
  border: 1px solid #ff8900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 60px;
  width: 140px;
  box-shadow: 0 0 5px rgba(255, 137, 0, 0.3);

  &:hover {
    box-shadow: 0 0 7px rgba(255, 137, 0, 1);
    transition: all 300ms;
    color: #666;
  }

  ${media.mini`
    width: 130px;
  `};
`;

const CampainPriceFrame = styled(Link)`
  border-radius: 15px;
  border: 1px solid #ff8900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 60px;
  width: 190px;
  box-shadow: 0 0 5px rgba(255, 137, 0, 0.3);
  margin-top: 20px;
  margin-left: 10px;
  &:hover {
    box-shadow: 0 0 7px rgba(255, 137, 0, 1);
    transition: all 300ms;
    color: #666;
  }

  ${media.mini`
    width: 165px;
  `};
`;

const CampainPriceFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #666;
  span {
    font-weight: 300;
    text-transform: uppercase;
    margin: 0;
  }
`;

const CampainPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #666;
  font-size: 17px;
  span {
    font-weight: 100;
    text-transform: uppercase;
    margin: 0;
  }
`;

const MYIconCardFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size 13px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
  }
`;

const HizliKargoImg = styled.img`
  height: 50px !important;
`;

const AyniGunTeslimatImg = styled.img`
  height: 40px !important;
`;

const parents = [
  { title: "Marka", name: "marka" },
  { title: "Model", name: "model" },
  { title: "Kasa", name: "kasa" },
  { title: "Yıl", name: "model_yili" },
  { title: "Motor Hacmi", name: "motor" },
  { title: "Beygir Gücü", name: "beygir" }
];

const getUrunAciklama = product => {
  return '<h2>'+product?.name+'</h2>'+product?.urun_aciklama;
};

const getPanes = (product, taksitTutar, cars, carLimit, changeState) => {
  let tabs = [
    {
      menuItem: "Ürün Açıklaması",
      render: () => (
        <Tab.Pane attached={false}>
          <TabDetail
            content={getUrunAciklama(product)}
            muadil={product?.orjinal_yan}
            seo={product?.urun_tanim}
            brandDescription={product?.marka_aciklama}
          />
        </Tab.Pane>
      )
    }
  ];

  if (cars) {
    tabs = [
      ...tabs,
      {
        menuItem: "Uyumlu Araçlar",
        render: () => (
          <Tab.Pane attached={false}>
            <UyumluArac cars={cars} carLimit={carLimit} />
            {carLimit === 10 && (
              <Flex mt={2} justifyContent="center">
                <a
                  href="javascript:;"
                  className="tumunu-goster"
                  onClick={() => changeState({ carLimit: 999 })}
                >
                  tümünü göster
                </a>
              </Flex>
            )}
          </Tab.Pane>
        )
      }
    ];
  }

  if (product?.ozellikler && product?.ozellikler.length > 0) {
    tabs = [
      ...tabs,
      {
        menuItem: "Özellikler",
        render: () => (
          <Tab.Pane attached={false}>
            <Ozellikler ozellikler={product.ozellikler} />
          </Tab.Pane>
        )
      }
    ];
  }
  if (product?.oems && product?.oems.length > 0) {
    tabs = [
      ...tabs,
      {
        menuItem: "OEM Kodları",
        render: () => (
          <Tab.Pane attached={false}>
            <OemKod
              oemler={product?.oems}
            />
          </Tab.Pane>
        )
      }
    ];
  }

  if (product?.taksitler) {
    tabs = [
      ...tabs,
      {
        menuItem: "Taksit Seçenekleri",
        render: () => (
          <Tab.Pane attached={false}>
            <Taksit
              className="taksit"
              taksit={product.taksitler}
              taksitTutar={taksitTutar}
            />
          </Tab.Pane>
        )
      }
    ];
  }

  return tabs;
};

const ProductDetailTab = ({
  product,
  taksitTutar,
  cars,
  carLimit,
  changeState
}) => {
  const panes = getPanes(product, taksitTutar, cars, carLimit, changeState);
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
};

const TabDetail = ({ content, muadil, seo, brandDescription }) => (
  <div>
    <div className="tab-detail">
      {seo && (
        <p>
          <h2>{seo.baslik}</h2>
          {seo.text}
        </p>
      )}
      {/* <SeoContent
        title={seo && seo.baslik}
        content={content}
        mt={!isMobile && "-10"}
      /> */}

      {/*content && (
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\\r\n|\\n|\\r/g, '') }} />
      )}
      {brandDescription && (
      <div style={{ marginTop: '15px' }} dangerouslySetInnerHTML={{ __html: brandDescription }} />
      )*/}
    </div>
    {muadil !== "Orjinal" && (
      <div className="brand">
        <div className="brand-title">Marka Hakkında (Muadil Ürün)</div>
        <div className="brand-text">
          Aracınızda önemli rollerde olan aksamların kalitesi oldukça önemlidir.
          Yan sanayi yedek parçalar da tıpkı orijinal yedek parçalar gibi birçok
          testten geçerler ve kullanıma sunulurlar. Yan sanayi ürünler, üretici
          firmaların, belli kalite şartlarını yerine getiren firmalara üretim
          yetkisi vermesi ile üretilir. Yan sanayi ürünler kesinlikle lisanssız
          ya da taklit ürünler değildir.
        </div>
      </div>
    )}
  </div>
);

class StokBilgilendirme extends Component {
  state = { stokModalOpen: false };

  handleOpen = () => this.setState({ stokModalOpen: true });

  handleClose = () => this.setState({ stokModalOpen: false });

  uyeSTB = async () => {
    this.setState({ stokModalOpen: false });
    await Api.get(
      `Products/stok_durum_bilgilendirme?no=${this.props.product.no}`
    );
  };

  ziyaretciSTB = async () => {};

  render() {
    const { product, isLogin } = this.props;
    const { formEmail, formTelefon } = this.state;

    const UyeBilgilendir = (
      <Modal
        open={this.state.stokModalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
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

    const ZiyaretciBilgilendir = (
      <Modal
        open={this.state.stokModalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Modal.Header>Stok Bilgilendirme</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label className="form-label required">E-Posta</label>
                <Input
                  name="email"
                  ref={n => {
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
                    " ",
                    "(",
                    /\d/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    " ",
                    /\d/,
                    /\d/,
                    " ",
                    /\d/,
                    /\d/
                  ]}
                  guide
                  ref={n => {
                    this.telefon = n;
                  }}
                  required
                  className={cx({ error: formTelefon })}
                  placeholder="0(5XX) XXX XX XX"
                  type="text"
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
            <Icon name="checkmark" /> Onay
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <Box>
        {isLogin ? UyeBilgilendir : ZiyaretciBilgilendir}
        <Flex flexDirection="column" mt={20}>
          <a href="tel:08503330686">
            <div className="stok-yok">
              Güncel stok bilgisi için bizi arayın 0850 333 0686
            </div>
          </a>
        </Flex>
      </Box>
    );
  }
}

class Product extends React.Component {
  static async getInitialProps({ query, res, code }) {
    try {
      if (res) {
        const redirect = await redirectCheck(res, "200");
        if (redirect) return redirect;
      }
      const { slug, seotitle } = query;

     // slug değerini string'e çevir
     if (typeof slug !== 'string') {
      slug = slug.toString();
    }


      const product = await Api.get(`Products/product_v2/no/${slug}`);

      // console.log(seotitle);
      // if (product.status === false) {
      //   return await Router.push(`/arama/q/${slug}`);
      //   // throw 404;
      // }

      // if (product.status === false) {
      //   return window.location.replace(`https://www.aloparca.com/arama/q/${slug}`);
      // }
      // if (product.status === false) {
      //  console.log(slug);
      //   return history.push(`/arama/q/${slug}`);
      //   //  throw 404;
      // }

      // console.log(`Hata mesajı 404 ürün no : ${product.no}`);
      // return <Redirect to="/arama/q/`{product.no}`"/>

      // if (query.seoid !== product.parcakodu || query.seomake !== product.stokmarka) {
      //   throw 404;
      // }
      const meta = res ? await seoMeta(res.req.url) : {};
      // console.log(res.req.url);
      const ilIlceNested = await Api.get("/Usta/ililcev2");
      const newData = Object.assign({},{...product.data},{...product.data.product})
      return {
        product: newData,
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
  }

  adres = () => {
    let adres_;
    if (process.browser) {
      // client-side-only code
      adres_ = window.location.href;
      return adres_;
    }
    return "/";
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
      marka: { opts: [] }
    },
    motorYag: false,
    b2bFiyati: null
  };

  async componentDidMount() {
    this.getMeta();
    const {
      router: {
        query: { slug }
      }
    } = Router;
    let { product, garage, err } = this.props;


    this.setState({
      motorYag: !!(
        typeof product !== "undefined" && (await product.madeniyag) === "1"
      )
    });

    // if (err || product.status === false) {
    //   return await Router.push(`/arama/q/${slug}`);
    // }

    if (err) return;
    // console.log(product);
    this.setFiyat(product);

    let uyumluArac = product.araclar;
    if (garage && garage.marka && garage.model && product.araclar) {
      uyumluArac = product.araclar.filter(
        arac =>
          arac.CAR_BRANDS === garage.marka && arac.MODEL_CAR === garage.model
      );
      if (uyumluArac.length > 0) {
        this.changeState({ uyumluKontrol: true });
      } else {
        uyumluArac = product.araclar;
      }
    }

  
    this.changeState({ uyumluArac });

    const { name } = parents[0];
    this.optionsData(name);
    // eslint-disable-next-line no-unused-expressions
    // console.log(window.innerWidth, isMobile);
    window.innerWidth <= 768 && this.changeActiveIndex();
  }

  UNSAFE_componentWillReceiveProps({ slug }) {
    if (JSON.stringify(this.props.slug.toString) !== JSON.stringify(slug.toString)) {
      this.getMeta(true);
    }
  }

  changeActiveIndex = async () => {
    await this.setState({ activeIndex: -1 });
  };

  setFiyat = async item => {
    const b2b_discount =
      (await item.b2b_dicount) != null ? item.b2b_dicount : 0.9;
    const item_fiyat =
      (await item.b2b_dicount) != null
        ? item.fiyat
        : (item.fiyat * b2b_discount).toFixed(2);
    // console.log(item_fiyat,item.b2b_dicount,b2b_discount);
    this.setState({ b2bFiyati: item_fiyat });
  };

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
  };

  getMeta = async (force = false) => {
    try {
      const { meta } = this.props;
      let remeta;
      if (Object.keys(meta).length === 0 || force) {
        remeta = await seoMeta(Router.router.asPath);
      }
      this.setState({ meta: remeta });
    } catch (e) {
      // console.log('Hata: ' + e);
    }
  };

  changeIl = (e, { value }) => this.setState({ selectedCity: value });

  changeIlce = async (e, { value }) => {
    const serviceList = await Api.get(
      `Usta/ustalistesi?il=${this.state.selectedCity}&ilce=${value}&limit=6`
    );
    this.setState({ serviceList });
  };

  selectComplete = async () => {
    const { options } = this.state;
    const params = parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue =
          typeof selected === "string"
            ? selected.replace(/\s/g, "_")
            : selected;
        let newName = item.name;
        if (item.name === "model_yili") {
          newName = "yil";
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
        beygir: options.beygir.selected
      };
      const fd = new FormData();
      fd.append("marka", options.marka.selected);
      fd.append("model", options.model.selected);
      fd.append("kasa", options.kasa.selected);
      fd.append("model_yili", options.model_yili.selected);
      fd.append("motor", options.motor.selected);
      fd.append("beygir", options.beygir.selected);
      fd.append("urun_no", this.props.product.no);
      const results = await Api.post("Products/arac_uyumluluk_kontrol", fd);
      this.setState({ result: results.result });
      this.props.dispatch(addGarage(data));
    }
  };

  async optionsData(name, value) {
    const { options } = this.state;

    if (value && options[name].selected === value) return;

    const index = parents.findIndex(item => item.name === name);

    const currentSelected = { [name]: { ...options[name], selected: value } };

    const prevStateOptionsFiltered = Object.keys(options).filter(key => {
      const prevIndex = parents.findIndex(item => item.name === key);
      return prevIndex < index;
    });
    const prevStateOptions = prevStateOptionsFiltered.reduce(
      (obj, key) => ({ ...obj, [key]: options[key] }),
      {}
    );

    let nextOptions = {};

    if (index !== parents.length - 1) {
      let dataUrl = "Products/araclar";
      if (value) {
        if (index > 0) {
          dataUrl += prevStateOptionsFiltered.reduce(
            (prevDataURL, prevName) =>
              `${prevDataURL}/${prevName}/${prevStateOptions[prevName].selected}`,
            ""
          );
        }
        let newName = name;
        if (name === "yil") {
          newName = "model_yili";
        }
        dataUrl += `/${newName}/${encodeURIComponent(value)}`;
      }

      const nextParent = parents[index + (value ? 1 : 0)];
      if (nextParent) {
        const {
          results: { opts }
        } = await Api.get(dataUrl);
        const data = opts.map(text => ({ text, value: text }));
        nextOptions = { [nextParent.name]: { opts: data } };
      }
    }

    this.setState({
      options: {
        ...prevStateOptions,
        ...currentSelected,
        ...nextOptions
      }
    });

    if (index === parents.length - 1) {
      this.selectComplete();
    }
  }

  changeState = obj => this.setState(obj);

  changeQuantity = (type, max) => {
    if (!(type === "dec" && this.state.quantity === 1)) {
      if (
        !(
          type === "inc" &&
          (this.state.quantity > max ||
            this.state.quantity + this.state.minimumSatis > max)
        )
      ) {
        this.setState(prevState => ({
          quantity:
            prevState.quantity +
            (type === "inc"
              ? +this.state.minimumSatis
              : -this.state.minimumSatis)
        }));
      } else {
        this.setState({ openAlert: true });
      }
    }
  };

  changeQuantityValue = e => {
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

  addCartForm = async e => {
    e.preventDefault();
    const { dispatch, product } = this.props;
    this.setState({ isLoading: true });
    await dispatch(
      addCart({
        id: product.no,
        quantity: this.adet.value,
        name: product.name,
        gorsel: this.handleImages(product.gorsel),
      }),
    );

    this.setState({ isLoading: false });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  closeModalServices = () => {
    this.setState({ openModalServices: false });
  };

  handleImages = (images) => {
    let parsedImage;
    try {
      parsedImage = JSON.parse(images);
    } catch (err) {
      parsedImage = images;
    }

    return parsedImage;
  }

  render() {
    const {
      product,
      garage,
      ilIlceNested,
      err,
      isLogin,
      slug,
      userData
    } = this.props;
    if (err) {
      return <NotFound />;
    }
    const {
      isLoading,
      meta,
      openAlert,
      uyumluKontrol,
      uyumluArac,
      activeIndex,
      carLimit,
      openModal,
      openModalServices,
      result,
      selectedCity,
      serviceList,
      motorYag,
      b2bFiyati
    } = this.state;
    
    
    
    const kart = product.taksitler;
    
    const {kredikarti, ...tutarlar} = kart;
    const taksitTutar = Object.values(tutarlar);
    const remaining = product.kampanya_bitis
      ? moment(
          moment(product.kampanya_bitis)
            .utc()
            .format()
        ).diff(
          moment()
            .utc()
            .format(),
          "seconds"
        )
      : 0;
    const cities = Object.keys(ilIlceNested).map(text => ({
      text,
      value: text
    }));

    const logo =
    product && product.parca_tipi && product.parca_tipi == 1
        ? "/static/b2b/orijinal.svg"
        : product.parca_tipi == 2
        ? "/static/b2b/logosuz-orijinal.svg"
        : "/static/b2b/yansanayi.svg";

    const b2bPrice =
      product.b2b_indirim_yuzdesi === undefined
        ? Number(product.fiyat)
        : Number(product.fiyat) -
          (Number(product.fiyat) / 100) * product.b2b_indirim_yuzdesi;

    let benzerSlider = "";

    if (product.benzer) {
      benzerSlider = product.benzer;
    } else {
      benzerSlider = "";
    }

    const kampanyaliFiyat = product.fiyat/1.05;

    const productNameUpdated = () => {
      // console.log(product)
      const pNo = product.stokkodu;
      switch (pNo) {
        case "15932938":
          return "5W40 MOTOR YAĞI (BENZİNLİ) 229.3 5LT";

        case "15932936":
          return "5W40 MOTOR YAĞI (BENZİNLİ) 229.3 1LT";

        default:
          return product.urunAdi;
      }
    };

    var newTitle = product && product.title ? product.title : null;

    // if(product.breadcrumb !== null){
    //   newTitle = product.breadcrumb[1].name + ' | ' + newTitle;
    // }
    // const prodMeta = meta ? meta : {title:newTitle, description:product.metaDescription,canonical:'https://www.aloparca.com/'+product.breadcrumb[2].link};
    const prodMeta = null;
    return (
      <Layout
        meta={prodMeta}
        isProductDetail
        hasFixedAddCart={parseInt(product.stokdurumu, 10) !== 0}
      >
        
        <ProductPage className={site === "b2b" && "b2b"}>
        
          <Container>
            {/* <div>{JSON.stringify(this.handleImages(product.resim))}</div> */}
            {/* <div>{JSON.stringify(product.resim)}</div> */}
            {site === "aloparca" && (
              <>
                <Box className="breadcrumb-wrapper" pt={2} pb={1}>
                  <BreadCrumb items={product.breadcrumb || ""} isProduct />
                </Box>

                <Section className="product-header" my={0} mx={-2}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex
                      onClick={this.historyBack}
                      className="go-back"
                      alignItems="center"
                    >
                      <i className="icon-chevron-thin-left" />
                      <Link>Geri</Link>
                    </Flex>
                    <Flex alignItems="center">
                      <i className="icon-share" />
                      <i className="icon-cart" />
                    </Flex>
                  </Flex>
                </Section>
              </>
            )}
            
            <Section className="product" my={1}>
              <Flex className="product-top">
                <Slider
                  images={product.resim}
                  key={product.no}
                  name={product.name}
                  isOem={product.parca_tipi === 1}
                />

                <Box className="image-area resimsiz-urun" width={[1, 1, 3 / 7]}>
                  <Box className="product-no-image">
                    <img
                      className="zoom-items"
                      src={`https://images.aloparca.com${product.marka_logo}`}
                      alt=""
                    />
                    <span>{product.name}</span>
                  </Box>
                </Box>

                <Flex
                  width={[1, 1, 4 / 7]}
                  className="detail"
                  justifyContent="space-between"
                >
                  {site === "aloparca" &&
                    product?.kampanya_bitis &&
                    product?.kampanya_aciklama &&
                    remaining > 0 && (
                      <Flex
                        className="campaign-wrapper"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box className="campaign-text">
                          {product?.kampanya_aciklama}
                        </Box>
                        <Flex className="campaign-end" flexDirection="column">
                          <Countdown date={Date.now() + remaining * 1000} />
                          <Box className="campaign-end-text">
                            sonra kampanya bitiyor
                          </Box>
                        </Flex>
                      </Flex>
                    )}
                  <Flex
                    className="title-wrapper"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* <h1>{productNameUpdated().toUpperCase()}</h1> */}
                    {product?.marka_logo && (
                      <>
                        <img
                          data-tip={`<div style="background:white; max-width: 300px;"><div style="font-weight: 700; margin: 5px 0 7.5px; padding-bottom: 5px; font-size: 16px; width: 100%; border-bottom: 1px solid #eee;">${product.stokmarka}</div><div style="font-size: 14px;"></div>${product.marka_aciklama}</div>`}
                          data-place="left"
                          data-effect="solid"
                          data-type="light"
                          data-html
                          data-class="brand-tooltip"
                          className="brand"
                          src={`https://resize.aloparca.com/upload/w_65${product?.marka_logo}`}
                          alt={product?.stokmarka}
                        />
                        <ReactTooltip />
                      </>
                    )}
                    {/* site === 'b2b' && (
                      <img
                        className="brand"
                        src={logo}
                        alt={product.orjinal_yan}
                        style={{ maxHeight: '60px' }}
                      />
                    ) */}
                  </Flex>
                  <Flex className="marka-stok" mt={2}>
                    <Box className="marka">
                      <span>Marka:</span>{" "}
                      {/* {site === "aloparca" && (
                        <Link
                          route="listmarka"
                          params={{ marka: product?.stokmarka }}
                          title={`${product?.stokmarka} Marka Yedek Parçaları`}
                        >
                          {product?.stokmarka}
                        </Link>
                      )} */}
                      {site === "b2b" && product?.stokmarka}
                      {site === "aloparca" && product?.orjinal_yan && (
                        <div
                          style={{ marginLeft: "5px" }}
                        >{`(${product?.orjinal_yan})`}</div>
                      )}
                    </Box>
                    <Box className="marka">
                      <span>Stok Kodu:</span> {product?.parcakodu}
                    </Box>
                  </Flex>
                  <RatingAndMadeni mt={2} className="rating">
                    <Box>
                      <Image
                        src={
                          product?.orjinal_yan === "Orjinal"
                            ? "/static/img/t/icons/rating-full.svg"
                            : "/static/img/t/icons/rating.svg"
                        }
                        alt="Rating"
                      />
                    </Box>
                    {/* <Box className="text">(48 kullanıcı oyu)</Box> */}
                    {motorYag ? (
                      <MadenYag>
                        <MYIconCard>
                          <MYIconCardFlex>
                            <p>Hızlı</p>
                            <p>Kargo</p>
                          </MYIconCardFlex>
                          <HizliKargoImg src="/static/product-icons/hizli-kargo.svg" />
                        </MYIconCard>
                        <MYIconCardLink route="/kurumsal/ayni-gun-teslimat">
                          <MYIconCardFlex>
                            <p>Aynı Gün</p>
                            <p>Teslimat</p>
                          </MYIconCardFlex>
                          <AyniGunTeslimatImg src="/static/product-icons/ayni-gun-teslimat.svg" />
                        </MYIconCardLink>
                      </MadenYag>
                    ) : null}
                  </RatingAndMadeni>
                  <Flex mt={motorYag ? 2 : 3} className="price-wrapper">
                    <Box className="price">
                      <Flex>
                        {site === "aloparca" &&
                        product.indirim_yuzdesi && 
                        product.status == '1' &&
                        product.indirim_yuzdesi >= 1 ? (
                          <Box mr={1}>
                            <ImageBg
                              className="indirim"
                              src="/static/img/t/icons/indirim.svg"
                            >
                              <span>%{product.indirim_yuzdesi}</span>
                              <p>indirim</p>
                            </ImageBg>
                          </Box>
                        ) : (
                          ""
                        )}
                        {site === "b2b" &&
                        product.b2b_indirim_yuzdesi &&
                        product.b2b_indirim_yuzdesi >= 1 ? (
                          <Box mr={1}>
                            <ImageBg
                              className="indirim"
                              src="/static/img/t/icons/indirim.svg"
                            >
                              <span>%{product.b2b_indirim_yuzdesi}</span>
                              <p>indirim</p>
                            </ImageBg>
                          </Box>
                        ) : (
                          ""
                        )}
                        <Flex mt={2} className="price-area">
                          {product.liste_fiyat !== product.fiyat && (
                            <div>
                              {site === "aloparca" && (
                                <Box className="sale">
                                  {product.liste_fiyat}
                                  TL
                                </Box>
                              )}

                              {site === "b2b" && isLogin ? (
                                <Box className="sale b2b">
                                  {product.liste_fiyat}
                                  TL
                                  {/* <div className="sale-2">
                                    {product.liste_fiyat - product.liste_fiyat * 0.17}TL
                                  </div> */}
                                </Box>
                              ) : (
                                ""
                              )}
                            </div>
                          )}

                          {site === "aloparca" && product.indirimli_urun === 0 && product.status == '1' &&(
                            <Box className="sold-price">
                              <span>
                                {product.fiyat.toString().split(".")[0]}
                              </span>
                              {`,${product.fiyat.toString().split(".")[1]}`} TL
                            </Box>
                          )}

                          {site === "aloparca" && product.indirimli_urun === 1 && product.status == '1' &&(
                            <CampainPriceBox>
                              <span>
                                {product.fiyat.toString()} TL
                              </span>
                            </CampainPriceBox>
                          )}
                          
                          {site === "b2b" && (
                            <Box className="sold-price">
                              <span>
                                {typeof b2bFiyati === String
                                  ? Number(b2bFiyati).toFixed(2)
                                  : b2bFiyati}
                              </span>{" "}
                              TL
                            </Box>
                          )}
                        </Flex>
                        {site === "aloparca" && product.indirimli_urun === 1 && product.status == '1' &&(
                            <CampainPriceFrame mt={2} className="price-area">
                              <CampainPriceFlex>
                                Sepette %5 indirim
                                <Box className="campain-sold-price">
                                <span>
                                  {kampanyaliFiyat.toFixed(2)} TL
                                </span>
                              </Box>
                              </CampainPriceFlex>
                            </CampainPriceFrame>
                          )}
                      </Flex>
                    </Box>
                    <div>{product.stokdurumu}</div>
                    {product.status === "1" ? (
                      <>

                      
                    {parseInt(product.stokdurumu, 10) === 0 ? (
                      <StokBilgilendirme product={product} isLogin={isLogin} />
                    ) : (
                      
                      <Box className="satinal" mt={2}>
                        <form onSubmit={this.addCartForm}>
                          <Flex>
                            <Flex className="quantity">
                              <Box
                                onClick={() =>
                                  this.changeQuantity(
                                    "dec",
                                    parseInt(product.stok_adet, 10)
                                  )
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
                                  ref={n => {
                                    this.adet = n;
                                  }}
                                />
                                <span>adet</span>
                              </Box>
                              <Box
                                onClick={() =>
                                  this.changeQuantity(
                                    "inc",
                                    parseInt(product.stok_adet, 10)
                                  )
                                }
                              >
                                <Image src="/static/img/t/icons/arti.svg" />
                              </Box>
                            </Flex>
                            <Flex ml={2} className="add-to-cart">
                              <button type="submit" name="btn_submit" disabled={isLoading}>
                                SEPETE EKLE
                                {isLoading && (
                                  <Spinner marginLeft={15} size="tiny" />
                                )}
                              </button>
                            </Flex>
                          </Flex>
                        </form>
                      </Box>

                    )}
                    </>
                    ):(
                      <Box>
                        
                        <h1>Bu ürün satışa kapalıdır!</h1></Box>
                    )}
                  </Flex>
                  {site === "b2b" &&
                    isLogin &&
                    product.b2b_indirim_yuzdesi !== 0 && (
                      <div className="b2b-aciklama-urundetay">
                        <p>
                          B2B Müşterilerine Özel Toplam İndirim:
                          <b>
                            {" "}
                            %
                            {(
                              100 -
                              (100 * b2bFiyati) / Number(product.liste_fiyat)
                            ).toFixed(0)}
                          </b>
                        </p>
                      </div>
                    )}

                  {product.parca_tipi &&
                    product.parca_tipi === 1 &&
                    product.dezenfektan !== "1" && (
                      <div className="descriptionOrjYed">
                        <span>Parça Türü:</span> Logolu Orijinal Yedek Parça
                      </div>
                    )}
                  {product.parca_tipi &&
                    product.parca_tipi === 2 &&
                    product.dezenfektan !== "1" && (
                      <div className="descriptionOrjYed">
                        <span>Parça Türü:</span> Logosuz Orijinal Yedek Parça
                      </div>
                    )}
                  {product.parca_tipi &&
                    product.parca_tipi === 3 &&
                    product.dezenfektan !== "1" && (
                      <div className="descriptionOrjYed">
                        <span>Parça Türü:</span> Muadil Yedek Parça
                      </div>
                    )}
                  {product.dezenfektan === "1" && (
                    <div className="descriptionOrjYed">
                      <span>Parça Türü:</span> Temizlik ve Hijyen
                    </div>
                  )}

                  <div className="description">
                    <span>Tedarikçi Açıklaması:</span>{" "}
                    {product.tedarikci_aciklama}
                  </div>
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
                  {site === "aloparca" && (
                    <>
                      {parseInt(product.uyumlu_arac, 10) === 1 ? (
                        uyumluKontrol ? (
                          <Flex
                            alignItems="center"
                            justifyContent="center"
                            className="car active"
                          >
                            <i className="icon-uyumlu" />
                            {`${garage?.marka} ${garage?.model}`} ile %100
                            uyumludur
                          </Flex>
                        ) : (
                          <a
                            href="javascript:;"
                            onClick={() => this.setState({ openModal: true })}
                            className="car"
                          >
                            ARAÇ UYUMLULUĞUNU KONTROL ET
                          </a>
                        )
                      ) : (
                        <Box style={{ height: "76px" }} />
                      )}
                      <a
                        href="javascript:;"
                        onClick={() =>
                          this.setState({ openModalServices: true })
                        }
                        className="services"
                        mt={2}
                      >
                        <i className="icon-hesabim-bilgilerimi-guncelle" /> EN
                        YAKIN SERVİSİ BUL
                      </a>
                    </>
                  )}

                  {
                    <div className="social-media-share">
                      <div>
                        <br />
                        <h2>Bu ürünü sosyal medyada paylaş!</h2>
                        <FacebookShareButton
                          url={this.adres()}
                          className="share"
                        >
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={this.adres()}
                          className="share"
                        >
                          <TwitterIcon size={40} round />
                        </TwitterShareButton>
                        <LinkedinShareButton
                          url={this.adres()}
                          className="share"
                        >
                          <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={this.adres()}
                          className="share"
                        >
                          <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                        <EmailShareButton url={this.adres()} className="share">
                          <EmailIcon size={40} round />
                        </EmailShareButton>
                      </div>
                    </div>
                  }
                </Flex>
              </Flex>
            </Section>
            {/* {product?.tavsiye_urunler === null ? null : (
              <ProductSlider
                title="Bu Ürünler ile Birlikte Tavsiye Ettiklerimiz"
                products={product.tavsiye_urunler.filter(
                  p => p.stokdurumu != 0
                )}
                isCart
              />
            )} */}
            {/* {<div>{JSON.stringify(product.product)}</div> } */}
            {site === "aloparca" && (
              <>
                <Section className="product-detail" my={1}>
                  <ProductDetailTab
                    product={product}
                    taksitTutar={taksitTutar}
                    cars={uyumluArac}
                    carLimit={carLimit}
                    changeState={this.changeState}
                  />
                </Section>
                <Section className="product-detail-mobile" mx={-2} my={1}>
                  <Accordion as={Menu} vertical>
                    <Menu.Item>
                      <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.accordionClick}
                      >
                        Ürün Açıklaması
                        <i
                          className={cx({
                            "icon-remove": activeIndex === 0,
                            "icon-add": activeIndex !== 0
                          })}
                        />
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 0}>
                        <TabDetail
                          content={product.urun_aciklama}
                          muadil={product.orjinal_yan}
                          seo={product.urunAdi}
                          brandDescription={product.marka_aciklama}
                        />
                      </Accordion.Content>
                    </Menu.Item>

                    <Menu.Item>
                      <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.accordionClick}
                      >
                        Uyumlu Araçlar
                        <i
                          className={cx({
                            "icon-remove": activeIndex === 1,
                            "icon-add": activeIndex !== 1
                          })}
                        />
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 1}>
                        <UyumluArac cars={uyumluArac} carLimit={carLimit} />
                        {carLimit === 10 && (
                          <Flex mt={2} justifyContent="center">
                            <a
                              href="javascript:;"
                              className="tumunu-goster"
                              onClick={() => this.setState({ carLimit: 999 })}
                            >
                              tümünü göster
                            </a>
                          </Flex>
                        )}
                      </Accordion.Content>
                    </Menu.Item>

                    <Menu.Item>
                      <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.accordionClick}
                      >
                        Özellikler
                        <i
                          className={cx({
                            "icon-remove": activeIndex === 2,
                            "icon-add": activeIndex !== 2
                          })}
                        />
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 2}>
                        {/* <Ozellikler ozellikler={product.ozellikler} /> */}
                      </Accordion.Content>
                    </Menu.Item>
                    {/* <Menu.Item>
                      <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.accordionClick}
                      >
                        OEM Kodları
                        <i
                          className={cx({
                            "icon-remove": activeIndex === 3,
                            "icon-add": activeIndex !== 3
                          })}
                        />
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 3}>
                        <OemKod
                          oemler={product.oemler}
                        />
                      </Accordion.Content>
                    </Menu.Item> */}
                    <Menu.Item>
                      <Accordion.Title
                        active={activeIndex === 4}
                        index={4}
                        onClick={this.accordionClick}
                      >
                        Taksit Seçenekleri
                        <i
                          className={cx({
                            "icon-remove": activeIndex === 4,
                            "icon-add": activeIndex !== 4
                          })}
                        />
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === 4}>
                        <Taksit
                          className="taksit"
                          taksit={product.taksitler}
                          taksitTutar={taksitTutar}
                        />
                      </Accordion.Content>
                    </Menu.Item>
                  </Accordion>
                </Section>

                <ProductSlider
                  title="Benzer Ürünler"
                  products={benzerSlider}
                  sectionProps={{ my: 3 }}
                />
              </>
            )}
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
                    onClick={() =>
                      this.changeQuantity(
                        "dec",
                        parseInt(product.stok_adet, 10)
                      )
                    }
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
                    onClick={() =>
                      this.changeQuantity(
                        "inc",
                        parseInt(product.stok_adet, 10)
                      )
                    }
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
          <TransitionablePortal
            onClose={this.alertClose}
            open={openAlert}
            onOpen={this.alertOpen}
          >
            <Segment
              style={{
                left: "40%",
                position: "fixed",
                top: "10%",
                zIndex: 1000
              }}
            >
              <Header>Stok Miktarı Hakkında</Header>
              <p>
                <strong>{product.name}</strong> için maksimum{" "}
                <strong>{product.stok_adet} adet</strong> ürün satın
                alabilirsiniz.
              </p>
              <p>
                Daha fazla ürün temini için lütfen bizimle iletişime geçiniz.
              </p>
            </Segment>
          </TransitionablePortal>
          <Modal
            size="tiny"
            open={openModal}
            onClose={this.closeModal}
            closeIcon
          >
            <Modal.Header>{`${product.stokmarka} ${product.name} Araç Uyumluluğu`}</Modal.Header>
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
                          value={select.selected || ""}
                          style={{ width: "100%" }}
                        />
                      </Box>
                    );
                  }
                })}
                {result &&
                  (result == "200" ? (
                    <Box my={3} style={{ textAlign: "center", color: "green" }}>
                      Aracınız ile %100 uyumludur.
                    </Box>
                  ) : (
                    <Box my={3} style={{ textAlign: "center", color: "red" }}>
                      Aracınız ile uyumlu değildir.
                    </Box>
                  ))}
              </Flex>
            </Modal.Content>
          </Modal>
          <Modal
            size="tiny"
            open={openModalServices}
            onClose={this.closeModalServices}
            closeIcon
          >
            <Modal.Header>
              <i
                className="icon-hesabim-bilgilerimi-guncelle"
                style={{ marginRight: "10px" }}
              />{" "}
              En Yakın Servisi Bul
            </Modal.Header>
            <Modal.Content scrolling style={{ minHeight: "70vh" }}>
              <Flex flexDirection="column">
                <Box pb={2}>
                  Aloparca.com'un önerdiği servislere, satın aldığınız yedek
                  parçaların montajını yaptırabilirsiniz.
                </Box>
                <Flex
                  mx={-1}
                  alignItems="center"
                  className="servismodal-select"
                >
                  <Box px={1} width={[1, 1, 1 / 2]}>
                    <Select
                      placeholder="İl Seçiniz"
                      onChange={this.changeIl}
                      options={cities}
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Box px={1} width={[1, 1, 1 / 2]}>
                    <Select
                      placeholder="İlçe Seçiniz"
                      onChange={this.changeIlce}
                      options={(ilIlceNested[selectedCity] || []).map(text => ({
                        text,
                        value: text
                      }))}
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Flex>
              </Flex>
              {serviceList ? (
                serviceList.length ? (
                  <Flex flexDirection="column">
                    {serviceList.map(item => (
                      <Flex
                        className="service-list"
                        key={item.Id}
                        py={2}
                        flexDirection="column"
                      >
                        <Flex>
                          <Box width={1 / 5}>
                            <strong>Firma Adı:</strong>
                          </Box>
                          <Box width={4 / 5}>{item.name}</Box>
                        </Flex>
                        <Flex mt={1}>
                          <Box width={1 / 5}>
                            <strong>Adres:</strong>
                          </Box>
                          <Box width={4 / 5}>{item.adres}</Box>
                        </Flex>
                        <Flex mt={1}>
                          <Box width={1 / 5}>
                            <strong>Telefon:</strong>
                          </Box>
                          <Box width={4 / 5}>{item.telefon}</Box>
                        </Flex>
                        {JSON.parse(item.hizmetler).length > 0 && (
                          <Flex mt={1}>
                            <Box width={1 / 5}>
                              <strong>Hizmetler:</strong>
                            </Box>
                            <Box width={4 / 5}>
                              {JSON.parse(item.hizmetler)
                                .slice(0, 5)
                                .join(", ")}
                            </Box>
                          </Flex>
                        )}
                      </Flex>
                    ))}
                  </Flex>
                ) : (
                  <Flex py={3} justifyContent="center">
                    Aradığınız konumda servis bulunamadı
                  </Flex>
                )
              ) : (
                ""
              )}
              <Flex width={1} mt={3} flexDirection="column">
                <Flex
                  width={1}
                  className="warning-title"
                  alignItems="center"
                  justifyContent="center"
                >
                  <i className="icon-warning" /> Önemli Bilgilendirme
                </Flex>
                <Flex
                  width={1}
                  mt={2}
                  className="warning-content"
                  flexDirection="column"
                >
                  <p>
                    Aloparça'nın servislerle veya ustalarla ticari bir anlaşması
                    yoktur.
                  </p>
                  <p>
                    Oluşabilecek herhangi bir anlaşmazlıkta Aloparça sorumluluk
                    kabul etmez.
                  </p>
                  <p>
                    Verilen adres ve telefonlar ustası yada servisi olmayan
                    müşterilerimize yardımcı olmak amaçlıdır.
                  </p>
                  <p>
                    Anlayışınız ve Aloparça'yı tercih ettiğiniz için
                    teşekkürler.
                  </p>
                </Flex>
              </Flex>
            </Modal.Content>
          </Modal>
        </ProductPage>
      </Layout>
    );
  }
}
const mapStateToProps = ({ garage, isLogin, userData }) => ({
  garage,
  isLogin,
  userData
});
export default connect(mapStateToProps)(Product);
