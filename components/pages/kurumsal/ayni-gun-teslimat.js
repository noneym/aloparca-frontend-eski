import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { media } from '../../../style/theme';

const AyniGunTeslimatPage = styled(Flex)`
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
    img {
      margin-left: 20px;
      ${media.tablet`
        margin-left: 0;
        margin-bottom: 20px;
        display: block;
        width: 100%;
      `};
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
const AyniGunTeslimat = () => (
  <AyniGunTeslimatPage flexDirection="column">
    <p>
      <strong>Koşullar:</strong>
    </p>
    <p>
      17.00’dan ertesi gün 14.00 saatleri arasında verilen siparişler, 12.00 - 23.00 saatleri
      arasında teslim edilir. 17.00’den ertesi gün 09.30’a kadar verilen siparişler ise seçiminize
      göre 12.00 - 18.00 veya 18.00 - 23.00 saatleri arasında teslim edilir.
      <br />
      <br />
      Aynı Gün Teslimat seçeneği; Ataşehir, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Bayrampaşa,
      Beşiktaş, Beykoz, Beylikdüzü, Beyoğlu, Çekmeköy, Esenler, Esenyurt, Eyüp, Fatih, Güngören,
      Kadıköy, Kâğıthane, Kartal, Küçükçekmece, Maltepe, Pendik, Sancaktepe, Sarıyer, Sultanbeyli,
      Şişli, Tuzla, Ümraniye, Üsküdar, Zeytinburnu, Gaziosmanpaşa, Sultangazi ilçelerinde
      geçerlidir.
      <br />
      <br />
      İstanbul haricine ve İstanbul’daki belirlenmiş ilçeler dışına yapılacak teslimatlarda Aynı Gün
      Teslimat seçeneği geçerli değildir. Bu ilçeler dışında farklı bir adres seçilirse, ürün
      kargoya verilir ve standart kargo hizmeti uygulanır.
    </p>
    <p>
      Aynı Gün Teslimat seçeneği, özel bir hizmet olup sipariş gönderim bedeli KDV dâhil 45,90
      TL’dir.
    </p>
    <p>
      Aynı Gün Teslimat ile vermiş olduğunuz siparişler, güvenliğiniz için öncelikli olarak kontrol
      sürecine dâhil olur. Herhangi bir olumsuzluk durumunda tarafınıza bilgi verilir. Siparişinizin
      gönderimi, söz konusu olumsuzluk giderildikten sonra yapılır.
    </p>
    <p>
      Müşterilerin, ilgili saat dilimlerinde teslimat adreslerinde mutlaka bulunması gerekmektedir.
      Adreste bulunmayan müşterilerin ürünleri, standart kargo hizmetiyle sonraki iş günü kargoya
      verilir.
    </p>
    <p>
      aloparca.com, olumsuz hava şartları, yoğun trafik gibi durumlarda; müşteriyle mutabık
      kalındıktan sonra teslimatı bir sonraki güne erteleme hakkını saklı tutar.
    </p>
    <p>
      Yukarıda belirtilen tarihlerde Aynı Gün Teslimat hizmeti kapsamında vereceğiniz siparişlerde
      tüm soru ve sorunlarınız için, 0850 333 0 686 numaralı çağrı merkezimizden 09.00 - 18.00
      saatleri arasında bize ulaşabilirsiniz.
    </p>
    <p>Adres değişikliği yapıldığı takdirde, bir sonraki gün teslim etme hakkı saklı tutulur.</p>
    <p>
      Aynı Gün Teslimat ile teslim edilen ürünlerde, müşteri ürünü iade etmek isterse bu geri dönüş
      Yurtiçi kargo ile sağlanır.
    </p>
    <p>Aynı Gün Teslimat seçeneği ile, Pazar günleri hariç her gün teslimat gerçekleştirilir.</p>
  </AyniGunTeslimatPage>
);
export default AyniGunTeslimat;
