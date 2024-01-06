/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import {
  Tab,
  Menu,
  Input,
  Dropdown,
  Checkbox,
  Modal,
  Radio,
} from 'semantic-ui-react';
import Dimmer from '../../../ui/dimmer';
import Spinner from '../../../ui/spinner';
import cx from 'classnames';
import styled from 'styled-components';
import { Router } from '../../../routes';
import { media } from '../../../style/theme';
import Layout from '../../../layouts/checkout';
import Api from '../../../api';
import { checkCart, deleteAllCart, getUser } from '../../../actions';

import { site } from '../../../reactor/func';

const Outer = styled(Flex)`
  .ui.checkbox .box:before,
  .ui.checkbox label:before {
    border-radius: 50%;
  }

  .ui.checkbox input:checked ~ .box:after,
  .ui.checkbox input:checked ~ label:after {
    content: '';
  }
  .ui.radio.checkbox input:checked ~ .box:after,
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: white;
  }
  .ui.radio.checkbox.disabled,
  .ui.radio.checkbox.disabled label,
  .ui.radio.checkbox.disabled input {
    opacity: 1 !important;
  }
  .ui.checkbox input:checked ~ .box:before,
  .ui.checkbox input:checked ~ label:before {
    border: 5px solid #ff8900;
  }
  .ui.secondary.pointing.menu .item {
    width: 50%;
    font-family: 'Barlow', sans-serif;
    font-size: 20px;
    font-weight: 500;
    color: #999999;
    justify-content: center;
    padding: 30px 0;
    ${media.tablet`
      font-size: 15px;
    `};
    span {
      width: 24px;
      height: 24px;
      border: 1px solid #dddddd;
      border-radius: 50%;
      margin-right: 15px;
      ${media.tablet`
        width: 20px;
        height: 20px;
        margin-right: 10px;
      `};
    }
  }
  .ui.secondary.pointing.menu .active.item {
    color: black;
    border-bottom: 4px solid #dddddd;
    margin-bottom: -3px;
    padding: 28px 0;
    span {
      border: 6px solid #ff8900;
    }
  }
  .ui.segment {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 30px;
    ${media.tablet`
      padding: 10px;
    `};
  }
  .havale-list {
    cursor: pointer;
    & + .havale-list {
      border-top: 1px solid #dddddd;
    }
  }
  .saved-cards {
    .saved-cards-title {
      margin-bottom: 30px;
      font-weight: 500;
    }
    .saved-card + .saved-card {
      margin-top: 20px;
    }
  }
  .credit-card {
    ${media.tablet`
      flex-direction: column;
    `};
    .area-title {
      padding-bottom: 20px;
      font-size: 12px;
      color: #333333;
      letter-spacing: 1px;
      border-bottom: 1px solid #dddddd;
    }
    .area-content {
      .new-card {
        opacity: 0.25;
        pointer-events: none;
        transition: 0.1s;
        filter: blur(2px);
        &.active {
          opacity: 1;
          pointer-events: visible;
          filter: blur(0px);
        }
      }
      .credit-card-detail {
        ${media.tablet`
          justify-content: flex-start;
        `};
      }
      .form-label {
        font-size: 14px;
        color: #333333;
        margin-left: 10px;
        margin-bottom: 10px;
      }
      .ui.input {
        width: 100%;
        font-size: 16px;
        input {
          border-radius: 0;
          ${media.tablet`
            padding: 9px;
          `};
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      .ui.selection.dropdown {
        border-radius: 0;
      }
      .securty-code {
        position: relative;
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          position: absolute;
          right: -25px;
          bottom: 10px;
          background-color: #ff8900;
          border-radius: 50%;
          color: white;
          font-weight: 600;
          font-size: 16px;
          ${media.tablet`
            right: 25px;
          `};
        }
      }
      .table {
        .row {
          font-size: 14px;
          color: #666666;
          border-bottom: 1px solid #dddddd;
          &.title {
            color: #333333;
            font-weight: 500;
          }
          &.active {
            background-color: #f3f3f3;
          }
          strong {
            font-weight: 500;
          }
        }
      }
    }
  }
`;

