import _ from 'lodash';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Checkbox, Select, Dropdown, List, Modal } from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { redirectCheck, site } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import Paginate from '../../components/paginate';
import CarSelect from '../../components/product-list/car-select';
import Category from '../../components/product-list/category-v2';
import CarSelectFilter from '../../components/product-list/filter/car-select';

import ProductCard from './product-list';
import ProductCardB2b from './product-list-b2b';
import ProductCardGrid from './product-grid';

import ListPage from './style';

import Api from '../../api';

class Search extends React.Component {
  static async getInitialProps({ query, res }) {
    const { sayfa = 1 } = query;
    let apiUrl = 'Products/araclarv2/';
    if (query.marka) apiUrl += `marka/${encodeURIComponent(query.marka).replace(/_/g, ' ')}/`;
    if (query.model) apiUrl += `model/${encodeURIComponent(query.model).replace(/_/g, ' ')}/`;
    if (query.kasa) apiUrl += `kasa/${encodeURIComponent(query.kasa).replace(/_/g, ' ')}/`;
    if (query.yil) {
      apiUrl += `model_yili/${encodeURIComponent(query.yil).replace(/_/g, ' ')}/`;
    }
    if (query.motor) apiUrl += `motor/${encodeURIComponent(query.motor).replace(/_/g, ' ')}/`;
    if (query.beygir) apiUrl += `beygir/${encodeURIComponent(query.beygir).replace(/_/g, ' ')}/`;

    if (query.srt === 'PRICE_HIGH') apiUrl += 'order_by/desc/';
    if (query.srt === 'PRICE_LOW') apiUrl += 'order_by/asc/';

    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const {
        results: { search },
      } = await Api.get(`${apiUrl}q/${encodeURIComponent(query.slug)}/limit/20/sayfa/${sayfa}/`);
      const categories = await Api.get('Products/kategoriler_v2/');
      if (typeof window !== 'undefined') {
        scroll.scrollToTop({
          duration: 2000,
          smooth: 'easeOutQuint',
        });
      }
      return { search, categories, query };
    } catch (e) {
      const redirect = await redirectCheck(res);
      if (redirect) return redirect;
      return { err: true, query };
    }
  }
  state = {
    viewList: true,
    openFilter: false,
    filterCar: { ...this.props.query, type: null },
    maincategory: this.props.query.maincategory,
    subcategory: this.props.query.subcategory,
  };

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

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    Router.pushRoute('search', reparams);
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
      search, categories, query, err,
    } = this.props;
    if (err) {
      // console.log(err);
      
      return <NotFound />;
    }
    const {
      viewList, openFilter, filterCar, maincategory, subcategory, original,
    } = this.state;
    return (
      <Layout meta={{ title: `${search.query.replace(/\+/g, "").replace(/\"/g, "")}`, description:`${search.query.replace(/\+/g, "").replace(/\"/g, "")} model ve çeşitleri burada. ${search.query.replace(/\+/g, "").replace(/\"/g, "")} en uygun fiyata sitemizde bulabilirsiniz` }}>
        <ListPage b2b={site === 'b2b'}>
          <Container>
            <Flex mx={-1}>
              {site === 'aloparca' && (
                <Box className="left-area" px={1}>
                  <CarSelect {...query} />
                  <Category categories={categories} query={query} />
                  <Flex className="muadil-ara">
                    <ul>
                      <li>
                        <Checkbox label="Tümü" checked />
                      </li>
                      <li>
                        <Checkbox label="Orijinal Yedek Parca" />
                      </li>
                      <li>
                        <Checkbox label="Muadil Yedek Parca" />
                      </li>
                    </ul>
                  </Flex>
                </Box>
              )}
              <Box className="main-area" px={1}>
                <Flex mx={-1} alignItems="center" className="config-mobile">
                  {site === 'aloparca' && (
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
                  )}

                  <Flex
                    flex={1}
                    px={1}
                    justifyContent="center"
                    alignItems="center"
                    className="config-style"
                  >
                    <Link>
                      <i className="icon-sort" />
                      <span>Sırala</span>
                    </Link>
                  </Flex>

                  {site === 'aloparca' && (
                    <>
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
                      px={1}
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
                    </>
                  )}
                </Flex>
                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      Arama: {search.query.replace(/\+/g, "").replace(/\"/g, "")}
                      <span>({search.nbHits} ürün)</span>
                    </h1>

                  </Flex>
                  <Flex ml="auto" alignItems="center" className="config">
                    {site === 'aloparca' && (
                      <Box ml={2} className="config-style">
                        <a
                          href="javascript:void(0);"
                          onClick={() => this.setState({ openFilter: true })}
                        >
                          <i className="icon-filtre" />
                          <span>Filtrele</span>
                        </a>
                      </Box>
                    )}
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
                    {site === 'aloparca' && (
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
                {search.hits && site === 'aloparca' &&
                  (viewList ? (
                    search.hits.map(item => <ProductCard item={item} key={item.no} />)
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {search.hits.map(item => (
                        <Flex className="grid-card-wrapper" px={1} key={item.no}>
                          <ProductCardGrid item={item} />
                        </Flex>
                      ))}
                    </Flex>
                  ))}
                
                {search.hits && site === 'b2b' && search.hits.map((item) => (
                  <ProductCardB2b item={item} key={item.no} />
                ))}
                {search.hits && search.hits.length > 1 && (
                  <Paginate
                    current={search.page + 1}
                    total={search.nbPages}
                    onChange={this.onPageChange}
                  />
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
                          (prev, next) => [
                            ...prev,
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

export default connect()(Search);
