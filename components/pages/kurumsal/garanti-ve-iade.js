import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const GarantiIadePage = styled(Flex)`
  font-size: 15px;
  text-align: justify;
  p {
    line-height: 1.5em;
    &.mt {
      margin-top: 30px;
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
const GarantiIade = () => (
  <GarantiIadePage flexDirection="column">
    <p>
      <strong>İADE ŞARTLARI</strong>
    </p>
    <p>
      Şirketimiz, tüketici haklarını korumakta ve satış sonrası müşteri memnuniyetini en ön planda
      tutmaktadır. Satın aldığınız ürünlerle ilgili yaşayabileceğiniz memnuniyetsizlik, üretim ve
      servis kaynaklı her türlü sorun, titizlikle değerlendirilmekte ve en kısa sürede çözüme
      kavuşturulmaktadır.
    </p>
    <p>
      Ürün iadesi konusunda sizlere daha iyi ve hızlı bir şekilde hizmet verebilmemiz için gerekli
      olan şartları aşağıda bulabilirsiniz; Bunlardan herhangi birinin eksik olması durumunda ürün
      iadesi kabul edilmemektedir.
    </p>
    <p>
      İadelerinizi lütfen <strong>YURTİÇİ KARGO</strong> ile tarafımıza gönderiniz.
    </p>
    <p className="mt">
      <strong>İADE İÇİN İSTEDİKLERİMİZ</strong>
    </p>
    <ul>
      <li>İADE EDİLECEK ÜRÜN</li>
      <li>İADE EDİLECEK ÜRÜNÜN FATURASI (Tüm nüshaları ile birlikte)</li>
    </ul>
    <p className="mt">
      <strong>1. İADE EDİLECEK ÜRÜN</strong>
    </p>
    <ol>
      <li>Kullanılmış veya hasar görmüş ürünlerin iadesi kabul edilmez.</li>
      <li>
        İade edilecek ürünün, 14 gün içerisinde teslim alındığı şekilde, standart aksesuarları ile
        birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.
      </li>
    </ol>
    <p className="mt">
      <strong>2. İADE EDİLECEK ÜRÜNÜN FATURASI</strong>
    </p>
    <ol>
      <li>İade işlemi için ürünün faturasının gönderilmesi gerekmektedir.</li>
      <li>
        İade etmek istediğiniz ürünün faturası şirket adına ise, geri iade ederken şirketinin
        düzenlemiş olduğu faturası ile birlikte göndermesi gerekmektedir. İade faturası kesilmesi
        gerekmektedir.
      </li>
    </ol>
    <p className="mt">
      <strong>DİĞER ŞARTLAR VE İADE KARGO ÜCRETLERİ HAKKINDA</strong>
    </p>
    <ol>
      <li>
        İade etmek istediğiniz ürün/ürünler ayıplı ise <strong>YURTİÇİ KARGO</strong> ile
        gönderildiği taktirde, kargo ücreti firmamız tarafından karşılanmaktadır.
      </li>
      <li>
        Alıcının yanlış ürün alması, değişim istemesi veya keyfi iadelerde kargo ücreti alıcıya
        aittir.
      </li>
      <li>
        İade departmanımıza gelen ürünlerin, iade şartlarına uygun ulaştırılması durumunda ürün
        tutarlarının iadesi, ürünün tarafımıza ulaştığı gün işleme alınacaktır. İadenin hesabınıza
        yansıma süresi, bankanızın inisiyatifindedir. Kredi kartına yapılan iadeler 1-5 gün
        içerisinde hesaba yansımaktadır.
      </li>
      <li>
        Birden fazla ürün satın alınması ve birden fazla ürün iade edilmesi durumunda eğer iskonto
        uygulandıysa iskonto ürün adedine bölünür.İade ettiğiniz ürünlerin iskonto tutarları
        düşülerek iade hesabınıza yansır.Örneğin 4 ürün aldığınızda ve 3 ürünün iadesi
        gerçekleştirdiğinizde; 20 TL iskonto uygulandı ise ürün başına iskonto 5 TL'dir. 3 ürün iade
        edildiğinde 15 TL iskonto da tahsil edilir.Burada 1 ürün alınmış olduğu için kazanılan
        iskonto tutarı 5 TL dir.
      </li>
    </ol>
    <p className="mt">
      <strong>İADE EDİLECEK ÜRÜNÜN GÖNDERİLMESİ</strong>
    </p>
    <p>
      İade edilecek ürün sadece anlaşmalı olduğumuz YURTİÇİ KARGO firması tarafından teslim
      alınabilir. Bunun dışında herhangi bir kargo şirketiyle elimize ulaşan ürünlerin iadesi ve
      ulaşım bedeli kabul edilmeyecektir.
    </p>
    <p>Genel iade şartları aşağıdaki gibidir;</p>
    <ol>
      <li>İadeler mutlak surette orijinal kutu veya ambalajı ile birlikte yapılmalıdır.</li>
      <li>
        Orijinal kutusu/ambalajı bozulmuş (örnek: orijinal kutu üzerine kargo etiketi yapıştırılmış
        ve kargo koli bandı ile bantlanmış ürünler kabul edilmez) tekrar satılabilirlik özelliğini
        kaybetmiş, başka bir müşteri tarafından satın alınamayacak durumda olan ürünlerin iadesi
        kabul edilmemektedir.
      </li>
      <li>
        İade etmek istediğiniz ürün ile birlikte orijinal fatura (sizdeki bütün kopyaları) ve iade
        sebebini içeren bir dilekçe göndermeniz gerekmektedir.
      </li>
      <li>
        İade etmek istediğiniz ürün / ürünler ayıplı ise kargo ücreti firmamız tarafından
        karşılanmaktadır. Bu durumda da anlaşmalı kargolar ile gönderim yapmanız gerekir. Diğer
        durumlarda ise kargo ücreti size aittir.
      </li>
    </ol>
    <p className="mt">
      <strong>SİPARİŞ İPTALİ</strong>
    </p>
    <p>
      Değerli müşterilerimiz yanlış verdiğiniz veya vazgeçtiğiniz siparişlerinizi iptal
      ettirebilirsiniz. İptal ettirme işleminin hızlı bir şekilde gerçekleşmesi için lütfen iletişim
      kısmındaki telefon numaramızı kullanarak irtibata geçiniz. E-posta ile irtibatlarda geçikmeler
      yaşanabilir. Bazen yoğunluktan mailler geç kontrol edilmektedir. Ürünün kargoya verilmiş olma
      ihtimali ortaya çıkmaktadır. İptal işlemlerinde ürün kargoya verilmemişse ücretin tamamı
      işlemi gerçekleştirdiğiniz yöntemle iade edilir. Ürün kargoya verilmişse kargo ücreti veya
      ücretleri kesilerek iadesi yapılır.
    </p>
  </GarantiIadePage>
);
export default GarantiIade;
