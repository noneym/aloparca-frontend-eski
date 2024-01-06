import cx from 'classnames';
import { Flex } from '@rebass/grid';
import { Transition } from 'semantic-ui-react';
import { Link } from '../../../reactor';

import Outer from './style';

class Categories extends React.Component {
  state = { showAll: false };
  render() {
    const { showAll } = this.state;
    const { categories } = this.props;
    return (
      <Outer flexWrap="wrap" my={40} alignItems="center">
        <Flex width={5 / 6}>
          {[
            {
              icon: 'icon-kategoriler-aydinlatma',
              title: 'Aydınlatma Aksamı',
              maincategory: 'aydinlatma-aksami',
            },
            {
              icon: 'icon-kategoriler-debriyaj',
              title: 'Debriyaj Sistemi',
              maincategory: 'debriyaj-sistemi',
            },
            {
              icon: 'icon-kategoriler-direksiyon',
              title: 'Direksiyon Sistemi',
              maincategory: 'direksiyon-sistemi',
            },
            {
              icon: 'icon-kategoriler-filtre',
              title: 'Filtre Sistemi',
              maincategory: 'filtre-sistemi',
            },
            { icon: 'icon-kategoriler-fren', title: 'Fren Sistemi', maincategory: 'fren-sistemi' },
          ].map((item) => {
            const title = item.title.split(' ');
            return (
              <Flex
                as={Link}
                route="maincategory"
                params={{ maincategory: item.maincategory }}
                title={item.title}
                className="category-item"
                width={1 / 5}
                alignItems="center"
                key={item.title}
              >
                <Flex py={1} justifyContent="space-between" alignItems="center" width={1}>
                  <Flex className="content" alignItems="center">
                    <i className={`icon ${item.icon}`} />
                    <span>
                      <strong>{title[0]}</strong>
                      {title.length > 1 && title[1]}
                    </span>
                  </Flex>
                  <i className="arrow icon-chevron-thin-right" />
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex width={1 / 6} pl={4}>
          <a
            href="javascript:;"
            onClick={() => this.setState({ showAll: !showAll })}
            className={cx('button', { active: showAll })}
            title="Tüm Kategoriler"
          >
            <span>
              Tüm
              <strong>Kategoriler</strong>
            </span>
            <i className="icon-chevron-thin-right" />
          </a>
        </Flex>

        <Transition visible={showAll} animation="slide down" duration={500}>
          <div>
            <Flex flexWrap="wrap" py={2} width={1} className="show-all" alignItems="center">
              {categories &&
                categories.map(category => (
                  <Flex width={1 / 4} p={2} key={category.ust_kategoriler.link} alignItems="center">
                    <Link
                      route="maincategory"
                      params={{ maincategory: category.ust_kategoriler.link }}
                      className="category-link"
                    >
                      <i className={`icon-kategoriler-${category.ust_kategoriler.link}`} />
                      {category.ust_kategoriler.name}
                    </Link>
                  </Flex>
                ))}
            </Flex>
          </div>
        </Transition>
      </Outer>
    );
  }
}

export default Categories;
