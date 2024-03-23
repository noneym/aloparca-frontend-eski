import { Tab, Select, Button } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';
import cx from 'classnames';

import { Container } from '../../../reactor';
import { Router } from '../../../routes';
import { initStore } from '../../../store';
import { addGarage } from '../../../actions';
import Api from '../../../api';
import Outer from './style';

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
    },
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
                width={[1, 1, 1 / 7]}
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

const ConnectedCarForm = connect()(CarForm);

const CarSelect = () => (
  <Outer>
    <Container>
      <Tab panes={panes} renderActiveOnly />
    </Container>
  </Outer>
);
export default connect()(CarSelect);
