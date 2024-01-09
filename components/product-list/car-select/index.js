import { connect } from 'react-redux';
import { reduce } from 'asyncro';
import { Select, Button } from 'semantic-ui-react';
import { Flex, Box } from 'grid-styled';
import { initStore } from '../../../store';
import Api from '../../../api';
import Outer from './style';

import { Router } from '../../../routes';

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  { title: 'Yıl', name: 'yil' },
  { title: 'Motor Hacmi', name: 'motor' },
  { title: 'Beygir Gücü', name: 'beygir' },
];

class CarSelect extends React.Component {
  state = {
    options: {
      marka: { opts: [] },
    },
  };

  componentDidMount() {
    if (this.props.marka) {
      let garage = {};
      if (this.props.marka) garage = { ...garage, marka: decodeURIComponent(this.props.marka) };
      if (this.props.model) garage = { ...garage, model: decodeURIComponent(this.props.model) };
      if (this.props.kasa) garage = { ...garage, kasa: decodeURIComponent(this.props.kasa) };
      if (this.props.yil) garage = { ...garage, yil: decodeURIComponent(this.props.yil) };
      if (this.props.motor) garage = { ...garage, motor: decodeURIComponent(this.props.motor) };
      if (this.props.beygir) garage = { ...garage, beygir: decodeURIComponent(this.props.beygir) };
      this.carLoader(garage);
    } else {
      this.carLoader(this.props.garage);
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.marka) {
      let garage = {};
      if (nextProp.marka) garage = { ...garage, marka: decodeURIComponent(nextProp.marka) };
      if (nextProp.model) garage = { ...garage, model: decodeURIComponent(nextProp.model) };
      if (nextProp.kasa) garage = { ...garage, kasa: decodeURIComponent(nextProp.kasa) };
      if (nextProp.yil) garage = { ...garage, yil: decodeURIComponent(nextProp.yil) };
      if (nextProp.motor) garage = { ...garage, motor: decodeURIComponent(nextProp.motor) };
      if (nextProp.beygir) garage = { ...garage, beygir: decodeURIComponent(nextProp.beygir) };
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
    let routeType = 'listcar';
    if (subcategory) {
      newParams = { ...newParams, subcategory };
      routeType = 'listsubcategory';
    } else if (maincategory) {
      newParams = { ...newParams, maincategory };
      routeType = 'listmaincategory';
    }

    Router.pushRoute(routeType, newParams);
  };

  carLoader(garage) {
    const { name } = parents[0];
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
          [key]: { opts: [{ text: keyValue, value: keyValue }], selected: keyValue },
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
        const opts = results.opts.map(text => ({ text, value: text.toString() }));

        return { ...prevObj, [name]: { opts, selected } };
      },
      {},
    );

    const keys = Object.keys(newOptions);
    if (keys.length < parents.length) {
      const lastName = parents[keys.length].name;
      const { results } = await Api.get(dataURL);
      const opts = results.opts.map(text => ({ text, value: text.toString() }));
      const options = { ...newOptions, [lastName]: { opts } };
      this.setState({ options });
    } else {
      this.setState({ options: newOptions });
    }
  }

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
      this.onSubmit();
    }
  }

  render() {
    return (
      <Outer>
        <Flex py={2} mb={2} column className="parca-ara">
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
