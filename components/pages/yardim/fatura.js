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
      <strong>Faturam nasıl ve ne zaman gönderilir?</strong>
    </p>
    <p>Faturanız, sipariş oluşturma aşamasında yaptığınız tercihe göre gönderilir.</p>
    <p>
      Sipariş aşamasında faturanızın ürünle birlikte gönderilmesini istediyseniz kargo paketi
      üzerinde şeffaf bir poşet içinde faturanız yer alacaktır.
    </p>
    <p>
      Faturanızın siparişinizden ayrı olarak gönderilmesini istediyseniz, teslimat yapıldıktan sonra
      7 gün içerisinde gönderilecektir.
    </p>
    <p className="mt">
      <strong>Faturam koli dışında görünecek mi?</strong>
    </p>
    <p>
      Mali zorunluluklar nedeniyle her türlü ürünün faturası okunaklı bir biçimde kolinin dış
      yüzeyinde, içinde yer alan ürünleri belirtecek şekilde sergilenir.
    </p>
    <p className="mt">
      <strong>Faturam gelmedi.</strong>
    </p>
    <p>
      Sipariş oluşturma aşamasında faturayı üründen ayrı talep ettiyseniz faturanız ürün teslimatını
      takiben 7-10 iş günü içerisinde posta olarak gönderilir.
    </p>
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
