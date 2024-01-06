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
      <strong>Aloparça’dan nasıl sipariş verebilirim?</strong>
    </p>
    <p>
      Aloparça’dan üye olarak sipariş verebileceğiniz gibi üye olmadan da sipariş verebilirsiniz.
      Üye olmak için ana sayfadaki “Üye Ol” butonuna tıklamanız yeterli. Üstelik tamamen ücretsiz!
    </p>
    <p>
      Üye olmadan alışveriş yapmayı tercih ederseniz, siparişinizi takip edebilmeniz için e-posta
      adresinizi girmeniz yeterli olacaktır.
    </p>
    <p>Üyelik işlemlerinizi gerçekleştirdikten sonra sipariş oluşturacaksanız;</p>
    <ul>
      <li>Beğendiğiniz ürünü "Sepete Ekle" butonuna tıklayarak alışveriş sepetinize ekleyin.</li>
      <li>
        Ürünlerinizi seçtikten sonra “Alışverişi Tamamla” butonuna tıkladığınızda teslimat bilgileri
        ekranına gelirsiniz. Teslimat ve fatura adresi bilgilerini doldurduktan sonra sayfanın alt
        kısmından kargo seçiminizi yapın.
      </li>
      <li>
        “Devam Et” butonuna bastığınızda ödeme bilgileri ekranına ulaşırsınız. Burada size sunulan
        ödeme tercihlerinden size uygun olanı seçiniz.{' '}
      </li>
      <li>
        Ödeme seçiminizi yaptıktan sonra “Devam Et” butonunu tıklayarak sipariş onay ekranına
        geçebilirsiniz. Ekranın sağ üst tarafında bulunan “Siparişi Onayla” butonuna sadece bir defa
        tıklayarak siparişinizi onaylayabilirsiniz.
      </li>
      <li>
        Açılan yeni sayfada sistem tarafından size verilen sipariş numarasını göreceksiniz.
        Siparişinizi ana sayfanın üst kısmında yer alan "Siparişlerim" alanından veya sağ üst
        köşesinde yer alan "Hesabım" menüsünün hemen altındaki “Siparişlerim” alanından takip
        edebilirsiniz.
      </li>
    </ul>
    <p className="mt">
      <strong>Oluşturduğum siparişe ürün ekleyebilir miyim?</strong>
    </p>
    <p>
      Sipariş verdiyseniz, siparişinize sonradan ürün eklemesi yapılamamaktadır. Siparişinizin
      statüsü uygunsa, mevcut siparişinizi iptal ederek yeni bir sipariş oluşturabilir ya da almak
      istediğiniz diğer ürünü ayrıca sipariş edebilirsiniz.
    </p>
    <p className="mt">
      <strong>"Siparişiniz alındı" uyarısı ne anlama geliyor?</strong>
    </p>
    <p>
      Sipariş verdiğiniz ürün stokta mevcutsa rezervasyonunuz hemen yapılır, faturanız düzenlenir ve
      ürün paketlenerek kargoya verilir. Bu aşamada sipariş ettiğiniz ürünün yanında "Siparişiniz
      hazırlanıyor" yazısını görürsünüz.
    </p>
    <p className="mt">
      <strong>"Siparişiniz hazırlanıyor" uyarısı ne anlama geliyor?</strong>
    </p>
    <p>
      "Sipariş hazırlanıyor" uyarısı, sipariş ettiğiniz ürün tedarik edildikten sonra faturası
      kesilerek kargo firmasına teslim edilene kadar geçen sürede görünen statüdür.
    </p>
    <p className="mt">
      <strong>"Siparişiniz kargoya verildi" uyarısı ne anlama geliyor?</strong>
    </p>
    <p>
      Sipariş verdiğiniz ürün tedarik edilip paketlendikten sonra faturası kesilerek kargo firmasına
      teslim edilir. Siparişiniz kargo sürecindeyken statüsü "Siparişiniz kargoya verildi" olarak
      görünür.
    </p>
    <p className="mt">
      <strong>Siparişimin durumunu nasıl takip edeceğim?</strong>
    </p>
    <p>
      “Hesabım” sayfasındaki “Siparişlerim” bölümünden, siparişinizdeki ürünlere ait statü
      bilgilerine ulaşabilirsiniz.
    </p>
    <p className="mt">
      <strong>Siparişimdeki ürünü değiştirmek istiyorum.</strong>
    </p>
    <p>
      Ödeme işlemleriniz sipariş aşamasında tamamlanır. Bu yüzden ürün değişim işleminde seçtiğiniz
      yeni ürünün fiyatı, siparişinizdeki ürünün fiyatı ile aynı ya da daha düşük tutarda olmalıdır.
      Ürün değişim işlemini ancak siparişiniz "Siparişiniz alındı" statüsündeyken
      gerçekleştirilebilir.
    </p>
    <p className="mt">
      <strong>Siparişimdeki ürünü iptal etmek istiyorum.</strong>
    </p>
    <p>
      Siparişinizdeki ürünlerin tamamı "Siparişiniz Alındı" statüsünde ise siparişinizi online
      olarak iptal edebilirsiniz.
    </p>
    <p className="mt">
      <strong>Kargodaki siparişimi iptal etmek istiyorum.</strong>
    </p>
    <p>
      Siparişinizdeki ürünlerin tamamı "Siparişiniz Alındı" statüsünde ise "Siparişlerim" sekmesini
      kullanarak siparişinizi online olarak iptal edebilirsiniz. Ürününüz kargoda ise kargo
      adresinize geldiğinde ürünü teslim almayarak iade edebilirsiniz.
    </p>
  </HelpPage>
);
export default Help;
