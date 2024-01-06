/* eslint-disable quotes */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { Button, Card, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import { media } from '../../style/theme';
import ItemsCard from './ItemsCard';
import fakeApi from './fakeApi.json';
import { addCartMultiple, setPrices, setSelectedItems, setFullOnItems, setChangePage, setProducts } from "../../actions";
// import logo from "../../static/img/logo.svg"

const ProductPageOuter = styled.div`
  width: 100%;
  height: 100%;
  .robot-pagetwo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.phoneMini`
      flex-direction: column;
      align-items: flex-end;
    `};
  }
  .page-title-page-two {
    display: inline-flex;
    align-items: center;
    height: 60px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    padding-right: 30px;
    font-size: 20px;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
    ${media.phoneMini`
      width: 100%;
      height: 50px;
      border-radius: 25px;
      font-size: 16px;
    `};
    span {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      margin-right: 15px;
      font-size: 30px;
      font-weight: 600;
      color: #ff8900;
    }
  }
  .main-area-two {
    width: 100%;
    height: 100%;
    .main-area-two-cards {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      margin-bottom: 1rem;
      ${media.phone`
        width: 95%;
      `}
    }
    .main-area-two-buttons {
      justify-content: space-between;
      button {
        width: 100%;
      }
      .button-second-page-getir {
        background-color: #7dbc2c;
        width: 50%;
        margin-left: auto;
        ${media.phoneMini`
          width: 100%;
        `};
      }
    }
  }
  .ui.selection.dropdown,
  .ui.selection.dropdown .item {
    padding-left: 10px !important;
    padding-right: 5px !important;
  }
  .ui.selection.dropdown {
    min-width: auto;
    display: block;
    border-radius: 0;
    border: 1px solid #dddddd;
    padding-top: 12px;
    padding-bottom: 12px;
    min-height: auto;
    position: relative;
    ${media.tablet`
      min-width: 100%;
    `};
    .menu {
      border: none;
      margin: 0;
      min-width: 100%;
      width: 100%;
    }
    .icon {
      font-family: "icomoon";
      font-size: 12px;
      padding: 12px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      margin: 0;
      &:before {
        content: "\\e903";
      }
    }
  }

  .ui.button {
    color: white;
    text-transform: uppercase;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.3);
    height: 42px;
  }
`;

const CardTable = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
  ${media.phoneMini`
    margin-left: -20px;
    margin-right: -20px;
    border-radius: 0;
  `};
`;

const Table = styled.table`
  width: 100%;
  ${media.phoneMini`
    font-size: 12px;
  `};
`;

const TableHeader = styled.thead`
  tr td {
    padding: 3px;
    padding-bottom: 5px;
    border-bottom: 1px solid lightgrey;
  }
`;

const TableBody = styled.tbody`
  tr td {
    padding: 3px;
    &:last-child {
      text-align: right;
    }
    & .lightRed {
      color: red;
    }
  }
  .borderTop {
    border-top: 1px solid lightgrey;
    padding-top: 10px;
  }
`;

const NotFindedProduct = styled.div`
  text-align: center;
`;

const ResetButton = styled(Button)`
  width: 200px;
  margin-left: auto;
  ${media.phoneMini`
    margin-top: 14px!important;
    width: 170px;
    font-size: 12px!important;
  `};
`;

function ProductPage({ SetPageFunc, data }) {
  const dispatch = useDispatch();
  const { selectedItems, prices, fullOnItems, products } = useSelector(state => state.pratikBakim);
  const [Items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("Sepetinize eklendi");
  const oneNo = products.map(item => item.no);
  const allPrices = products.map((item) => item.fiyat);
  const allNameProduct = products.map((item) => item.urun_adi);
  const uniqueProduct = allNameProduct.filter((v, i, a) => a.indexOf(v) === i);

  const fixItems = Items === undefined ? [] : Items;

  const SelectFunction = (data) => {
    if (!oneNo.includes(data.no)) {
      if (!allNameProduct.includes(data.urun_adi)) {
        dispatch(setProducts([...products, {...data, checked: true}]));
      } else {
        setModalDescription(`Zaten bir ${data.urun_adi} seçtiniz`);
        setOpen(true);
      }
    } else {
      dispatch(setProducts(products.filter((item) => item.no !== data.no)));
    }
  };

  const FullSelection = (products) => {
    const notStock = products.urunler.filter(item => item.stokdurumu !== "0");
    const getNumbers = notStock.map(item => item.no);
    dispatch(setSelectedItems([...selectedItems, ...getNumbers]));
    // if (fullOnItems) {
    //   const notStock = products.urunler.filter(item => item.stokdurumu !== "0");
    //   const getNumbers = notStock.map(item => item.no);
    //   const getNumbesss = getNumbers.filter(item => )
    // } else {
    //   // dispatch(setFullOnItems(true));
      
    //   // const getPrices = notStock.map(item => item.fiyat);
    //   // dispatch(setPrices(getPrices));
    // }
  };

  const addItemsToCart = () => {
    let list = [];
    products.map((selected) => {
      list = [...list, {
        adet: 1,
        urun_no: selected.no,
      }];
    });
    if (list.length === 0) {
      setModalDescription("Sepet seçmediniz");
      setOpen(true);
    } else {
      dispatch(addCartMultiple(list));
      setModalDescription("Sepetinize eklendi");
      setOpen(true);
    };
  };

  const addItemsOnceLaunch = (obj) => {
    const list = Object.values(obj);
    const urunList = [];
    list.map((urun) => {
      if (urun.logo === 'arac') {
        const urunInner = Object.values(urun.urunler);
        urunInner.map((p) => urunList.push(p.no));
      }
    });
    // dispatch(setSelectedItems(urunList));
  };

  useEffect(() => {
    setItems(data);
    if (data) {
      let dataProducts = [];
      Object.values(data).map((products) => {
        const notStock = products.urunler.filter(item => item.stokdurumu !== "0");
        //dataProducts.push(...notStock);
        dispatch(setFullOnItems(true));
      });
      dispatch(setProducts(dataProducts));
    }
  }, []);

  useEffect(() => {
    if (Items && Items && Object.values(Items).length >= 1) {
      addItemsOnceLaunch(Items);
    }
  }, [Items]);

  const resetHandle = () => {
    dispatch(setChangePage(false));
    dispatch(setProducts([]));
    dispatch(setFullOnItems(false));
  };

  return (
    <ProductPageOuter>
      <Modal
        centered={true}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Content>
          <Modal.Description>
            {modalDescription}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Tamam</Button>
        </Modal.Actions>
      </Modal>
      <Flex mb={3} className="main two">
        <Box className="robot-pagetwo" width={[1, 1, 1]}>
          <div className="page-title-page-two">
            <span>2</span>
            UYGUN ÜRÜNLER
          </div>
          <ResetButton onClick={resetHandle}>Yeniden Sorgula</ResetButton>
        </Box>
        <Box className="main-area-two" width={[1, 1, 1]}>
          {Object.values(fixItems).map((data, i) => (
            <ItemsCard
              data={data}
              SelectFunction={SelectFunction}
              FullSelection={FullSelection}
              fullSelected={fullOnItems}
              price={prices}
              key={i}
            />
          ))}
          {fixItems.length === 0 ? (
            <CardTable>
              <NotFindedProduct>Ürün bulunamadı...</NotFindedProduct>
            </CardTable>
          ) : (
            <>
              {allPrices.length !== 0 && (
                <CardTable>
                  <Table>
                    <TableHeader>
                      <tr>
                        <td>Sıra</td>
                        <td>Stok Kodu</td>
                        <td>Ürün Adı</td>
                        <td>Fiyatı</td>
                      </tr>
                    </TableHeader>
                    <TableBody>
                      {Object.values(products).map((item, i) => (
                        <tr key={i}>
                          <td>{1 + i}</td>
                          <td>{item.stok_kodu}</td>
                          <td>{item.urun_adi}</td>
                          <td>{item.fiyat}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="borderTop">Toplam Tutar</td>
                        <td className="borderTop"><b>{`${allPrices.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2)} TL`}</b></td>
                      </tr>
                    </TableBody>
                  </Table>
                </CardTable>
              )}
            </>
          )}
          <Flex className="main-area-two-buttons" style={{marginTop: "15px"}} width={[1, 1, 1]}>
            {/* <Button className="button-second-page" onClick={SetPageFunc}>
              Geri
            </Button> */}
            <Button
              className="button-second-page-getir"
              onClick={addItemsToCart}
              color="orange"
              disabled={products.length < 1}
            >
              Seçilenleri Sepete Ekle
            </Button>
          </Flex>
        </Box>
      </Flex>
    </ProductPageOuter>
  );
}

export default ProductPage;
