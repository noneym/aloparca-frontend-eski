import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const SSSPage = styled(Flex)`
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
const SSS = () => (
  <SSSPage flexDirection="column">
    <p>
      <strong>1. Aloparca online Satış sisteminde nasıl alışveriş yapabilirim?</strong>
    </p>
    <p>
      Sitemiz içerinde satın almak istediğiniz ürünleri "Sepete Ekle" butonuna tıklayarak sepetinize
      ekleyiniz. Ürün eklendiğinde sitemizin sağ üst köşesinde "Ürün sepetinize eklendi" mesajını
      göreceksiniz. Almak istediğiniz farklı bir ürün yok ise alışverişinizi tamamlamak için
      sitemizin sağ üst köşesindeki sepetim linkine tıklayınız.
    </p>
    <p>
      Ekrandan sitemize üye olunuz veya bilgilerinizi girerek alışverişe devam ediniz. Sonraki
      ekrandan teslimatın yapılacağı adres bilgilerinizi giriniz ve "Gönder" butonuna basınız.
      Ardından ödeme ekranından kredi kartı bilgilerinizi girerek alışverişinizi
      tamamlayabilirsiniz. Siparişiniz tamamlandığında size onay e-mail'i gelecektir, aksi durumda
      Çağrı Merkezini arayarak siparişinizi teyit ediniz.
    </p>
    <p className="mt">
      <strong>2. Aloparca Online Satış sistemi şifremi unuttum, ne yapmalıyım?</strong>
    </p>
    <p>
      Üye Girişi adımındaki Şifremi unuttum linkine tıklayarak e-mailinize şifrenizin gönderilmesini
      sağlayabilirsiniz.
    </p>
    <p className="mt">
      <strong>
        3. Aloparca Online Satış sistemine kayıt olduğum e-mail adresimi unuttum, ne yapmalıyım?
      </strong>
    </p>
    <p>Yeni kayıt oluşturmanız gerekmektedir.</p>
    <p className="mt">
      <strong>4. Üye bilgilerimi nasıl güncelleyebilirim?</strong>
    </p>
    <p>Hesabım menüsünden Üyelik Bilgilerim kısmından bilgilerinizi güncelleyebilirsiniz.</p>
    <p className="mt">
      <strong>
        5. Üyelik bilgilerinde T.C. kimlik numarası girme zorunluluğu neden isteniyor?
      </strong>
    </p>
    <p>
      09/08/2006 tarihli, 26274 sayılı Resmi Gazete'de tebliğ edildiği üzere 01/01/2007 tarihinde
      itibaren gerçek kişilere kesilen faturalarda T.C. kimlik numarası yazma zorunluluğu
      getirilmiştir. Kişisel bilgilerinizin güvenliği ile ilgili açıklamalar Gizlilik Politikası
      sayfamızda ayrıntılı yer almaktadır.
    </p>
    <p className="mt">
      <strong>6. Aloparca web sitesi üyeliğinden nasıl çıkabilirim?</strong>
    </p>
    <p>Üyelikten çıkmak için info@aloparca.com'a mail atmanız gerekmektedir.</p>
    <p className="mt">
      <strong>7. Aloparca Online Satış sistemi güvenli midir?</strong>
    </p>
    <p>Web sitemizde SSL güvenlik sertifikası vardır. Bu ödeme sistemi şu anda en güvenlisidir.</p>
    <p className="mt">
      <strong>8. 3D Secure nedir?</strong>
    </p>
    <p>
      Kredi kartınızın farklı bir şifresidir, internetten daha güvenli alışveriş yapabilmeniz için
      kullanılmaktadır. Detaylı bilgi için;{' '}
      <a href="http://bkm.com.tr/faydali-bilgiler/guvenli-internet-alisverisi/" target="_blank">
        http://bkm.com.tr/faydali-bilgiler/guvenli-internet-alisverisi/
      </a>
    </p>
    <p className="mt">
      <strong>9. 3D Secure neden güvenlidir?</strong>
    </p>
    <p>
      3D Secure ile size özel şifre ile alışveriş yaparsınız. Detaylı bilgi için;{' '}
      <a href="http://bkm.com.tr/faydali-bilgiler/guvenli-internet-alisverisi/" target="_blank">
        http://bkm.com.tr/faydali-bilgiler/guvenli-internet-alisverisi/
      </a>
    </p>
    <p className="mt">
      <strong>10. 3D Secure şifresi nasıl tanımlanır?</strong>
    </p>
    <p>
      Eğer daha önce 3D Secure şifreniz yoksa 3D şifresi girilen ekranda bankanız sizi yeni şifre
      almanız için yönlendirecektir.
    </p>
    <p className="mt">
      <strong>11. 3D Secure şifresi tanımlayamıyorum, alışverişe nasıl devam edebilirim?</strong>
    </p>
    <p>
      Sitemizde sizlerin güvenliği için sadece 3D Secure şifresi ile alışveriş yapılmaktadır. 3D
      Secure şifrenizi alma ekranında problem yaşıyorsanız, öncelikle bankanızla görüşerek kontrol
      ediniz. Probleminiz hala devam ediyorsa Çağrı Merkezimizden destek alabilirsiniz.
    </p>
    <p className="mt">
      <strong>12. Kredi kartı ile vadeli alışveriş yaptım iade işlemi nasıl oluyor?</strong>
    </p>
    <p>
      İade talebinizi Aloparca Çağrı Merkezi'nin 0850 333 0686 numaralı telefonunu arayarak
      yapmalısınız. Müşterilerimizin alışveriş sırasında kullandıkları kredi kartına iade işlemi web
      iade koşulları tamamlandıktan sonra firmamız tarafında sipariş numarasına göre anlaşmalı
      bankaya yapılır ve müşterinin mail adresine bilgilendirme gönderilir.
    </p>
    <p className="mt">
      <strong>13. Siparişlerim için Kargo Bedeli ödeyecek miyim?</strong>
    </p>
    <p>Yapacağınız alışverişlerde kargo bedeli tarafınıza aittir.</p>
    <p className="mt">
      <strong>14. Sipariş tamamlandığında ürün bedeli kredi kartına hemen yansıyor mu?</strong>
    </p>
    <p>
      Siparişiniz onaylandığında sipariş bedeli kredi kartınıza hemen ya da ertesi gün (bankalara
      göre değişiklik gösterebilir) yansımaktadır.
    </p>
    <p className="mt">
      <strong>15. Aloparca Online Satış sisteminde sanal kart kullanabiliyor muyum?</strong>
    </p>
    <p>
      3D Secure ödeme şeklinde sanal kart kullanım desteği bankalar tarafından verilmediğinden
      kullanılamamaktadır.
    </p>
    <p className="mt">
      <strong>16. Aloparca Online Satış sisteminde aldığım ürüne KDV ödeyecek miyim?</strong>
    </p>
    <p>Ürünlerimizin fiyatlarına tüm vergiler ve KDV dahildir.</p>
    <p className="mt">
      <strong>17. Aloparca Online Satış sisteminde siparişleri nasıl takip edebilirim?</strong>
    </p>
    <p>
      Üye girişi yaptıktan sonra hesabım menüsünde bulunan siparişlerim adımından takip
      edebilirsiniz.
    </p>
    <p className="mt">
      <strong>18. Aloparca Online Satış sisteminden satılan ürünlerin garanti süresi nedir?</strong>
    </p>
    <p>1-2 yıl arasında değişkenlik göstermektedir.</p>
    <p className="mt">
      <strong>
        19. Aloparca Online Satış sistemin ile aldığım ürün hasarlı çıktı, ne yapmalıyım?
      </strong>
    </p>
    <p>Kargo firmasına tutanak tutturmanız gerekmektedir.</p>
    <p className="mt">
      <strong>
        20. Aloparca Online Satış sistemin ile aldığım ürün yanlış gelirse ne yapmalıyım?
      </strong>
    </p>
    <p>
      Ürünü teslim almadan kargo ile firmamıza geri gönderebilirsiniz. Aloparça en kısa sürede size
      yeni ürünü ulaştıracaktır.
    </p>
    <p className="mt">
      <strong>21. Aloparca Online Satış sisteminde sipariş gönderimi nasıl yapılıyor?</strong>
    </p>
    <p>
      Size en yakın Depomuzdan ürün veya ürünler adınıza fatura edilerek kargo veya servisimiz
      aracılığı ile sizlere teslim edilmektedir.
    </p>
    <p className="mt">
      <strong>
        22. Aloparca Online Satış sisteminde yaşadığım problemler ile ilgili kiminle irtibata
        geçeceğim?
      </strong>
    </p>
    <p>
      Sitemizde yaşadığınız sorunlar için 0850 333 0 686 numaralı telefondan Aloparca Çağrı
      Merkezi'ni arayarak Online Satış destek hattımızdan yardım alabilirsiniz.
    </p>
    <p className="mt">
      <strong>23. Ürünlerimiz hangi kargo firması tarafından teslim edilmektedir?</strong>
    </p>
    <p>Ürünler Yurtiçi Kargo firması tarafından adresinize teslim edilmektedir.</p>
    <p className="mt">
      <strong>
        24. Aloparca Online Satış sistemi hata verdi, alışveriş yapamadım ama kredi kartımdan
        tahsilat yapılmış ne yapacağım?
      </strong>
    </p>
    <p>Hemen 0850 333 0 686 Aloparca Çağrı Merkezi'ni arayıp yardım alınız.</p>
    <p className="mt">
      <strong>25. Teslimat ve fatura adresleri</strong>
    </p>
    <p>
      T.C. kanunlarının gerektirdiği şekilde irsaliye ve irsaliye fatura ile siparişiniz sizin
      girmiş olduğunuz teslimat adresine kargo firması ile gönderilir. Fatura adres bilgileri
      faturalama işleminden sonra değiştirilemeyeceğinden bilgilerinizin doğruluğundan emin olmadan
      siparişi onaylamayınız.
    </p>
    <p className="mt">
      <strong>26. Siparişimi verdim, ürünüm elime ne zaman gelir?</strong>
    </p>
    <p>
      Sipariş verdiğiniz ürüne ve bulundugunu şehre göre teslim alma süreniz 1-2 işgünü arasında
      değişmektedir.
    </p>
  </SSSPage>
);
export default SSS;
