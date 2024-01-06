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
      <strong>9 Taksit İmkanı</strong>
    </p>
    <p>
      Bonus, World, CardFinans, Axess, Maximum ve Paraf özellikli kredi kartlarıyla, 9 taksitle
      alışveriş yapabilirsiniz.
    </p>
    <p className="mt">
      <strong>Kredi kartıyla alışveriş yaparken güvende miyim?</strong>
    </p>
    <p>
      Aloparça, kredi kartıyla yapacağınız alışverişlerde güvenliğiniz için en son teknolojileri ve
      en iyi servis sağlayıcıları kullanır.
    </p>
    <p>
      Kişisel bilgilerinizi girdiğiniz her sayfada tarayıcınızın altında bir anahtar bulunur. Bu
      anahtar, tarayıcınız aracılığıyla gönderdiğiniz bilgilerin üçüncü şahıslara karşı
      korunacağının güvencesidir. Ayrıca Aloparça'dan yapacağınız tüm alışverişlerde yüksek güvenlik
      standartları geçerlidir. SSL Güvenlik Sertifikası ve 3D Secure servisleri sayesinde
      güvenliğinizi riske atmadan rahatlıkla alışveriş yapabilirsiniz.
    </p>
    <p className="mt">
      <strong>3D Secure nedir?</strong>
    </p>
    <p>
      3D Secure, online alışverişlerin güvenliğini sağlamak amacıyla kart kuruluşları tarafından
      geliştirilmiş bir kimlik doğrulama sistemidir. İnternetten yapılan alışverişlerde, şifre ile
      kredi kartı onaylama işlemi olarak da bilinir. Visa için kullanılan uygulamasına “Verified by
      Visa”, MasterCard için olanına ise “SecureCode” adı verilir.
    </p>
    <p className="mt">
      <strong>Havale/EFT ile ödeme yapabilir miyim?</strong>
    </p>
    <p>Aloparça'da havale/EFT kanalı ile ödeme yapabilirsiniz.</p>
    <ul>
      <li>
        Ödeme ekranında kredi kartı seçeneğinin yanındaki “Havale/EFT” butonuna tıklayın ve açılan
        ekranda size sunulan bankalardan birini seçip hesap numarasını bir yere not edin.
      </li>
      <li>
        Sipariş onay ekranında ödeyeceğiniz tutarı göreceksiniz. Bu tutarı bir yere not edip ürün
        bilgilerinizi kontrol edin.
      </li>
      <li>
        Ekranın en altındaki “Siparişi Onayla” butonuna sadece bir defa tıklayıp işlemi onaylayın.
      </li>
      <li>
        Açılan yeni sayfada size sistem tarafından bir sipariş numarası verilir. Bu numarayı bankaya
        havale/EFT yaparken dekontun açıklama kısmına yazmayı unutmayın.
      </li>
      <li>
        Havale işleminizi ATM’lerden de yapabilirsiniz ancak ATM aracılığıyla yapılan ödemelerde
        sipariş numarası, isim vb. açıklamalar yazılamadığı için sipariş onayında sorun yaşanır. Bu
        tip sorunların yaşanmaması ve siparişinizin kısa sürede onaylanması için ödeme bilgilerinizi
        bize e-posta ile göndermenizi öneririz.
      </li>
      <li>
        Banka hesap numaralarımıza yapılan EFT işlemleri, bankaya ve ödeme yapılan saate göre
        değişkenlik gösterebilir. Öğleden sonra yapılan EFT’ler bir sonraki gün işleme alınır.
      </li>
      <li>
        Havale/EFT işleminiz onaylandığında size e-posta ile bildirilir. Bu mesajı aldığınızda
        siparişiniz hazırlanma aşamasına geçmiş demektir. Ana sayfanın sağ üst köşesindeki “Sipariş
        Takibi” sekmesinden verdiğiniz siparişinizle ilgili bilgilere kolayca ulaşabilirsiniz.
      </li>
    </ul>
  </HelpPage>
);
export default Help;
