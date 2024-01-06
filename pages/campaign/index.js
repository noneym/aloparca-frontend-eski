import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { redirectCheck } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import Paginate from '../../components/paginate';
import Category from './categories';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import CampaignPage from './style';
import SeoContent from '../../components/product-list/seo-content';
import DropdownKategori from './dropdown';


import Api from '../../api';

class Campaign extends React.Component {
  static async getInitialProps({ query, res }) {
    const {
      sayfa = 1, category, brand, srt,
    } = query;
    let apiUrl = `Kampanya/urunList?limit=20&page=${sayfa}`;
    if (category) apiUrl = `${apiUrl}&kategori=${encodeURIComponent(category)}`;
    if (brand) apiUrl = `${apiUrl}&brand=${encodeURIComponent(brand)}`;
    if (srt) apiUrl = `${apiUrl}&sorting=${srt}`;
    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const productList = await Api.get(apiUrl);
      if (typeof window !== 'undefined') {
        scroll.scrollToTop({
          duration: 2000,
          smooth: 'easeOutQuint',
        });
      }
      return {
        productList,
        query,
      };
    } catch (e) {
      const redirect = await redirectCheck(res);
      if (redirect) return redirect;
      return { err: true, query };
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const data = await Api.get('Kampanya/kategoriList');
    this.setState({ katlist: data });
  };

  state = { viewList: true, katlist: [] };

  onPageChange = ({ selected }) => {
    this.setParams({ sayfa: selected + 1 });
  };

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    Router.pushRoute('campaign', reparams);
  }

  render() {
    const {
      productList,
      query,
      query: { sayfa = 1, category, brand },
      err,
    } = this.props;

    if (err) {
      return <NotFound />;
    }
    const { viewList, katlist } = this.state;
    return (
      <Layout
        meta={{
          title:
            category || brand
              ? `${brand && `${brand} `}${category && `${category} `}KAMPANYASI`
              : 'Kampanyalı Oto Yedek Parça Ürünleri',
        }}
      >
        <CampaignPage>
          <Container>
            <Flex mx={-1}>
              <Box className="left-area" px={1} flexDirection="column">
                <Category query={query} />
              </Box>
              <Box className="main-area" px={1}>
                {productList.makale.text === null ? (
                  null
                ) : (
                  <SeoContent mt={0} title={productList.makale.baslik} content={productList.makale.text} />
                )}
                <Flex className="product-list-header" justifyContent="space-between" alignItems="center">
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {'Kampanyalı Ürünler'}
                      <span>({productList.toplam} ürün)</span>
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
                <Flex className="mobile-dropdown">
                  <DropdownKategori katlist={katlist} />
                </Flex>
                {productList &&
                  productList.toplam > 0 &&
                  (viewList ? (
                    productList.products.map(item => (
                      <ProductCard
                        item={item}
                        key={item.no}
                        breadcrumb={productList.products.breadcrumb}
                      />
                    ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.products.map(item => (
                        <Flex className="grid-card-wrapper" px={1} key={item.no}>
                          <ProductCardGrid item={item} />
                        </Flex>
                      ))}
                    </Flex>
                  ))}

                {productList.sayfasayisi > 1 && (
                  <Paginate
                    current={sayfa}
                    total={productList.sayfasayisi}
                    onChange={this.onPageChange}
                    key={query.kategori}
                  />
                )}
              </Box>
            </Flex>
          </Container>
        </CampaignPage>
      </Layout>
    );
  }
}
export default connect()(Campaign);