class KrediKarti extends React.Component {
  state = {
    activeCard: 'new',
    paymentModal: false,
    paymentLoading: false,
    openModal: false,
    taksit: null,
    taksitValue: 1,
    cardMonth: null,
    cardYear: null,
    errorName: false,
    errorCard: false,
    errorMonth: false,
    errorYear: false,
    errorSecurity: false,
    errorMessage: null,
    isCreditCardSaved: false,
    cardList: null,
    isKumbaraChecked: false,
    kumbaraTutar: null,
    isKumbaraEnough: null,
    b2bAccess: null,
    kumbaradanDus: 0,
    krediKartDusulecek: null,
    kumbaradanDusulecek: null,
  };

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    // this.getCreditCards();
    site === 'b2b' && this.getB2Baccess();
  }

  async getB2Baccess() {
    const response = await Api.post('Users/uyegiris');
    const b2bAccess = response.user[0].b2b_access;
    const kumbaraTutar = response.kumbara_tutar;

    this.setState({
      b2bAccess,
      kumbaraTutar,
    });
  }

  kumbaradanDus = (e) => {
    e.preventDefault();

    const data = Number(e.target.value).toFixed(2);

    const numbE = data < 0 ? 0 : data;

    const cartSubTotal = Number(this.props.cart.subtotal);

    cartSubTotal >= numbE ? this.setState({ kumbaradanDus: numbE }) : this.setState({ kumbaradanDus: cartSubTotal });
  }

  calculateKKart = (tutar_) => {
    const kumbara = this.state.kumbaraTutar.toFixed(2);
    const tutar = Number(tutar_).toFixed(2);
    const cartSubTotal = (Number((String((this.props.cart.subtotal)).replace(/\./g, '')).replace(/,/g, '')) / 100).toFixed(2);

    let kesilecek = cartSubTotal - tutar;

    if (kesilecek < 0) {
      if (kumbara >= cartSubTotal) {
        kesilecek = 0;
      } else {
        kesilecek = cartSubTotal - kumbara;
      }
    }
    this.props.dispatch({ type: 'KKART_KESILECEK', payload: kesilecek.toFixed(2) });

    // console.log(this.props.kkartKes, this.props.kumbKes);

    return kesilecek.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  calculateKumb = (tutar_) => {
    const kumbara = this.state.kumbaraTutar.toFixed(2);
    const tutar = Number(tutar_).toFixed(2);
    const fark = kumbara - tutar;
    const cartSubTotal = Number((String((this.props.cart.subtotal)).replace(/\./g, '')).replace(/,/g, '')) / 100;
    let params;

    if (fark >= 0) {
      params = 1;
    } else {
      params = -1;
    }
    let sonuc;

    switch (params) {
      case (1):

        if (tutar > cartSubTotal) {
          sonuc = cartSubTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
          sonuc = tutar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        break;

      case (-1):

        if (tutar >= cartSubTotal) {
          if (cartSubTotal > kumbara) {
            sonuc = kumbara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          } else {
            sonuc = cartSubTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        } else {
          sonuc = kumbara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        break;

      default:
        sonuc = 0;
        break;
    }

    this.props.dispatch({ type: 'KUMB_KESILECEK', payload: sonuc.replace(/,/g, '') });

    return sonuc;
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
    this.props.dispatch({ type: 'KUMB_KESILECEK', payload: 0 });
    this.props.dispatch({ type: 'KKART_KESILECEK', payload: 0 });
    this.setState = (state,callback)=>{
      return;
    };
  }

  // getCreditCards = async () => {
  //   const cardList = await Api.get('Users/kredi_karti_list');
  //   await this.setState({ cardList, activeCard: cardList.length > 0 ? cardList[0].Id : 'new' });
  //   if (cardList.length > 0) {
  //     this.getTaksit();
  //   }
  // };

  getTaksit = async () => {
    this.setState({ taksitLoading: true });
    const { activeCard, cardList } = this.state;
    let cardNumber;
    if (activeCard === 'new') {
      cardNumber = this.formCardNumber.inputRef.current.value;
    } else {
      const activeCardData = cardList.find((item) => item.Id === activeCard);
      cardNumber = activeCardData.cc_number;
    }
    if (cardNumber.length > 5) {
      if (!this.state.taksit) {
        const { taksit } = await Api.get(`Users/taksit_vadefark?ccno=${cardNumber}&tutar=${this.props.cart.total}`);
        await this.setState({ taksit });
      }
    } else {
      this.setState({ taksit: null });
    }
    this.setState({ taksitLoading: false });
  };

  modalOpenB2B = async () => {
    let formError = false;
    let activeCard; // Silinecek
    this.props.kumbaraOk ? activeCard = 'new' : activeCard = null; // Silinecek
    // Silincek if kısmı (else bloğunun içi kalacak)
    if (await this.props.kumbaraOk) {
      const formName = null;
      const formCard = null;
      const formMonth = null;
      const formYear = null;
      const formSecurity = null;
      const isCreditCardSave = null;
      if (activeCard === 'new') {
        if (!formName) {
          formError = false;
          this.setState({ errorName: false });
        }
        if (!formCard || formCard.length !== 16) {
          formError = false;
          this.setState({ errorCard: false });
        }
        if (!formMonth) {
          formError = false;
          this.setState({ errorMonth: false });
        }
        if (!formYear) {
          formError = false;
          this.setState({ errorYear: false });
        }
        if (!formSecurity || formSecurity.length !== 3) {
          formError = false;
          this.setState({ errorSecurity: false });
        }
      }
    } else {
      const formName = await this.formCardName.inputRef.current.value;
      const formCard = await this.formCardNumber.inputRef.current.value;
      const formMonth = this.state.cardMonth;
      const formYear = this.state.cardYear;
      const formSecurity = await this.formCardSecurityCode.inputRef.current.value;
      const { isCreditCardSaved, activeCard } = this.state;
      if (activeCard === 'new') {
        if (!formName) {
          formError = true;
          this.setState({ errorName: true });
        }
        if (!formCard || formCard.length !== 16) {
          formError = true;
          this.setState({ errorCard: true });
        }
        if (!formMonth) {
          formError = true;
          this.setState({ errorMonth: true });
        }
        if (!formYear) {
          formError = true;
          this.setState({ errorYear: true });
        }
        if (!formSecurity || formSecurity.length !== 3) {
          formError = true;
          this.setState({ errorSecurity: true });
        }
      }
    }

    if (!formError) {
      // const popup = window.open('', 'Aloparça - 3D Secure', 'width=500,height=500');
      this.setState({
        errorName: false,
        errorCard: false,
        errorMonth: false,
        errorYear: false,
        errorSecurity: false,
        paymentModal: true,
      });

      this.setState({ paymentLoading: true });
      const sd = new FormData();

      let odemetipi_;

      if (await this.props.kumbaraOk && await this.props.kkartKes === '0.00') {
        odemetipi_ = '5';
      } else if (await this.props.kumbaraOk && await this.props.kkartKes !== '0.00') {
        odemetipi_ = '6';
      } else if (await this.props.kumbaraLess && await this.props.kumbaraLess === true) {
        odemetipi_ = '6';
      } else {
        odemetipi_ = '1';
      }

      sd.append('odemetipi', odemetipi_);
      // Burada sadece kredi kartı ise ödeme tipi : 1,
      // Kumbara + kredi kartı ise ödeme tipi : 6,
      // Sadece Kumbara ise ise ödeme tipi : 5 ekleyecek sipariş detay formuna

      sd.append('fatura_adres_id', this.props.address.fatura);
      sd.append('teslimat_adres_id', this.props.address.teslimat);
      sd.append('kargo_firmasi', 'Yurtiçi Kargo');
      if(this.props.cart.indirim){
        sd.append('kupon', (typeof this.props.cart.indirim.kupon === undefined ? null : this.props.cart.indirim.kupon ));
      }
      const siparisData = await Api.post('Users/siparis_olustur', sd, true);

      if (odemetipi_ === '5') {
        const status = true;
        const html = 'Ödeme kumbaradan yapıldı';
        const ifPay = this.iframePayment.contentWindow.document;
        ifPay.open();
        ifPay.write(html);
        ifPay.close();

        this.props.dispatch(deleteAllCart());
        await Router.pushRoute('checkout-success', { id: JSON.parse(siparisData).siparis_no });
      } else {
        const fd = new FormData();

        const formName = await this.formCardName.inputRef.current.value;
        const formCard = await this.formCardNumber.inputRef.current.value;
        const formMonth = this.state.cardMonth;
        const formYear = this.state.cardYear;
        const formSecurity = await this.formCardSecurityCode.inputRef.current.value;
        const { isCreditCardSaved, activeCard } = this.state;

        if (activeCard === 'new') {
          fd.append('cc_name', formName);
          fd.append('cc_number', formCard);
          fd.append('cc_sonkullanma', `${formMonth}/${formYear}`);
          fd.append('cc_guvenlik_kodu', formSecurity);
          fd.append('kredi_karti_kaydet', isCreditCardSaved);
        } else {
          fd.append('saved_card_id', activeCard);
        }

        fd.append('taksit', this.state.taksitValue);

        const total = parseFloat(this.props.cart.subtotal.toString().replace(/[^\d.]/g, ''));
        const vadefarki = parseFloat(this.props.cart.vadefarki.toString().replace(/[^\d.]/g, ''));
        const kumbkesilecek = parseFloat(await this.props.kumbKes.replace(/[^\d.]/g, ''));

        const tutar = (total - vadefarki - kumbkesilecek).toFixed(2);

        fd.append('tutar', tutar);
        fd.append('siparis_id', JSON.parse(siparisData).siparis_no);
        const formData = await Api.post('Users/kredi_karti_para_cek', fd, true);
        this.setState({ paymentLoading: false });
        let status = false;
        let response;
        try {
          response = JSON.parse(formData);
        } catch (e) {
          response = formData;
        }
        let html = formData;
        if (response.status === false) {
          html = `<div style="background-color: #f5f5f5; display: flex; justify-content:center;align-items:center; flex-direction: flexDirection="column"; width:100%;height: 100%;"><i style="background: url(/static/warning.svg) center/contain no-repeat; width: 100px; height: 100px; margin-bottom: 30px;" class="icon-warning"></i><div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color: #ff8900; font-size: 18px; font-weight: 700;">${
            response.ErrorMSG
          }</div></div>`;
        } else {
          status = true;
        }
        const ifPay = this.iframePayment.contentWindow.document;
        ifPay.open();
        ifPay.write(html);
        ifPay.close();

        if (status) {
          const resultPayment = setInterval(async () => {
            const odemeSonuc = await Api.get(`Users/odeme_check?siparis_id=${JSON.parse(siparisData).siparis_no}`);
            if (odemeSonuc.length > 0) {
              if (parseInt(odemeSonuc[0].status, 10) === 1) {
                this.props.dispatch(deleteAllCart());
                Router.pushRoute('checkout-success', { id: JSON.parse(siparisData).siparis_no });
              } else {
                this.setState({
                  errorMessage: odemeSonuc[0].ErrorMSG,
                  openModal: true,
                  paymentModal: false,
                });
              }
              clearInterval(resultPayment);
            }
          }, 2000);
        }
      }
    }
  };

  modalOpen = async () => {
    let formError = false;
    const formName = this.formCardName.inputRef.current.value;
    const formCard = this.formCardNumber.inputRef.current.value;
    const formMonth = this.state.cardMonth;
    const formYear = this.state.cardYear;
    const formSecurity = this.formCardSecurityCode.inputRef.current.value;
    const { isCreditCardSaved, activeCard } = this.state;
    if (activeCard === 'new') {
      if (!formName) {
        formError = true;
        this.setState({ errorName: true });
      }
      if (!formCard || formCard.length !== 16) {
        formError = true;
        this.setState({ errorCard: true });
      }
      if (!formMonth) {
        formError = true;
        this.setState({ errorMonth: true });
      }
      if (!formYear) {
        formError = true;
        this.setState({ errorYear: true });
      }
      if (!formSecurity || formSecurity.length !== 3) {
        formError = true;
        this.setState({ errorSecurity: true });
      }
    }

    if (!formError) {
      // const popup = window.open('', 'Aloparça - 3D Secure', 'width=500,height=500');
      this.setState({
        errorName: false,
        errorCard: false,
        errorMonth: false,
        errorYear: false,
        errorSecurity: false,
        paymentModal: true,
      });

      this.setState({ paymentLoading: true });
      const sd = new FormData();
      sd.append('odemetipi', '1');
      sd.append('fatura_adres_id', this.props.address.fatura);
      sd.append('teslimat_adres_id', this.props.address.teslimat);
      sd.append('kargo_firmasi', 'Yurtiçi Kargo');
      if(this.props.cart.indirim){
        sd.append('kupon', (typeof this.props.cart.indirim.kupon === undefined ? null : this.props.cart.indirim.kupon ));
      }
      const siparisData = await Api.post('Users/siparis_olustur', sd, true);

      const fd = new FormData();

      if (activeCard === 'new') {
        fd.append('cc_name', formName);
        fd.append('cc_number', formCard);
        fd.append('cc_sonkullanma', `${formMonth}/${formYear}`);
        fd.append('cc_guvenlik_kodu', formSecurity);
        fd.append('kredi_karti_kaydet', isCreditCardSaved);
      } else {
        fd.append('saved_card_id', activeCard);
      }

      fd.append('taksit', this.state.taksitValue);

      const total = parseFloat(this.props.cart.total.toString().replace(/[^\d.]/g, ''));
      const vadefarki = parseFloat(this.props.cart.vadefarki.toString().replace(/[^\d.]/g, ''));
      const tutar = (total - vadefarki).toFixed(2);
      fd.append('tutar', tutar);
      fd.append('siparis_id', JSON.parse(siparisData).siparis_no);
      const formData = await Api.post('Users/kredi_karti_para_cek', fd, true);
      this.setState({ paymentLoading: false });
      let status = false;
      let response;
      try {
        response = JSON.parse(formData);
      } catch (e) {
        response = formData;
      }
      let html = formData;
      if (response.status === false) {
        html = `<div style="background-color: #f5f5f5; display: flex; justify-content:center;align-items:center; flex-direction: flexDirection="column"; width:100%;height: 100%;"><i style="background: url(/static/warning.svg) center/contain no-repeat; width: 100px; height: 100px; margin-bottom: 30px;" class="icon-warning"></i><div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; color: #ff8900; font-size: 18px; font-weight: 700;">${
          response.ErrorMSG
        }</div></div>`;
      } else {
        status = true;
      }
      const ifPay = this.iframePayment.contentWindow.document;
      ifPay.open();
      ifPay.write(html);
      ifPay.close();

      if (status) {
        const resultPayment = setInterval(async () => {
          var kupon = null;
          if(this.props.cart.indirim){
          kupon = (typeof this.props.cart.indirim.kupon === undefined ? null : this.props.cart.indirim.kupon);
          }
            const odemeSonuc = await Api.get(`Users/odeme_check?siparis_id=${JSON.parse(siparisData).siparis_no}&kupon=${kupon}`);
          if (odemeSonuc.length > 0) {
            if (parseInt(odemeSonuc[0].status, 10) === 1) {
              this.props.dispatch(deleteAllCart());
              Router.pushRoute('checkout-success', { id: JSON.parse(siparisData).siparis_no });
            } else {
              this.setState({
                errorMessage: odemeSonuc[0].ErrorMSG,
                openModal: true,
                paymentModal: false,
              });
            }
            clearInterval(resultPayment);
          }
        }, 2000);
      }
    }
  };

  closeModal = () => this.setState({ openModal: false });

  // changeCreditCardSave = () => {
  //   this.setState((prevState) => ({ isCreditCardSaved: !prevState.isCreditCardSaved }));
  // };

  changeKumbOkGlobal = async (isOk) => {
    await this.props.dispatch({ type: 'KUMBARA_OK', payload: isOk });
  }

  kumbLessFunc = async (kumbLess) => {
    await this.props.dispatch({ type: 'KUMBARA_LESS', payload: kumbLess });
  }

  changeKumbaraSave = async () => {
    this.setState((prevState) => ({ isKumbaraChecked: !prevState.isKumbaraChecked }));
    this.setState({ kumbaradanDusulecek: null, kumbaradanDus: 0 });
    // console.log("isKumbarachecked?", this.state.isKumbaraChecked);
    await this.props.dispatch(getUser());
    // const resp = await Api.get('Kumbara/kumbara_log');
    // console.log(resp); // Kumbaradaki hareketler

    try {
      const kumbaraTutar = await this.state.kumbaraTutar;
      if (kumbaraTutar !== [] || null) {
        const { cart } = this.props;
        const cartTotal = Number((String(cart.subtotal).replace(/\./g, '')).replace(/,/g, '')) / 100;
        const fark = kumbaraTutar - cartTotal;

        fark >= 0 ? this.setState({ isKumbaraEnough: true }) : this.setState({ isKumbaraEnough: false });
        fark >= 0 && this.state.isKumbaraChecked ? this.props.dispatch({ type: 'KUMBARA_OK', payload: true }) : this.props.dispatch({ type: 'KUMBARA_OK', payload: false });
        fark < 0 ? this.props.dispatch({ type: 'KUMBARA_LESS', payload: true }) : this.props.dispatch({ type: 'KUMBARA_LESS', payload: false });

        this.changeKumbOkGlobal(this.state.isKumbaraEnough);
      }
    } catch (error) {
      // console.log(error);

    }
  };

  handleCreditCardChange = async (e, { value }) => {
    await this.setState({ activeCard: value });
    await this.getTaksit();
  };

  render() {
    const {
      activeCard,
      taksitLoading,
      openModal,
      errorMessage,
      taksit,
      errorName,
      errorCard,
      errorMonth,
      errorYear,
      errorSecurity,
      paymentModal,
      paymentLoading,
      isCreditCardSaved,
      cardList,
      isKumbaraChecked,
      b2bAccess,
      kumbaradanDus,

    } = this.state;
    const {
      cart, dispatch, kumbaraOk, kumbLess, kumbKes, kkartKes,
    } = this.props;

    return (
      <>
        <Flex className="credit-card" mx={[0, 0, -2]}>
          <Flex css={{ display: 'inline-flex' }} width={[1, 1, 1 / 2]} px={[0, 0, 2]} mb={[4, 4, 0]} flexDirection="column">

            <>
              <Box className="area-title">KART BİLGİLERİ</Box>
              <Flex className="area-content" px={[2, 2, 4]} flexDirection="column">
                {
                /*
                <Flex className="saved-cards" mt={3}>
                {!cardList ? (
                  <Box my={3}>Kayıtlı Kartlar Yükleniyor...</Box>
                ) : (
                  <Flex flexDirection="column">
                    <div className="saved-cards-title">KAYITLI KARTLAR</div>
                    {cardList.length === 0 ? (
                      <Box mb={2}>Kayıtlı Kart Bulunamadı</Box>
                    ) : (
                      cardList.map((card) => (
                        <Radio
                          className="saved-card"
                          key={card.cc_number}
                          label={(
                            <label>
                              <Flex flexDirection="column">
                                <Box style={{ fontWeight: '500' }}>
                                  {`${card.name} - ${card.banka}`}
                                </Box>
                                <Box>{`${card.cc_number} - ${card.exdate}`}</Box>
                              </Flex>
                            </label>
                              )}
                          name="radioGroup"
                          value={card.Id}
                          checked={activeCard === card.Id}
                          onChange={this.handleCreditCardChange}
                          disabled={taksitLoading}
                        />
                      ))
                    )}
                  </Flex>
                )}
              </Flex>
             */
              }
                 {cardList && (
                 <Flex my={2}>
                   <Radio
                      label="Yeni Kart"
                      name="radioGroup"
                      value="new"
                      checked
                      onChange={this.handleCreditCardChange}
                      disabled={taksitLoading}
                    />
                 </Flex>
                 )}

                <div className={cx('new-card', { active: activeCard === 'new' })}>
                  <Flex mt={3} flexDirection="column">
                    <label htmlFor="frmNameCC" className="form-label">
                      Kartın Üzerindeki İsim
                    </label>
                    <Input
                      name="ccname"
                      id="frmNameCC"
                      required
                      autoComplete="cc-name"
                      ref={(n) => {
                        this.formCardName = n;
                      }}
                      error={errorName}
                    />
                  </Flex>
                  <Flex mt={3} flexDirection="column">
                    <label htmlFor="frmCCNum" className="form-label">
                      Kart Numarası
                    </label>
                    <Input
                      name="cardnumber"
                      id="frmCCNum"
                      required
                      autoComplete="cc-number"
                      type="number"
                      onChange={this.getTaksit}
                      ref={(n) => {
                        this.formCardNumber = n;
                      }}
                      error={errorCard}
                    />
                  </Flex>
                  <Flex
                    mt={2}
                    mx={-1}
                    className="credit-card-detail"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Flex px={1} width={2 / 4} flexDirection="column">
                      <label className="form-label">Geçerlilik Tarihi</label>
                      <Flex mx={-1}>
                        <Box px={1} width={1 / 2}>
                          <Dropdown
                            placeholder="Ay"
                            options={[...Array(12)].map((item, index) => ({
                              text: index + 1 < 10 ? `0${index + 1}` : index + 1,
                              value: index + 1 < 10 ? `0${index + 1}` : index + 1,
                            }))}
                            fluid
                            selection
                            name="cc-exp-month"
                            autoComplete="cc-exp-month"
                            onChange={(e, { name, value }) => this.setState({ cardMonth: value })}
                            error={errorMonth}
                          />
                        </Box>
                        <Box px={1} width={1 / 2}>
                          <Dropdown
                            placeholder="Yıl"
                            options={[...Array(20)].map((item, index) => ({
                              text: index + new Date().getFullYear(),
                              value: (index + new Date().getFullYear()).toString().substring(2),
                            }))}
                            fluid
                            selection
                            name="cc-exp-year"
                            autoComplete="cc-exp-year"
                            onChange={(e, { name, value }) => this.setState({ cardYear: value })}
                            error={errorYear}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex
                      className="securty-code"
                      px={1}
                      width={[2 / 4, 1 / 4, 1 / 4]}
                      flexDirection="column"
                    >
                      <label className="form-label">Güvenlik Kodu</label>
                      <Flex width={[1 / 2, 1, 1]}>
                        <Input
                          type="number"
                          ref={(n) => {
                            this.formCardSecurityCode = n;
                          }}
                          error={errorSecurity}
                        />
                        <a href="javascript:;" onClick={site === 'b2b' ? this.modalOpenB2B : this.modalOpen}>
                          ?
                        </a>
                      </Flex>
                    </Flex>
                  </Flex>
                  {/*

                    <Flex mt={4} alignItems="center">
                      <Checkbox
                        label="Kredi Kartını Kaydet-2"
                        checked={isCreditCardSaved}
                        onChange={this.changeCreditCardSave}
                      />
                    </Flex>
                  */
                 }
                </div>
              </Flex>
            </>

          </Flex>
          <Flex width={[1, 1, 1 / 2]} px={[0, 0, 2]} flexDirection="column">

            {

              <>

                <Box className="area-title">TAKSİT SEÇENEKLERİ</Box>

                <Flex className="area-content" flexDirection="column">
                  <Flex className="table" flexDirection="column">
                    <Flex className="row title">
                      <Box width={1 / 3} p={1}>
                        Taksit Sayısı
                      </Box>
                      <Flex width={1 / 3} p={1} justifyContent="center">
                        Aylık Ödeme
                      </Flex>
                      <Flex width={1 / 3} p={1} justifyContent="center">
                        Toplam Tutar
                      </Flex>
                    </Flex>
                    {taksitLoading ? (
                      <Box ml={1} my={2}>
                        Taksit bilgisi yükleniyor...
                      </Box>
                    ) : (
                      <Taksitler
                        cart={cart}
                        taksit={taksit}
                        dispatch={dispatch}
                        onChange={(taksitValue) => this.setState({ taksitValue })}
                        kkartKes={kkartKes}
                      />
                    )}
                  </Flex>
                  <br />
                  <br />
                </Flex>
              </>

            }
            {
              b2bAccess === '1' ? (
                this.state.kumbaraTutar !== null ? (

                  <>
                    <Box p="1rem">KUMBARADAN ÖDEME</Box>

                    <Flex className="row title">
                      <Box m={1} css={{ display: 'inline-flex' }}>
                        <Checkbox
                          label={this.state.isKumbaraChecked ? 'Tutarı kumbaradan düş' : 'Kumbaramda ki parayı kullanmak ister misin?'}
                          checked={isKumbaraChecked}
                          onChange={this.changeKumbaraSave}
                        />

                      </Box>
                    </Flex>

                    <Box display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'} margin="0 10px">

                      <Input
                        id="kumbaradanDus"
                        name="kumbaradanDus"
                        type="number"
                        placeholder="Tutar Giriniz"
                        pattern="[0-9]+([\.,][0-9]+)?"
                        margin-top="10px"
                        onChange={this.kumbaradanDus}

                      />

                    </Box>

                    {
                      this.state.kumbaraTutar === null && undefined ? null : (
                        <Box m={1} fontSize="1em">{`Kumbaranızdaki tutar : ${this.state.kumbaraTutar.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} TL`}</Box>
                      )
                    }

                    <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>
                      {this.state.b2bAccess ? `Toplam sepet tutarı : ${cart.subtotal} TL` : null}
                    </Box>

                    <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>

                      {this.state.b2bAccess ? (`Kumbaranızdan düşülecek tutar : ${this.calculateKumb(kumbaradanDus)} TL`) : null}

                    </Box>

                    <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>

                      {this.state.b2bAccess ? (`Kredi kartınızdan kesilecek tutar : ${this.calculateKKart(kumbaradanDus)} TL`) : null}

                      {/* this.state.b2bAccess ?
                          (((Number(String(cart.subtotal).replace(/\./g, "").replace(/,/g, "")) / 100)) <= this.state.kumbaraTutar) ?
                            "Kredi kartınızdan ödenecek tutar : 0.00 TL" : "Kredi kartınızdan ödenecek tutar : " +
                            (Number(String(cart.subtotal).replace(/\./g, "").replace(/,/g, "")) / 100 - this.state.kumbaraTutar).toFixed(2) + " TL" : null
                        */}
                    </Box>

                  </>

                ) : null
              ) : null

            }

          </Flex>
        </Flex>
        <Modal open={paymentModal} onClose={() => this.setState({ paymentModal: false })} closeIcon>
          <Modal.Content>
            {paymentLoading && (
              <Dimmer>
                <Spinner content="Bağlanıyor" />
              </Dimmer>
            )}
            <iframe
              title="Aloparça - 3D Secure"
              ref={(n) => {
                this.iframePayment = n;
              }}
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '500px',
                border: 0,
              }}
            />
          </Modal.Content>
        </Modal>
        <Modal size="tiny" open={openModal} onClose={this.closeModal}>
          <Modal.Header>Ödeme alınamadı</Modal.Header>
          <Modal.Content>{errorMessage}</Modal.Content>
        </Modal>
      </>
    );
  }
}
class Havale extends React.Component {
  state = {
    bankChecked: this.props.checkoutBank || 'GARANTİ BANKASI',
    b2bAccess: null,
    isKumbaraChecked: false,
    kumbaraTutar: null,
    kumbaradanDus: 0,
  };

  componentDidMount() {
    site === 'b2b' && this.getB2Baccess();
  }

  kumbaradanDus = (e) => {
    e.preventDefault();

    const data = Number(e.target.value).toFixed(2);

    const numbE = data < 0 ? 0 : data;

    const cartSubTotal = Number(this.props.cart.subtotal);

    site === 'b2b' && cartSubTotal >= numbE ? this.setState({ kumbaradanDus: numbE }) : this.setState({ kumbaradanDus: cartSubTotal });
  }

  calculateKKart = (tutar_) => {
    const kumbara = this.state.kumbaraTutar.toFixed(2);
    const tutar = Number(tutar_).toFixed(2);
    const cartSubTotal = (Number((String((this.props.cart.subtotal)).replace(/\./g, '')).replace(/,/g, '')) / 100).toFixed(2);

    let kesilecek = cartSubTotal - tutar;

    if (kesilecek < 0) {
      if (kumbara >= cartSubTotal) {
        kesilecek = 0;
      } else {
        kesilecek = cartSubTotal - kumbara;
      }
    }
    site === 'b2b' && this.props.dispatch({ type: 'KKART_KESILECEK', payload: kesilecek.toFixed(2) });

    // console.log(this.props.kkartKes, this.props.kumbKes);

    return (site === 'b2b' ? kesilecek.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null);
  }

  calculateKumb = (tutar_) => {
    const kumbara = this.state.kumbaraTutar.toFixed(2);
    const tutar = Number(tutar_).toFixed(2);
    const fark = kumbara - tutar;
    const cartSubTotal = Number((String((this.props.cart.subtotal)).replace(/\./g, '')).replace(/,/g, '')) / 100;
    let params;

    if (fark >= 0) {
      params = 1;
    } else {
      params = -1;
    }
    let sonuc;

    switch (params) {
      case (1):

        if (tutar > cartSubTotal) {
          sonuc = cartSubTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
          sonuc = tutar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        break;

      case (-1):

        if (tutar >= cartSubTotal) {
          if (cartSubTotal > kumbara) {
            sonuc = kumbara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          } else {
            sonuc = cartSubTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        } else {
          sonuc = kumbara.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        break;

      default:
        sonuc = 0;
        break;
    }

    site === 'b2b' && this.props.dispatch({ type: 'KUMB_KESILECEK', payload: sonuc.replace(/,/g, '') });

    return (site === 'b2b' ? sonuc : null);
  }

  changeKumbOkGlobal = async (isOk) => {
    site === 'b2b' ? await this.props.dispatch({ type: 'KUMBARA_OK', payload: isOk }) : null;
  }

  changeKumbaraSave = async () => {
    this.setState((prevState) => ({ isKumbaraChecked: !prevState.isKumbaraChecked }));
    this.setState({ kumbaradanDusulecek: null, kumbaradanDus: 0 });

    await this.props.dispatch(getUser());

    try {
      const kumbaraTutar = await this.state.kumbaraTutar;
      if (kumbaraTutar !== [] || null) {
        const { cart } = this.props;
        const cartTotal = Number((String(cart.subtotal).replace(/\./g, '')).replace(/,/g, '')) / 100;
        const fark = kumbaraTutar - cartTotal;

        fark >= 0 ? this.setState({ isKumbaraEnough: true }) : this.setState({ isKumbaraEnough: false });
        fark >= 0 && this.state.isKumbaraChecked ? this.props.dispatch({ type: 'KUMBARA_OK', payload: true }) : this.props.dispatch({ type: 'KUMBARA_OK', payload: false });
        fark < 0 ? this.props.dispatch({ type: 'KUMBARA_LESS', payload: true }) : this.props.dispatch({ type: 'KUMBARA_LESS', payload: false });

        site === 'b2b' ? this.changeKumbOkGlobal(this.state.isKumbaraEnough) : null;
      }
    } catch (error) {
      // console.log(error);

    }
  };

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
    this.props.dispatch({ type: 'KKART_KESILECEK', payload: 0 });
  }

  changeBank = (e, { value }) => {
    this.setState({ bankChecked: value });
  };

  async getB2Baccess() {
    const response = await Api.post('Users/uyegiris');
    const b2bAccess = response.user[0].b2b_access;
    const kumbaraTutar = response.kumbara_tutar;

    this.setState({
      b2bAccess,
      kumbaraTutar,
    });
  }

  render() {
    const { banka, cart } = this.props;
    const {
      bankChecked, b2bAccess, isKumbaraChecked, kumbaraTutar, kumbaradanDus,
    } = this.state;

    return (
      <>
        <Flex className="credit-card" width={[1, 1, 1]} px={[0, 0, 2]} flexDirection="row">
          <Flex flexDirection="column">
            {banka
              && banka.map((item) => (
                <Flex
                  py={2}
                  className="havale-list"
                  justifyContent="center"
                  flexDirection="column"
                  key={item.iban}
                >
                  <Flex
                    width={1}
                    alignItems="center"
                    onClick={() => {
                      this.setState({ bankChecked: item.Banka });
                      this.props.dispatch({ type: 'ADD_BANK', payload: item.Banka });
                    }}
                  >
                    <Flex width="50px" justifyContent="center">
                      <Checkbox
                        value={item.Banka}
                        checked={item.Banka === bankChecked}
                        onChange={this.changeBank}
                      />
                    </Flex>
                    <Flex flexDirection="column">
                      <Box mb={1}>
                        <strong>Banka:</strong>
                        {' '}
                        {item.Banka}
                      </Box>
                      <Box mb={1}>
                        <strong>IBAN:</strong>
                        {' '}
                        {item.iban}
                      </Box>
                      <Box mb={1}>
                        <strong>Şube Adı:</strong>
                        {' '}
                        {item.Sube}
                      </Box>
                      <Box mb={1}>
                        <strong>Şube Kodu:</strong>
                        {' '}
                        {item.Sube_Kodu}
                      </Box>
                      <Box mb={1}>
                        <strong>Hesap No:</strong>
                        {' '}
                        {item.Hesap_No}
                      </Box>
                      <Box>
                        <strong>Alıcı:</strong>
                        {' '}
                        {item.Alici}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>

              ))}

          </Flex>

          {
            site === 'b2b' && b2bAccess === '1' ? (
              kumbaraTutar !== null ? (

                <Flex className="area-content" px={[2, 2, 4]} flexDirection="column">
                  <Box p="1rem">KUMBARADAN ÖDEME</Box>
                  <Flex className="row title">
                    <Box m={1} css={{ display: 'inline-flex' }}>
                      <Checkbox
                        label={this.state.isKumbaraChecked ? 'Tutarı kumbaradan düş' : 'Kumbaramda ki parayı kullanmak ister misin?'}
                        checked={isKumbaraChecked}
                        onChange={this.changeKumbaraSave}
                        fontSize="1.4em"
                      />
                    </Box>
                  </Flex>

                  <Box display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'} margin="0 10px">

                    <Input
                      id="kumbaradanDus"
                      name="kumbaradanDus"
                      type="number"
                      placeholder="Tutar Giriniz"
                      pattern="[0-9]+([\.,][0-9]+)?"
                      margin-top="10px"
                      onChange={this.kumbaradanDus}

                    />

                  </Box>

                  {
                    this.state.kumbaraTutar === null && undefined ? null : (
                      <Box m={1} fontSize="1em">{`Kumbaranızdaki tutar : ${this.state.kumbaraTutar.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} TL`}</Box>
                    )
                  }

                  <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>
                    {this.state.b2bAccess ? `Toplam sepet tutarı : ${cart.subtotal} TL` : null}
                  </Box>

                  <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>

                    {this.state.b2bAccess ? (`Kumbaranızdan düşülecek tutar : ${this.calculateKumb(kumbaradanDus)} TL`) : null}

                  </Box>

                  <Box m={1} fontSize="1em" display={this.state.isKumbaraChecked === false ? 'none' : 'inline-block'}>

                    {this.state.b2bAccess ? (`Havale ile gönderilecek tutar : ${this.calculateKKart(kumbaradanDus)} TL`) : null}

                  </Box>
                </Flex>

              ) : null
            ) : null
          }
        </Flex>
      </>
    );
  }
}

const KrediKartiWithRef = ({ innerRef, ...props }) => <KrediKarti ref={innerRef} {...props} />;
const ConnectKrediKarti = connect()(KrediKartiWithRef);
const ConnectHavale = connect()(Havale);

class Taksitler extends React.Component {
  state = { value: '1' };

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.onChange(value);
    this.props.dispatch(checkCart({ taksit: value }));
  };

  render() {
    const {
      cart, taksit, taksitFunc, kkartKes,
    } = this.props;
    const { value } = this.state;
    return (
      <>
        <Flex className={cx('row', { active: this.state.value === '1' })}>
          <Flex alignItems="center" width={1 / 3} p={1}>
            <Checkbox
              label="Peşin"
              value="1"
              checked={this.state.value === '1'}
              onChange={this.handleChange}
            />
          </Flex>
          <Flex width={1 / 3} p={1} justifyContent="center">
            <strong>
              {cart
                ? parseFloat(parseFloat((site === 'b2b' ? kkartKes : cart.total).toString().replace(/[^\d.]/g, ''))
                      - parseFloat(cart.vadefarki.toString().replace(/[^\d.]/g, ''))).toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })
                : parseFloat(0).toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })}
            </strong>
          </Flex>
          <Flex width={1 / 3} p={1} justifyContent="center">
            {cart
              ? parseFloat(parseFloat((site === 'b2b' ? kkartKes : cart.total).toString().replace(/[^\d\.]/g, ''))
                    - parseFloat(cart.vadefarki.toString().replace(/[^\d\.]/g, ''))).toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })
              : parseFloat(0).toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              })}
          </Flex>
        </Flex>
        {taksit
          && taksit.map((item) => (
            <Flex
              className={cx('row', { active: this.state.value === item.taksit_sayisi })}
              key={item.taksit_sayisi}
            >
              <Flex alignItems="center" width={1 / 3} p={1}>
                <Checkbox
                  label={`${item.taksit_sayisi} Taksit`}
                  value={item.taksit_sayisi}
                  checked={this.state.value === item.taksit_sayisi}
                  onChange={this.handleChange}
                />
              </Flex>
              <Flex width={1 / 3} p={1} justifyContent="center">
                <strong>
                  {parseFloat(item.tutar).toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  })}
                </strong>
              </Flex>
              <Flex width={1 / 3} p={1} justifyContent="center">
                {parseFloat(item.total).toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })}
              </Flex>
            </Flex>
          ))}

      </>
    );
  }
}

