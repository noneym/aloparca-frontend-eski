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
      <strong>Aloparça’ya nasıl üye olabilirim?</strong>
    </p>
    <p>Aloparça’ya tamamen ücretsiz olarak hemen şimdi kolayca üye olabilirsiniz.</p>
    <p>
      Sayfanın sağ üstünde yer alan “Üye Girişi/Yeni Üye” sekmesinden "Üye Ol" butonuna tıklayın ve
      açılan sayfadaki üyelik formunu doldurun. Aramıza katıldığınızda kampanyalardan, indirimlerden
      ve daha pek çok fırsattan herkesten önce haberdar olacak, Aloparça’ya üye olmanın ayrıcalığını
      doyasıya yaşayacaksınız.
    </p>
    <p className="mt">
      <strong>"Hesabım" nedir?</strong>
    </p>
    <p>
      “Hesabım” sayfasından siparişlerinizi ve arıza/iade/değişim işlemlerinizi takip edebilir,
      kazandığınız hediye çeklerini görüntüleyebilir, üyelik bilgisi güncelleme, şifre ve adres
      değişikliği gibi hesap ayarlarınızı kolayca yapabilirsiniz.
    </p>
    <p className="mt">
      <strong>"Sepetim" nedir?</strong>
    </p>
    <p>
      “Sepetim” ana sayfanın sağ üst köşesinden kolayca ulaşabileceğiniz, Aloparça'dan alışveriş
      yaparken sıkça kullanacağınız bir ekrandır. Bu ekranda şunları yapabilirsiniz:
    </p>
    <ul>
      <li>
        Ürün sayfalarında gezinirken beğendiğiniz ve “Sepete Ekle” butonuna basarak sepetinize
        eklediğiniz ürünleri görüntüleyebilirsiniz.
      </li>
      <li>
        Seçtiğiniz ürünlerin ve varsa hediyelerinin eklenip eklenmediğini kontrol edebilirsiniz.
      </li>
      <li>
        Almak istediğiniz ürünlerin adetlerini belirleyebilirsiniz. Bunun için tek yapmanız gereken,
        sepetteki ürünlerin hemen sağında yer alan adet kutucuğundan + ve - okları ile adetleri
        çoğaltmak veya azaltmak.
      </li>
      <li>
        Alışveriş sırasında almaktan vazgeçtiğiniz bir ürün olursa, sepetinizde o ürünün altında
        bulunan “Sil” butonuna basarak işleminizi gerçekleştirebilirsiniz.
      </li>
      <li>
        Sepetinizde “İndirim Çeki Kullan” linkine tıklayarak hediye çeklerinizi alışverişlerinizde
        kullanabilirsiniz.
      </li>
      <li>
        Siparişlerinizin KDV dahil toplam fiyatını, ödeyeceğiniz kargo bedeli tutarını ve kullanılan
        çek/promosyon tutarını bu ekranda görebilirsiniz.
      </li>
    </ul>
    <p className="mt">
      <strong>Üyelik bilgilerimi nasıl değiştirebilirim?</strong>
    </p>
    <p>
      Üyelik bilgilerinizi güncellemek için ana sayfanın sağ üst köşesinde bulunan “Hesabım”
      menüsüne girip sırasıyla “Hesap Ayarlarım” - ”Bilgilerimi Güncelle” yönlendirmelerini takip
      edin. “Bilgilerimi Güncelle” sayfasında gerekli değişiklikleri yapıp “Kaydet” butonuna
      tıkladığınızda bilgileriniz güncellenmiş olacaktır.
    </p>
    <p className="mt">
      <strong>Şifremi unuttum, ne yapmalıyım?</strong>
    </p>
    <p>
      “Üye Girişi” sayfasındaki “Şifremi unuttum” yazısına tıklayın. Üye olurken kullandığınız
      e-posta adresinizi ve güvenlik kontrolü için belirtilen karakterleri ilgili kutulara girdikten
      hemen sonra e-posta adresinize bir link gönderilecektir. Gönderilen linki tıklayarak yeni
      şifre oluşturabilir, alışverişe güvenle devam edebilirsiniz.
    </p>
    <p>Ayrıca dilediğiniz zaman “Hesabım” sayfasından şifre değişikliği yapabilirsiniz.</p>
  </HelpPage>
);
export default Help;
