import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import cx from 'classnames';
import Spinner from "../../ui/spinner";
import { Link } from '../../reactor';
// eslint-disable-next-line no-unused-vars
import Api from '../../api';
import { Router } from '../../routes';
import { media } from '../../style/theme';

const parents = [
  { title: 'Marka', name: 'marka' },
  { title: 'Model', name: 'model' },
  { title: 'Kasa', name: 'kasa' },
  { title: 'Yıl', name: 'yil' },
  { title: 'Motor Hacmi', name: 'motor' },
  { title: 'Beygir Gücü', name: 'beygir' },
];

const steps = {
  0: {
    placeholder: 'Marka Seçiniz veya Parça No, Parça İsmi giriniz',
    col: 4,
    marka_width: '25%',
  },
  1: {
    placeholder: 'Model Seçiniz',
    col: 3,
    marka_width: '33.3%',
  },
  2: {
    placeholder: 'Kasa Seçiniz',
    col: 2,
    marka_width: '50%',
  },
  3: {
    placeholder: 'Yıl Seçiniz',
  },
  4: {
    placeholder: 'Motor Hacmi Seçiniz',
  },
  5: {
    placeholder: 'Beygir Gücünü Seçiniz',
  },
};

class SearchBar extends React.Component {
  state = {
    clickedElement: null,
    options: {
      marka: { opts: [] },
    },
    tags: [],
    activeStep: 0,
    selectionIsActive: false,
    activeOption: 0,
    query: '',
    search: [],
    searchLoading: false,
    resultsWidth: 'auto',
    isSearchDisabled: true,
    isSubmitStart: false,
    isMobile: false,
  };

