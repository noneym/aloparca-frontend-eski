import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import { Input, Accordion, Menu } from 'semantic-ui-react';
import cx from 'classnames';
import routerEvents from 'next-router-events';

import { Router } from '../../../routes';
import Outer from './style';

class Category extends React.Component {
  state = { regexQuery: '' };

  componentDidMount() {
    const { categories, query } = this.props;
    if (query && query.maincategory) {
      const activeIndex = categories.findIndex((item) => item.ust_kategoriler.link === query.maincategory);
      if (activeIndex !== -1) {
        this.changeState({ activeIndex });
      }
    }
    routerEvents.on('routeChangeComplete', this.unSelect);
  }

  componentWillUnmount() {
    routerEvents.off('routeChangeComplete', this.unSelect);
  }

  changeState = (obj) => this.setState(obj);

  unSelect = () => this.setState({ selectSub: null });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.changeState({ activeIndex: newIndex });
  };

  menuClick = (e, route, params) => {
    e.preventDefault();
    this.changeState({ selectSub: params.subcategory ? params.subcategory : params.maincategory });
    Router.pushRoute(route, params);
  };

  search = () => {
    const query = this.categorySearch.inputRef.current.value;
    let regexQuery = '';
    if (query && query.length > 2) regexQuery = RegExp(query, 'i');
    this.setState({ regexQuery });
  };

  render() {
    const { categories, query, garage } = this.props;
    const { activeIndex, selectSub, regexQuery } = this.state;
    const {
      uyeid, sasi, not, resim, ...carList
    } = garage;
    let linkUrl = '/oto-yedek-parca';
    let listCar = {};
    if (query && query.marka) {
      if (query.marka) linkUrl += `/${query.marka}`;
      if (query.model) linkUrl += `/${query.model}`;
      if (query.kasa) linkUrl += `/${query.kasa}`;
      if (query.yil) linkUrl += `/${query.yil}`;
      if (query.motor) linkUrl += `/${query.motor}`;
      if (query.beygir) linkUrl += `/${query.beygir}`;
      const { maincategory, subcategory, ...queryCar } = query;
      listCar = queryCar;
    } else if (garage && garage.uyeid) {
      if (garage.marka) linkUrl += `/${garage.marka}`;
      if (garage.model) linkUrl += `/${garage.model}`;
      if (garage.kasa) linkUrl += `/${garage.kasa}`;
      if (garage.yil) linkUrl += `/${garage.yil}`;
      if (garage.motor) linkUrl += `/${garage.motor}`;
      if (garage.beygir) linkUrl += `/${garage.beygir}`;
      listCar = carList;
    }
    if (categories.status === false || (categories && categories.length === 0)) return null;
    return (
      <Outer>
        <Flex p={2} flexDirection="column">
          <Box px={1} mb={2} className="label">
            Kategoriler
          </Box>
          <Box className="search-box">
            <Input
              placeholder="Kategorilerde Ara"
              ref={(n) => {
                this.categorySearch = n;
              }}
              onChange={this.search}
            />
            <Accordion as={Menu} vertical exclusive fluid>
              {categories
                && categories.length > 0
                && categories
                  .filter((item) => item.ust_kategoriler.name.search(regexQuery) > -1
                      || item.ust_kategoriler.altkate.some((subItem) => subItem.name.search(regexQuery) > -1))
                  .map((category, index) => (
                    <Menu.Item key={category.ust_kategoriler.name}>
                      <Accordion.Title
                        active={activeIndex === index}
                        content={category.ust_kategoriler.name}
                        index={index}
                        onClick={this.handleClick}
                      />
                      <Accordion.Content
                        active={
                          activeIndex === index
                          || category.ust_kategoriler.altkate.some((item) => query && item.link === query.subcategory)
                        }
                      >
                        <ul>
                          <li>
                            <a
                              href={`${linkUrl}/ustkategori/${category.ust_kategoriler.link}`}
                              onClick={(e) => this.menuClick(e, 'listmaincategory', {
                                  ...listCar,
                                  maincategory: category.ust_kategoriler.link,
                                })}
                              className={cx('sub-menu', {
                                active:
                                  query
                                  && (query.maincategory === category.ust_kategoriler.link
                                    && !query.subcategory),
                                select: category.ust_kategoriler.link === selectSub,
                              })}
                            >
                              Tümü
                            </a>
                          </li>
                          {category.ust_kategoriler.altkate.map((sub) => (
                            <li key={sub.name}>
                              <a
                                href={`${linkUrl}/ustkategori/${
                                  category.ust_kategoriler.link
                                }/altkategori/${sub.link}`}
                                onClick={(e) => this.menuClick(
                                    e,
                                    query && query.marka ? 'listsubcategory' : 'subcategory',
                                    query && query.marka
                                      ? {
                                        ...listCar,
                                        subcategory: sub.link.replace(/ /g, '-'),
                                      }
                                      : {
                                        ...listCar,
                                        maincategory: category.ust_kategoriler.link,
                                        subcategory: sub.link.replace(/ /g, '-'),
                                      },
                                  )}
                                className={cx('sub-menu', {
                                  active:
                                    query && query.subcategory && sub.link === query.subcategory,
                                  select: sub.link.replace(/ /g, '-') === selectSub,
                                })}
                              >
                                {sub.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    </Menu.Item>
                  ))}
            </Accordion>
          </Box>
        </Flex>
      </Outer>
    );
  }
}
const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(Category);
