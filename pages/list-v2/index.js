// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import { Flex, Box } from '@rebass/grid';
import {
  Checkbox,
  Dropdown,
  List,
  Modal,
  Select,
} from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import styled from 'styled-components';
import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { seoMeta, redirectCheck, site } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import BreadCrumb from '../../components/breadcrumb';
import Paginate from '../../components/paginate';
import CarSelect from '../../components/product-list/car-select';
import CarSelectFilter from '../../components/product-list/filter/car-select';
import Category from '../../components/product-list/category';
import ProductCard from '../../components/product-list/product-card';
import ProductCardB2b from '../../components/product-list/product-card/b2b';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import SearchBar from '../../components/header/search2';
import SeoContent from '../../components/product-list/seo-content';

import ListPage from './style';

import Api from '../../api';
import { media } from '../../style/theme';

const SelectModelList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 15px;

  ${media.tablet`
      margin-bottom: 15px;
    `};

  ${media.phoneMini`
    grid-template-columns: repeat(3, 1fr);
  `};

  ${media.mini`
    grid-template-columns: repeat(2, 1fr);
  `};
`;

const SelectModelListLink = styled.a`
  background: #ff8901;
  color: white;
  font-weight: 500;
  height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px;
  transition: all 300ms;

  &:hover {
    color: white;
    background: #ea8006;
  }
`;

const TextIsMobile = styled.span`
  display: none;
  ${media.tablet`
      display: block;
    `};
`;

const TextIsDesktop = styled.span`
  ${media.tablet`
      display: none;
    `};
