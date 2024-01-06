import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const HelpPage = styled(Flex)`
  font-size: 15px;
  text-align: justify;
  p {
    line-height: 1.5em;
    &.mt {
      margin-top: 20px;
    }
    strong {
      font-size: 17px;
    }
  }
  ul {
    list-style: disc;
    padding-left: 30px;
    li {
      line-height: 1.5em;
      &::before {
        font-weight: 600;
      }
      & + li {
        margin-top: 10px;
      }
    }
  }
  ol {
    list-style-type: lower-latin;
    margin: 0;
    li {
      line-height: 1.5em;
      & + li {
        margin-top: 10px;
      }
    }
  }
`;
const Help = () => (
  <HelpPage flexDirection="column">
    <p>
      <strong>Ürün stokta var mı?</strong>
    </p>
    <p>Aloparça'da yayınlanan ürünler stoklarımızdan sipariş sonrası kargoya verilir.</p>
    <p className="mt">
      <strong>Ürünün KDV dahil net fiyatı nedir?</strong>
    </p>
    <p>Aloparça'da ürün sayfalarında yer alan fiyatlar, KDV dahil net fiyatlardır.</p>
  </HelpPage>
);
export default Help;