class CheckoutPayment extends React.Component {
  static async getInitialProps({ reduxStore }) {
    const { result } = await Api.get('Users/banka_hesap_bilgileri');
    reduxStore.dispatch({ type: 'ADD_BANK', payload: result[0].Banka });
    return { banka: result };
  }

  state = { activeIndex: this.props.checkoutType - 1 || 0 };

  componentWillUnmount() {
    this.props.dispatch(checkCart({ taksit: 1 }));
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });

    this.props.dispatch({ type: 'ADD_CHECKOUT_TYPE', payload: activeIndex + 1 });
  };

  switchHavale = () => {
    { this.props.dispatch({ type: 'HAVALE_KUMB', payload: true }); /** Havalede seçildi */ }
  }

  switchKKart = () => {
    { this.props.dispatch({ type: 'HAVALE_KUMB', payload: false }); /** Havalede seçildi */ }
  }

  panes = [
    {
      menuItem: (
        <Menu.Item key="kredi-karti">
          <span />
          {site === 'b2b' ? ' Kredi / Banka Kartı - Kumbara' : ' Kredi / Banka Kartı' }
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          {this.switchKKart()}
          <ConnectKrediKarti
            innerRef={(n) => {
              this.KrediKarti = n;
            }}
            cart={this.props.cart}
            address={this.props.address}
            dispatch={this.props.dispatch}
            kumbaraOk={this.props.kumbaraOk} // deneme
            kumbaraLess={this.props.kumbLess} // deneme
            kumbKes={this.props.kumbKes} // deneme
            kkartKes={this.props.kkartKes} // deneme
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="havale">
          <span />
          {site === 'b2b' ? ' Havale / EFT - Kumbara' : ' Havale / EFT' }
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          {site === 'b2b' && this.switchHavale()}
          {site === 'b2b'
            ? (
              <ConnectHavale
                banka={this.props.banka}
                cart={this.props.cart}
                dispatch={this.props.dispatch}
                kumbaraOk={this.props.kumbaraOk} // deneme
                kumbaraLess={this.props.kumbLess} // deneme
                kumbKes={this.props.kumbKes} // deneme
                kkartKes={this.props.kkartKes} // deneme
                havaledeKumb={this.props.havaledeKumb}
              />
            )
            : <ConnectHavale banka={this.props.banka} />}

        </Tab.Pane>
      ),
    },
  ];

  render() {
    const {
      banka, cart, checkoutType, address,
    } = this.props;
    const { activeIndex } = this.state;
    return (
      <Layout
        title="Ödeme Bilgileri"
        step="2"
        checkoutType={checkoutType}
        checkoutFunc={
          activeIndex == 0
            ? () => {
              site === 'b2b' ? this.KrediKarti.modalOpenB2B()
                : this.KrediKarti.modalOpen();
            }
            : null
        }
        route="checkout-success"
      >
        <Outer width={1} flexDirection="column">
          <Tab
            menu={{ secondary: true, pointing: true }}
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
            panes={this.panes}
            banka={banka}
            cart={cart}
            address={address}
          />
        </Outer>
      </Layout>
    );
  }
}
const mapStateToProps = ({
  checkoutBank, checkoutType, cart, address, kumbaraOk, kumbLess, kumbKes, kkartKes, havaledeKumb,
}) => ({
  checkoutBank,
  checkoutType,
  cart,
  address,
  kumbaraOk,
  kumbLess,
  kumbKes,
  kkartKes,
  havaledeKumb,
});
export default connect(mapStateToProps)(CheckoutPayment);
