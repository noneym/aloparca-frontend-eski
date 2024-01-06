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
      <strong>Bulunduğum adrese kargo teslimatı yapılıyor mu?</strong>
    </p>
    <p>
      Anlaşmalı olduğumuz kargo firmaları Türkiye'nin her bölgesine teslimat yapıyor ancak bazı özel
      bölgeler için teslimat günü ya da şekli değişkenlik gösterebilir.
    </p>
    <p className="mt">
      <strong>Siparişimdeki ürünlerin kargo takip numarasına nasıl ulaşabilirim?</strong>
    </p>
    <p>
      Aloparça'ya üye girişi yaptıktan sonra sırasıyla "Hesabım - Siparişlerim - Sipariş Takibi"
      adımlarını izleyerek kargo takip bilgilerinize ulaşabilirsiniz.
    </p>
    <p className="mt">
      <strong>Siparişim bana ne zaman teslim edilir?</strong>
    </p>
    <p>
      Siparişiniz onaylandıktan sonra ürününüzün hazırlanması ve faturalama işlemlerinin
      yapılmasının ardından siparişiniz kargo firmasına teslim edilir. Siparişiniz kargoya teslim
      edildikten sonra ürünlerinizin teslimat süresi, teslimatın yapılacağı adrese ve kargo
      firmasının teslimat hızına göre değişkenlik gösterebilir. Detaylı bilgiyi ilgili kargo
      firmasından alabilirsiniz.
    </p>
    <p>
      Siparişinizin teslimatını yapacak kargo firmasının bilgisine sırasıyla "Hesabım - Siparişlerim
      - Sipariş Detayı" sayfasından ulaşabilirsiniz.
    </p>
    <p className="mt">
      <strong>Teslimat sırasında nelere dikkat etmeliyim?</strong>
    </p>
    <p>
      Aloparça’dan verdiğiniz siparişler adresinize teslim edildiğinde kargo teslim fişini
      imzaladıktan sonra, kargo ambalajında sorun olmasa bile, kargo paketini açıp kontrol etmenizi
      öneririz. Paket içeriğinde herhangi bir yanlışlık varsa ya da ürünler hasar görmüşse kargo
      görevlisine hasar tespit tutanağı hazırlatıp bizimle iletişime geçmelisiniz.
    </p>
    <p className="mt">
      <strong>Kargo teslimat adresinde beni bulamazsa ne olur?</strong>
    </p>
    <p>
      Çalıştığımız kargo firmaları eğer teslimat adresinde kimseye ulaşamazsa kapıya bir pusula
      bırakır. Bu pusula üzerinde size teslimat yapan kargo şubesinin adres ve telefonları bulunur.
      Kargo şubesi kolinizi 3 gün boyunca bekletir ve size ulaşamadığı takdirde siparişinizi geri
      gönderir.
    </p>
    <p>
      Adresinizde bulunmadığınız için kargonuzu teslim alamadığınızda, kargo şubenize pusuladaki
      bilgiler doğrultusunda ulaşabilir ve teslimatla ilgili ayrıntılı bilgi alabilirsiniz.
    </p>
    <p className="mt">
      <strong>Kargomu şubeden teslim almak istiyorum.</strong>
    </p>
    <p>
      Sipariş sahibinin güvenliğini sağlamak amacıyla kargo firmalarımızla yapılan anlaşmamız
      gereği, kargo şubelerinden teslimat yapılmamaktadır. Ürünlerin teslimatı sipariş aşamasında
      belirttiğiniz adrese yapılır. Sipariş oluşturma aşamasında kargo şubesi teslimatı bilgisi
      verdiyseniz siparişiniz size gönderilemeyecektir.
    </p>
  </HelpPage>
);
export default Help;
