import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Router } from '../../routes';

const DropdownKategori = ({ categories }) => {
  const Kategoriler = categories;
  const [Options, setOptions] = useState([]);
  const [SubOptions, setSubOptions] = useState([{
    key: '0',
    text: '',
    value: '',
  }]);
  const [SelectedKat, setSelectedKat] = useState(null);
  const [inputOpen, setinputOpen] = useState(false);
  let Count = 0;
  let Count2 = 0;

  const addCtgr = (kategorilerTumu) => {
    const list = [];
    kategorilerTumu.map((kategori) => {
      Count += 1;
      list.push({
        key: `${Count}`,
        text: `${kategori.ust_kategoriler.name}`,
        value: `${kategori.ust_kategoriler.link}`,
      });
    });
    return list;
  };

  const addSubCtgr = (altkats) => {
    const list = [];
    altkats.map((kategori) => {
      Count2 += 1;
      list.push({
        key: `${Count2}`,
        text: `${kategori.name}`,
        value: `${kategori.link}`,
      });
    });
    setSubOptions(list);

    return list;
  };


  const addSub = async (item) => {
    const altkats = await item[0].ust_kategoriler.altkate;
    addSubCtgr(altkats);
  };


  useEffect(() => {
    setOptions(addCtgr(Kategoriler));
    setinputOpen(false);
    Count = 0;
    Count2 = 0;
  }, []);

  const handleChange = (e) => {
    try {
      const selected = `${Options.filter((kategori) => kategori.text === e)[0].value}`;
      const sub = Kategoriler.filter((altKat) => altKat.ust_kategoriler.link === selected);
      setSelectedKat(selected);
      addSub(sub);
      setinputOpen(true);
    } catch (error) {
      // console.log(error);
    }
  };
  const handleChangeSub = (e) => {
    try {
      const selected = (e.toLowerCase()).replace(' ', '-');
      const link = `/oto-yedek-parca/ustkategori/${SelectedKat}/altkategori/${selected}`;
      Router.pushRoute(link);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <Dropdown
        placeholder="Bir kategori seçiniz"
        fluid
        selection
        options={Options}
        onChange={(e) => handleChange(e.target.innerText)}
      />
      {
        inputOpen && (
        <Dropdown
          placeholder="Bir alt kategori seçiniz"
          fluid
          selection
          style={{ marginTop: '0.5rem' }}
          options={SubOptions}
          onChange={(e) => handleChangeSub(e.target.innerText)}
        />
        )
      }
    </div>

  );
};

export default DropdownKategori;
