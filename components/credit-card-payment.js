import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';

import { Input, Dropdown, Checkbox, Modal, Radio } from 'semantic-ui-react';
import cx from 'classnames';
import styled from 'styled-components';

import { Router } from '../routes';
import { media } from '../style/theme';
import Api from '../api';
import { deleteAllCart, checkCart } from '../actions';
import { userLogout } from '../actions/user/logout';
import Dimmer from "../ui/dimmer";
import Spinner from "../ui/spinner";

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
    width: 100%;
    ${media.tablet`
      flex-direction: column;
    `};

    .kumbara-content {
      margin-bottom: 60px;
      padding: 0px 10px;
    }
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

class Taksitler extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = { value: '1' };

  handleChange = (e, { value }) => {
    this.setState({ value });
    this.props.onChange(value);
    this.props.dispatch(checkCart({ taksit: value }));
  };

  renderTl = value =>
    parseFloat(value).toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });

  render() {
    const {
      cart, taksit, kumbaraTotal, query, kumbara,
    } = this.props;
    let totalCart = 0;
    if (cart && cart.total) {
      totalCart = parseFloat(cart.total) - kumbara;
    }
    return (
      <React.Fragment>
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
            <strong>{this.renderTl(kumbaraTotal || cart ? totalCart : 0)}</strong>
          </Flex>
          <Flex width={1 / 3} p={1} justifyContent="center">
            <strong>{this.renderTl(kumbaraTotal || cart ? totalCart : 0)}</strong>
          </Flex>
        </Flex>
        {taksit &&
          taksit.map(item => (
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
                <strong>{this.renderTl(item.tutar)}</strong>
              </Flex>
              <Flex width={1 / 3} p={1} justifyContent="center">
                {this.renderTl(item.total)}
              </Flex>
            </Flex>
          ))}
      </React.Fragment>
    );
  }
}

