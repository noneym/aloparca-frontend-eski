import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import cx from 'classnames';
import Spinner from "../../ui/spinner";
import { Link } from '../../reactor';
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
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
    col: 4,
    marka_width: '25%',
  },
  1: {
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
    col: 3,
    marka_width: '33.3%',
  },
  2: {
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
    col: 2,
    marka_width: '50%',
  },
  3: {
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
  },
  4: {
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
  },
  5: {
    placeholder: 'Parça No (06690S2AG10ZD) ile arama yapabilirsiniz!',
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
    searchProduct: [],
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

  onChange = async (e) => {
    await this.setState({ query: e.target.value });
    this.onSearch();
  };


  onSubmit = (e, autofill = false) => {
    if (e) e.preventDefault();
    const { query, activeStep } = this.state;
    const params = this.getParams();
    const optionsLength = this.optionElements.filter(item => item).length;
    if (Object.keys(params).length === 0 && !query) return;
    const { clickedElement } = this.state;
    if (
      clickedElement &&
      ![...clickedElement.classList].includes('search-button') &&
      (!query || (query && optionsLength !== 0)) &&
      activeStep !== 6
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
    if (query === '') {
      this.setState({ search: [], searchProduct: [] });
      return;
    }
    this.setState({ searchLoading: true, selectionIsActive: true });

    try {
      // dinamik search alanı. girilen anlık veri yani query hem OEM (urunler) 
      // hem de normal urunler(searchProduct) için arama sağlanıyor ve state güncelleniyor
      const oemUrl = `B2b/oem_parca_ara?oem=${encodeURIComponent(query)}`;
      const { urunler } = await Api.get(oemUrl);
      // console.log(urunler)
      const url = `Products/araclar/q/${encodeURIComponent(query)}/limit/10/sayfa/1/`;
      const { results: { search: { hits } } } = await Api.get(url);


      this.setState({ search: urunler, searchProduct: hits, searchLoading: false });
    } catch (e) {
      //  console.log(e);
      this.setState({ search: [], searchProduct: [], searchLoading: false });
    }
    
  };

  getParams = () => {
    const { options } = this.state;
    return parents.reduce((prevParams, item) => {
      const selected = options[item.name] && options[item.name].selected;
      if (selected) {
        const selectedValue =
          typeof selected === 'string' ? selected.replace(/\s/g, '_') : selected;
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

  optionElements = [];

  handlePressEnter = () => {
    const { activeOption } = this.state;
    if (this.optionElements[activeOption] && this.optionElements[activeOption].firstChild) {
      this.handleSelect(this.optionElements[activeOption].firstChild.innerHTML);
    }
  };

  handlePressHorizontalArrow = (dir) => {
    const optionElementsLength = this.optionElements.filter(item => item).length;
    this.setState(prevState => ({
      activeOption:
        dir === 'left'
          ? Math.max(prevState.activeOption - 1, 0)
          : Math.min(prevState.activeOption + 1, optionElementsLength - 1),
    }));
  };

  handlePressVerticalArrow = (dir) => {
    const { activeStep } = this.state;
    const optionElementsLength = this.optionElements.filter(item => item).length;
    const step = Math.max(4 - activeStep, 1);
    this.setState(prevState => ({
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
    this.searchInput.value = '';
    setTimeout(() => {
      if ([...document.activeElement.classList].includes('search-product')) {
        setTimeout(() => this.setState({ selectionIsActive: false }), 100);
        return true;
      }
      if (![...document.activeElement.classList].includes('option')) {
        setTimeout(() => this.setState({ selectionIsActive: false }), 100);
      }
    }, 300);
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

  async handleSelect(newTag, autofill = false) {
    const { activeStep } = this.state;
    await this.optionsData(parents[activeStep].name, newTag);
    this.setResultsWidth();
    this.searchInput.value = '';
    await this.setState(prevState => ({
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
    this.searchInput.value = '';
    await this.setState(prevState => ({
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
    const { options, activeStep } = this.state;
    if (activeStep === 6) return;
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
              `${prevDataURL}/${prevName === 'yil' ? 'model_yili' : prevName}/${encodeURIComponent(prevStateOptions[prevName].selected).replace(/_/g, ' ')}`,
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
  }

  renderOptions = (options, activeStep, query) => {
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
          <a className="option" href="javascript:;">
            {`Aramanız için ${parents[activeStep].name} sonucu bulunamadı`}
          </a>
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
        </a>
      </li>
    ));
  };

  Cevir = text =>{
      let trMap = {
          'çÇ':'c',
          'ğĞ':'g',
          'şŞ':'s',
          'üÜ':'u',
          'ıİ':'i',
          'öÖ':'o'
      };
      for(let key in trMap) {
          text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
      }
      return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') 
                  .replace(/\s/gi, "-") 
                  .replace(/[-]+/gi, "-") 
                  .toUpperCase();
  }
  
  renderProductSlug = item => {
    
    let itemMarka = this.Cevir(item.marka);
    let stokadi = this.Cevir(item.stokadi);
    let stokkodu = this.Cevir(item.stokkodu);

    return  `/yedek-parca/${itemMarka}${`/${stokadi}`}/${stokkodu}/${item.no}`
  }

  selectLogo = (item) => {
    if (item.includes('otosan')) return '/static/img/logolar/markalar/marka_fordotosan.svg';
    if (item.includes('usa')) return '/static/img/logolar/markalar/marka_fordusa.svg';
    if (item.includes('alfa')) return '/static/img/logolar/markalar/marka_alfaromeo.svg';
    if (item.includes('anadol')) return '/static/img/logolar/markalar/marka_anadol.svg';
    if (item.includes('aston')) return '/static/img/logolar/markalar/marka_astonmartin.svg';
    if (item.includes('audi')) return '/static/img/logolar/markalar/marka_audi.svg';
    if (item.includes('bentley')) return '/static/img/logolar/markalar/marka_bentley.svg';
    if (item.includes('bmw')) return '/static/img/logolar/markalar/marka_bmw.svg';
    if (item.includes('bugatti')) return '/static/img/logolar/markalar/marka_bugatti.svg';
    if (item.includes('cadillac')) return '/static/img/logolar/markalar/marka_cadillac.svg';
    if (item.includes('chery')) return '/static/img/logolar/markalar/marka_chery.svg';
    if (item.includes('chevrolet')) return '/static/img/logolar/markalar/marka_chevrolet.svg';
    if (item.includes('chrysler')) return '/static/img/logolar/markalar/marka_chrysler.svg';
    if (item.includes('citroen')) return '/static/img/logolar/markalar/marka_citroen.svg';
    if (item.includes('dacia')) return '/static/img/logolar/markalar/marka_dacia.svg';
    if (item.includes('daewoo')) return '/static/img/logolar/markalar/marka_daewoo.svg';
    if (item.includes('daf')) return '/static/img/logolar/markalar/marka_daf.svg';
    if (item.includes('daihatsu')) return '/static/img/logolar/markalar/marka_daihatsu.svg';
    if (item.includes('dodge')) return '/static/img/logolar/markalar/marka_dodge.svg';
    if (item.includes('ferrari')) return '/static/img/logolar/markalar/marka_ferrari.svg';
    if (item.includes('fiat')) return '/static/img/logolar/markalar/marka_fiat.svg';
    if (item.includes('geely')) return '/static/img/logolar/markalar/marka_geely.svg';
    if (item.includes('gmc')) return '/static/img/logolar/markalar/marka_gmc.svg';
    if (item.includes('honda')) return '/static/img/logolar/markalar/marka_honda.svg';
    if (item.includes('hummer')) return '/static/img/logolar/markalar/marka_hummer.svg';
    if (item.includes('hyundai')) return '/static/img/logolar/markalar/marka_hyundai.svg';
    if (item.includes('infiniti')) return '/static/img/logolar/markalar/marka_infiniti.svg';
    if (item.includes('isuzu')) return '/static/img/logolar/markalar/marka_isuzu.svg';
    if (item.includes('iveco')) return '/static/img/logolar/markalar/marka_iveco.svg';
    if (item.includes('jaguar')) return '/static/img/logolar/markalar/marka_jaguar.svg';
    if (item.includes('jeep')) return '/static/img/logolar/markalar/marka_jeep.svg';
    if (item.includes('kia')) return '/static/img/logolar/markalar/marka_kia.svg';
    if (item.includes('lamborghini')) return '/static/img/logolar/markalar/marka_lamborghini.svg';
    if (item.includes('lancia')) return '/static/img/logolar/markalar/marka_lancia.svg';
    if (item.includes('landrover')) return '/static/img/logolar/markalar/marka_landrover.svg';
    if (item.includes('lincoln')) return '/static/img/logolar/markalar/marka_lincoln.svg';
    if (item.includes('maserati')) return '/static/img/logolar/markalar/marka_maserati.svg';
    if (item.includes('mazda')) return '/static/img/logolar/markalar/marka_mazda.svg';
    if (item.includes('benz')) return '/static/img/logolar/markalar/marka_mercedesbenz.svg';
    if (item.includes('mercedes')) return '/static/img/logolar/markalar/marka_mercedes.svg';
    if (item.includes('mini')) return '/static/img/logolar/markalar/marka_mini.svg';
    if (item.includes('mitsubishi')) return '/static/img/logolar/markalar/marka_mitsubishi.svg';
    if (item.includes('nissan')) return '/static/img/logolar/markalar/marka_nissan.svg';
    if (item.includes('opel')) return '/static/img/logolar/markalar/marka_opel.svg';
    if (item.includes('peugeot')) return '/static/img/logolar/markalar/marka_peugeot.svg';
    if (item.includes('porsche')) return '/static/img/logolar/markalar/marka_porsche.svg';
    if (item.includes('ranger')) return '/static/img/logolar/markalar/marka_ranger.svg';
    if (item.includes('trucks')) return '/static/img/logolar/markalar/marka_renaulttrucks.svg';
    if (item.includes('renault')) return '/static/img/logolar/markalar/marka_renault.svg';
    if (item.includes('rollsroyce')) return '/static/img/logolar/markalar/marka_rollsroyce.svg';
    if (item.includes('rover')) return '/static/img/logolar/markalar/marka_rover.svg';
    if (item.includes('saab')) return '/static/img/logolar/markalar/marka_saab.svg';
    if (item.includes('seat')) return '/static/img/logolar/markalar/marka_seat.svg';
    if (item.includes('shelby')) return '/static/img/logolar/markalar/marka_shelby.svg';
    if (item.includes('skoda')) return '/static/img/logolar/markalar/marka_skoda.svg';
    if (item.includes('smart')) return '/static/img/logolar/markalar/marka_smart.svg';
    if (item.includes('ssangyong')) return '/static/img/logolar/markalar/marka_ssangyong.svg';
    if (item.includes('subaru')) return '/static/img/logolar/markalar/marka_subaru.svg';
    if (item.includes('suzuki')) return '/static/img/logolar/markalar/marka_suzuki.svg';
    if (item.includes('tofas')) return '/static/img/logolar/markalar/marka_tofas.svg';
    if (item.includes('toyota')) return '/static/img/logolar/markalar/marka_toyota.svg';
    if (item.includes('vauxhall')) return '/static/img/logolar/markalar/marka_vauxhall.svg';
    if (item.includes('volvo')) return '/static/img/logolar/markalar/marka_volvo.svg';
    if (item.includes('vw')) return '/static/img/logolar/markalar/marka_vw.svg';
    return '/static/img/logolar/markalar/marka_vw.svg';
  }

  render() {
    const {
      options,
      tags,
      activeStep,
      selectionIsActive,
      query,
      search,
      searchProduct,
      searchLoading,
      resultsWidth,
      isSearchDisabled,
      isSubmitStart,
      isMobile,
    } = this.state;
    let placeholder = '';
    if (isSearchDisabled) {
      placeholder = 'Yükleniyor...';
    } else if (isMobile || tags.length === 6) {
      placeholder = 'Parça Ara...';
    } else {
      placeholder = steps[activeStep].placeholder;
    }
    // console.log(searchProduct);
    return (
      <Form onSubmit={this.onSubmit} className={cx({ submitted: isSubmitStart })}>
        <InputHolder className="input-holder">
          <input
            type="text"
            placeholder={placeholder}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            disabled={isSearchDisabled}
            name="input_search"
            ref={(n) => {
              this.searchInput = n;
            }}
          />
          <Submit className="search-button" />
          <Results style={{ width: resultsWidth }} className={cx({ active: selectionIsActive })}>
      
            <Urunler className={cx({ 'search-only': activeStep === 6 })}>
              {/* {!query && <li className="not-found">Ürün sonuçları için arama yapınız.</li>} */}
              {query && !searchLoading && search === [] && (
                <li style={{ width: '100%', paddingLeft: '15px' }}>
                  Aramanız için oem no sonucu bulunamadı.
                </li>
              )}
              {query && !searchLoading && search !== [] && search !== null &&
                search.map((item,i) => (
                  <li  
                    key={i}
                    onClick={() => {
                      this.searchInput.value = '';
                      this.setState({ query: '' });
                    }}
                  > 
                  
                  {/*<Link
                      className="search-product"
                      route="product-oem"
                      params={{ slug: item.no }}
                      title={item.stokmarka}
                   >*/}
                   {/*TEST*/}
                  {/*<Link
                      className="search-product"
                      to={`/yedek-parca${item.slug}`}
                      title={item.name}
                  />*/}
                  <a className="search-product" href={`/yedek-parca${item.slug}`} />
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${ item.arac_marka 
                        ? this.selectLogo(item.arac_marka.toLowerCase())
                        : item.gorsel && item.gorsel !== null ? `https://resize.aloparca.com/upload/w_260,h_200` + item.gorsel : 
                        "https://resize.aloparca.com/upload/w_260,h_200/A27015906001000302561.JPG"
                      })` }}
                      />
                    <div className="bilgi">
                      <span className="ad" lang="tr">
                        {item.name}
                      </span>
                      <span className="ad" lang="tr">
                        {item.stokadi}
                      </span>
                      <span className="marka">
                      {/*console.log(item)*/}
                        <strong>Marka:</strong> {item.stokmarka}
                      </span>
                      <span className="stok_kodu">
                        <strong>Stok Kodu:</strong> {item.parcakodu}
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
            <Urunler className={cx({ 'search-only': activeStep === 6 })}>
              {/* {!query && <li className="not-found">Ürün sonuçları için arama yapınız.</li>} */}
              {query && !searchLoading && searchProduct.length === 0 && (
                <li style={{ width: '100%', paddingLeft: '15px' }}>
                  Aramanız için parça no sonucu bulunamadı.
                </li>
              )}
              {query && searchLoading && <Spinner size="small" />}
              {query &&
                !searchLoading &&
                searchProduct.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      this.searchInput.value = '';
                      this.setState({ query: '' });
                    }}
                  >
                  {/*console.log(item , this.renderProductSlug(item))*/}
                    <Link
                      className="search-product"
                      to={this.renderProductSlug(item)}
                      title={item.stokadi}
                    />
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(https://resize.aloparca.com/upload/w_50/${
                          item.resim
                        })`,
                      }}
                    />
                    <div className="bilgi">
                      <span className="ad" lang="tr">
                        {item.stokadi}
                      </span>
                      <span className="marka">
                        <strong>Marka:</strong> {item.marka}
                      </span>
                      <span className="stok_kodu">
                        <strong>Stok Kodu:</strong> {item.stokkodu}
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
  z-index: 1;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  width: 60%;
  max-width: 680px;
  display: flex;
  padding: 3px;
  padding-right: 0;
  margin-top: 3px;
  position: relative;
  overflow: visible;
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

const Submit = styled.button.attrs({ type: 'submit' })`
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

const InputHolder = styled.div`
  height: 100%;
  transition: 0.3s;
  position: relative;
  display: flex;
  flex-grow: 1;
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
    display: none;
  `};
  li {
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
