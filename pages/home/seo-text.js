import styled from 'styled-components';
import { border, sp, color, media } from '../../style/theme';

const Outer = styled.div`
  ${border('y')};
  padding: ${sp(3)} 0;
  margin: ${sp(4)} 0;
  color: ${color.gray[1]};
  line-height: 1.4;
  ${media.tablet`
    display: none;
  `};
`;

const SeoText = () => (
  <Outer>
    41 farklı otomobil markası için 180,340'den fazla garantili oto yedek parça çeşidini en iyi
    fiyat avantajı ve en iyi hizmet imkanı ile kapınıza getiriyoruz.Sürdürülebilir teknolojik alt
    yapısı ile günden güne kendini yenileyen aloparca.com 2014 yılından beri müşterilerine hizmet
    vermeye devam ediyor. Her geçen gün sitesine eklediği yenilikler sayesinde aracınıza uyumlu
    parçaları bulabileceğiniz ve motor kontrolünü yapabileceğiniz sistemleri geliştiriyor. Türkiye
    de araç oto parçası aramada online olarak kullanılan sasi programını da müşterileri için
    geliştirdi.İhtiyacınız olan oto yedek parça,madeni yağı,motor katkılarını ve hayatı
    farklılastıran özel tasarımla arabanıza yenilik katan aksesuarları aloparca.com'da kolayca bulup
    güvenli bir şekilde satın alabilirsiniz. Aracınızın bakım montajlarını da özel yetkili
    servislerimizde yaptırabilmeniz mümkün. Online satış işine yeni bir boyut getiren aloparca
    edindiği vizyon sayesinde her geçen gün müşteri sayısını arttırarak tüm Türkiye ye aracınıza
    dair herseyi göndermeye devam etmektedir. Otomobilinizle ilgili hemen hemen her konuda destek
    alabileceğiniz canlı destek ve telefon hattıyla da aloparca.com ‘dan destek alıp oto parça
    alışverişinizi tamamlayabilirsiniz. Keyifli alışverişler dileriz.
  </Outer>
);

export default SeoText;
