import { connect } from 'react-redux';
import { reduce } from 'asyncro';
import { Select, Button } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';
import Api from '../../../api';
import Outer from './style';
var singleSelect = false;

import { Router } from '../../../routes';

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Yıl', name: 'yil' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  // { title: 'Motor Hacmi', name: 'motor' },
  // { title: 'Beygir Gücü', name: 'beygir' },
];

class CarSelect extends React.Component {
  state = {
    options: {
      marka: { opts: [] },
    },
  };

  componentDidMount() {
    // console.log(this.props)
    if (this.props.marka) {
      let garage = {};
      console.log(this.props)
      if (this.props.marka) garage = { ...garage, marka: decodeURIComponent(this.props.marka) };
      if (this.props.yil) garage = { ...garage, yil: parseInt(decodeURIComponent(this.props.yil)) };
      if (this.props.model) garage = { ...garage, model: decodeURIComponent(this.props.model) };
      if (this.props.kasa) garage = { ...garage, kasa: decodeURIComponent(this.props.kasa) };
      // if (this.props.motor) garage = { ...garage, motor: decodeURIComponent(this.props.motor) };
      // if (this.props.beygir) garage = { ...garage, beygir: decodeURIComponent(this.props.beygir) };
      console.log(garage)
      this.carLoader(garage);
    } else {
      this.carLoader(this.props.garage);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    // console.log("nextprop", nextProp)
    if (nextProp.marka) {
      let garage = {};
      if (nextProp.marka) garage = { ...garage, marka: decodeURIComponent(nextProp.marka) };
      if (nextProp.yil) garage = { ...garage, yil: parseInt(decodeURIComponent(nextProp.yil)) };
      if (nextProp.model) garage = { ...garage, model: decodeURIComponent(nextProp.model) };
      if (nextProp.kasa) garage = { ...garage, kasa: decodeURIComponent(nextProp.kasa) };
      
      // if (nextProp.motor) garage = { ...garage, motor: decodeURIComponent(nextProp.motor) };
      // if (nextProp.beygir) garage = { ...garage, beygir: decodeURIComponent(nextProp.beygir) };
      this.carLoader(garage);
    } else {
      this.carLoader(nextProp.garage);
    }
  }

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
  };

  onSubmit = () => {
    const { options } = this.state;
    const { maincategory, subcategory } = this.props;
    const params = parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue =
          typeof selected === 'string' ? selected.replace(/\s/g, '_') : selected;
        return { ...prevParams, [item.name]: selectedValue };
      }
      return prevParams;
    }, {});

    let newParams = { ...params };
    let routeType = 'listcar-v2';
    if (subcategory) {
      newParams = { ...newParams, subcategory };
      routeType = 'listsubcategory-v2';
    } else if (maincategory) {
      newParams = { ...newParams, maincategory };
      routeType = 'listmaincategory-v2';
    }

    Router.pushRoute(routeType, newParams);
  };

  carLoader(garage) {
    const { name } = parents[0];
    // debugger
    if (garage && garage[name]) {
      this.loadCarSelected(garage);
    } else {
      this.optionsData(name);
    }
  }

  loadCarSelected(garage) {
    const {
      uyeid, sasi, not, resim, ...carList
    } = garage;
    let newOptions = {};
    Object.keys(carList).forEach((key) => {
      if (key !== 'beygir') {
        const keyValue =
          typeof carList[key] === 'string' ? carList[key].replace(/_/g, ' ') : carList[key];
        newOptions = {
          ...newOptions,
          [key]: { opts: [{ key: key.id, value: key.id, text: keyValue }], selected: keyValue },
        };
      }
    });
    this.setState({ options: { ...newOptions } });
    this.loadCarOptions(carList);
  }

  async loadCarOptions(carList) {
    let dataURL = 'Products/araclar';
    
    const queryKeys = Object.keys(carList);
    const newOptions = await reduce(
      queryKeys,
      async (prevObj, name) => {
        const selected =
          typeof carList[name] === 'string' ? carList[name].replace(/_/g, ' ') : carList[name];
        const { results } = await Api.get(dataURL);
        let newName = '';
        if (name === 'yil') {
          newName = 'model_yili';
        } else {
          newName = name;
        }
        dataURL += `/${newName}/${encodeURIComponent(selected)}`;
        const opts = results.opts.map(text => ({ key:text.id, text:text.name, value: text.id }));

        return { ...prevObj, [name]: { opts, selected } };
      },
      {},
    );

    const keys = Object.keys(newOptions);

    if (keys.length < parents.length) {
      const lastName = parents[keys.length].name;
      const { results } = await Api.get(dataURL);

      const opts = results.opts.map(text => ({ key:text.id, text:text.name, value: text.id }));
      const options = { ...newOptions, [lastName]: { opts } };
      this.setState({ options });
    } else {
      this.setState({ options: newOptions });
    }
  }

  async optionsData(name, value) {
    singleSelect = false;
    // debugger
    const { options } = this.state;
    // debugger
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
              `${prevDataURL}/${prevName === 'yil' ? 'model_yili' : prevName}/${
                prevStateOptions[prevName].selected
              }`,
            '',
          );
        }
        let newName = '';
        if (name === 'yil') {
          newName = 'model_yili';
        } else {
          newName = name;
        }
        dataUrl += `/${newName}/${encodeURIComponent(value)}`;
      }

      const nextParent = parents[index + (value ? 1 : 0)];
      // console.log("dataurl", dataUrl);
      if (nextParent) {
        const {
          results: { opts },
        } = await Api.get(dataUrl);
        const data = opts.map((text) => ({ key: text.id, value: text.id, text: text.name }));

        nextOptions = { [nextParent.name]: { opts: data } };

        var sNext=Object;
        var sVal="";

       if(Object.keys(opts).length==1){
            sNext = nextParent.name;
            sVal = nextOptions[nextParent.name].opts[0].value;
            singleSelect = true;
            nextOptions[nextParent.name].selectedValue=nextOptions[nextParent.name].opts[0].value;
        }
      }
    }

    await this.setState({
      options: {
        ...prevStateOptions,
        ...currentSelected,
        ...nextOptions,
      },
    });

    if(singleSelect){
      this.optionsData(sNext,sVal);
    }

    if (index === parents.length - 1) {
      this.onSubmit();
    }
  }

  render() {
    return (
      <Outer key={Math.floor(Math.random() * 1001202000000)}>
        <Flex py={2} mb={2} flexDirection="column" className="parca-ara">
          <Box px={3} mb={2} className="label">
            Araç Bilgileri ile Ara
          </Box>
          {parents.map(({ name, title }) => {
            const select = this.state.options[name] || {};
            const options = select.opts || [];
            if (options.length) {
              return (
                <Box px={2} mb={1} key={title}>
                  <Select
                    name={name}
                    className="item"
                    placeholder={title}
                    disabled={options.length === 0}
                    options={options}
                    onChange={this.onChange}
                    value={select.selected || ''}
                    search
                  />
                </Box>
              );
            }
          })}
          {this.state.options[parents[1].name] && (
            <Box px={2}>
              <Button type="button" onClick={this.onSubmit} fluid>
                Parça Ara
              </Button>
            </Box>
          )}
        </Flex>
      </Outer>
    );
  }
}

const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(CarSelect);
