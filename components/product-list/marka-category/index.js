import cx from 'classnames';
import { Link } from '../../../reactor';

import Outer from './style';

class MarkaCategory extends React.Component {
  state = {};

  render() {
    const { categories, marka, activeCategory } = this.props;

    return (
      <Outer>
        <div className="model-title">{`${marka} Kategorileri`}</div>
        <Link route="listmarka" params={{ marka }}>
          <div className={cx('item', { active: !activeCategory })}>Tüm Ürünler</div>
        </Link>
        {categories &&
          categories.length > 0 &&
          categories.map(category => (
            <Link route="listmarka" params={{ marka, slug: category.slug }} key={category.name}>
              <div className={cx('item', { active: activeCategory === category.slug })}>
                {category.name}
              </div>
            </Link>
          ))}
      </Outer>
    );
  }
}
export default MarkaCategory;
