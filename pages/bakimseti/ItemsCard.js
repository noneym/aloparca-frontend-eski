/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import { media } from '../../style/theme';

const ProductCard = styled.div`
  margin-top: 1rem;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  ${media.phoneMini`
    margin-left: -20px;
    margin-right: -20px;
    border-radius: 0;
  `};
`;

const MainPart = styled.div`
  flex: 1;
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
    &:not(:first-of-type) {
      border-bottom: 1px solid lightgrey;
    }
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

const Title = styled.p`
  font-size: 21px;
  margin-bottom: 10px;
  ${media.phoneMini`
    font-size: 17px;
  `};
`;

const ImageFix = styled.div`
  width: 200px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const OnImage = styled.img`
  width: 100%;
`;

const BrandLabel = styled.h1`
  width: 200px;
  height: 200px;
  color:red;
  ${media.tablet`
      display:none;
  `};
`;



// const NormalFullPrice = styled.div`
//   position: absolute;
//   top: -20px;
//   right: 0;
//   background: green;
//   border-bottom-left-radius: 5px;
//   border-bottom-right-radius: 5px;
//   color: white;
//   padding: 3px 15px;
// `;

const ItemsCard = ({ data, SelectFunction, FullSelection, fullSelected, price }) => {
  const totalPrice = price.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2);
  
  const { products } = useSelector(state => state.pratikBakim);
  const oneNo = products.map(item => item.no);
  return (
    <ProductCard>
        {/*<ImageFix>
          <OnImage
            src={
              data.marka === "OEM (Logolu Orjinal)"
                ? `../../static/img/logolar/markalar/marka_fiat.svg`
                : data.marka === "VALEO (Logosuz Orjinal)"
                  ? `https://resize.aloparca.com/upload/w_65/Brand_logos/21.jpg`
                  : "https://resize.aloparca.com/upload/w_65/Brand_logos/30.jpg"
            }
          />
          </ImageFix>*/}
          <BrandLabel>{data.marka_label}</BrandLabel>
        <MainPart>
          {/* <NormalFullPrice>{`${products.toplam_tutar} TL`}</NormalFullPrice> */}
          <Title>{data.marka}</Title>
          <Table>
            <TableHeader>
              <tr>
                <td>
                  {/* <Checkbox
                    className="checkboxselect"
                    onChange={() => FullSelection(products)}
                    checked={checkedFull}
                  /> */}
                </td>
                <td>Stok Kodu</td>
                <td>Ürün Adı</td>
                <td>Fiyatı</td>
              </tr>
            </TableHeader>
            <TableBody>
              {Object.values(data.urunler).map((item, i) => (
                <tr key={i}>
                  <td>
                    <Checkbox
                      className="checkboxselect"
                      onChange={() => SelectFunction(item)}
                      checked={oneNo.includes(item.no)}
                      disabled={item.stokdurumu === "0"}
                    />
                  </td>
                  <td>{item.stok_kodu}</td>
                  <td>{item.urun_adi}</td>
                  {item.stokdurumu === "0" ? (
                    <td><p className="lightRed">TÜKENDİ</p></td>
                  ) : (
                    <td>{item.fiyat}</td>
                  )}
                </tr>
              ))}
              {data.toplam_tutar !== undefined && (
                <tr>
                  <td></td>
                  <td></td>
                  <td className="borderTop">Toplam Tutar</td>
                  <td className="borderTop"><b>{`${data.toplam_tutar} TL`}</b></td>
                </tr>
              )}
            </TableBody>
          </Table>
        </MainPart>
    </ProductCard>
  );
}

export default ItemsCard;
