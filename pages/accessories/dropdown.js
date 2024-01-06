import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Router } from '../../routes';

const DropdownKategori = ({ katList }) => {
  try {
    const Categories = [];
    const kategoriler = katList ? katList.kategoriler : [];

    for (let index = 0; index < kategoriler.length; index++) {
      const element = kategoriler[index];
      Categories.push(
        {
          key: `${index + 1}`,
          text: `${element.name.toUpperCase()}`,
          value: `/otoaksesuar/${element.slug}`,
        },
      );
    }

    const handleChange = (e) => {
      try {
        const selected = `${Categories.filter((kategori) => kategori.text === e)[0].value}`;
        Router.pushRoute(selected);
      } catch (error) {
        //console.log(error);
      }
    };

    return (
      <Dropdown
        placeholder="Bir alt kategori seçiniz"
        fluid
        selection
        options={Categories}
        onChange={(e) => handleChange(e.target.innerText)}
        scrolling
      />
    );
  } catch (error) {
    console.log(error);
  }
};

export default DropdownKategori;
