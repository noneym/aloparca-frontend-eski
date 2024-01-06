import { Select, Button } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';
import { connect } from 'react-redux';
import cx from 'classnames';
import styled from 'styled-components';

import { addGarage } from '../../../../actions';
import Api from '../../../../api';
import { media } from '../../../../style/theme';

const Outer = styled.div`
  width: 100%;
  .car-select {
    ${media.tablet`
      align-item: center;
      flex-direction: column;
      margin: 10px 0;
    `};
    .car-select-box {
      padding: 0 10px;
      ${media.tablet`
        margin: 10px 0;
        padding: 0 20px;
      `};
      &.disabled {
        ${media.tablet`
          display: none;
        `};
      }
    }
  }
  .ui.selection.dropdown,
  .ui.selection.dropdown .item {
    padding-left: 10px !important;
    padding-right: 5px !important;
  }
  .ui.selection.dropdown {
    min-width: auto;
    display: block;
    border-radius: 0;
    border: 1px solid #dddddd;
    padding-top: 12px;
    padding-bottom: 12px;
    min-height: auto;
    position: relative;
    .menu {
      border: none;
      margin: 0;
      min-width: 100%;
      width: 100%;
    }
    .icon {
      font-family: 'icomoon';
      font-size: 12px;
      padding: 12px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      margin: 0;
      &:before {
        content: '\\e903';
      }
    }
  }

  .ui.button {
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    height: 42px;
  }
`;

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
    buttonActive: false,
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
      this.props.dispatch({
        type: 'FLASH_MESSAGE',
        payload: 'Seçtiğiniz araç garajınıza eklendi',
      });
    }
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
      this.setState({ buttonActive: true });
    }
  }

  render() {
    const { buttonActive } = this.state;
    return (
      <Outer>
        <Flex className="car-select" mx={-1} mt={2} alignItems="flex-end">
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
                <Select
                  name={name}
                  placeholder={`${title}`}
                  disabled={options.length === 0}
                  options={options}
                  onChange={this.onChange}
                  value={select.selected || ''}
                />
              </Box>
            );
          })}
          <Box className="car-select-box" width={[1, 1, 1 / 7]} px={[1, 1, 2]}>
            <Button type="button" onClick={this.onSubmit} disabled={!buttonActive} fluid>
              EKLE
            </Button>
          </Box>
        </Flex>
      </Outer>
    );
  }
}

export default connect()(CarSelect);
