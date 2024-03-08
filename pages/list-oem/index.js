import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Checkbox, Modal, Select } from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { seoMeta, redirectCheck } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import BreadCrumb from '../../components/breadcrumb';
import Paginate from '../../components/paginate';
import CarSelect from '../../components/product-list/car-select';
import CarSelectFilter from '../../components/product-list/filter/car-select';
import Category from '../../components/product-list/category-v2';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import SeoContent from '../../components/product-list/seo-content';

import ListPage from './style';

import Api from '../../api';

class OemList extends React.Component {
  static async getInitialProps({ res, query }) {
    const { sayfa = 1 } = query;
    let url = `Products/oempage?oem=${query.no}&page=${sayfa}&limit=20`;
    if (query.srt) url += `&srt=${query.srt}`;

    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const productList = await Api.get(url);
      if (parseInt(productList.status, 10) === 404) {
        throw 404;
      }
      if (!productList.urunler) {
        throw 404;
      }
      const categories = await Api.get('Products/kategoriler_v2');
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
        pageUrl: res ? res.req.url.replace(`?sayfa=${productList.sayfa}`, '') : null,
      };
    } catch (e) {
      if (res) {
        const redirect = await redirectCheck(res);
        if (redirect) return redirect;
      }
      return { err: true, query };
    }
  }
  state = {
    meta: this.props.meta,
    viewList: true,
    original: !!this.props.query.type,
    openFilter: false,
    filterCar: { ...this.props.query, type: null },
    maincategory: this.props.query.maincategory,
    subcategory: this.props.query.subcategory,
  };

  componentDidMount() {
    this.getMeta();
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

  getMeta = async () => {
    const { meta } = this.props;
    let remeta;
    if (Object.keys(meta).length === 0) {
      remeta = await seoMeta(Router.router.asPath);
    }
    this.setState({ meta: remeta });
  };

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    Router.pushRoute('listoem', reparams);
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
      productList, categories, query, garage, pageUrl, err,
    } = this.props;
    if (err) {
      return <NotFound />;
    }
    let isCar = false;
    let carModel;
    if (query.model) {
      isCar = true;
      carModel = `${query.marka} ${query.model}`;
    } else if (!query.marka && garage.model) {
      isCar = true;
      carModel = `${garage.marka} ${garage.model}`;
    }
    const {
      meta,
      viewList,
      original,
      openFilter,
      filterCar,
      maincategory = query.maincategory,
      subcategory = query.subcategory,
    } = this.state;

    const pageCount = Math.ceil(parseInt(productList.total_urun, 10) / 20);
    return (
      <Layout
        meta={meta}
        paginate={{
          pageUrl,
          current: parseInt(query.sayfa, 10) || 1,
          total: pageCount,
        }}
      >
        <ListPage>
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
                <BreadCrumb items={productList.breadcrumb || ''} />
                {productList.makale && (
                  <SeoContent title={productList.baslik.h1} content={productList.makale} />
                )}
                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {productList.urun_isim && productList.urun_isim}
                      <span>
                        ({productList.urunler && productList.urunler.filter(urun => urun).length}{' '}
                        ürün)
                      </span>
                    </h1>
                    <h2>{query.no}</h2>
                  </Flex>
                  <Flex ml="auto" alignItems="center" className="config">
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
                  </Flex>
                </Flex>
                {productList.urunler &&
                  (viewList ? (
                    productList.urunler &&
                    productList.urunler
                      .filter(urun => urun)
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
                      {productList.urunler &&
                        productList.urunler
                          .filter(urun => urun)
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
                {pageCount > 1 && (
                  <Paginate
                    current={query.sayfa || 1}
                    total={pageCount}
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
                  <CarSelectFilter
                    {...filterCar}
                    onChange={obj => this.setState({ filterCar: obj })}
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
                          maincategory &&
                          categories &&
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
const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(OemList);
