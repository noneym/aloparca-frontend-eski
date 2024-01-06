import cx from 'classnames';
import { useRef, useEffect, useState } from 'react';
import { Box } from '@rebass/grid';
import { TimelineMax } from 'gsap';
import styled from 'styled-components';
import { Router } from '../../routes';

const Outer = styled.div`
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  .menuMobilYag {
    width: 100%;
  }
  .hesapMenu {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .label{
    display: flex;
    justify-content: space-between;
  }
  .oil-cat{
    border-top: dashed 2px #f2f5f0;
    font-size: 1.15rem;
    padding: 0.1rem 0.5rem;
    display: flex;
    justify-content: space-between;
    overflow-y: auto;
    overflow-x: hidden;


    .textArea {
      margin: 0.3rem 0.1rem;
      padding:  0.3rem 1.3rem;
      pointer-events: none;
    }
    .secBtn{
      background-color: #FF8A01;
      border-radius: 5px;
      margin: 0.3rem 0.3rem;
      padding:  0.3rem 1.3rem;
      color: white;
      pointer-events: none;
      max-height: 2.2rem;
    }
  }
  .oil-cat:last-child{
    margin-bottom: 0.5rem;
  }
`;

let menuTL;
let Yaglar = [];


const OilMenu = ({ productListData }) => {
  const submenuRef = useRef();
  const subMenuIconRef = useRef();
  const subMenuLiRef = useRef();
  const list = [];

  const [categoryName, setcategoryName] = useState('');
  const newList = ['SIVI CONTA', 'KLIMA TEMIZLEYICI KOKU GIDERICI'];

  const [menuIsActive, setMenuActive] = useState(false);

  useEffect(() => {
    try {
      document.addEventListener('mouseup', (e) => {
        const mouseOn = e.target.children;
        const mouseOnInner = mouseOn[0] === undefined ? 'Sprey Türünü Seçiniz' : mouseOn[0].innerText;
        // console.log(productListData, mouseOnInner, Yaglar);
        newList.includes(mouseOnInner) && setcategoryName(mouseOnInner);
      });
    } catch (error) {
      // console.log(error);
    }
  }, []);

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

  useEffect(() => {
    try {
      const keys = Object.keys(productListData);
      const values = Object.values(productListData);
      for (let index = 0; index < keys.length; index++) {
        list.push({
          no: index + 1,
          kategori: keys[index],
          products: values[index],
        });
      }
      Yaglar = [...list];
      // console.log(Yaglar);
    } catch (error) {
      // console.log(error);
    }
  }, [list]);


  const toggleMenu = () => {
    if (menuTL.reversed()) {
      menuTL.timeScale(1).play();
    } else {
      menuTL.timeScale(1.5).reverse();
    }
    setMenuActive(!menuIsActive);
  };

  const RouteAll = () => {
    Router.pushRoute(`/madeni-yaglar/motor-yaglari/10`);
    toggleMenu();
  };

  const RouteFunc = () => {
    Router.pushRoute(`/madeni-yaglar/motor-yaglari/10/altkat/${categoryName === 'KLIMA TEMIZLEYICI KOKU GIDERICI' ? 'klima-temizleyici-koku-giderici' : categoryName === 'SIVI CONTA' ? 'sivi-conta' : ''}`);
    toggleMenu();
  };

  return (
    <Outer>
      <Box className="menuMobilYag" width={[1, 1, 1 / 5]} p={2} mb={-2}>
        <div className="label" onClick={toggleMenu}>
          <h3 className="baslik">Sprey Türünü Seçiniz</h3>
          <a href="javascript:;" className="mobile-menu-link">
            <i
              className={`icon-chevron-thin-${menuIsActive ? 'down' : 'right'}`}
              ref={subMenuIconRef}
            />
          </a>
        </div>
        <ul
          id="hesapMenu"
          className={cx('main-category', { active: menuIsActive })}
          ref={submenuRef}
        >
            <li
              key={2121212}
              onClick={RouteAll}
              className="oil-cat"
              ref={subMenuLiRef}
            >
              <span className="textArea">
                TÜMÜ
              </span>
              <span className="secBtn">Seç</span>
            </li>
          {Yaglar.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={item.no}
              onClick={RouteFunc}
              className="oil-cat"
              ref={subMenuLiRef}
            >
              <span className="textArea">
                {item.kategori.toUpperCase().replace(/-/gi, ' ')}
              </span>
              <span className="secBtn">Seç</span>
            </li>
          ))
        }
        </ul>
      </Box>
    </Outer>
  );
};

export default OilMenu;
