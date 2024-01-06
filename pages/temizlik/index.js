import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../layouts/container';
import { site } from '../../reactor/func';
import ListPage from './style';
import { Container } from '../../reactor';
import { Flex, Box } from '@rebass/grid';
import {
  Dropdown,
  List
} from 'semantic-ui-react';
import cx from 'classnames';
import Paginate from '../../components/paginate';
import ProductCard from '../../components/product-list/product-card';
import ProductCardGrid from '../../components/product-list/product-card-grid';
import ProductCardB2B from '../../components/product-list/product-card/b2b';
import SeoContent from '../../components/product-list/seo-content';
import Spinner from '../../ui/spinner';

import Api from '../../api';

class Temizlik extends React.Component {

  state = {
    list: [],
    openFilter: false,
    viewList: true,
    meta: "",
    original: "",
    isLoading: false,
  };

  componentDidMount() {
    this.getList();
  }
  

  getList = async () => {
    this.setState({ isLoading: true });
    const onerilenUrunler = await Api.get('Products/dezenfektan_list');
    this.setState({ list: onerilenUrunler, isLoading: false });
  }


  render() {
    const {
      list,
      meta,
      viewList,
      original,
      openFilter,
      isLoading,
    } = this.state;
    
    const makale =  list.makale;

    return (
      <Layout meta={{ title: "Temizlik ve Hijyen Ürünleri" }}>
        <ListPage site={site}>
          <Container className="container">
            <Flex mx={-1}>
              <Box className="main-area" px={1}>    
                  <Flex mx={-1} alignItems="center" className="config-mobile">
                    <Flex
                      flex={1}
                      px={1}
                      justifyContent="center"
                      alignItems="center"
                      className="config-style"
                    >
                      <Dropdown
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

                <Flex
                  className="product-list-header"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Flex flexWrap='wrap' className={cx('title', { b2b: site === 'b2b' })} alignItems="flex-end">
                    <h1>
                      Temizlik ve Hijyen Ürünleri
                      <span>{`(${list.urunler != undefined ? list.urunler.length : 0} ürün)`}</span>
                    </h1>
                  
                    
                  </Flex>
                  
                  {this.state.list.makale != undefined ? <SeoContent mt={10} content={makale} />: null}
                  
                  <Flex ml="auto"  className={cx('config', { b2b: site === 'b2b' })}>
                    <Box ml={2} className="config-style">
                      <Dropdown
                        
                        pointing="top right"
                        icon={null}
                      >
                        <Dropdown.Menu>
                          <List>
                            <List.Item>
                              <List.Content>
                                <a
                                  href="javascript:;"
                                  // onClick={() => this.onSortChange(null)}
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
                                  // onClick={() => this.onSortChange('PRICE_LOW')}
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
                                  // onClick={() => this.onSortChange('PRICE_HIGH')}
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
                {isLoading ? <Spinner /> : 
                list.urunler  &&
                (viewList ? (
                  list.urunler
                    .filter(item => item)
                    .map(item => (
                      site === "aloparca" ?
                      <ProductCard
                        item={item}
                        key={item.no}
                        breadcrumb={list.breadcrumb}
                        //car={isCar}
                        //carModel={carModel}
                      /> :
                      <ProductCardB2B
                        item={item}
                        key={item.no}
                        breadcrumb={list.breadcrumb}
                      />
                    ))
                ) : (
                    <Flex mx={-1} flexWrap="wrap" mb={-3}>
                      {list.urunler
                        .filter(item => item)
                        .map(item => (
                          <Flex className="grid-card-wrapper" px={1} key={item.no}>
                            <ProductCardGrid
                              item={item}
                              breadcrumb={list.breadcrumb}
                              //car={isCar}
                            />
                          </Flex>
                        ))}
                    </Flex>
                  ))
              
               }

               

                {list.sayfa_sayisi > 1 && (
                  <Paginate
                    current={list.sayfa}
                    total={list.sayfa_sayisi}
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

export default connect()(Temizlik);
