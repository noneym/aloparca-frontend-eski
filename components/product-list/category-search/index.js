import { Flex, Box } from '@rebass/grid';
import { Input, Accordion, Menu } from 'semantic-ui-react';
import cx from 'classnames';
import routerEvents from 'next-router-events';

import { Router } from '../../../routes';
import Outer from './style';

class Category extends React.Component {
  state = {};

  componentDidMount() {
    routerEvents.on('routeChangeComplete', this.unSelect);
  }

  componentWillUnmount() {
    routerEvents.off('routeChangeComplete', this.unSelect);
  }

  changeState = obj => this.setState(obj);

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

  render() {
    const {
      categories,
      query: { slug },
    } = this.props;
    const { activeIndex, selectSub } = this.state;
    const linkUrl = `/arama/q/${slug}`;
    return (
      <Outer>
        <Flex p={2} flexDirection="column">
          <Box px={1} mb={2} className="label">
            Kategoriler
          </Box>
          <Box className="search-box">
            <Input placeholder="Kategorilerde Ara" />
            <Accordion as={Menu} vertical exclusive fluid>
              {categories &&
                categories.map((category, index) => (
                  <Menu.Item key={category.ust_kategoriler.name}>
                    <Accordion.Title
                      active={activeIndex === index}
                      content={category.ust_kategoriler.name}
                      index={index}
                      onClick={this.handleClick}
                    />
                    <Accordion.Content active={activeIndex === index}>
                      <ul>
                        <li>
                          <a
                            href={`${linkUrl}/ustkategori/${category.ust_kategoriler.link}`}
                            onClick={e =>
                              this.menuClick(e, 'listmaincategory', {
                                ...query,
                                maincategory: category.ust_kategoriler.link,
                              })
                            }
                            className={cx('sub-menu', {
                              select: category.ust_kategoriler.link === selectSub,
                            })}
                          >
                            Tümü
                          </a>
                        </li>
                        {category.ust_kategoriler.altkate.map(sub => (
                          <li key={sub.name}>
                            <a
                              href={`${linkUrl}/ustkategori/${
                                category.ust_kategoriler.link
                              }/altkategori/${sub.link}`}
                              onClick={e =>
                                this.menuClick(e, 'listsubcategory', {
                                  ...newQuery,
                                  maincategory: category.ust_kategoriler.link,
                                  subcategory: sub.link.replace(/ /g, '-'),
                                })
                              }
                              className={cx('sub-menu', {
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
export default Category;
