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
      <strong>Ürünümü iade etmek istiyorum, ne yapmalıyım?</strong>
    </p>
    <p>Ürününüz size teslim edildikten sonra 14 gün içinde iade başvurusunda bulunabilirsiniz.</p>
    <p>İade sürecini başlatmak için;</p>
    <p>
      “Hesabım – Siparişlerim” menüsünde yer alan "Kolay İade" butonuna tıklayarak iade talebi açın.
    </p>
    <p>İade koşulları şu şekildedir;</p>
    <p>
      İade edeceğiniz ürün, aksesuarları ve hediye olarak verilen promosyonlu/kampanyalı ürünleriyle
      birlikte aynı anda, orijinal ambalajında iade edilmelidir.
    </p>
    <p>
      İade edeceğiniz ürün kurumsal fatura ile satın alınmışsa yani faturası şirket adına
      kesilmişse, iade ederken şirketinizin düzenlemiş olduğu fatura ile birlikte gönderilmelidir.
      İade faturası, kargo payı dahil edilmeden (ürün birim fiyatı + KDV şeklinde) kesilmelidir.
    </p>
    <p className="mt">
      <strong>Ürünümü iade etmek istiyorum, iade şartları nedir?</strong>
    </p>
    <p>
      Satın aldığınız ürünü, kargodan teslim aldığınız günden itibaren 14 gün içinde Aloparça’ya
      başvurarak aşağıdaki koşullar dahilinde kargo bedeli ödemeden ücretsiz olarak iade
      edebilirsiniz.
    </p>
    <p>
      Ürünlerin cayma hakkı dahilinde iade alınabilmesi için satın alınan ürünün orijinal kutusunda
      ve içinde bulunan ambalajlara zarar verilmemiş olması, faturasının ve tüm tamamlayıcı
      aksesuarlarının yanı sıra varsa hediye olarak verilen promosyonlu, kampanyalı ürünlerle
      birlikte aynı anda hasarsız ve eksiksiz gönderilmesi gerekir.
    </p>
    <p className="mt">
      <strong>14 günlük iade sürem doldu, ürünü iade edebilir miyim?</strong>
    </p>
    <p>
      Yasal süreçler gereği iade işlemleri ürünün size teslim tarihinden itibaren ancak ilk 14 gün
      içinde yapılabilmektedir.
    </p>
    <p>
      Mesafeli satış yönetmeliğinin 12. maddesinin 1. fıkrasına göre satıcı veya sağlayıcı,
      tüketicinin cayma hakkını kullandığına ilişkin bildirimin kendisine ulaştığı tarihten itibaren
      14 gün tüketiciden tahsil edilen tüm ücretleri geri ödemekle yükümlüdür.
    </p>
    <p className="mt">
      <strong>İade ettiğim ürünün parasını ne zaman ve nasıl geri alabilirim?</strong>
    </p>
    <p>
      Gönderdiğiniz ürünlerin bedeli, Aloparça tarafından iade işleminin onaylanmasının ardından 2
      iş günü içinde tarafınıza geri ödenecektir. Ücret iadesi işlemi tamamlandığında size e-posta
      ve cep telefonu mesajı yoluyla bilgi verilir.
    </p>
    <p>
      Ödeme şekli kredi kartı ve tercihiniz para iadesi ise ödemeniz online olarak kredi kartınıza
      iadenizin onaylandığı anda hemen yapılacaktır. Ödemenizin hesabınıza yansıması bankaların
      işlem sürelerine göre farklılık gösterebilir.
    </p>
    <p>
      Ödeme şekli havale/EFT ve tercihiniz para iadesi ise Hesabım bölümünde yer alan kayıtlı IBAN
      hesabınıza geri ödeme yapılacaktır.
    </p>
    <p>
      İade işleminin banka veya kart hesabınıza yansıma süresi ise bankanızın işlem sürecine göre
      değişkenlik gösterebilir.
    </p>
    <p className="mt">
      <strong>Ürünü gönderdim, iadem ne zaman yapılır?</strong>
    </p>
    <p>
      Ürün tarafımıza ulaştıktan sonra iade koşullarına uygunluğu incelenir ve işleminiz 2 iş günü
      içinde sonuçlandırılır. İşlem sürecinizi üyelik girişi yaptıktan sonra sağ üst bölümde bulunan
      "Hesabım" sayfanızda yer alan "Siparişlerim" bölümünden takip edebilirsiniz.
    </p>
    <p className="mt">
      <strong>Kargo kutum boş/hatalı çıktı.</strong>
    </p>
    <p>
      Ürün paketini, siparişiniz size ulaştığında kargo görevlisi yanınızdayken kontrol edin.
      Kargonuzun eksik ya da yanlış gelmesi durumunda kargo görevlisinden tutanak tutmasını isteyin.
    </p>
    <p className="mt">
      <strong>Hasarlı ürün gönderilmiş.</strong>
    </p>
    <p>
      Siparişiniz size ulaştığında, kargo görevlisi yanınızdayken ürün paketini kontrol edin.
      Kargonuzun hasarlı çıkması durumunda kargo görevlisinden tutanak tutmasını istemelisiniz.
      Ürünü, bu tutanak ve doldurmanız gereken "Ürün hasarlı geldi, tutanak ve servis raporu var"
      formu ile birlikte Aloparça'ya geri gönderebilirsiniz.
    </p>
    <p>
      Kargo kaynaklı hasar durumlarında, ilgili işlemlerin gerçekleştirilebilmesi için ürünün bütün
      aksesuarlarının yanında orijinal ambalajını da saklamalısınız.
    </p>
  </HelpPage>
);
export default Help;
