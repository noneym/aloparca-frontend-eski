import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { media } from '../../../style/theme';

const KampanyaKosullariPage = styled(Flex)`
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
    img {
      margin-left: 20px;
      ${media.tablet`
        margin-left: 0;
        margin-bottom: 20px;
        display: block;
        width: 100%;
      `};
    }
  }
  ul {
    counter-reset: item;
    li {
      counter-increment: item;
      line-height: 1.5em;
      &::before {
        content: counter(item) '. ';
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
const KampanyaKosullari = () => (
  <KampanyaKosullariPage flexDirection="column">
    <p>
      <strong>Hediye Lira Kampanyası katılım koşulları aşağıdaki gibidir:</strong>
    </p>
      <ul>
        <li>AloParca.com adresinden 23 Kasım 2020 – 01 Ocak 2021 tarihleri arasında yapacağınız ilk 300 TL ve üzeri alışverişleriniz de geçerli olmak üzere 20 TL Hediye Lira Kodu kazanılır</li>
        <li>Hediye Lira Kodu alışveriş esnasında bildirdiğiniz mail adresinize gönderilir, lütfen bu kodu kaybetmeyiniz.</li>
        <li>Kampanya kodu 15 Ocak 2021 - 15 Haziran 2021 tarihleri arasında ve sadece bir kez kullanılabilir.</li>
        <li>Kampanya müşteri bazındadır ve bir müşteri en fazla 20 TL Hediye Lira kazanabilir.</li>
        <li>15 Haziran 2021 tarihine dek kullanılmayan Hediye Lira Kodları iptal olacaktır.</li>
        <li>İlgili tarihler arasında uygulanacak diğer kampanyalar bu kampanya ile birleştirilebilir.</li>
        <li>Kampanya dâhilinde iade ve iptal işlemleri dikkate alınacaktır.</li>
        <li>AloParca.com kampanya koşullarında değişiklik hakkını gizli tutar</li>
      </ul>
  </KampanyaKosullariPage>
);
export default KampanyaKosullari;
