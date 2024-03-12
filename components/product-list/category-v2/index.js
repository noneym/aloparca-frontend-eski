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
      const activeIndex = categories.findIndex((item) => item.slug === query.maincategory);
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
    let linkUrl = '/oto-yedek-parca-v2';
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
              {/* {JSON.stringify(categories)} */}
              {categories
                && categories.length > 0
                && categories.filter((item) => item.name.search(regexQuery) > -1
                      || item.subcategories.some((subItem) => subItem.name.search(regexQuery) > -1))
                  .map((category, index) => (
                    <Menu.Item key={category.name}>
                      <Accordion.Title
                        active={activeIndex === index}
                        content={category.name}
                        index={index}
                        onClick={this.handleClick}
                      />
                      <Accordion.Content
                        active={
                          activeIndex === index
                          || category.subcategories.some((item) => query && item.slug === query.subcategory)
                        }
                      >
                        <ul>
                          <li>
                            <a
                              href={`${linkUrl}/ustkategori/${category.slug}`}
                              onClick={(e) => this.menuClick(e, 'listmaincategory-v2', {
                                  ...listCar,
                                  maincategory: category.slug,
                                })}
                              className={cx('sub-menu', {
                                active:
                                  query
                                  && (query.maincategory === category.slug
                                    && !query.subcategory),
                                select: category.slug === selectSub,
                              })}
                            >
                              Tümü
                            </a>
                          </li>
                          {category.subcategories.map((sub) => (
                            <li key={sub.name}>
                              <a
                                href={`${linkUrl}/ustkategori/${
                                  category.slug
                                }/altkategori/${sub.slug}`}i
                                onClick={(e) => this.menuClick(
                                    e,
                                    query && query.marka ? 'listsubcategory-v2' : 'subcategory-v2',
                                    query && query.marka
                                      ? {
                                        ...listCar,
                                        subcategory: sub.slug.replace(/ /g, '-'),
                                      }
                                      : {
                                        ...listCar,
                                        maincategory: category.slug,
                                        subcategory: sub.slug.replace(/ /g, '-'),
                                      },
                                  )}
                                className={cx('sub-menu', {
                                  active:
                                    query && query.subcategory && sub.slug === query.subcategory,
                                  select: sub.slug.replace(/ /g, '-') === selectSub,
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
