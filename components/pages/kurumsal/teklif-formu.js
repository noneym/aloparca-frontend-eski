import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, TextArea, Button, Select, Ref } from 'semantic-ui-react';
import Spinner from '../../../ui/spinner';
import Api from '../../../api';

const Outer = styled.div`
  .ui.form .field > label {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 500;
  }
  .ui.form input,
  .ui.form textarea {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    font-weight: 400;
    border-radius: 0 !important;
  }
  .ui.form .field {
    margin-bottom: 1.5em;
  }
`;

class TeklifFormu extends React.Component {
  state = {
    isLoading: false,
    arac_marka: null,
    arac_model: null,
    arac_kasa: null,
    arac_yil: null,
    arac_motor: null,
    arac_beygir: null,
    markaList: [],
    modelList: [],
    kasaList: [],
    yilList: [],
    motorList: [],
    beygirList: [],
  };
  async componentDidMount() {
    const dataMarka = await Api.get('Products/araclar');
    const newData = dataMarka.results.opts.map(text => ({ text, value: text }));
    this.changeState('markaList', newData);
  }

  offerForm = null;

  handleRef = (node) => {
    this.offerForm = node;
  };

  changeState = (name, data) => {
    this.setState({ [name]: data });
  };
  handleChange = async (e, { name, value }) => {
    this.setState({ [name]: value });
    const {
      arac_marka, arac_model, arac_kasa, arac_yil, arac_motor,
    } = this.state;
    if (name === 'arac_marka') {
      const dataMarka = await Api.get(`Products/araclar/marka/${encodeURIComponent(value)}`);
      const newData = dataMarka.results.opts.map(text => ({ text, value: text }));
      this.changeState('modelList', newData);
      this.setState({
        kasaList: [],
        yilList: [],
        motorList: [],
        beygirList: [],
      });
    } else if (name === 'arac_model') {
      const dataModel = await Api.get(`Products/araclar/marka/${encodeURIComponent(arac_marka)}/model/${encodeURIComponent(value)}`);
      const newData = dataModel.results.opts.map(text => ({ text, value: text }));
      this.changeState('kasaList', newData);
      this.setState({
        yilList: [],
        motorList: [],
        beygirList: [],
      });
    } else if (name === 'arac_kasa') {
      const dataKasa = await Api.get(`Products/araclar/marka/${encodeURIComponent(arac_marka)}/model/${encodeURIComponent(arac_model)}/kasa/${encodeURIComponent(value)}`);
      const newData = dataKasa.results.opts.map(text => ({ text, value: text }));
      this.changeState('yilList', newData);
      this.setState({
        motorList: [],
        beygirList: [],
      });
    } else if (name === 'arac_yil') {
      const dataYil = await Api.get(`Products/araclar/marka/${encodeURIComponent(arac_marka)}/model/${encodeURIComponent(arac_model)}/kasa/${encodeURIComponent(arac_kasa)}/model_yili/${encodeURIComponent(value)}`);
      const newData = dataYil.results.opts.map(text => ({ text, value: text }));
      this.changeState('motorList', newData);
      this.setState({
        beygirList: [],
      });
    } else if (name === 'arac_motor') {
      const dataMotor = await Api.get(`Products/araclar/marka/${encodeURIComponent(arac_marka)}/model/${encodeURIComponent(arac_model)}/kasa/${encodeURIComponent(arac_kasa)}/model_yili/${encodeURIComponent(arac_yil)}/motor/${encodeURIComponent(value)}`);
      const newData = dataMotor.results.opts.map(text => ({ text, value: text }));
      this.changeState('beygirList', newData);
    }
  };
  teklifForm = async (e) => {
    e.preventDefault();
    const {
      adsoyad,
      telefon,
      email,
      saseno,
      liste,
      arac_marka,
      arac_model,
      arac_kasa,
      arac_yil,
      arac_motor,
      arac_beygir,
    } = this.state;
    let required = true;
    if (!arac_marka) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen marka seçiniz' });
    } else if (!arac_model) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen model seçiniz' });
    } else if (!arac_kasa) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen kasa tipi seçiniz' });
    } else if (!arac_yil) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen model yılı seçiniz' });
    } else if (!arac_motor) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen motor hacmi seçiniz' });
    } else if (!arac_beygir) {
      required = false;
      this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen beygir gücü seçiniz' });
    }
    if (required) {
      this.setState({ isLoading: true });
      const fd = new FormData();
      fd.append('ad_soyad', adsoyad);
      fd.append('e_posta', email);
      fd.append('telefon', telefon);
      fd.append('sase_numara', saseno);
      fd.append('yedek_parca_listesi', liste);
      fd.append('marka', arac_marka);
      fd.append('model', arac_model);
      fd.append('kasa', arac_kasa);
      fd.append('modelyili', arac_yil);
      fd.append('motor', arac_motor);
      fd.append('beygir', arac_beygir);
      const formData = await Api.post('Anasayfa/topluParca', fd);
      if (parseInt(formData.resultCode, 10) === 200) {
        this.props.dispatch({
          type: 'FLASH_MESSAGE',
          payload: 'Teklif formu başarıyla gönderildi.',
        });
      } else {
        this.props.dispatch({ type: 'FLASH_MESSAGE', payload: 'Beklenmedik bir hata oluştu.' });
      }
      this.offerForm.reset();
      this.setState({
        isLoading: false,
        arac_marka: null,
        arac_model: null,
        arac_kasa: null,
        arac_yil: null,
        arac_motor: null,
        arac_beygir: null,
        modelList: [],
        kasaList: [],
        yilList: [],
        motorList: [],
        beygirList: [],
      });
    }
  };
  render() {
    const {
      isLoading,
      markaList,
      modelList,
      kasaList,
      yilList,
      motorList,
      beygirList,
    } = this.state;
    return (
      <Outer>
        <Ref innerRef={this.handleRef}>
          <Form onSubmit={this.teklifForm} autoComplete="off">
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Ad Soyad"
                name="adsoyad"
                type="text"
                placeholder="Ad Soyad"
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Telefon"
                name="telefon"
                type="tel"
                placeholder="Telefon"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="E-Posta"
                name="email"
                type="email"
                placeholder="E-Posta"
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Şase No"
                name="saseno"
                type="text"
                placeholder="Şase No"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Marka"
                name="arac_marka"
                type="text"
                placeholder="Marka"
                options={markaList}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Model"
                name="arac_model"
                type="text"
                placeholder="Model"
                options={modelList}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Kasa Tipi"
                name="arac_kasa"
                type="text"
                placeholder="Kasa Tipi"
                options={kasaList}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Yıl"
                name="arac_yil"
                type="text"
                placeholder="Yıl"
                options={yilList}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Motor Hacmi"
                name="arac_motor"
                type="text"
                placeholder="Motor Hacmi"
                options={motorList}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Select}
                label="Beygir Gücü"
                name="arac_beygir"
                type="text"
                placeholder="Beygir Gücü"
                options={beygirList}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              label="Yedek Parça veya Hizmet Listesi"
              name="liste"
              placeholder="Yedek Parça veya Hizmet Listesi"
              onChange={this.handleChange}
              required
            />
            <Form.Field
              id="form-button-control-public"
              control={Button}
              type="submit"
              name="btn_submit"
              disabled={isLoading}
              content={
                <span>
                  Gönder
                  {isLoading && (
                    <Spinner marginLeft={7.5} size="tiny" />
                  )}
                </span>
              }
            />
          </Form>
        </Ref>
      </Outer>
    );
  }
}

export default connect()(TeklifFormu);
