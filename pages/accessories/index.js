import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Select } from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { redirectCheck } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import BreadCrumb from './breadcrumb';
import Paginate from '../../components/paginate';
import Category from './categories';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import AccessoriesPage from './style';
import DropdownKategori from './dropdown';
import SeoContent from '../../components/product-list/seo-content';

import Api from '../../api';

class Accessories extends React.Component {
  static async getInitialProps({ query, res }) {
    const {
      sayfa = 1, kategori, marka, model,
    } = query;
    let markaList = [];
    let modelList = [];
    let pageTitle;
    let pageBreadcrumb;
    let apiUrl = `Aksesuar/urunList?urunLimit=20&page=${sayfa}`;
    if (kategori) apiUrl = `${apiUrl}&kategori1=${kategori}`;
    if (marka) apiUrl = `${apiUrl}&kategori2=${marka}`;
    if (model) apiUrl = `${apiUrl}&kategori3=${model}`;

    try {
      if (res) {
        const redirect = await redirectCheck(res, '200');
        if (redirect) return redirect;
      }
      const productList = await Api.get(apiUrl);
      if (parseInt(productList.status, 10) === 404) {
        throw 404;
      }
      if (!productList.urunler) {
        throw 404;
      }
      if (typeof window !== 'undefined') {
        scroll.scrollToTop({
          duration: 2000,
          smooth: 'easeOutQuint',
        });
      }
      if (kategori) {
        const { kategoriler, breadcrumb, baslik } = await Api.get(
          `Aksesuar/kategoriList?kategori1=${kategori}`,
        );
        markaList = kategoriler.map((text) => ({
          text: text.name,
          value: text.slug,
        }));
        pageTitle = baslik;
        pageBreadcrumb = breadcrumb;
      }

      if (marka) {
        const { kategoriler, breadcrumb, baslik } = await Api.get(
          `Aksesuar/kategoriList?kategori1=${kategori}&kategori2=${marka}`,
        );
        modelList = kategoriler && kategoriler.length > 0
          ? kategoriler.map((text) => ({ text: text.name, value: text.slug }))
          : [];
        pageTitle = baslik;
        pageBreadcrumb = breadcrumb;
      }

      return {
        productList,
        query,
        markaList,
        modelList,
        pageTitle,
        pageBreadcrumb,
      };
    } catch (e) {
      const redirect = await redirectCheck(res);
      if (redirect) return redirect;
      return { err: true, query };
    }
  }

  state = { viewList: true, modelList: this.props.modelList, katlist: [] };

  // eslint-disable-next-line react/sort-comp
  GetKats = async () => {
    const katList = await Api.get('Aksesuar/kategoriList');
    this.setState({ katList });
  };

  componentDidMount() {
    this.GetKats();
  }

  onPageChange = ({ selected }) => {
    this.setParams({ sayfa: selected + 1 });
  };

  onChangeCar = async (e, { name, value }) => {
    if (name === 'marka') {
      const { kategoriler } = await Api.get(
        `Aksesuar/kategoriList?kategori1=${this.props.query.kategori}&kategori2=${value}`,
      );
      const modelList = kategoriler && kategoriler.length > 0
        ? kategoriler.map((text) => ({ text: text.name, value: text.slug }))
        : [];
      await this.setState({ modelList });
      this.setParams({ [name]: value, model: undefined });
    } else {
      this.setParams({ [name]: value });
    }
  };

  setParams(params) {
    const reparams = { ...this.props.query, ...params };
    const { sayfa } = params;
    if (sayfa === 1) {
      Router.pushRoute('accessories', reparams);
    } else {
      Router.pushRoute('accessories-with-page', reparams);
    }
  }

  render() {
    const {
      productList,
      query,
      query: {
        sayfa = 1, kategori, marka, model,
      },
      markaList,
      pageTitle,
      pageBreadcrumb,
      err,
    } = this.props;
    const { katList } = this.state;
    if (err) {
      return <NotFound />;
    }
    const { viewList, modelList } = this.state;
    return (
      <Layout meta={{ title: pageTitle || 'Aksesuarlar' }}>
        <AccessoriesPage>
          <Container>
            <Flex mx={-1}>
              <Box className="left-area" px={1} flexDirection="column">
                {query && kategori && (
                  <Flex className="car-select" mb={2} flexDirection="column">
                    <Box mb={2} className="label">
                      Araç Bilgileri
                    </Box>
                    <Flex flexDirection="column">
                      <Select
                        name="marka"
                        placeholder="Marka Seçiniz"
                        disabled={markaList && markaList.length === 0}
                        options={markaList}
                        onChange={this.onChangeCar}
                        value={marka || ''}
                        search
                      />
                    </Flex>
                    {marka && modelList && modelList.length > 0 && (
                      <Flex mt={2} flexDirection="column">
                        <Select
                          name="model"
                          placeholder="Model Seçiniz"
                          disabled={modelList.length === 0}
                          options={modelList}
                          onChange={this.onChangeCar}
                          value={model || ''}
                          search
                        />
                      </Flex>
                    )}
                  </Flex>
                )}
                <Category query={query} />
              </Box>
              <Box className="main-area" px={1}>
                {productList.makale.text === null ? null : (
                  <SeoContent
                    mt={10}
                    title={productList.makale.baslik}
                    content={productList.makale.text}
                  />
                )}
                <BreadCrumb items={pageBreadcrumb || ''} />
                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {pageTitle || 'Aksesuarlar'}
                      <span>
                        (
                        {productList.count}
                        {' '}
                        ürün)
                      </span>
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
                        alt="Liste görünümü"
                      >
                        <i className="icon-list-style-2" />
                      </a>
                    </Box>
                  </Flex>
                </Flex>
                <Flex className="mobile-dropdown">
                  <DropdownKategori katList={katList} />
                </Flex>
                {productList.urunler
                  && (viewList ? (
                    productList.urunler.map((item) => (
                      <ProductCard
                        item={item}
                        key={item.no}
                        breadcrumb={productList.breadcrumb}
                      />
                    ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.urunler.map((item) => (
                        <Flex
                          className="grid-card-wrapper"
                          px={1}
                          key={item.no}
                        >
                          <ProductCardGrid item={item} />
                        </Flex>
                      ))}
                    </Flex>
                  ))}

                <Paginate
                  current={sayfa}
                  total={productList.sayfa_sayisi}
                  onChange={this.onPageChange}
                  key={query.kategori}
                />
              </Box>
            </Flex>
          </Container>
        </AccessoriesPage>
      </Layout>
    );
  }
}
export default connect()(Accessories);
