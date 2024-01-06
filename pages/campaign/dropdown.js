import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Router } from '../../routes';

const DropdownKategori = ({ katlist }) => {

  const First = [];
  const Second = [];
  const KampannyaList = [];

  const getData = () => {
    if (First.length !== 0) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < First.length; index++) {
        const subKategori = First[index];
        const kategori = Second[index];
        const name = `${kategori} ${subKategori}`;
        KampannyaList.push(
          {
            key: `${index + 1}`,
            text: `${name}`,
            value: `/kampanyali-urunler?category=${subKategori}&brand=${kategori}`,
          }
        );
      }
    }
  };

  const handleChange = (e) => {
    try {
      const selected = `${KampannyaList.filter((kategori) => kategori.text === e)[0].value}`;
      Router.pushRoute(selected);
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(Options2, MyArr);
  useEffect(() => {
    Object.keys(katlist).map((m) => {
      First.push(m);
    });
    Object.values(katlist).map((m) => {
      Second.push(m[0]);
    });
    getData();
  }, [First]);

  return (
    <Dropdown
      placeholder="Bir alt kategori seçiniz"
      fluid
      selection
      options={KampannyaList}
      onChange={(e) => handleChange(e.target.innerText)}
      scrolling
    />
  );
};

export default DropdownKategori;
