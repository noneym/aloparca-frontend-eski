import React, { Component } from "react";
import { Flex, Box } from "@rebass/grid";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { media } from "../../../style/theme";
import {
  Header,
  Modal,
  Select,
  Button,
  Icon,
  Form,
  Input
} from "semantic-ui-react";
import DotDotDot from "react-dotdotdot";
import cx from "classnames";

import Api from "../../../api";
import { Link } from "../../../reactor";
import { Discount, TitleContent, Price, ImageBg } from "../../product";
import Outer from "./style";
import { addCart, addGarage } from "../../../actions";
import MaskedInput from "react-text-mask";
import Spinner from "../../../ui/spinner";

const parents = [
  { title: "Marka", name: "marka" },
  { title: "Model", name: "model" },
  { title: "Kasa", name: "kasa" },
  { title: "Yıl", name: "model_yili" },
  { title: "Motor Hacmi", name: "motor" },
  { title: "Beygir Gücü", name: "beygir" }
];
const OemBanner = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 11em;
  position: absolute;
  left: 0;
  top: 0;
  span {
    ${props => (props.isOem ? "display: flex" : "display: none")};
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
  ${media.tablet`
  width: 9em;
  font-weight: 600;

  span {
    font-size: 0.8em;

    }
  `};
`;

class StokBilgilendirme extends Component {
  state = { stokModalOpen: false };
  handleOpen = () => {
    this.setState({ stokModalOpen: true });
  };
  handleClose = () => {
    this.setState({ stokModalOpen: false });
  };

  uyeSTB = async () => {
    this.setState({ stokModalOpen: false });
    Api.get(`Products/stok_durum_bilgilendirme?no=${this.props.product.no}`);
  };

  render() {
    const { isLogin } = this.props;
    const { formEmail, formTelefon, stokModalOpen } = this.state;

    const UyeBilgilendir = (
      <Modal
        open={stokModalOpen}
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
        open={stokModalOpen}
        onClose={this.handleClose}
        size="mini"
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
      <Flex flexDirection="column">
        {isLogin ? UyeBilgilendir : ZiyaretciBilgilendir}
        <a href="tel:08503330686">
          <div className="stok-yok">
            Güncel stok bilgisi için bizi arayın 0850 333 0686
          </div>
        </a>
      </Flex>
    );
  }
}

class ProductCard extends React.Component {
  state = {
    isLoading: false,
    openModal: false,
    options: {
      marka: { opts: [] }
    }
  };

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
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
      fd.append("urun_no", this.props.item.no);
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

    await this.setState({
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

  addCartForm = async () => {
    this.setState({ isLoading: true });
    const { dispatch, item } = this.props;
    await dispatch(
      addCart({
        id: item.no,
        quantity: 1,
        name: item.name,
        gorsel: item.gorsel
      })
    );
    this.setState({ isLoading: false });
  };

  modalOpen = () => {
    const { name } = parents[0];
    this.optionsData(name);
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false, result: "" });
  };

  handleImages = (images) => {
    let parsedImage;
    try {
      parsedImage = JSON.parse(images)?.[0];
    } catch (err) {
      parsedImage = images;
    }

    return parsedImage;
  }

  render() {
    const { openModal, result, isLoading } = this.state;
    const { item, breadcrumb, car, carModel, isLogin } = this.props;
    const productTitle = car
      ? [...(breadcrumb ? breadcrumb.slice(0, 2) : []), { name: item.name }]
          .map(({ name }) => name)
          .join(" ")
      : item.name;
    const marka = item.stokmarka;
    return (
      <Outer long={!(parseInt(item.stokdurumu, 10) > 0)}>
        {/* {JSON.stringify(item)} */}
        <Box width={[1 / 3, 1 / 3, 1 / 4]} className="image-area">
          <Link to={`/yedek-parca${item.slug}`}>
            <>
              <OemBanner isOem={item.parca_tipi === 1}>
                <span>LOGOLU ORİJİNAL</span>
                <span>YEDEKPARÇA</span>
              </OemBanner>
              {/* <div>{this.handleImages(item.gorsel)}</div> */}
              <ImageBg
                className="product-image"
                src={`https://resize.aloparca.com/upload/w_260,h_200,pns/${item.gorsel}`}
                alt={`${item.stokmarka} Marka ${item.parcakodu} kodlu Oto Yedek Parça ${item.tedarikci_aciklama}`}
              />
              <Discount
                mobile
                percent={parseInt(
                  (1 - item.fiyat / item.liste_fiyat) * 100,
                  10
                )}
              />
            </>
          </Link>
        </Box>
        <Flex
          width={[2 / 3, 2 / 3, 11 / 20]}
          className="content-area"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex
            className="title-wrapper"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Link className="title" to={`/yedek-parca${item.slug}`}>
                <DotDotDot clamp={3}><h2>{productTitle}</h2></DotDotDot>
              </Link>
            </Box>
            {item.marka_logo && (
              <LazyLoad>
                <img
                  className="brand"
                  src={`https://resize.aloparca.com/upload/w_65${item.marka_logo}`}
                  alt={item.stokmarka}
                />
              </LazyLoad>
            )}
          </Flex>
          <Flex className="marka-stok-area" alignItems="center">
            <Flex className="marka-stok">
              <Link
                route="listmarka"
                params={{ marka: item.stokmarka }}
                title={`${item.stokmarka} Marka Yedek Parçaları`}
              >
                <TitleContent title="Marka" content={marka} />
              </Link>
            </Flex>
            <Flex className="marka-stok">
              <TitleContent title="Stok Kodu" content={item.parcakodu} />
            </Flex>
          </Flex>
          <Box className="tedarikci-aciklama">
            {item.dezenfektan === "1" ? (
              <TitleContent title="Parça Tipi" content=" Temizlik ve Hijyen" />
            ) : (
              <TitleContent
                title="Parça Tipi"
                content={
                  item.parca_tipi == 1
                    ? " Logolu Orijinal Yedek Parça"
                    : item.parca_tipi == 2
                    ? " Logosuz Orijinal Pedek Parça"
                    : " Muadil Yedek Parça"
                }
              />
            )}

            <TitleContent
              title="Tedariçi Açıklaması"
              content={item.tedarikci_aciklama}
            />
          </Box>
          <Box className="mobile-price-area">
            {item.liste_fiyat !== item.fiyat && (
              <Box className="liste-fiyat">{item.liste_fiyat}TL</Box>
            )}
            <Box className="fiyat">
              <Price price={item.fiyat} />
            </Box>
          </Box>
          <Box>
            {parseInt(item.uyumlu_arac, 10) === 1 &&
              item.madeniyag !== "1" &&
              (car ? (
                <div className="arac-uyumlulugu active">
                  <i className="icon-uyumlu" />
                  {carModel.replace(/_/g, " ")} ile %100 uyumludur
                </div>
              ) : (
                <a
                  href="javascript:;"
                  onClick={this.modalOpen}
                  className="arac-uyumlulugu"
                >
                  Araç uyumluluğunu kontrol et
                </a>
              ))}
          </Box>
          {parseInt(item.stokdurumu, 10) > 0 ? (
            <button
              type="button"
              onClick={this.addCartForm}
              className="hemen-al-mobile"
              disabled={isLoading}
            >
              SEPETE EKLE{" "}
              {isLoading && (
                <Spinner marginLeft={15} size="tiny" />
              )}
            </button>
          ) : (
            <StokBilgilendirme product={this.props.product} isLogin={isLogin} />
          )}
        </Flex>
        <Flex
          width={2 / 9}
          className="price-area"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <Discount
            percent={parseInt((1 - item.fiyat / item.liste_fiyat) * 100, 10)}
          />
          <div className="price-block">
            {item.liste_fiyat !== item.fiyat && (
              <Box className="liste-fiyat">{item.liste_fiyat}TL</Box>
            )}
            <Box className="fiyat">
              <Price price={item.fiyat} />
            </Box>
          </div>
          <Box>
            {parseInt(item.stokdurumu, 10) > 0 ? (
              <button
                type="button"
                onClick={this.addCartForm}
                className="hemen-al"
                disabled={isLoading}
              >
                SEPETE EKLE{" "}
                {isLoading && (
                  <Spinner marginLeft={15} size="tiny" />
                )}
              </button>
            ) : (
              <StokBilgilendirme
                noDisplay
                product={this.props.product}
                isLogin={isLogin}
              />
            )}
          </Box>
        </Flex>
        <Modal size="tiny" open={openModal} onClose={this.closeModal} closeIcon>
          <Modal.Header>{`${item.stokmarka} ${item.name} Araç Uyumluluğu`}</Modal.Header>
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
      </Outer>
    );
  }
}

const mapStateToProps = ({ isLogin }) => ({ isLogin });
export default connect(mapStateToProps)(ProductCard);
