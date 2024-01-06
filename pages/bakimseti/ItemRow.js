/* eslint-disable quotes */
import React from "react";
import styled from "styled-components";
import { media } from "../../style/theme";

const Itemrow = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px #efefef solid;
  width: 100%;
  b {
    margin-right: 0.2rem;
  }
  ${media.phone`
    flex-direction: column;
  `}
  span {
      width: 25%;
      ${media.phone`
      width: unset;
  `}
  }
`;

function ItemRow({ item }) {
  return (
    <Itemrow>
      <span>
        <b>Ürün Adı: </b>
        {item.urun_adi}
      </span>
      <span>
        <b>Stok Kodu: </b>
        {item.stok_kodu}
      </span>
      <span>
        <b>Fiyat: </b>
        {item.fiyat} TL
      </span>
      <span>
        <b>Ürün No: </b>
        {item.no}
      </span>
    </Itemrow>
  );
}

export default ItemRow;
