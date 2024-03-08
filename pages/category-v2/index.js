import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Checkbox, Select, Dropdown, List, Modal } from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { seoMeta, redirectCheck, site } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import BreadCrumb from '../../components/breadcrumb';
import Paginate from '../../components/paginate';
import CarSelect from '../../components/product-list/car-select';
import Category from '../../components/product-list/category-v2';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import CarSelectFilter from '../../components/product-list/filter/car-select';
import SeoContent from '../../components/product-list/seo-content';

import ListPage from './style';

import Api from '../../api';

class ProductList extends React.Component {
  static async getInitialProps({ res, query }) {
    const { sayfa = 1, maincategory, subcategory } = query;
    let apiUrl = 'Products/kategori_urunler_v2';
    if (maincategory) apiUrl += `?ustkategori=${maincategory}`;
    if (subcategory) apiUrl += `${(apiUrl.indexOf('?') > -1 ? '&' : '?')}altkategori=${subcategory}`;
    // if (query.srt === 'PRICE_HIGH') apiUrl += 'order_by/desc/';
    // if (query.srt === 'PRICE_LOW') apiUrl += 'order_by/asc/';
    // if (query.type === 'original') apiUrl += 'orjinal_yansanayi/Orjinal/';

    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const productList = await Api.get(`${apiUrl}&limit=20&sayfa=${sayfa}`);
      // console.log(`${apiUrl}limit/20/sayfa/${sayfa}/`,"list", productList);

      // console.log(`${apiUrl}&limit=20&sayfa=${sayfa}`, productList);
      if (parseInt(productList.status, 10) === 404) {
        throw 404;
      }
      if (!productList.urunler) {
        throw 404;
      }
      const categories = await Api.get('Products/kategoriler_v2/');
      if (typeof window !== 'undefined') {
        scroll.scrollToTop({
          duration: 2000,
          smooth: 'easeOutQuint',
        });
      }
      const meta = res ? await seoMeta(res.req.url) : {};

      return {
        productList,
        categories,
        query,
        meta,
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
    openFilter: false,
    filterOpen: false,
    original: !!this.props.query.type,
    filterCar: { ...this.props.query, type: null },
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
    if (Object.keys(meta).length === 0 || force) {
      remeta = await seoMeta(Router.router.asPath);
    }
    this.setState({ meta: remeta });
  };

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

  setParams(params) {
    const {
      query: { marka, maincategory, subcategory },
    } = this.props;

    let routeName;
    if (marka) routeName = 'listcar';
    if (maincategory) routeName = 'maincategory';
    if (subcategory) routeName = 'subcategory';
    if (marka && maincategory) routeName = 'listmaincategory';
    if (marka && subcategory) routeName = 'listsubcategory';
    const reparams = { ...this.props.query, ...params };
    Router.pushRoute(routeName, reparams);
  }

  // openFilter = () => this.setState({ filterOpen: true });
  // closeFilter = () => this.setState({ filterOpen: false });

  render() {
    const {
      productList,
      categories,
      query,
      query: { maincategory, subcategory },
      err,
    } = this.props;
    if (err) {
      return <NotFound />;
    }
    const {
      meta, viewList, filterOpen, openFilter, original, filterCar,
    } = this.state;
    const catProps = { maincategory, subcategory };
    // console.log(productList.baslik.h1);
    return (
      <Layout meta={{title:productList.baslik.h1}}>
        <ListPage>
          {/* <div>V2</div> */}
          <Container>
            <Flex mx={-1}>
              {site === 'aloparca' && (
                <Box className="left-area" px={1}>
                  <CarSelect {...catProps} />
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
              )}
              <Box className="main-area" px={1}>
                <BreadCrumb items={productList.breadcrumb} />
                {productList.makale && (
                  <SeoContent title={productList.baslik.h1} content={productList.makale} />
                )}

                <Flex mx={-1} alignItems="center" className="config-mobile">
                  <Flex
                    flex={1}
                    px={1}
                    justifyContent="center"
                    alignItems="center"
                    className="config-style"
                  >
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
                    alt="Liste Görünümü"
                  >
                    <a
                      href="javascript:;"
                      onClick={() => !viewList && this.setState({ viewList: true })}
                    >
                      <i className="icon-list-style-2" />
                    </a>
                  </Flex>
                </Flex>

                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {productList.baslik.h1}
                      <span>({productList.satir_sayisi} ürün)</span>
                    </h1>
                  </Flex>
                  <Flex ml="auto" alignItems="center" className="config">
                    <Box ml={2} className="config-style">
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
                    </Box>
                    <Box ml={2} className="list-style">
                      <a
                        href="javascript:;"
                        className={cx({ active: !viewList })}
                        onClick={() => viewList && this.setState({ viewList: false })}
                      >
                        <i className="icon-list-style-1" />
                      </a>
                    </Box>
                    <Box ml={2} className="list-style">
                      <a
                        href="javascript:;"
                        className={cx({ active: viewList })}
                        onClick={() => !viewList && this.setState({ viewList: true })}
                      >
                        <i className="icon-list-style-2" />
                      </a>
                    </Box>
                  </Flex>
                </Flex>
                {productList.urunler &&
                  (viewList ? (
                    productList.urunler
                      .filter(item => item)
                      .map(item => (
                        <ProductCard
                          item={item}
                          key={item.no}
                          breadcrumb={productList.breadcrumb}
                        />
                      ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.urunler
                        .filter(item => item)
                        .map(item => (
                          <Flex className="grid-card-wrapper" px={1} key={item.no}>
                            <ProductCardGrid item={item} breadcrumb={productList.breadcrumb} />
                          </Flex>
                        ))}
                    </Flex>
                  ))}

                <Paginate
                  current={productList.sayfa}
                  total={productList.sayfa_sayisi}
                  onChange={this.onPageChange}
                  key={subcategory || maincategory}
                />
              </Box>
            </Flex>
            <Modal basic open={openFilter}>
              <Modal.Header className="modal-header">
                <span className="icon-filtre" /> Filtre
              </Modal.Header>
              <Modal.Content className="modal-description" image scrolling>
                <Modal.Description>
                  <Flex flexDirection="column">
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
                                value: next.ust_kategoriler?.link,
                                text: next.ust_kategoriler?.name,
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
                            categories.filter(item => item.ust_kategoriler?.link === maincategory)
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
          </Container>
        </ListPage>
      </Layout>
    );
  }
}

export default connect()(ProductList);
