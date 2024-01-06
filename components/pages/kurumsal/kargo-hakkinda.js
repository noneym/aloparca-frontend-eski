import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const KargoHakkindaPage = styled(Flex)`
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
const KargoHakkinda = () => (
  <KargoHakkindaPage flexDirection="column">
    <p>
      <strong>Kargo ve Taşıma Bilgileri</strong>
    </p>
    <p className="mt">
      <strong>Siparişim elime ne zaman ulaşır?</strong>
    </p>
    <p>
      aloparca.com, sitemizden alışveriş yapan siz kredi kartı sahiplerinin güvenliğini ön planda
      tutmakta ve siparişinizi verdiğiniz andan itibaren ödeme / fatura bilgilerinin kontrolünü
      gerçekleştirmektedir. Sipariş onayının, uygun şekilde gerçekleşmesi halinde, siparişler,
      kargoya teslim edildikten sonra istanbul içine en geç 2 iş günü, istanbul dışına en geç 3 iş
      günü içinde ulaştırılacaktır. Kargo şubesi olmayan yerlerde teslimat süresi uzayabilir.
    </p>
    <p className="mt">
      <strong>Hafta sonu Siparişleri</strong>
    </p>
    <p>
      Hafta içi 17:00'den sonra verilen siparişler, ertesi gün, cumartesi 14.00'ten sonra verilen
      siparişler ise pazartesi günü işleme alınır. Pazar günleri kargo teslimatı yapılmamaktadır.
    </p>
    <p className="mt">
      <strong>Stok Sorunları</strong>
    </p>
    <p>
      Verdiğiniz siparişlerde, stoklarımızda nadiren de olsa bulunmayan ürünler yüzünden gecikmeler
      yaşanabilir. Bu gibi durumlarda irtibat telefonlarınızdan veya e-postanızdan mutlaka size
      ulaşılarak haber verilecektir. Size ulaşabilmemiz için lütfen kişisel bilgilerinizi eksiksiz
      doldurunuz.
    </p>
    <p className="mt">
      <strong>Adres Bilgileri</strong>
    </p>
    <p>
      Siparişinizin size en çabuk şekilde ulaşması için lütfen adres bilgilerinizi mümkün olduğu
      kadar açık yazınız. Hatta varsa adresinizin tarif bilgilerini de bu bölüme yazabilirsiniz.
      (Örnek: Postanenin yanından girince üçüncü sokak vs.)
    </p>
    <p className="mt">
      <strong>Kargo Ücretleri</strong>
    </p>
    <p>Kargo ücretini sipariş esnasında sepet tutarınızda görebilirsiniz.</p>
  </KargoHakkindaPage>
);
export default KargoHakkinda;
