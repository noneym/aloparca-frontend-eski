import {connect} from 'react-redux'
import { Flex, Box } from '@rebass/grid';
import { Select } from 'semantic-ui-react';
import { animateScroll as scroll } from 'react-scroll';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { redirectCheck } from '../../reactor/func';
import { Router } from '../../routes';

import NotFound from '../../components/notfound';
import Paginate from '../../components/paginate';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import AccessoriesPage from './style';

import Slider from './slider';

import LastikMarkalari from './LastikMarkalari';
import LastikFiltresi from './LastikFiltresi';
import CarSelect from './car-select';

import Api from '../../lastikApi';

class Lastik extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    const {
      productList, query, markaList, pageTitle, pageBreadcrumb, err,
    } = this.props;

    return (
      <Layout meta={{ title: 'Lastik' }}>
        <AccessoriesPage>
          <Container>
            <Flex mx={-1}>
              <Box className="left-area" px={1} flexDirection="column">
                {query.marka && <LastikFiltresi query={query} bolge="solmenu" />}

                {/*
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
                */}
                <LastikMarkalari query={query} />
              </Box>
              <Box className="main-area" px={1}>
                <Slider />
                {!query.marka && <LastikFiltresi query={query} bolge="icerik" />}

                <Flex className="product-list-header" justifyContent="space-between" alignItems="center">
                  <Flex flexWrap="wrap" className="title" alignItems="flex-end">
                    <h1>
                      {'Lastik'}
                      <span>({/* productList.count */} ürün)</span>
                    </h1>
                  </Flex>
                  <Flex ml="auto" alignItems="center" className="config">
                    {/*
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
                    */}
                  </Flex>
                </Flex>
                {/* productList.urunler &&
                  (viewList ? (
                    productList.urunler.map(item => (
                      <ProductCard item={item} key={item.no} breadcrumb={productList.breadcrumb} />
                    ))
                  ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {productList.urunler.map(item => (
                        <Flex className="grid-card-wrapper" px={1} key={item.no}>
                          <ProductCardGrid item={item} />
                        </Flex>
                      ))}
                    </Flex>
                  )) */}
              </Box>
            </Flex>
          </Container>
        </AccessoriesPage>
      </Layout>
    );
  }
}

export default connect()(Lastik);
