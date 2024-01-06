import { Tab, Select, Button } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';
import cx from 'classnames';

import { Container } from '../../../reactor';
import { Router } from '../../../routes';
import { addGarage } from '../../../actions';
import Api from '../../../api';
import Outer from './style';

// EE
let singleSelect = false;

const panes = [
  {
    menuItem: 'Araç Bilgileri ile Ara',
    render: () => (
      <Tab.Pane>
        <ConnectedCarForm />
      </Tab.Pane>
    ),
  },
];

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  { title: 'Yıl', name: 'model_yili' },
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
    const { name } = parents[0];
    this.optionsData(name);
  }

  onChange = (e, { name, value }) => {
    this.optionsData(name, value);
    // localStorage alanı
    // const activeParent = parents.findIndex(item => item.name === name);
    // localStorage.setItem(name, value);
    // parents.forEach((item, index) => {
    //   if (activeParent < index) localStorage.removeItem(item.name);
    // });
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
      this.props.dispatch(addGarage(data));
    }
    Router.pushRoute('listcar', params);
  };

  async optionsData(name, value) {
    // EE
    singleSelect = false;

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
      const opts = Object;
      const nextParent = parents[index + (value ? 1 : 0)];
      if (nextParent) {
        const {
          results: { opts },
        } = await Api.get(dataUrl);

        const data = opts.map(text => ({ text, value: text }));
        nextOptions = { [nextParent.name]: { opts: data } };

        // Added Erdal EROĞLU /*
        var sNext = Object;
        var sVal = '';

        if (Object.keys(opts).length == 1) {
          sNext = nextParent.name;

          sVal = nextOptions[nextParent.name].opts[0].value;
          singleSelect = true;
          nextOptions[nextParent.name].selectedValue = nextOptions[nextParent.name].opts[0].value;
        }

        // Added Erdal EROĞLU  */
      }
    }

    await this.setState({
      options: {
        ...prevStateOptions,
        ...currentSelected,
        ...nextOptions,
      },
    });

    // Added Erdal EROĞLU
    if (singleSelect) {
      this.optionsData(sNext, sVal);
    }

    if (index === parents.length - 1) {
      this.onSubmit();
    }
  }

  render() {
    return (
      <Outer>
        <Flex className="car-select" px={[1, 1, 2]} justifyContent="center" flexDirection="column">
        <h3>Araç Bilgileri ile Ara</h3>
          <Flex className="container" mx={-1} alignItems="flex-end">
            {parents.map(({ name, title }) => {
              const select = this.state.options[name] || {};
              const options = select.opts || [];

              return (
                <Box
                  className={cx('car-select-box', { disabled: options.length === 0 })}
                  width={[1, 1, 1 / 7]}
                  px={1}
                  key={title}
                >
                  <label>{title}</label>
                  <Select
                    name={name}
                    placeholder={title}
                    disabled={options.length === 0}
                    options={options}
                    onChange={this.onChange}
                    value={select.selected || ''}
                    search
                  />
                </Box>
              );
            })}
            <Box className="car-select-box" width={[1, 1, 1 / 7]} px={1}>
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
        </Flex>
      </Outer>
    );
  }
}

export default connect()(CarSelect);
