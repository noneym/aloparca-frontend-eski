import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';
import LazyLoad from 'react-lazyload';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { Title } from '../../components/style';

import CarSelect from '../../components/product-list/car-select';
import Category from '../../components/product-list/category-v2';

import ListBrandPage from './style';
import DropdownKategori from './dropdown';

import Api from '../../api';

import alphabetArray from './alphabet.json';

class ListBrand extends React.Component {
  static async getInitialProps() {
    const { results } = await Api.get('Products/araclar');
    const categories = await Api.get('Products/kategoriler_v2');
    return { results, categories };
  }

  state = { activeChar: 'Tümü' };

  render() {
    const { results, categories } = this.props;
    const { activeChar } = this.state;

    const brands = results.opts.filter((item) => {
      if (activeChar !== 'Tümü') {
        return item.name.startsWith(activeChar);
      }
      return item.name;
    });
    return (
      <Layout meta={{ title: 'Oto Yedek Parça Marka Listesi' }}>
        <ListBrandPage>
          <Container>
            <Flex mx={-1}>
              <Box className="sol" px={1}>
                <CarSelect />
                <Category categories={categories} />
              </Box>
              <Box className="sag" px={1}>
                <Title>Yedek Parça</Title>
                <Flex mb={3} className="alphabet">
                  {['Tümü', ...alphabetArray].map((char) => (
                    <a
                      href="javascript:;"
                      key={char}
                      className={cx({ active: activeChar === char })}
                      onClick={() => this.setState({ activeChar: char })}
                    >
                      {char}
                    </a>
                  ))}
                </Flex>
                <Flex className="mobile-dropdown">
                  <DropdownKategori categories={categories} />
                </Flex>
                <Flex flexWrap="wrap" m={-1}>
                  {brands && brands.length ? (
                    brands.map((brand) => (
                      <Flex className="brand-wrapper" p={1} key={brand.name}>
                        <Flex className="brand" alignItems="center" justifyContent="center">
                          <Link
                            route="listcar"
                            params={{ marka: brand.name.replace(/\s/g, '_') }}
                            title={brand.name}
                          >
                            <LazyLoad>
                              <img
                                src={`/static/img/logolar/markalar/marka_${brand.name
                                  .replace(/\s/g, '')
                                  .toLowerCase()}.svg`}
                                alt={brand.name}
                              />
                            </LazyLoad>
                          </Link>
                        </Flex>
                      </Flex>
                    ))
                  ) : (
                    <Flex alignItems="center" justifyContent="center" flex={1} my={2}>
                      <p>{activeChar} harfi ile başlayan herhangi bir sonuç bulunamadı.</p>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Container>
        </ListBrandPage>
      </Layout>
    );
  }
}

export default connect()(ListBrand);
