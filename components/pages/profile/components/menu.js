import cx from 'classnames';
import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@rebass/grid';
import { TimelineMax } from 'gsap';
import { Link } from '../../../../reactor';
import { userLogout } from '../../../../actions';
import items from '../menu.json';
import { site } from '../../../../reactor/func';


let menuTL;

const Menu = ({ dispatch, slug }) => {
  const submenuRef = useRef();
  const subMenuIconRef = useRef();

  useEffect(() => {
    menuTL = new TimelineMax({ paused: true, reversed: true })
      .from(submenuRef.current, 0.3, {
        height: 0,
        paddingTop: 0,
        clearProps: 'height',
      })
      .to(subMenuIconRef.current, 0.3, {
        height: 'auto',
        rotation: 90,
        delay: -0.3,
      });
  }, []);

  const [menuIsActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    if (menuTL.reversed()) {
      menuTL.timeScale(1).play();
    } else {
      menuTL.timeScale(1.5).reverse();
    }
    setMenuActive(!menuIsActive);
  };

  return (
    <Box className="menu" width={[1, 1, 1 / 5]} p={2} mb={[3, 3, 0]}>
      <div className="label">
        <Link route="profile" title="Hesabım">
          Hesabım
        </Link>
        <a href="javascript:;" onClick={toggleMenu} className="mobile-menu-link">
          <i
            className="icon-chevron-thin-right"
            ref={subMenuIconRef}
          />
        </a>
      </div>
      <ul
        id="hesapMenu"
        className={cx('main-category', { active: menuIsActive })}
        ref={submenuRef}
      >
        {items.map((item) => (
          site === 'aloparca' && item.title === 'Kumbara' ? null : (
            <li key={item.title}>
              <Link
                className={cx({ active: item.slug === slug })}
                route={item.route}
                params={{ slug: item.slug }}
              >
                <span onClick={toggleMenu}>
                  {item.title}
                  <i
                    className={cx({
                      'icon-chevron-thin-down': item.subcategory,
                      'icon-chevron-thin-right': !item.subcategory,
                    })}
                  />
                </span>
              </Link>
              {
              item.subcategory && (
              <ul className="sub-category">
                {item.subcategory.map((subitem) => (
                  <li key={subitem.title} onClick={toggleMenu}>
                    <Link
                      className={cx({ active: subitem.slug === slug })}
                      route={subitem.route}
                      params={{ slug: subitem.slug }}
                      onClick={() => {}}
                    >
                      {subitem.title}
                    </Link>
                  </li>
                ))}
              </ul>
              )
            }
            </li>
          )
        ))}
        <li className="logout">
          <a href="javascript:;" onClick={() => dispatch(userLogout())}>
            ÇIKIŞ
            <i className="icon-logout" />
          </a>
        </li>
      </ul>
    </Box>
  );
};


export default connect()(Menu);
