import { Tab, Select, Button } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';
import cx from 'classnames';

import { Container } from '../../../reactor';
import { Router } from '../../../routes';
import { addGarage } from '../../../actions';
import Api from '../../../lastikApi';
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

// width=165&ratio=50&diameter=15&loadIndex=72&speedIndexes=H
const parents = [
  { title: 'Genişlik', name: 'widths', slug: 'width' },
  { title: 'Yükseklik', name: 'ratios', slug: 'ratio' },
  { title: 'Çap', name: 'diameters', slug: 'diameter' },
  { title: 'Yük Endeksi', name: 'loadIndexes', slug: 'loadIndex' },
  { title: 'Hız Endeksi', name: 'speedIndexes', slug: 'speedIndexes' },
];

class CarForm extends React.Component {
  static async getInitialProps() {
    return {};
  }
  state = {
    options: {
      widths: { opts: [] },
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
        // let newName = item.name;
        // if (item.name === 'model_yili') {
        //   newName = 'yil';
        // }

        return { ...prevParams, [item.name]: selectedValue };
      }
      return prevParams;
    }, {});
    if (options.beygir && options.beygir.selected) {
      const data = {
        width: options.width.selected,
        ratio: options.ratio.selected,
        diameter: options.diameter.selected,
        loadIndex: options.loadIndex.selected,
        speedIndexes: options.speedIndexes.selected,
      };
      this.props.dispatch(addGarage(data));
    }
    // Router.pushRoute('listcar', params);
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
      let dataUrl = '';
      if (value) {
        if (index > 0) {
          dataUrl += prevStateOptionsFiltered.reduce(
            (prevDataURL, prevName) =>
              `${prevDataURL}&${prevName}=${prevStateOptions[prevName].selected}`,
            '',
          );
        }

        dataUrl += `&${name}=${encodeURIComponent(value)}`;
      }

      /*
      // console.log('index : ', index);
      // console.log('parents : ', parents);
      // console.log('dataUrl : ', dataUrl);
      // console.log('options : ', options);
      */

      const opts = Object;
      const nextParent = parents[index + (value ? 1 : 0)];
      if (nextParent) {
        const datatest = await Api.get(dataUrl);

        const data = datatest[nextParent.slug].map(item => ({
          text: item.value,
          value: item.value,
        }));

        nextOptions = { [nextParent.name]: { opts: data } };

        // console.log('datatest[nextParent.slug] : ', datatest[nextParent.slug]);

        var sNext = Object;
        var sVal = '';

        if (Object.keys(opts).length == 1) {
          sNext = nextParent.name;

          sVal = nextOptions[nextParent.name].opts[0].value;
          singleSelect = true;
          nextOptions[nextParent.name].selectedValue = nextOptions[nextParent.name].opts[0].value;
        }

        // console.log('nextOptions : ', nextOptions);
      }
    }

    await this.setState({
      options: {
        ...prevStateOptions,
        ...currentSelected,
        ...nextOptions,
      },
    });

    // Added
    if (singleSelect) {
      this.optionsData(sNext, sVal);
    }

    if (index === parents.length - 1) {
      this.onSubmit();
    }
  }

  render() {
    // console.log('this.state: ', this.state);

    return (
      <form>
        <Flex className="car-select" mx={[-1, -1, -2]} alignItems="flex-end">
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
          <Box className="car-select-box" width={[1, 1, 1 / 7]} px={[1, 1, 2]}>
            <Button
              type="button"
              onClick={this.onSubmit}
              disabled={!this.state.options[parents[1].name]}
              fluid
            >
              Lastik Ara
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