  async componentDidMount() {
    this.handleResize();
    document.addEventListener('keydown', (e) => {
      const { selectionIsActive } = this.state;
      if (selectionIsActive) {
        if (e.keyCode === 13) this.handlePressEnter();
        if (e.keyCode === 37) this.handlePressHorizontalArrow('left');
        if (e.keyCode === 39) this.handlePressHorizontalArrow('right');
        if (e.keyCode === 38) this.handlePressVerticalArrow('top');
        if (e.keyCode === 40) this.handlePressVerticalArrow('bottom');
        if (e.key === 'Escape') this.setState({selectionIsActive: false});
      }
    });
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 8) {
        const { query, activeStep } = this.state;
        if (!query && activeStep !== 0) {
          this.handleTagClick(activeStep - 1);
        }
      }
    });
    document.addEventListener('mouseup', (e) => {
      this.setState({ clickedElement: e.target });
    });
    document.addEventListener('touchend', (e) => {
      this.setState({ clickedElement: e.target });
    });
    await this.optionsData('marka');
    await this.openSearch();
    if (Router.router.route === '/list') {
      const q = Router.router.query;
      this.fillSearchTags(q);
    }
  }

  componentWillUnmount() {
    this.setState({selectionIsActive: false})
  }
  

  onChange = async (e) => {
    await this.setState({ query: e.target.value });
    this.onSearch();
  };

  onSubmit = (e, autofill = false) => {
    if (e) e.preventDefault();
    const { query, activeStep } = this.state;
    const params = this.getParams();
    const optionsLength = this.optionElements.filter((item) => item).length;
    if (Object.keys(params).length === 0 && !query) return;
    const { clickedElement } = this.state;
    if (
      clickedElement
      && ![...clickedElement.classList].includes('search-button')
      && (!query || (query && optionsLength !== 0))
      && activeStep !== 6
    ) {
      return;
    }
    if (!autofill) {
      this.setState({ isSubmitStart: true });
      setTimeout(() => {
        this.setState({ isSubmitStart: false });
      }, 2500);
    }
    this.setState({ selectionIsActive: false });
    if (!autofill) {
      if (query) {
        Router.pushRoute('search', { ...params, slug: query });
      } else {
        Router.pushRoute('listcar', { ...params });
      }
    }
  };

  onSearch = async () => {
    const { query } = this.state;

    this.setState({ activeOption: 0 });
    if (!query) {
      this.setState({ search: [] });
      return;
    }
    this.setState({ searchLoading: true, selectionIsActive: true });
    const params = this.getParams();
    let apiUrl = 'Products/araclarv2/';
    if (params.marka) apiUrl += `marka/${encodeURIComponent(params.marka).replace(/_/g, ' ')}/`;
    if (params.model) apiUrl += `model/${encodeURIComponent(params.model).replace(/_/g, ' ')}/`;
    if (params.kasa) apiUrl += `kasa/${encodeURIComponent(params.kasa).replace(/_/g, ' ')}/`;
    if (params.yil) {
      apiUrl += `model_yili/${encodeURIComponent(params.yil).replace(/_/g, ' ')}/`;
    }
    if (params.motor) apiUrl += `motor/${encodeURIComponent(params.motor).replace(/_/g, ' ')}/`;
    if (params.beygir) apiUrl += `beygir/${encodeURIComponent(params.beygir).replace(/_/g, ' ')}/`;
    const {
      results: { search },
    } = await Api.get(`${apiUrl}q/${encodeURIComponent(query)}/limit/10/sayfa/1/`);
    if (typeof search.hits !== 'undefined' && search.nbHits !== 0) {
      this.setState({ search: search.hits, searchLoading: false });
    } else {
      this.setState({ search: [], searchLoading: false });
    }
  };

  getParams = () => {
    const { options } = this.state;
    return parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue = typeof selected === 'string' ? selected.replace(/\s/g, '_') : selected;
        return { ...prevParams, [item.name]: selectedValue };
      }
      return prevParams;
    }, {});
  };

  setResultsWidth = () => {
    const { isMobile } = this.state;
    setTimeout(() => {
      if (this.searchInput) {
        const width = this.searchInput.offsetWidth;
        this.setState({ resultsWidth: `${isMobile ? width + 103 : width + 50}px` });
      }
    }, 10);
  };

  handleResize = () => {
    this.checkWidth();
    this.setResultsWidth();
    window.addEventListener('resize', () => {
      this.checkWidth();
      this.setResultsWidth();
    });
  };

  checkWidth = () => {
    const width = window.innerWidth;
    this.setState({ isMobile: width <= 768 });
  };

  // eslint-disable-next-line react/sort-comp
  optionElements = [];

  handlePressEnter = () => {
    const { activeOption } = this.state;
    if (this.optionElements[activeOption] && this.optionElements[activeOption].firstChild) {
      this.handleSelect(this.optionElements[activeOption].firstChild.innerHTML);
    }
  };

  handlePressHorizontalArrow = (dir) => {
    const optionElementsLength = this.optionElements.filter((item) => item).length;
    this.setState((prevState) => ({
      activeOption:
        dir === 'left'
          ? Math.max(prevState.activeOption - 1, 0)
          : Math.min(prevState.activeOption + 1, optionElementsLength - 1),
    }));
  };

  handlePressVerticalArrow = (dir) => {
    const { activeStep } = this.state;
    const optionElementsLength = this.optionElements.filter((item) => item).length;
    const step = Math.max(4 - activeStep, 1);
    this.setState((prevState) => ({
      activeOption:
        dir === 'top'
          ? Math.max(prevState.activeOption - step, 0)
          : Math.min(prevState.activeOption + step, optionElementsLength - 1),
    }));
  };

  openSearch = () => {
    this.setState({ isSearchDisabled: false });
  };

  handleFocus = async () => {
    await this.setResultsWidth();
    if (document.activeElement !== this.searchInput) this.searchInput.focus();
    setTimeout(() => {
      this.setState({ selectionIsActive: true });
    }, 10);
  };

  handleBlur = (e) => {
    e.preventDefault();

    if ([...document.activeElement.classList].includes('search-product')) {
      this.setState({ selectionIsActive: false });
      return true;
    }
    // console.log(this.state.clickedElement.className);
    // if (![...document.activeElement.classList].includes('option')) {
    //   this.setState({ selectionIsActive: false })
    // }
    // eslint-disable-next-line react/destructuring-assignment
    // const value = this.state.clickedElement;
    // value.className === 'option' && !value.className === 'icon-home' || value.type === 'text' && this.setState({ selectionIsActive: false});
    // console.log(value);
    // value.type === 'text' && console.log('Marka-model');
    // eslint-disable-next-line react/destructuring-assignment
    // const list = ['home', 'tags-wrap', 'input-holder', 'search-home', 'active'];
    // const value = clickedElement !== null && Object.values(clickedElement.parentElement.classList);
    // console.log(value);
    // if ((!value === 'icon-home' || 
    // [...document.activeElement.classList].includes('option'))) {
      //   this.setState({ selectionIsActive: false });
      // }
    const { clickedElement } = this.state;
    const ClickedClass = clickedElement.className;
    if (
      !ClickedClass === 'icon-home'
    || !ClickedClass === 'home'
    || !ClickedClass === 'tags-wrap'
    || !ClickedClass === 'input-holder'
    || !ClickedClass === 'search-holder'
    || !ClickedClass === 'active'
    ) {
      this.setState({ selectionIsActive: false });
      return true;
    }
    // return false;

    // if (!(ClickedClass === 'icon-home' || ClickedClass === 'option')) {
    //   this.setState({ selectionIsActive: false });
    //   return true;
    // }
    return false;
  };

  fillSearchTags = async (q) => {
    if (q.marka) await this.handleSelect(q.marka.replace(/_/g, ' '), true);
    if (q.model) await this.handleSelect(q.model.replace(/_/g, ' '), true);
    if (q.kasa) await this.handleSelect(q.kasa.replace(/_/g, ' '), true);
    if (q.yil) await this.handleSelect(q.yil.replace(/_/g, ' '), true);
    if (q.motor) await this.handleSelect(q.motor.replace(/_/g, ' '), true);
    if (q.beygir) await this.handleSelect(q.beygir.replace(/_/g, ' '), true);
  };

  // eslint-disable-next-line react/sort-comp
  async handleSelect(newTag, autofill = false) {
    const { activeStep } = this.state;
    await this.optionsData(parents[activeStep].name, newTag);
    this.setResultsWidth();
    this.setState((prevState) => ({
      tags: [...prevState.tags, newTag],
      activeStep: prevState.activeStep + 1,
      query: '',
      activeOption: 0,
    }));
    this.onSearch();
    if (activeStep !== 5) {
      if (!autofill) this.searchInput.focus();
      return;
    }
    // Submit only in last step
    this.onSubmit(null, autofill);
  }

  handleTagClick = async (index) => {
    this.searchInput.value = '';
    const { options } = this.state;
    const newOptionsArr = Object.keys(options).filter((item, i) => index >= i);
    const newOptions = newOptionsArr.reduce((acc, key, i) => {
      let value = options[key];
      if (i + 1 === newOptionsArr.length) {
        const newValue = value;
        delete newValue.selected;
        value = newValue;
      }
      return {
        ...acc,
        [key]: value,
      };
    }, {});
    await this.setState((prevState) => ({
      options: newOptions,
      tags: prevState.tags.slice(0, index),
      activeStep: index,
      query: '',
      activeOption: 0,
    }));
    this.setResultsWidth();
    await this.handleFocus();
    await this.onSearch();
  };

  async optionsData(name, value) {
    try {
      const { options, activeStep } = this.state;
      if (activeStep === 6) return;
      if (value && options[name].selected === value) return;
      const index = parents.findIndex((item) => item.name === name);
      const currentSelected = { [name]: { ...options[name], selected: value } };
      const prevStateOptionsFiltered = Object.keys(options).filter((key) => {
        const prevIndex = parents.findIndex((item) => item.name === key);
        return prevIndex < index;
      });
      const prevStateOptions = prevStateOptionsFiltered.reduce(
        (obj, key) => ({ ...obj, [key]: options[key] }),
        {},
      );
      let nextOptions = {};
      if (index !== parents.length - 1) {
        let dataUrl = 'Products/araclarv2';
        if (value) {
          if (index > 0) {
            dataUrl += prevStateOptionsFiltered.reduce(
              (prevDataURL, prevName) => `${prevDataURL}/${prevName === 'yil' ? 'model_yili' : prevName}/${encodeURIComponent(prevStateOptions[prevName].selected).replace(/_/g, ' ')}`,
              '',
            );
          }
          let newName = '';
          if (name === 'yil') {
            newName = 'model_yili';
          } else {
            newName = name;
          }
          dataUrl += `/${newName}/${encodeURIComponent(value).replace(/_/g, ' ')}`;
        }
        const nextParent = parents[index + (value ? 1 : 0)];
        if (nextParent) {
          const {
            results: { opts },
          } = await Api.get(dataUrl);
          const data = opts.map((text) => ({ text, value: text }));
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
    } catch (error) {}
  }

  renderOptions = (options, activeStep, query) => {

    let btnInnerText = '';

    switch (activeStep) {
      case 0:
        btnInnerText = 'Marka Seç';
        break;
      case 1:
        btnInnerText = 'Model Seç';
        break;
      case 2:
        btnInnerText = 'Kasa Seç';
        break;
      case 3:
        btnInnerText = 'Yıl Seç';
        break;
      case 4:
        btnInnerText = 'Motor Seç';
        break;
      case 5:
        btnInnerText = 'Güç Seç';
        break;
      default:
        break;
    }

    if (activeStep === 6) return;
    const filteredOptions = options[parents[activeStep].name].opts.filter((item) => {
      if (query) {
        return (
          item.text
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      }
      return true;
    });

    if (filteredOptions.length === 0) {
      return (
        <li style={{ width: '100%' }}>
          {`Aramanız için ${parents[activeStep].name} sonucu bulunamadı`}
        </li>
      );
    }
    const { activeOption } = this.state;
    return filteredOptions.map((item, index) => (
      <li
        className={cx({ active: index === activeOption })}
        ref={(n) => {
          this.optionElements[index] = n;
        }}
        style={{ width: steps[activeStep].marka_width || '100%' }}
        key={item.text}
      >
        <a className="option" href="javascript:;" onClick={() => this.handleSelect(item.text)}>
          {item.text}
          <div className="select-button">{btnInnerText}</div>
        </a>
      </li>
    ));
  };

  renderProductSlug = (item) => `/yedek-parca${item.slug}`;

  render() {
    const {
      clickedElement,
      options,
      tags,
      activeStep,
      selectionIsActive,
      query,
      search,
      searchLoading,
      resultsWidth,
      isSearchDisabled,
      isSubmitStart,
      isMobile,
    } = this.state;
    // console.log(( clickedElement !== null && Object.values(clickedElement.parentElement.classList)), this.searchInput);
    let placeholder = '';
    if (isSearchDisabled) {
      placeholder = 'Yükleniyor...';
    } else if (isMobile || tags.length === 6) {
      placeholder = 'Parça Ara...';
    } else {
      placeholder = steps[activeStep].placeholder;
    }
    return (
      <Form onSubmit={this.onSubmit} className={cx({ submitted: isSubmitStart })}>
        <TagsWrap className="tags-wrap">
          <div className="home">
            <a className="search-home" href="javascript:;" onClick={() => this.handleTagClick(0)} alt="Anasayfa">
              <i className="icon-home" />
            </a>
          </div>
          <ul className="tags">
            {tags.map((tag, index) => (
              <li style={{ zIndex: tags.length - index }} key={tag}>
                <a href="javascript:;" onClick={() => this.handleTagClick(index)}>
                  {tag}
                </a>
              </li>
            ))}
          </ul>
        </TagsWrap>
        <InputHolder className="input-holder">
          <input
            type="text"
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            disabled={isSearchDisabled}
            name="input_search"
            autocomplete="off"
            ref={(n) => {
              this.searchInput = n;
            }}
          />
          <Submit className="search-button" />
          <Results style={{ width: resultsWidth }} className={cx({ active: selectionIsActive })}>
            {activeStep !== 6 && (
              <Markalar onClick={() => this.searchInput.value = ''}>{this.renderOptions(options, activeStep, query)}</Markalar>
            )}
            <Urunler className={cx({ 'search-only': activeStep === 6 })}>
              {!query && <li className="not-found">Ürün sonuçları için arama yapınız.</li>}
              {query && !searchLoading && search.length === 0 && (
                <li style={{ width: '100%', paddingLeft: '15px' }}>
                  Aramanız için ürün sonucu bulunamadı.
                </li>
              )}
              {query && searchLoading && <Spinner size="small" />}
              {query && !searchLoading && search !== [] &&
                search.map((item, i) => (
                  <li key={i} onClick={() => { 
                    this.searchInput.value = ''; 
                    this.setState({ query: '', selectionIsActive : false}); 
                  }}>
                    <Link
                      className="search-product"
                      to={this.renderProductSlug(item)}
                      title={item.parcakodu}
                    />
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(https://resize.aloparca.com/upload/w_50/yedekparca_img${
                          item.gorsel
                        })`,
                      }}
                    />
                    <div className="bilgi">
                      <span className="ad" lang="tr">
                        {item.tedarikci_aciklama}
                      </span>
                      <span className="marka">
                        <strong>Marka:</strong> {item.stokmarka}
                      </span>
                      <span className="stok_kodu">
                        <strong>Stok Kodu:</strong> {item.parcakodu}
                      </span>
                      <span className="stok_adedi">
                        <strong>Stok Adedi:</strong> {item.stok_adet}
                      </span>
                    </div>
                    <span className="fiyat">
                      <span className="big">{item.fiyat.split('.')[0]}</span>
                      {`.${
                        item.fiyat.split('.')[1] ? item.fiyat.split('.')[1].substr(0, 2) : '00'
                      } TL`}
                    </span>
                  </li>
                ))}
            </Urunler>
          </Results>
        </InputHolder>
        <Preload className="preload">
          <div className="bar" />
          <img className="icon no-path" src="/static/img/preload-icon.svg" alt="Yükleniyor" />
        </Preload>
      </Form>
    );
  }
}

const Form = styled.form`
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  width: 60%;
  max-width: 680px;
  margin-left: 7px;
  display: flex;
  padding: 3px;
  padding-right: 0;
  margin-top: 3px;
  position: relative;
  overflow: visible;
 
  ${media.tablet`
    order: 3;
    width: 100%;
    margin: 15px 0 -10px;
    max-width: 100%;
  `};
  &.submitted {
    overflow: hidden;
    .tags-wrap,
    .input-holder {
      display: none;
    }
    .preload {
      transition: 1s;
      pointer-events: visible;
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

const Submit = styled.button.attrs({ type: 'submit', name: 'btn-search' })`
  border: 0;
  background: url(/static/img/search-icon.png) no-repeat center center;
  width: 25px;
  display: block;
  text-indent: -9999px;
  overflow: hidden;
  outline: 0;
  padding: 0 25px;
  height: 100%;
  cursor: pointer;
  margin-top: -1px;
`;

const TagsWrap = styled.div`
  height: 100%;
  margin: 0;
  z-index: 5;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: flex-end;
  padding-left: 50px;
  .tags {
    display: inline-flex;
    height: 100%;
    top: 0;
    justify-content: flex-end;
    ${media.phone`
      display: inline-flex;
    `};
  }
  .tags li,
  & > .home {
    display: inline-block;
    height: 100%;
    position: relative;
    padding-right: 19px;
    overflow: hidden;
    opacity: 1;
    transform: translate(0, 0);
    transition: 0.2s;
    &:after {
      content: '';
      background: url(/static/img/tag-triangle.png) center/cover no-repeat;
      width: 19px;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
    }
    &.added {
      opacity: 0;
      transform: translate(0, 100%);
    }
  }
  & > .home {
    margin: 0;
    z-index: 999;
    vertical-align: top;
    line-height: 44px;
    position: absolute;
    left: 3px;
    height: 38px;
    a {
      background-color: #ff8900;
      color: #fff;
      border-radius: 5px 0 0 5px;
      padding-left: 12px;
      display: block;
      height: 100%;
      font-size: 22px;
      line-height: 38px;
    }
    &:after {
      background-image: url(/static/img/tag-triangle-home.png);
    }
  }
  .tags li {
    margin-left: -23px;
    line-height: 43px;
    min-width: max-content;
    a {
      color: #fff;
      display: block;
      height: 100%;
      padding: 0 2px 0 30px;
      font-size: 14px;
      font-weight: 700;
      background-color: #ddd;
      white-space: nowrap;
      text-align: right;
      line-height: 38px;
    }
  }
`;

const InputHolder = styled.div`
  height: 100%;
  transition: 0.3s;
  position: relative;
  display: flex;
  flex-grow: 1;
  min-width: 300px;
  ${media.phone`
    min-width: 10rem;
  `};
  input {
    border: 0;
    width: 100%;
    height: 100%;
    outline: 0;
    padding: 12px 10px;
    display: block;
    color: #999;
    font-size: 14px !important;
    &:disabled {
      background-color: white;
    }
  }
`;

const Results = styled.div`
  padding: 0.5em;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 48px;
  right: 0;
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

const Markalar = styled.ul`
  ${media.phone`
    display: block;
  `};
  li {
    border-top: dashed 2px #f2f5f0;
    display: inline-block;
    padding: 0 8px;
    vertical-align: middle;
    ${media.phone`
      width: 100% !important;

    `};
    a {
      display: block;
      font-size: 14px;
      padding: 10px 5px;
      font-weight: 700;
      color: #999;
      &:hover {
        color: #525355;
      }
      ${media.phone`
        width: 100% !important;
        display: flex;
        justify-content: space-between;

      `};
      .select-button{
        display: none;
        ${media.phone`
          display: inline-block;
          background-color: #ff8901;
          position: relative;
          color: white;
          border-radius: 5px;
          padding: 5px;
          pointer-events: none;
      `};
      }
    }
    &.active a {
      color: #000;
    }
    
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
    width: 100%;
    a {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
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
      .stok_kodu,
      .stok_adedi {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.9em;
      }
      .stok_adedi{
        margin-left: 15px;
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
    background-size: cover;
    background-position: center;
    background-color: #fff;
    border: 1px solid #eee;
    vertical-align: middle;
    margin: 2px;
  }
`;

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

const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(SearchBar);
