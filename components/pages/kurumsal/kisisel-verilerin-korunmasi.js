import styled from 'styled-components';

const Outer = styled.div`
  font-size: 15px;
  text-align: justify;
  p {
    line-height: 1.5em;
    &.mt {
      margin-top: 30px;
    }
    a {
      color: #3b81b5;
      font-weight: 500;
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
const KisiselVerilerinKorunmasi = () => (
  <Outer>
    <p>
      <strong>KİŞİSEL VERİLERİN İŞLENMESİNE İLİŞKİN BİLGİLENDİRME VE ONAY METNİ</strong>
    </p>
    <p className="mt">
      <strong>1. Bilgilendirme Metni’nin Amacı ve Aloparçanın Veri Sorumlusu Konumu:</strong>
    </p>
    <p>
      Aloparça Oto Yedek Parça Elektronik Hiz. San. ve Dış Tic. Ltd. Şti müşterilere ilişkin kişisel
      veriler bakımından 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında “veri sorumlusu”
      sıfatına sahip olup işbu Bilgilendirme ve Onay Metni ile söz konusu Kanun uyarınca
      müşterilerin Aloparça tarafından gerçekleştirilen kişisel veri işleme faaliyetleri hakkında
      bilgilendirilmesi ve aşağıda 3. maddede belirtilen durumlar için açık onaylarının temini
      hedeflenmektedir.
    </p>
    <p className="mt">
      <strong>2. Müşterilere Ait Kişisel Verilerin İşlenme Amacı:</strong>
    </p>
    <p>
      Müşterilere ait kişisel veriler Aloparça tarafından sunulan ürün ve hizmetlerden ilgili
      kişileri faydalandırmak için gerekli çalışmaların iş birimleri tarafından yapılması ve ilgili
      iş süreçlerinin yürütülmesi, Aloparça tarafından yürütülen ticari faaliyetlerin
      gerçekleştirilmesi için ilgili iş birimleri tarafından gerekli çalışmaların yapılması ve buna
      bağlı iş süreçlerinin yürütülmesi, Aloparça’nın ticari ve/veya iş stratejilerinin planlanması
      ve uygulanması, Aloparça’nın ve Aloparça ile iş ilişkisi içerisinde olan ilgili kişilerin
      hukuki, teknik ve ticari-iş güvenliğinin temini ile Aloparça’nın sunduğu ürün ve hizmetlerin
      ilgili kişilerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek ilgili
      kişilere önerilmesi ve tanıtılması için gerekli olan aktivitelerin planlanması ve uygulanması
      da dahil olmak üzere Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve
      amaçları çerçevesinde işlenmektedir. Aloparça tarafından kişisel verilerin işlenmesine ilişkin
      detaylı bilgilere https://www.aloparca.com/ adresinde yer alan Aloparça Tarafından 6698 sayılı
      Kanun Kapsamında{' '}
      <a
        href="https://www.aloparca.com/KVK_islenmesiPolitikasi_12032018.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kişisel Verilerin İşlenmesi ve Korunmasına İlişkin Politika
      </a>
      ’dan ulaşılabilecektir.
    </p>
    <p className="mt">
      <strong>
        3. Müşterilerin Açık Onayı Doğrultusunda İşlenecek Kişisel Veriler ve İşleme Amaçları:
      </strong>
    </p>
    <p>
      Kanun’un 5/2 ile 6/3 maddesinde yer alan kişisel veri işleme şartlarının karşılanamadığı
      aşağıdaki durumlar için Aloparça tarafından kişisel verilerin işlenebilmesi için müşterilerin
      açık onayının alınması gerekmektedir.
    </p>
    <p>
      Bu kapsamda müşterilerin kişisel verileri; müşterilere yönelik kampanyaların oluşturulması,
      çapraz satış yapılması, hedef kitle belirlenmesi, Müşteri hareketlerinin takip edilerek
      kullanıcı deneyimini arttırıcı faaliyetlerin yürütülmesi ve Aloparça’ya ait internet sitesi
      ile mobil uygulamanın işleyişinin geliştirilmesi ve Müşteri ihtiyaçlarına göre
      kişiselleştirilmesi, doğrudan ve doğrudan olmayan pazarlama, kişiye özel pazarlama ve yeniden
      pazarlama faaliyetlerinin yürütülmesi, kişiye özel segmentasyon, hedefleme, pazar
      araştırmaları, analiz ve şirket içi raporlama faaliyetlerinin yürütülmesi, müşteri memnuniyeti
      aktivitelerinin planlanması ve uygulanması ile müşteri ilişkileri yönetimi süreçlerinin
      planlanması ve uygulanması amaçlarıyla dahil olmak üzere Aloparça’nın ürün ve/veya
      hizmetlerinin satış ve pazarlama süreçlerinin planlanması ve uygulanması, Aloparça’nın sunduğu
      ürün ve/veya hizmetlere bağlılık oluşturulması ve/veya arttırılması süreçlerinin planlanması
      ve icrası kapsamında Müşteri’nin vereceği onayı doğrultusunda işlenebilecek ve işbu
      Bilgilendirme ve Onay Metni’nde belirtilen taraflarla paylaşılabilecektir.
    </p>
    <p className="mt">
      <strong>4. Müşterilere Ait Kişisel Verilerin Aktarımı:</strong>
    </p>
    <p>
      Müşterilere ait kişisel veriler, Aloparça tarafından sunulan ürün ve hizmetlerden ilgili
      kişileri faydalandırmak için gerekli çalışmaların iş birimleri tarafından yapılması ve ilgili
      iş süreçlerinin yürütülmesi, Aloparça tarafından yürütülen ticari faaliyetlerin
      gerçekleştirilmesi için ilgili iş birimleri tarafından gerekli çalışmaların yapılması ve buna
      bağlı iş süreçlerinin yürütülmesi, Aloparça’nın ticari ve/veya iş stratejilerinin planlanması
      ve uygulanması, Aloparça’nın ve Aloparça ile iş ilişkisi içerisinde olan ilgili kişilerin
      hukuki, teknik ve ticari-iş güvenliğinin temini ile Aloparça’nın sunduğu ürün ve hizmetlerin
      ilgili kişilerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek ilgili
      kişilere önerilmesi ve tanıtılması için gerekli olan aktivitelerin planlanması ve icrası da
      dahil olmak üzere Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve
      amaçları çerçevesinde Aloparça Şirketi, Şirket yetkilileri, iştiraklerimiz, iş ortaklarımız,
      tedarikçilerimiz, hissedarlarımız, kanunen yetkili kamu kurum ve kuruluşları ile özel kurumlar
      ile paylaşılabilecektir.
    </p>
    <p className="mt">
      <strong>5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Nedeni:</strong>
    </p>
    <p>
      Kişisel veriler, müşterilerden elektronik ortamda toplanmaktadır. Yukarıda belirtilen hukuki
      ndenlerle toplanan kişisel veriler Kanun’un 5. ve 6. maddelerinde ve bu Bilgilendirme ve Onay
      Metni’nde belirtilen amaçlarla işlenebilmekte ve aktarılabilmektedir.
    </p>
    <p className="mt">
      <strong>6. Kişisel Veri Sahibi Olarak Müşterilerin Hakları:</strong>
    </p>
    <p>
      Kanun’un 11. maddesi uyarınca veri sahipleri; kendileri ile ilgili kişisel veri işlenip
      işlenmediğini öğrenme, kişisel verileri işlenmişse buna ilişkin bilgi talep etme, kişisel
      verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt
      içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme, kişisel
      verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu
      kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
      Kanun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini
      gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya ortadan
      kaldırılmasını isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü
      kişilere bildirilmesini isteme, işlenen verilerin özellikle otomatik sistemler aracılığıyla
      analiz edilmesi yoluyla kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme ve
      (viii) kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde
      zararın giderilmesini talep etme haklarına sahiptir.
    </p>
    <p>
      Söz konusu hakların kullanımına ilişkin talepler, kişisel veri sahipleri tarafından
      https://www.aloparca.com/ adresinde yer alan{' '}
      <a href="/static/kvk/kvk.pdf" target="_blank" rel="noopener noreferrer">
        Aloparça Tarafından 6698 sayılı Kanun Kapsamında Kişisel Verilerin İşlenmesi ve Korunmasına
        ilişkin Politika
      </a>
      ’da belirtilen yöntemlerle iletilebilecektir. Aloparça, söz konusu talepleri değerlendirerek
      30 gün içerisinde sonuçlandıracaktır. Aloparça’nın taleplere ilişkin olarak Kişisel Verileri
      Koruma Kurulu tarafından belirlenen (varsa) ücret tarifesi üzerinden ücret talep etme hakkı
      saklıdır.
    </p>
  </Outer>
);
export default KisiselVerilerinKorunmasi;
