import { Tab, Select, Button, Input } from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';
import cx from 'classnames';

import { Container } from '../../../reactor';
import { Router } from '../../../routes';
import { initStore } from '../../../store';
import { addGarage } from '../../../actions';
import Api from '../../../api';
import Outer from './style';
import { borderRadius, media } from '../../../style/theme';

const loadingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Preload = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 0s;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-100%);
  .bar {
    background: url(/static/img/bar.svg) right center/cover no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .icon {
    position: absolute;
    top: 3px;
    height: 38px;
    left: calc(100% - 43px);
    animation: ${loadingAnimation} 1s linear infinite;
  }
`;

const Results = styled.div`
  padding: 0.5em;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 68px;
  left: 0;
  max-height: 600px;
  overflow: auto;
  margin: 0;
  display: none;
  border: 1px solid #ddd;
  transition: 0.3s;
  .not-found {
    background: 0 0;
    height: auto !important;
    margin-top: 0 !important;
    padding-left: 15px;
  }
  &.active {
    display: block;
    opacity: 1;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff8900;
  }
  &::-webkit-scrollbar-track {
    background-color: #ddd;
  }
`;

const Urunler = styled.ul`
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin: 10px 0;
  ${media.phone`
    border-top: none;
    padding-top: 0;
  `};
  &.search-only {
    border-top: none;
    padding-top: 0;
  }
  .ui.loader {
    display: block !important;
    margin: 10px auto 0;
    padding-bottom: 30px;
  }
  li {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    padding-right: 8px;
    margin-top:4px;
    margin-bottom:4px
    width: 100%;
    color:black;
    a {
      cursor: pointer;
      display: block;
      width: 100%;
      height: 100%;
    }
    & + li {
      border-top: 1px dashed #ccc;
      margin-top: 1px;
      padding-top: 1px;
    }
    .bilgi {
      max-width: calc(100% - 140px);
      margin-left: 6px;
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      color: #999;
      .ad {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 4px;
        text-transform: uppercase;
      }
      .marka {
        margin-right: 15px;
      }
      .marka,
      .stok_kodu {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.9em;
      }
    }
    .fiyat {
      padding-left: 6px;
      display: block;
      color: #ff8900;
      font-size: 11px;
      min-width: max-content;
      text-align: right;
      float: right;
      margin-top: 6px;
      font-weight: 500;
      .big {
        font-size: 15px;
      }
    }
  }
  .img {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-color: #fff;
    border: 1px solid #eee;
    vertical-align: middle;
    margin: 2px;
  }
`;

const panes = [
  {
    menuItem: 'Araç Bilgileri ile Ara',
    render: () => (
      <Tab.Pane>
        <ConnectedCarForm />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Şase No ile Ara',
    render: () => (
      <Tab.Pane>
        <ConnectedSaseForm />
      </Tab.Pane>
    ),
  },
];

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Yıl', name: 'yil' },
  { title: 'Model', name: 'model' },
  { title: 'Araçlar', name: 'kasa' },
  // { title: 'Motor Hacmi', name: 'motor' },
  // { title: 'Beygir Gücü', name: 'beygir' },
];

class CarForm extends React.Component {
  static async getInitialProps(store) {
    return {};
  }
  state = {
    options: {
      marka: { opts: [] },
    }
  };

  componentDidMount() {
    const { name } = parents[0];
    this.optionsData(name);
  }

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
    // localStorage alanı
    //debugger
    const activeParent = parents.findIndex((item) => item.name === name);
    localStorage.setItem(name, value);
    parents.forEach((item, index) => {
      if (activeParent < index) localStorage.removeItem(item.name);
    });
  };

  onSubmit = () => {
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
        // if (item.name === 'kasa') {
        //   newName = 'pc_id';
        // }
        return { ...prevParams, [newName]: selectedValue };
      }
      return prevParams;
    }, {});
    if (options.beygir && options.beygir.selected) {
      const data = {
        marka: options.marka.selected,
        model: options.model.selected,
        pc_id: options.kasa.selected,
        yil: options.model_yili.selected,
        // motor: options.motor.selected,
        // beygir: options.beygir.selected,
      };
      // this.props.dispatch(addGarage(data));
    }
    //  debugger
    // consoe.log(params)
    Router.pushRoute('listcar-v2', params);
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
        const { results: { opts } } = await Api.get(dataUrl);
        // const data = opts.map((text) => ({ text, value: text.name }));
        const data = opts.map((text) => ({ key: text.id, value: text.id, text: text.name }));

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
      this.onSubmit();
    }
  }

  render() {
    return (
      <form>
        <Flex className="car-select" mx={[-1, -1, -2]} align="flex-end">
          {parents.map(({ name, title }) => {
            const select = this.state.options[name] || {};
            const options = select.opts || [];

            return (
              <Box
                className={cx('car-select-box', { disabled: options.length === 0 })}
                width={[1, 1, 1 / 5]}
                px={[1, 1, 2]}
                key={title}
              >
                <label>{title}</label>
                <Select
                  name={name}
                  placeholder={`${title} Seçiniz`}
                  disabled={options.length === 0}
                  options={options}
                  onChange={this.onChange}
                  value={select.selected || ''}
                  search
                />
              </Box>
            );
          })}
          <Box className="car-select-box" width={[1, 1, 1 / 7]} px={[1, 1, 2]}>
            <Button
              type="button"
              onClick={this.onSubmit}
              disabled={!this.state.options[parents[1].name]}
              fluid
            >
              Parça Ara
            </Button>
          </Box>
        </Flex>
      </form>
    );
  }
}


class SaseForm extends React.Component {
  static async getInitialProps(store) {
    return {};
  }

  state = {
    result:{},
    message:null,
    uiIdx:0,
    opts:[]
  };

  componentDidMount() {}

  onChange = async (e, { name, value }) => {
    
    const { results, message } = await Api.get(
      "Products/araclar_vin?vin=" + e.target.value
    );
    //debugger
    console.log(results, message);
    if (message) {
      this.setState({ 'message': message, result:null });
    }
    if (results && results.opts) {
      this.setState({result:results, message:null});
    }

    this.setState({ uiIdx: this.uiIdx + 1 });
  };

  onSubmit = () => {
    console.log(this.saseinput.inputRef.current.value);
  };

  render() {
    return (
      <form key={this.uiIdx}>
        <Flex className="car-select" mx={[-1, -1, -2]} align="flex-end">
          <Box
            className={cx("car-select-box")}
            width={[1, 1, 1 / 2]}
            px={[1, 1, 4]}
            key="saseno"
          >
            <div style={{ position: "relative" }}>
              <label for="saseinput">{"Şase no ile Ara"}</label>
              <Input
                onChange={this.onChange}
                id="saseinput"
                required
                name="saseinput"
                ref={n => {
                  this.saseinput = n;
                }}
                placeholder="WAUBH54B11N111054"
              />
              <Results
                style={{ width: "auto" }}
                className={cx({
                  active: this.state.message != null || this.state.result?.opts
                })}
              >
                <Urunler>
                  {this.state.message && (
                    <li
                      style={{
                        width: "100%",
                        paddingLeft: "15px",
                        color: "black"
                      }}
                    >
                      {this.state.message}
                    </li>
                  )}
                  {/* {JSON.stringify(this.state.result)} */}
                  {this.state.result?.opts &&
                    this.state.result?.opts.map(item => (
                      <li>
                        <a
                          onClick={() => {
                            Router.pushRoute("listcarparts", {
                              kasa: item.id,
                              hs: true
                            });
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                </Urunler>
              </Results>
            </div>
          </Box>
          {/* <Box className="car-select-box" width={[1, 1, 1 / 2]} px={[1, 1, 2]}>
            <Button type="button" onClick={this.onSubmit} fluid>
              Parça Ara
            </Button>
          </Box> */}
        </Flex>
      </form>
    );
  }
}

const ConnectedCarForm = connect()(CarForm);
const ConnectedSaseForm = connect()(SaseForm);
const CarSelect = () => (
  <Outer>
    <Container>
      <Tab panes={panes} renderActiveOnly />
    </Container>
  </Outer>
);

export default connect()(CarSelect);
