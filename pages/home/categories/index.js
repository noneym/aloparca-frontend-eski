import { connect } from 'react-redux';
import cx from 'classnames';
import { Flex } from '@rebass/grid';
import { Transition } from 'semantic-ui-react';
import { Link } from '../../../reactor';

import Outer from './style';

class Categories extends React.Component {
  state = { showAll: false };
  render() {
    const { showAll } = this.state;
    const { categories, garage } = this.props;
    const {
      uyeid, sasi, not, resim, ...carList
    } = garage;
    const routeName = carList.marka ? 'listmaincategory' : 'maincategory';
    return (
      <Outer flexWrap="wrap" alignItems="center">
        <Flex className="categories" width={1}>
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
                route={routeName}
                params={{ maincategory: item.maincategory, ...carList }}
                title={item.title}
                className="category-item"
                width={[1 / 6]}
                p={[0, 0, 0]}
                alignItems="center"
                key={item.title}
              >
                <Flex
                  className="item"
                  py={1}
                  justifyContent="space-between"
                  alignItems="center"
                  width={1}
                >
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
          <Flex className="category-item button-top" width={[1 / 6]}>
            <Flex
              py={[1, 1, 0]}
              className="button-flex"
              justifyContent="space-between"
              alignItems="center"
              width={1}
            >
              <a
                href="javascript:;"
                onClick={() => this.setState({ showAll: !showAll })}
                className={cx('button', { active: showAll })}
                title="Tüm Kategoriler"
              >
                <span className="desktop">
                  <span>
                    Tüm
                    <strong>Kategoriler</strong>
                  </span>
                </span>
                <span className="mobile">
                  <strong>Tümü</strong>
                </span>

                <i className="icon-chevron-thin-right" />
              </a>
            </Flex>
          </Flex>
        </Flex>

        <Transition visible={showAll} animation="slide down" duration={500}>
          <div>
            <Flex flexWrap="wrap" py={2} width={1} className="show-all" alignItems="center">
              {categories &&
                categories.map(category => (
                  <Flex
                    width={[1, 1 / 4]}
                    p={2}
                    key={category.slug}
                    alignItems="center"
                  >
                    <Link
                      route={routeName}
                      params={{ maincategory: category.slug, ...carList }}
                      className="category-link"
                    >
                      <i className={`icon-kategoriler-${category.slug}`} />
                      {category.name}
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
const mapStateToProps = ({ garage }) => ({ garage });
export default connect(mapStateToProps)(Categories);
