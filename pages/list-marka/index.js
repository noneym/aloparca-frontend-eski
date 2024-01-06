import {connect} from 'react-redux'
import { Flex, Box } from '@rebass/grid';
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
import MarkaCategory from '../../components/product-list/marka-category';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import SeoContent from '../../components/product-list/seo-content';

import ListPage from './style';

import Api from '../../api';

class MarkaList extends React.Component {
  static async getInitialProps({ res, query }) {
    const {
      sayfa = 1, marka, slug, srt,
    } = query;
    let url = `Products/marka_products?marka=${encodeURIComponent(marka)}&sayfa=${sayfa}&limit=20`;
    
    if (slug) url += `&kategori=${slug}`;
    if (srt) url += `&srt=${srt}`;
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
      
      const categories = productList.kategoriler;
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
      return { err: true };
    }
  }
  state = {
    meta: this.props.meta,
    viewList: true,
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

  getMeta = async () => {
    const { meta } = this.props;
    let remeta;
    if (meta && Object.keys(meta).length === 0) {
      remeta = await seoMeta(Router.router.asPath);
    }
    this.setState({ meta: remeta });
  };

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    Router.pushRoute('listmarka', reparams);
  }

  render() {
    const {
      productList, categories, query, garage, pageUrl, err,
    } = this.props;

    if (err) {
      return <NotFound />;
    }
    let isCar = false;
    let carModel;
    
    if(query.slug){
      query.slug = query.slug.replace(" ", "-").replace(" ", "-").replace(" ", "-");
    }
    if (query.model) {
      isCar = true;
      carModel = `${query.marka} ${query.model}`;
    } else if (!query.marka && garage.model) {
      isCar = true;
      carModel = `${garage.marka} ${garage.model}`;
    }
    const { meta, viewList } = this.state;
    let finalMeta = meta;
    if (finalMeta && Object.keys(finalMeta).length === 0) {
      finalMeta = {
        title: `${query.marka} Marka${
          query.slug ? ` ${categories.find(item => item.slug === query.slug).name} ` : ' '
        }Yedek Parçaları`,
      };
    }
    const pageCount = Math.ceil(parseInt(productList.toplam, 10) / 20);
    const findCategoryTitle = categories.filter(item => item.slug === query.slug);
    return (
      <Layout
        meta={finalMeta}
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
                <CarSelect />
                <MarkaCategory
                  categories={categories}
                  marka={query.marka}
                  activeCategory={query.slug}
                />
              </Box>
              <Box className="main-area" px={1}>
                <BreadCrumb items={productList.breadcrumb || ''} />
                {productList.makale && (
                  <SeoContent
                    title={query.marka}
                    content={productList.makale}
                    image={productList.Brand_logo}
                  />
                )}

                <Flex className="product-list-header" justifyContent="space-between" alignItems="center">
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {`${query.marka}${
                        query.slug
                          ? ` ${findCategoryTitle.name === undefined ? " Marka Ürün Fiyatları" : findCategoryTitle.name}` 
                          : ''
                      }`}
                      <span>({productList.toplam} ürün)</span>
                    </h1>
                    <h2>
                      {`${query.marka} Marka${
                        query.slug
                          ? ` ${findCategoryTitle.name === undefined ? " Marka Ürün Fiyatları" : findCategoryTitle.name}` 
                          : ' '
                      } Yedek Parçaları`}
                    </h2>
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
                      {productList.urunler
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
        </ListPage>
      </Layout>
    );
  }
}
const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(MarkaList);
