import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';
import BreadCrumb from './breadcrumb';
import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { redirectCheck } from '../../reactor/func';
import { seoMeta } from '../../reactor/func';
import NotFound from '../../components/notfound';
import Category from './categories';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import MotorOilPage from './style';
import SeoContent from '../../components/product-list/seo-content';
import DropdownKategori from './dropdown';
import DropdownKategoriSprey from './dropdown-sprey';
import Api from '../../api';

class MotorOil extends React.Component {
  static async getInitialProps({ query, res }) {
    const { id, altkat, oil } = query;
    const categoryList = await Api.get('MadeniYaglar/kategoriList');
    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const productListData = await Api.get(`MadeniYaglar/urunList/katId/${id || 3}/${altkat || ''}/${oil || ''}`);

      const pageBreadcrumb = productListData.breadcrumb;
      
      if (productListData.status === false) {
        throw 404;
      }
      
      const productList = oil === undefined ? Object.values(productListData.urunler).reduce(
        (prev, item) => [...prev, ...item],
        [],
      ) : Object.values(productListData.urunler);

      const meta = res ? await seoMeta(res.req.url) : {};
      return {
        categoryList,
        productListData,
        productList,
        query,
        meta,
        pageBreadcrumb
      };
    } catch (e) {
      const redirect = await redirectCheck(res);
      if (redirect) return redirect;
      return { err: true, query };
    }
  }

  state = { viewList: true, madeniYaglar: {}, spreyler: {} };

  async componentDidMount() {
    const madeniList = await Api.get('MadeniYaglar/urunList/katId/3');
    const spreyler = await Api.get('MadeniYaglar/urunList/katId/10');
    
    this.setState({ madeniYaglar: madeniList.urunler, spreyler: spreyler.urunler });
  }
  
  render() {
    const {
      categoryList, productListData, productList, query, meta, pageBreadcrumb,err
    } = this.props;

    const {
      viewList, madeniYaglar, spreyler
    } = this.state;

    if (err) {
      return <NotFound />;
    }
    const pageTitle = query && query.id && query.id == 10 ? (query.oil ? `${query.oil}` : query.id
      ? categoryList.filter((item) => item.id === query.id)[0].name
      : 'MOTOR YAĞ').replace(/-/gi, ' ').toUpperCase() : (query.oil ? `${query.oil} Motor Yağı` : query.id
      ? categoryList.filter((item) => item.id === query.id)[0].name
      : 'MOTOR YAĞ');
    return (
      <Layout meta={{title: meta.title ? meta.title : pageTitle, canonical: meta.canonical ? meta.canonical : 'https://www.aloparca.com/madeni-yaglar/motor-yaglari', description:
      meta.description ? meta.description : 'Motor yağı motorlu taşıtların tamamında kullanılır. Mantık oldukça basittir. Motorda bulunan dişliler çark şeklinde dönerken birbirlerine sürtünmektedirler. Bu sürtünmelerin etkisiyle de motorda aşınmalar meydana geliyor. İşte motor yağları motorda meydana gelebilecek sürtünmeden kaynaklı aşınmaları en aza indirmek için kullanılmaktadır. Kaygan bir zeminde gerçekleşen çark hareketleri motora hiçbir zarar vermeden turunu tamamlar bu da motorların daha uzun süreli olmasına katkıda bulunur.'}}
      >
        <MotorOilPage>
          <Container>
            <Flex mx={-1}>
              <Box className="left-area" px={1} flexDirection="column">
                <Category data={categoryList} query={query} />
              </Box>
              <Box className="main-area" px={1}>
                <BreadCrumb items={pageBreadcrumb || ''} />
                {productListData.makale.text === null ? (
                  null
                ) : (
                  // eslint-disable-next-line max-len
                  <SeoContent mt={0} title={productListData.makale.baslik} content={productListData.makale.text} />
                )}
                
                <Flex className="product-list-header" justifyContent="space-between" alignItems="center">
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {pageTitle}
                      <span>{`(${productList.length} ürün)`}</span>
                    </h1>
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
                { (!query.id || query.id == 3)
                  && (
                  <Flex className="mobile-dropdown">
                    <DropdownKategori productListData={madeniYaglar} />
                  </Flex>
                  )}
                { query.id == 10
                  && (
                  <Flex className="mobile-dropdown">
                    <DropdownKategoriSprey productListData={spreyler} />
                  </Flex>
                  )}
                {
                  productList && (viewList ? (
                    productList.map((item) => (
                      <ProductCard item={item} key={item.no} breadcrumb={productList.breadcrumb} />
                    ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.map((item) => (
                        <Flex className="grid-card-wrapper" px={1} key={item.no}>
                          <ProductCardGrid item={item} />
                        </Flex>
                      ))}
                    </Flex>
                  ))
                }
              </Box>
            </Flex>
          </Container>
        </MotorOilPage>
      </Layout>
    );
  }
}
export default connect()(MotorOil);