class KrediKarti extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = {
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
    isCreditCardSaved: true,
    cardList: null,
  };

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    this.getCreditCards();
  }

  // async UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.kumbara !== this.props.kumbara) {
  //     this.setState({ taksitLoading: true });
  //     const { activeCard, cardList } = this.state;
  //     let cardNumber;
  //     if (activeCard === 'new') {
  //       cardNumber = this.formCardNumber.inputRef.current.value;
  //     } else {
  //       const activeCardData = cardList.find(item => item.Id === activeCard);
  //       cardNumber = activeCardData.cc_number;
  //     }
  //
  //     // this.props.checkoutType = nextProps.kumbara != 0 ? 6 : 1;
  //     // console.log('checkoutType : ', this.props.checkoutType);
  //
  //     const { taksit } = await Api.get(`Users/taksit_vadefark?ccno=${cardNumber}&tutar=${this.props.cart.total -
  //         nextProps.kumbara}`);
  //     this.setState({ taksit, taksitLoading: false });
  //   }
  // }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
  }

  getCreditCards = async () => {
    const cardList = await Api.get('Users/kredi_karti_list');
    cardList === undefined ? this.props.dispatch(userLogout()) : null;
    await this.setState({ cardList, activeCard: cardList.length > 0 ? cardList[0].Id : 'new' });
    if (cardList.length > 0) {
      this.getTaksit();
    }
  };

  getTaksit = async () => {
    const { kumbaraTotal, taksitGoster } = this.props;
    if(!taksitGoster)
      return;

    this.setState({ taksitLoading: true });
    const { activeCard, cardList } = this.state;
    let cardNumber;
    if (activeCard === 'new') {
      cardNumber = this.formCardNumber.inputRef.current.value;
    } else {
      const activeCardData = cardList.find(item => item.Id === activeCard);
      cardNumber = activeCardData.cc_number;
    }
    if (cardNumber.length > 5) {
      if (!this.state.taksit) {
        const { taksit } = await Api.get(`Users/taksit_vadefark?ccno=${cardNumber}&tutar=${kumbaraTotal ||
            this.props.cart.total - this.props.kumbara}`);
        await this.setState({ taksit });
      }
    } else {
      this.setState({ taksit: null });
    }
    this.setState({ taksitLoading: false });
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
      let siparisData;
      if (this.props.taksitGoster) {
        const sd = new FormData();
        sd.append('odemetipi', this.props.kumbara != 0 ? 6 : 1);
        sd.append('fatura_adres_id', this.props.address.fatura);
        sd.append('teslimat_adres_id', this.props.address.teslimat);
        sd.append('kargo_firmasi', 'Yurtiçi Kargo'); 
        if(this.props.cart.indirim){
          sd.append('kupon', (typeof this.props.cart.indirim.kupon === undefined ? null : this.props.cart.indirim.kupon ));
        }
        siparisData = await Api.post('Users/siparis_olustur', sd, true);
      }

      const fd = new FormData();

      if (activeCard === 'new') {
        fd.append('cc_name', formName);
        fd.append('cc_number', formCard);
        fd.append('cc_sonkullanma', `${formMonth}/${formYear}`);
        fd.append('cc_guvenlik_kodu', formSecurity);
        if(isCreditCardSaved)
          fd.append('kredi_karti_kaydet', '1');
      } else {
        fd.append('saved_card_id', activeCard);
      }

      fd.append('taksit', this.state.taksitValue);

      const total = parseFloat(this.props.cart.total.toString().replace(/[^\d.]/g, ''));
      const vadefarki = parseFloat(this.props.cart.vadefarki.toString().replace(/[^\d.]/g, ''));
      // const tutar = (total - vadefarki).toFixed(2);
      let tutar = false;

      let siparis_id;

      if (this.props.taksitGoster) {
        // kumbara sayfasında degilse
        tutar = (total - vadefarki).toFixed(2);
        siparis_id = JSON.parse(siparisData).siparis_no
      } else {
        // kumbara sayfası için
        tutar = this.props.kumbaraTotal;
        fd.append('kumbara_add', 1);
        siparis_id = "KMB-"+this.props.userData.user[0].id+'-'+(Math.floor(Math.random() * 99999) + 10000);
      }
      fd.append('siparis_id', siparis_id);

      fd.append('tutar', tutar);

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
      if(!this.iframePayment)
        return;
      const ifPay = this.iframePayment.contentWindow.document;
      ifPay.open();
      ifPay.write(html);
      ifPay.close();

      if (status) {
        this.resultPayment = setInterval(async () => {
          console.log('ödeme check kredit kart payment componenet');
          console.log(this.props.cart);
          var kupon = null;
          if(this.props.indirim){
            kupon = this.props.indirim.kupon;
          }
          const odemeSonuc = await Api.get(`Users/odeme_check?siparis_id=${siparis_id}&kupon=${this.props.indirim.kupon}`);
          if (odemeSonuc.length > 0) {
            if (parseInt(odemeSonuc[0].status, 10) === 1) {
              if(this.props.kumbaraTotal) {
                this.setState({paymentModal:false})
                this.props.onSuccess();
              } else {
                this.props.dispatch(deleteAllCart());
                Router.pushRoute('checkout-success', { id: siparis_id });
              }
            } else {
              this.setState({
                errorMessage: odemeSonuc[0].ErrorMSG,
                openModal: true,
                paymentModal: false,
              });
            }
            this.closeOdemeCheck();
          }
        }, 2000);
      }
    }
  };

  closeOdemeCheck = () => {
    clearInterval(this.resultPayment);
  }

  closeModal = () => this.setState({ openModal: false });

  changeCreditCardSave = () => {
    this.setState(prevState => ({ isCreditCardSaved: !prevState.isCreditCardSaved }));
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
    } = this.state;
    const {
      cart, kumbaraTotal, dispatch, taksitGoster, userData, query, kumbara,
    } = this.props;
    return (
      <Outer>
        <Flex className="credit-card" mx={[0, 0, -2]}>
          <Flex
            width={taksitGoster ? '[1, 1, 1, 1]' : '[1, 1, 1 / 2]'}
            px={[0, 0, 2]}
            mb={[4, 4, 0]}
            flexDirection="column"
          >
            {/*
              <Box className="area-title">KUMBARA</Box>
            <Flex className="kumbara-content" px={[2, 2, 4]} flexDirection="column">
              <Flex className="kumbara-odeme" mt={3}>
                {false ? (
                  <Box my={3}>Kumbarada kullanılabilir bakiye bulunmıyor.</Box>
                ) : (
                  <Flex flexDirection="column">
                    Kumbaranızda 999TL bulunmaktadır, alışverişte kullanmak istiyor musunuz ?
                  </Flex>
                )}
              </Flex>
            </Flex>
            */}

            <Box className="area-title">KART BİLGİLERİ</Box>
            <Flex className="area-content" px={taksitGoster ? [2, 2, 4] : 0} flexDirection="column">
              <Flex className="saved-cards" mt={3}>
                {!cardList ? (
                  <Box my={3}>Kayıtlı Kartlar Yükleniyor...</Box>
                ) : (
                  <Flex flexDirection="column">
                    <div className="saved-cards-title">KAYITLI KARTLAR</div>
                    {cardList.length === 0 || 
                      cardList === undefined || 
                      cardList === null ||
                      cardList === [] ||
                      cardList === {} ?
                      (
                      <Box mb={2}>Kayıtlı Kart Bulunamadı</Box>
                    ) : (
                      cardList.map(card => (
                        <Radio
                          className="saved-card"
                          key={card.cc_number}
                          label={
                            <label>
                              <Flex flexDirection="column">
                                <Box style={{ fontWeight: '500' }}>
                                  {`${card.name} - ${card.banka}`}
                                </Box>
                                <Box>{`${card.cc_number} - ${card.exdate}`}</Box>
                              </Flex>
                            </label>
                          }
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
              {cardList && (
                <Flex my={2}>
                  <Radio
                    label="Yeni Kart"
                    name="radioGroup"
                    value="new"
                    checked={activeCard === 'new'}
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
                      <a href="javascript:;" onClick={this.modalOpen}>
                        ?
                      </a>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex mt={4} alignItems="center">
                  <Checkbox
                    label="Kredi Kartını Kaydet"
                    checked={isCreditCardSaved}
                    onChange={this.changeCreditCardSave}
                  />
                </Flex>
              </div>
            </Flex>
          </Flex>

          {taksitGoster && (
            <Flex width={[1, 1, 1 / 2]} px={[0, 0, 2]} flexDirection="column">
              <Box className="area-title">TAKSİT SEÇENEKLERİ </Box>
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
                      onChange={taksitValue => this.setState({ taksitValue })}
                      kumbaraTotal={kumbaraTotal}
                      kumbara={kumbara}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Modal open={paymentModal} onClose={() => {
          this.setState({ paymentModal: false })
          this.closeOdemeCheck();
        }} closeIcon>
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
      </Outer>
    );
  }
}

const KrediKartiForwardRef = ({ innerRef, ...props }) => <KrediKarti ref={innerRef} {...props} />;

const mapStateToProps = ({
  checkoutBank, checkoutType, cart, address, userData,
}) => ({
  checkoutBank,
  checkoutType,
  cart,
  address,
  userData,
});
export default connect(mapStateToProps)(KrediKartiForwardRef);
