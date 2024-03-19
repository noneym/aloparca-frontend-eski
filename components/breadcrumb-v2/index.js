import { Dropdown } from 'semantic-ui-react';

import { Link } from '../../reactor';

import Outer from './style';

const BreadCrumb = ({ items, isProduct }) => (
  <Outer>
    <ul>
      <li>
        <Link to="/">Anasayfa</Link>
      </li>
      {items &&
        items
          .filter(item => item.name !== '')
          .map((item, index) => {
            let itemLink = '';
            if (item.link.indexOf('altkategori') === 0) {
              itemLink = `${items[index - 1].link}/`;
            }
            itemLink = `oto-yedek-parca-v2/${itemLink}`;
            return (
              <li key={item.link}>
                {item.detay && item.detay.length > 0 ? (
                  <Dropdown
                    inline
                    scrolling
                    icon={null}
                    options={item.detay.map(menuLink => ({
                      value: menuLink.name ? menuLink.name.toString() : '',
                      text: menuLink.name,
                      content: (
                        <Link to={`/${itemLink}${menuLink.link}`} key={menuLink.link}>
                          {menuLink.name}
                        </Link>
                      ),
                    }))}
                    defaultValue={item.name ? item.name.toString() : ''}
                  />
                ) : (
                  <Link to={`/${itemLink}${item.link}`}>{item.name}</Link>
                )}
              </li>
            );
          })}
    </ul>
  </Outer>
);
export default BreadCrumb;
