import cx from 'classnames';
import { useRef, useEffect, useState } from 'react';
import { Box } from '@rebass/grid';
import { TimelineMax } from 'gsap';
import styled from 'styled-components';
import { Router } from '../../routes';
import { Link } from '../../reactor';

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
    }
  }
  .oil-cat:last-child{
    margin-bottom: 0.5rem;
  }
`;

let menuTL;
let Yaglar = [];
const clicked = '';


const OilMenu = ({ productListData }) => {
  const submenuRef = useRef();
  const subMenuIconRef = useRef();
  const subMenuLiRef = useRef();
  const list = [];

  const [categoryName, setcategoryName] = useState('');
  const newList = ['0W30', '0W40', '10W30', '10W40', '10W40', '15W40', '20W40', '20W50', '2T', '5W30', '5W40'];

  const [menuIsActive, setMenuActive] = useState(false);

  useEffect(() => {
    try {
      document.addEventListener('mouseup', (e) => {
        const mouseOn = e.target.children;
        const mouseOnInner = mouseOn[0] === undefined ? 'Yağ Türünü Seçiniz' : mouseOn[0].innerText;
        // console.log(categoryName, mouseOn, mouseOnInner , newList.includes(mouseOnInner), newList);
        // eslint-disable-next-line no-unused-expressions
        (newList.includes(mouseOnInner) || newList.includes(mouseOnInner.toUpperCase())) && setcategoryName(mouseOnInner);
      });
    } catch (error) {
      // console.log(error);
    }
  }, [menuIsActive]);

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
      console.log(error);
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
    Router.pushRoute(`/madeni-yaglar/motor-yaglari/3`);
    
    toggleMenu();
  };

  const RouteFunc = () => {
    Router.pushRoute(`/madeni-yaglar/motor-yaglari/3/altkat/${categoryName}`);
    toggleMenu();
  };
  return (
 
    <Outer>
      <Box className="menuMobilYag" width={[1, 1, 1 / 5]} p={2} mb={-2}>
        <div className="label" onClick={toggleMenu}>
          <h3 className="baslik">Yağ Türünü Seçiniz</h3>
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
                {item.kategori.toUpperCase()}
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

// import React from 'react';
// import { Dropdown } from 'semantic-ui-react';
// import { Router } from '../../routes';

// const Options = [
//   {
//     key: '1',
//     text: 'MOTOR YAĞLARI',
//     value: '/madeni-yaglar/motor-yaglari',
//   },
//   {
//     key: '2',
//     text: 'ANTİFİRİZLER',
//     value: '/madeni-yaglar/motor-yaglari/4',
//   },
//   {
//     key: '3',
//     text: 'FREN HİDROLİKLERİ',
//     value: '/madeni-yaglar/motor-yaglari/5',
//   },
//   {
//     key: '4',
//     text: 'ŞANZIMAN YAĞLARI',
//     value: '/madeni-yaglar/motor-yaglari/6',
//   },
//   {
//     key: '5',
//     text: 'BAKIM KATKILARI',
//     value: '/madeni-yaglar/motor-yaglari/7',
//   },
//   {
//     key: '6',
//     text: 'DİĞER ÜRÜNLER',
//     value: '/madeni-yaglar/motor-yaglari/10',
//   },
// ];

// const DropdownKategori = () => {
//   const handleChange = (e) => {
//     try {
//       const selected = `${Options.filter((kategori) => kategori.text === e)[0].value}`;
//       Router.pushRoute(selected);
//     } catch (error) {
//       // console.log(error);
//     }
//   };

//   return (
//     <Dropdown
//       placeholder="Bir alt kategori seçiniz"
//       fluid
//       selection
//       options={Options}
//       onChange={(e) => handleChange(e.target.innerText)}
//     />
//   );
// };

// export default DropdownKategori;
