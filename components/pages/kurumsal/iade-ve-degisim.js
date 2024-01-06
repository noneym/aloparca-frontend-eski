import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const IadeDegisimPage = styled(Flex)`
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
const IadeDegisim = () => (
  <IadeDegisimPage flexDirection="column">
    <p>
      İade işlemlerinizi Yurtiçi Kargo aracılığı ile yapmanız gerekmektedir. Aksi taktirde iadeniz
      kabul edilmeyecektir.
    </p>
    <p className="mt">
      <strong>İade işlemleri:</strong>
    </p>
    <p>
      Aloparca.com'dan yapacağınız tüm ürünleri neden göstermeksizin 14 iş günü içerisinde aşağıda
      yer alan bilgiler doğrultusunda iade edebilirsiniz.
    </p>
    <ol>
      <li>
        İade etmek için talep ettiğiniz ürünün satın alındığı gibi kusursuz, eksiksiz ve
        kullanılmamış olması gerekmektedir.
      </li>
      <li>
        Motor yağları ve benzeri sıvı ürünlerin iadesi durumunda ürünlerin kapakları açılmamış
        olması gerekmektedir.
      </li>
      <li>
        İade etmek istediğiniz ürünün kutusu ve ambalajı gönderildiği gibi hatasız olması
        gerekmektedir.
      </li>
      <li>Satış faturasının aslı olmadan iade işlemi yapılamaz.</li>
      <li>
        Faturanızın firma adına kesilmesi durumunda, ürün iadesi için iade faturası gerekmektedir.
      </li>
      <li>
        Ödediğiniz bedelin, ileriki alışverişlerinizde kullanabileceğiniz şekilde düzenlemesi
        yapılacaktır.
      </li>
    </ol>
    <p className="mt">
      Yukarıda sözü edilen memnuniyet çerçevesindeki iade işlemleri aşağıdaki durumlarda
      yapılamamaktadır.
    </p>
    <ol>
      <li>Bizim tarafımıza bilgi verilmeden iade işlemi yapılamamaktadır.</li>
      <li>
        Ürünün kutusunda herhangi bir yırtık, ezik, darbe olması durumunda veya ürünün orijinal
        ambalajı olmadığı takdirde, ürünün iadesi yapılamamaktadır.
      </li>
      <li>
        Elektrik malzemelerin deneme-yanılma yöntemiyle kullanılmasını önlemek amacıyla, iadesi
        yapılamamaktadır.
      </li>
      <li>
        Kaporta malzemelerinde, dolandırıcılığı ve sahtekarlığı önlemek amacıyla iade
        yapılamamaktadır.
      </li>
    </ol>
    <p className="mt">
      4822 sayılı kanunla, değişik 4077 sayılı Tüketicinin Korunması hakkındaki kanunda mağazadan
      yapılan alışverişlerde koşulsuz iade yoktur. Mesafeli satış çeşidi olan telefon ve internet
      kanalı ile yapılan satışlarda ise 7 gün içinde cayma hakkı tüketiciye kanunla verilmektedir.
      Mesafeli satışta cayma hakkının kullanılabilmesi Tüketicinin Korunması hakkındaki kanunda
      belirtilen koşulların oluşması gerekir. Aloparca.com gerekli gördüğü durumlarda ayıplı
      olmadığı halde değiştirilmek istenen ve mağazadan satın alınan ürünlerde değişim yapmama
      hakkını saklı tutar.
    </p>
  </IadeDegisimPage>
);
export default IadeDegisim;