`;

class ProductList extends React.Component {
  static async getInitialProps({ res, reduxStore, query }) {
    const { garage } = reduxStore.getState();
    const { sayfa = 1 } = query;
    let apiUrl = '';
    let apiType = '';
    let categoryUrl = '';
    if (query.marka) {
      apiType = 'Products/products';
      if (query.marka) apiUrl += `marka/${encodeURIComponent(query.marka).replace(/_/g, ' ')}/`;
      if (query.model) apiUrl += `model/${encodeURIComponent(query.model).replace(/_/g, ' ')}/`;
      if (query.kasa) apiUrl += `kasa/${encodeURIComponent(query.kasa).replace(/_/g, ' ')}/`;
      if (query.yil) {
        apiUrl += `model_yili/${encodeURIComponent(query.yil).replace(/_/g, ' ')}/`;
      }
      if (query.motor) apiUrl += `motor/${encodeURIComponent(query.motor).replace(/_/g, ' ')}/`;
      if (query.beygir) apiUrl += `beygir/${encodeURIComponent(query.beygir).replace(/_/g, ' ')}/`;
    } else if (garage.marka) {
      apiType = 'Products/products';
      if (garage.marka) apiUrl += `marka/${encodeURIComponent(garage.marka).replace(/_/g, ' ')}/`;
      if (garage.model) apiUrl += `model/${encodeURIComponent(garage.model).replace(/_/g, ' ')}/`;
      if (garage.kasa) apiUrl += `kasa/${encodeURIComponent(garage.kasa).replace(/_/g, ' ')}/`;
      if (garage.yil) {
        apiUrl += `model_yili/${encodeURIComponent(garage.yil).replace(/_/g, ' ')}/`;
      }
      if (garage.motor) apiUrl += `motor/${encodeURIComponent(garage.motor).replace(/_/g, ' ')}/`;
      if (garage.beygir) {
        apiUrl += `beygir/${encodeURIComponent(garage.beygir).replace(/_/g, ' ')}/`;
      }
    } else {
      apiType = 'Products/kategori_urunler_v2';
    }
    categoryUrl = apiUrl;
    if (query.maincategory) apiUrl += `?ustkategori=${query.maincategory}`;
    if (query.subcategory) apiUrl += `&altkategori=${query.subcategory}`;
    // if (query.srt === 'PRICE_HIGH') apiUrl += 'order_by/desc/';
    // if (query.srt === 'PRICE_LOW') apiUrl += 'order_by/asc/';
    // if (query.type === 'original') apiUrl += 'orjinal_yansanayi/Orjinal/';

    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }

      const productList = await Api.get(`${apiType}/${apiUrl}&limit=20&sayfa=${sayfa}/`);
      console.log(`${apiType}/${apiUrl}&limit=20&sayfa=${sayfa}/`, productList)
      if (parseInt(productList.status, 10) === 404) {
        // eslint-disable-next-line no-throw-literal
        throw 404;
      }
      if (!productList.urunler) {
        // eslint-disable-next-line no-throw-literal
        throw 404;
      }
      let categories;
      
      if (query.marka) {
        categories = await Api.get(`Products/kategoriler/${categoryUrl}`);
      } else {
        categories = await Api.get('Anasayfa/kategoriler');
      }
      if (typeof window !== 'undefined') {
        scroll.scrollToTop({
          duration: 2000,
          smooth: 'easeOutQuint',
        });
      }

      let getModel = [];

      if (query.marka) {
        const resData = await Api.get(`Products/araclar/marka/${encodeURIComponent(query.marka)}`);
        getModel = resData.results.map((item) => item.name);
      }

      const meta = res ? await seoMeta(res.req.url) : {};

      return {
        productList,
        categories,
        query,
        meta,
        pageUrl: res ? res.req.url.replace(`?sayfa=${productList.sayfa}`, '') : null,
        getModel,
      };
    } catch (e) {
      const redirect = await redirectCheck(res);
      if (redirect) return redirect;
      return { err: true, query };
    }
  }

  state = {
    meta: this.props.meta,
    viewList: true,
    original: this.props.query.type || false,
    openFilter: false,
    filterCar: { ...this.props.query, type: null },
    maincategory: this.props.query.maincategory,
    subcategory: this.props.query.subcategory,
  };

  componentDidMount() {
    this.getMeta();
  }

  UNSAFE_componentWillReceiveProps({ query }) {
    if (JSON.stringify(this.props.query) !== JSON.stringify(query)) {
      this.getMeta(true);
    }
  }

  onPageChange = ({ selected }) => {
    this.setParams({ sayfa: selected + 1 });
  };

  onSortChange(srt) {
    this.setParams({ srt });
  }

  onTypeChange = () => {
    const type = this.state.original ? null : 'original';
    this.setState({ original: !this.state.original });
    this.setParams({ type });
  };
 
  getMeta = async (force = false) => {
    const { meta } = this.props;
    let remeta;
    if(!meta)
    return
    if (Object.keys(meta).length === 0 || force) {
      remeta = await seoMeta(Router.router.asPath);
    }
    this.setState({ meta: remeta });
  };

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    const {
      query: { marka, maincategory, subcategory },
    } = this.props;
    
    let routeName;
    if (marka) routeName = 'listcar';
    if (maincategory) routeName = 'maincategory';
    if (subcategory) routeName = 'subcategory';
    if (marka && maincategory) routeName = 'listmaincategory';
    if (marka && subcategory) routeName = 'listsubcategory';
    Router.pushRoute(routeName, reparams);
  }

  setFilter = () => {
    const { filterCar } = this.state;
    const reparams = { ...this.props.query, ...filterCar };
    let routeName;
    if (filterCar.marka) routeName = 'listcar';
    if (filterCar.maincategory) routeName = 'maincategory';
    if (filterCar.subcategory) routeName = 'subcategory';
    if (filterCar.marka && filterCar.maincategory) routeName = 'listmaincategory';
    if (filterCar.marka && filterCar.subcategory) routeName = 'listsubcategory';
    Router.pushRoute(routeName, reparams);
    this.setState({ openFilter: false });
  };

  render() {
    const {
      productList, categories, query, garage, pageUrl, err, isLogin, getModel,
    } = this.props;
    if (err) {
      return <NotFound />;
    }
    let isCar = false;
    let BrandImgPath = '';
    
    if(productList.breadcrumb?.[0]?.name !== null){
       BrandImgPath = `../../../static/img/logolar/markalar/marka_${productList?.breadcrumb?.[0]?.name.replace(/ /g, '').toLowerCase()}.svg`;
    }
    let carModel;
    if (query.model) {
      isCar = true;
      carModel = `${query.marka} ${query.model}`;
    } else if (!query.marka && garage.model) {
      isCar = true;
      carModel = `${garage.marka} ${garage.model}`;
    }
    const Small_brand = styled.div`
    padding: 0 2rem;

    img {
      height: auto;
      width: 6rem;
    }`;

    const {
      meta,
      viewList,
      original,
      openFilter,
      filterCar,
      maincategory = query.maincategory,
      subcategory = query.subcategory,
    } = this.state;


    const onMaincategory = maincategory ? `/ustkategori/${maincategory}` : '';
    const onSubcategory = subcategory ? `/altkategori/${subcategory}` : '';

    return (
      <Layout
        meta={{title:productList.baslik.h1}}
        paginate={{
          pageUrl,
          current: parseInt(productList.sayfa, 10),
          total: parseInt(productList.sayfa_sayisi, 10),
        }}
      >
        <ListPage site={site}>
          <h1>listing</h1>
          <Container>
            <Flex mx={-1}>
                <Box className="left-area" px={1}>
                  <CarSelect {...query} />
                  <Category categories={categories} query={query} />
                  <Flex className="muadil-ara">
                    <ul>
                      <li>
                        <Checkbox
                          label="Orijinal Yedek Parca"
                          checked={original}
                          onChange={this.onTypeChange}
                        />
                      </li>
                    </ul>
                  </Flex>
                </Box>
              <Box className="main-area" px={1}>
                {site === 'aloparca' && <BreadCrumb items={productList.breadcrumb || ''} />}
                {site === 'aloparca' && productList.makale && (
                  <SeoContent title={productList.baslik.h1} content={productList.makale} />
                )}

                {!query.model && (
                  <SelectModelList>
                    {getModel?.futured_models ? getModel?.futured_models.map((item) => (
                      <SelectModelListLink key={item} href={`/oto-yedek-parca/${query.marka}/${item}${onMaincategory}${onSubcategory}`}>
                        <TextIsDesktop>
                          {`${item} Yedek Parça Listesi`}
                        </TextIsDesktop>
                        <TextIsMobile>
                          {item}
                        </TextIsMobile>
                      </SelectModelListLink>
                    )) : null}
                  </SelectModelList>
                )}

                {site === 'aloparca' && (
                  <Flex mx={-1} alignItems="center" className="config-mobile">
                    <Flex px={1} justifyContent="center" alignItems="center" className="config-style">
                      <a href="javascript:;" onClick={() => this.setState({ openFilter: true })}>
                        <i className="icon-filtre" />
                        <span>Filtrele</span>
                      </a>
                    </Flex>
                    <Flex
                      flex={1}
                      px={1}
                      justifyContent="center"
                      alignItems="center"
                      className="config-style"
                    >
                      <Dropdown
                        trigger={
                          <React.Fragment>
                            <i className="icon-sort" />
                            <span>Sırala</span>
                          </React.Fragment>
                        }
                        pointing="top right"
                        icon={null}
                      >
                        <Dropdown.Menu>
                          <List>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange(null)}
                                  className="order-link"
                                >
                                  Akıllı Sıralama
                                </a>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange('PRICE_LOW')}
                                  className="order-link"
                                >
                                  Artan Fiyat
                                </a>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange('PRICE_HIGH')}
                                  className="order-link"
                                >
                                  Azalan Fiyat
                                </a>
                              </List.Content>
                            </List.Item>
                          </List>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Flex>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      className={cx('list-style', { active: viewList })}
                    >
                      <a
                        href="javascript:;"
                        onClick={() => viewList && this.setState({ viewList: false })}
                        alt="Izgara Görünümü"
                      >
                        <i className="icon-list-style-1" />
                      </a>
                    </Flex>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      className={cx('list-style', { active: !viewList })}
                    >
                      <a
                        href="javascript:;"
                        onClick={() => !viewList && this.setState({ viewList: true })}
                        alt="Liste Görünümü"
                      >
                        <i className="icon-list-style-2" />
                      </a>
                    </Flex>
                  </Flex>
                )}
                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Flex flexWrap='wrap' className={cx('title', { b2b: site === 'b2b' })} alignItems="flex-end">
                  <h1>{site === 'b2b' && <Small_brand>{<img src={BrandImgPath} alt="" />}</Small_brand>}{ productList.baslik && productList.baslik.h1}
                      <span>({productList.satir_sayisi} ürün)</span>
                    </h1>
                    {site === 'b2b' && (
                      <Flex ml={2} className="add-to-cart">
                        <Link>
                          <button type="button">
                            GERİ DÖN
                          </button>
                        </Link>
                      </Flex>
                    )}
                  </Flex>
                  {/* {site === 'b2b' && <OemParcaAra query={query} />} */}
                  {site === 'b2b' && <SearchBar />}
                  <Flex ml="auto" alignItems="center" className={cx('config', { b2b: site === 'b2b' })}>
                    <Box ml={2} className="config-style">
                      <Dropdown
                        trigger={
                          <Flex alignItems="center">
                            <i className="icon-sort" />
                            <span>Sırala</span>
                          </Flex>
                        }
                        pointing="top right"
                        icon={null}
                      >
                        <Dropdown.Menu>
                          <List>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange(null)}
                                  className="order-link"
                                >
                                  Akıllı Sıralama
                                </a>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange('PRICE_LOW')}
                                  className="order-link"
                                >
                                  Artan Fiyat
                                </a>
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  onClick={() => this.onSortChange('PRICE_HIGH')}
                                  className="order-link"
                                >
                                  Azalan Fiyat
                                </a>
                              </List.Content>
                            </List.Item>
                          </List>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Box>
                    { site === 'aloparca' && (
                      <>
                      <Box ml={2} className="list-style">
                        <a
                          href="javascript:;"
                          className={cx({ active: !viewList })}
                          onClick={() => viewList && this.setState({ viewList: false })}
                          alt="Izgara Görünümü"
                        >
                          <i className="icon-list-style-1" />
                        </a>
                      </Box>
                      <Box ml={2} className="list-style">
                        <a
                          href="javascript:;"
                          className={cx({ active: viewList })}
                          onClick={() => !viewList && this.setState({ viewList: true })}
                          alt="Liste Görünümü"
                        >
                          <i className="icon-list-style-2" />
                        </a>
                      </Box>
                      </>
                    )}
                  </Flex>
                </Flex>
                { productList.urunler && site === "aloparca" &&
                  (viewList ? (
                    productList.urunler
                      .filter(item => item)
                      .map(item => (
                        <ProductCard
                          item={item}
                          key={item.no}
                          breadcrumb={productList.breadcrumb}
                          car={isCar}
                          carModel={carModel}
                        /> 
                      ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.urunler
                        .filter(item => item)
                        .map(item => (
                          <Flex className="grid-card-wrapper" px={1} key={item.no}>
                            <ProductCardGrid
                              item={item}
                              breadcrumb={productList.breadcrumb}
                              car={isCar}
                            />
                          </Flex>
                        ))}
                    </Flex>
                  ))} 

                  { productList.urunler && site === "b2b" &&    
                      productList.urunler
                        .filter(item => item)
                        .map(item => (
                          <ProductCardB2b
                            item={item}
                            key={item.no}
                            breadcrumb={productList.breadcrumb}
                            car={isCar}
                            carModel={carModel}
                          />
                        )
                      )
                  } 
                  
                {productList.sayfa_sayisi > 1 && (
                  <Paginate
                    current={productList.sayfa}
                    total={productList.sayfa_sayisi}
                    onChange={this.onPageChange}
                  />
                )}

                {query.model ? (
                  <SelectModelList>
                    {categories.length ? categories.map((item) => (
                        <Link key={item.ust_kategoriler.link} to={`/oto-yedek-parca/${query.marka}/${query.model}/ustkategori/${item.ust_kategoriler.link}`}>
                          {`${query.marka} ${query.model} ${item.ust_kategoriler.name}`}
                        </Link>
                    )) : null}
                  </SelectModelList>
                ) : (
                  <SelectModelList>
                    {getModel.opts ? getModel.opts.map((item) => (
                        <Link key={item} to={`/oto-yedek-parca/${query.marka}/${item}${onMaincategory}${onSubcategory}`}>
                          {`${query.marka} ${item} Yedek Parçaları`}
                        </Link>
                    )) : null}
                  </SelectModelList>
                )}
              </Box>
            </Flex>
          </Container>
          <Modal basic open={openFilter}>
            <Modal.Header className="modal-header">
              <span className="icon-filtre" /> Filtre
            </Modal.Header>
            <Modal.Content className="modal-description" image scrolling>
              <Modal.Description>
                <Flex flexDirection="column">
                  <CarSelectFilter
                    {...filterCar}
                  />
                  {categories && Array.isArray(categories) && categories.length > 0 && (
                    <Flex
                      pb={1}
                      mb={1}
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ borderBottom: '1px solid white' }}
                    >
                      Ana Kategori
                      <Select
                        placeholder="Seçiniz"
                        defaultValue={maincategory}
                        options={categories.reduce(
                          (acc, next) => [
                            ...acc,
                            {
                              value: next.ust_kategoriler.link,
                              text: next.ust_kategoriler.name,
                            },
                          ],
                          [],
                        )}
                        onChange={(e, { name, value }) =>
                          this.setState({
                            maincategory: value,
                            filterCar: { ...filterCar, maincategory: value },
                          })
                        }
                      />
                    </Flex>
                  )}
                  {maincategory && (
                    <Flex
                      pb={1}
                      mb={1}
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ borderBottom: '1px solid white' }}
                    >
                      Alt Kategori
                      <Select
                        placeholder="Seçiniz"
                        defaultValue={subcategory}
                        options={
                          categories.filter(item => item.ust_kategoriler.link === maincategory)
                            .length > 0 &&
                          categories
                            .filter(item => item.ust_kategoriler.link === maincategory)[0]
                            .ust_kategoriler.altkate.reduce(
                              (prev, next) => [...prev, { value: next.link, text: next.name }],
                              [],
                            )
                        }
                        onChange={(e, { name, value }) =>
                          this.setState({
                            subcategory: value,
                            filterCar: { ...filterCar, subcategory: value },
                          })
                        }
                      />
                    </Flex>
                  )}
                  <Flex py={2} mb={1} alignItems="center" justifyContent="space-between">
                    <Checkbox
                      label="Orijinal Yedek Parca"
                      checked={original}
                      onChange={() =>
                        this.setState({
                          original: !this.state.original,
                          filterCar: { ...filterCar, type: !this.state.original },
                        })
                      }
                    />
                  </Flex>
                </Flex>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions className="modal-actions">
              <a
                href="javascript:;"
                className="clear"
                onClick={() => this.setState({ openFilter: false })}
              >
                KAPAT
              </a>
              <a href="javascript:;" className="submit" onClick={this.setFilter}>
                UYGULA
              </a>
            </Modal.Actions>
          </Modal>
        </ListPage>
      </Layout>
    );
  }
}
const mapStateToProps = ({ garage, isLogin }) => ({ garage, isLogin });
export default connect(mapStateToProps)(ProductList);
