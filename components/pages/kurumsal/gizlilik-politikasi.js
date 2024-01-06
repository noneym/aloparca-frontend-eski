import styled from 'styled-components';

const GizlilikPolitikasiPage = styled.div`
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
      margin: 20px 0;
      counter-increment: item;
      line-height: 1.5em;
      &::before {
        content: counter(item) '. ';
        font-weight: 600;
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
const GizlilikPolitikasi = () => (
  <GizlilikPolitikasiPage>
    <p>
      <strong>Gizlilik Politikası:</strong>
    </p>
    <p>
      Aloparça Oto Yedek Parça Elektronik Hiz. San. ve Dış Tic. Ltd. Şti .{' '}
      <strong>(Aloparca.com)</strong> olarak, sitemizi kullanan üye ve ziyaretçilerimizin
      gizliliğini korumak için çalışıyoruz. Bu amaçla, AloparçaGizlilik Politikası{' '}
      <strong>(Politika)</strong>, üyelerimizin kişisel verilerinin 6698 sayılı Kişisel Verilerin
      Korunması Kanunu <strong>(Kanun)</strong> ile tamamen uyumlu bir şekilde işlenmesi ve
      kullanıcılarımızı bu konuda bilgilendirmek amacıyla hazırlanmıştır. Aloparça çerez politikası
      bu Politika’nın ayrılmaz parçasıdır.
    </p>
    <p>
      İşbu Politika’nın amacı, Aloparça’ın internet sitesi www.aloparca.com ile mobil uygulamasının
      (ikisi birlikte “Platform” olarak anılacaktır) işletilmesi sırasında Platform
      üyeleri/ziyaretçileri/kullanıcıları <strong>(Veri Sahibi)</strong> tarafından Aloparça ile
      paylaşılan veya Aloparça’nın, Veri Sahibi’nin Platform’u kullanımı sırasında ürettiği kişisel
      verilerin kullanımına ilişkin koşul ve şartları tespit etmektir.
    </p>
    <p className="mt">
      <strong>Hangi Veriler İşlenmektedir?</strong>
    </p>
    <p>
      Kimlik, İletişim, Taşıt, Kullanıcı İşlem, Ses Kayıtları, Finansal ve Talep/Şikayet Yönetimi
      Bilgileri.
    </p>
    <p className="mt">
      <strong>Kişisel Veri İşleme Amaçları</strong>
    </p>
    <p>
      Internet sitemizi kullandıgınızda, çağrı merkezimizi aradığınızda veya şirketimizin
      düzenlediği eğitim, seminer ya da organizasyonlara katıldığınızda kişisel verileriniz
      işlenebilecektir.
    </p>
    <p>
      Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri
      faydalandırmak için gerekli çalışmaların yapılması, sunduğumuz ürün ve hizmetlerin sizlerin
      beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi,
      Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari
      güvenliğinin temini (Şirketimiz tarafından yürütülen iletişime yönelik idari operasyonlar,
      Şirkete ait lokasyonların fiziksel güvenliğini ve denetimini sağlamak, Topluluk Şirketleri
      müşterileri değerlendirme/şikayet yönetimi süreçleri, itibar araştırma süreçleri, etkinlik
      yönetimi, hukuki uyum süreci, denetim, mali işler v.b.), Şirketimizin ticari ve iş
      stratejilerinin belirlenmesi ve uygulanması ve Şirketimizin insan kaynakları politikalarının
      yürütülmesinin temini amaçlarıyla KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri
      işleme şartları ve amaçları dahilinde işlenecektir.
    </p>
    <p>
      Veri Sahibi’nin açık rızası kapsamında, Aloparça, Veri Sahipleri’nin Platform üzerindeki
      hareketlerini değerlendirerek kullanıcı deneyiminin arttırılması ile kullanıcıya özel
      promosyon önerilerinin oluşturulması, profilleme yapılması, doğrudan pazarlama ve yeniden
      pazarlama, ve Veri Sahibi’ne iletilmesi ve bu kapsamda elde edilen verilerin her türlü reklam
      ve materyal içeriğinde kullanılması amacıyla veri işleyebilecek ve aşağıda belirtilen
      taraflarla bu verileri paylaşabilecektir.
    </p>
    <p className="mt">
      <strong>Kişisel Verilerin Aktarımı:</strong>
    </p>
    <p>
      Aloparça, Veri Sahibi’ne ait kişisel verileri ve bu kişisel verileri kullanılarak elde ettiği
      yeni verileri, Gizlilik Politikası ile belirlenen amaçların gerçekleştirilebilmesi için
      Aloparça’nın hizmetlerinden faydalandığı üçüncü kişilere, söz konusu hizmetlerin temini
      amacıyla sınırlı olmak üzere aktarılabilecektir. Aloparça, Veri Sahibi deneyiminin
      geliştirilmesi (iyileştirme ve kişiselleştirme dâhil), Veri Sahibi’nin güvenliğini sağlamak,
      hileli ya da izinsiz kullanımları tespit etmek, operasyonel değerlendirme araştırılması,
      Platform hizmetlerine ilişkin hataların giderilmesi ve işbu Gizlilik Politikası’nda yer alan
      amaçlardan herhangi birisini gerçekleştirebilmek için SMS gönderimi yapanlar da dahil olmak
      üzere dış kaynak hizmet sağlayıcıları, barındırma hizmet sağlayıcıları (hosting servisleri),
      hukuk büroları, araştırma şirketleri, çağrı merkezleri gibi üçüncü kişiler ile
      paylaşabilecektir.
    </p>
    <p>
      Kişisel veriler, Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve
      amaçları çerçevesinde Aloparça Şirketi, Şirket yetkilileri, hissedarları, iş ortaklarımız,
      tedarikçilerimiz, kanunen yetkili kamu kurum ve kuruluşları ile kanunen yetkili özel kurumlar
      ile paylaşılabilecek, bu amaçlarla sınırlı olarak Kanun’da işaret edilen usul esaslar ile
      Kişisel Verileri Koruma Kurulu kararları çerçevesinde yurt dışına aktarılabilecektir.
    </p>
    <p className="mt">
      <strong>Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi:</strong>
    </p>
    <p>
      Kişisel veriler, Platform üzerinden ve elektronik ortamda toplanmaktadır. Yukarıda belirtilen
      hukuki sebeplerle toplanan kişisel veriler 6698 sayılı Kanun’un 5. ve 6. maddelerinde ve bu
      Gizlilik Politikası’nda belirtilen amaçlarla işlenebilmekte ve aktarılabilmektedir.
    </p>
    <p className="mt">
      <strong>Kişisel Veri Sahibinin Hakları:</strong>
    </p>
    <p>Kanun’un 11. maddesi uyarınca veri sahipleri;</p>
    <ul>
      <li>Kişisel veri işlenip işlenmediğini öğrenme ,işlenmişse buna ilişkin bilgi talep etme,</li>
      <li>
        Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını
        öğrenme,
      </li>
      <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
      <li>
        Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,
      </li>
      <li>
        7 nci maddede öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok
        edilmesini isteme,
      </li>
      <li>
        (d) ve (e) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü
        kişilere bildirilmesini isteme,
      </li>
      <li>
        İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle
        kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
      </li>
      <li>
        Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın
        giderilmesini talep etme haklarına sahiptir.
      </li>
    </ul>
    <p className="mt">
      <strong>Çerez Politikası:</strong>
    </p>
    <p>
      Aloparça Oto Yedek Parça Elektronik Hiz. San. ve Dış Tic. Ltd. Şti .{' '}
      <strong>(Aloparca.com)</strong> olarak, kullanıcılarımızın hizmetlerimizden güvenli ve
      eksiksiz şekilde faydalanmalarını sağlamak amacıyla sitemizi kullanan kişilerin gizliliğini
      korumak için çalışıyoruz.
    </p>
    <p>
      Çoğu web sitesinde olduğu gibi, Aloparca.com <strong>(Site)</strong> ile mobil uygulamanın
      (hepsi birlikte Platform olarak anılacaktır) ziyaretçilere kişisel içerik ve reklamlar
      göstermek, site içinde analitik faaliyetler gerçekleştirmek ve ziyaretçi kullanım
      alışkanlıklarını takip etmek amacıyla Çerezler kullanılmaktadır.
    </p>
    <p>İşbu Çerez Politakası Aloparca.com Gizlilik Politikası’nın ayrılmaz bir parçasıdır.</p>
    <p>
      Aloparça, bu Çerez Politikası’nı <strong>(Politika)</strong> Site’de hangi Çerezlerin
      kullanıldığını ve kullanıcıların bu konudaki tercihlerini nasıl yönetebileceğini açıklamak
      amacıyla hazırlamıştır. Aloparça tarafından kişisel verilerinizin işlenmesine ilişkin daha
      detaylı bilgi için Aloparça.com <strong>Gizlilik Politikası</strong>’nı incelemenizi tavsiye
      ederiz.
    </p>
    <p className="mt">
      <strong>Çerez (“Cookie”) Nedir?</strong>
    </p>
    <p>
      Çerez, bir siteyi ziyaret ettiğinizde sitenin bilgisayarınıza veya mobil cihazınıza kaydettiği
      küçük boyutlu bir metin dosyasıdır. Çerezler bir web sitesinin çalışması veya daha verimli
      çalışması veya web sitesinin sahiplerine bilgi sağlamak için yaygın olarak kullanılmaktadır.
    </p>
    <p className="mt">
      <strong>Çerezlerin Kullanım Nedenleri:</strong>
    </p>
    <ol>
      <li>
        Aloparca.com’a ziyaretiniz sırasında gezinti ve kullanım tercihlerinizi hatırlamak (örn.
        görüntüleme dili vb.),{' '}
      </li>
      <li>
        Aloparca.com’u çeşitli özelliklerinin ve işlevlerinin düzgün bir şekilde çalışmasını
        sağlamak (örn. oturumunuzu açık tutmak, dinamik içeriği yerleştirmek vb.);
      </li>
      <li>Aloparca.com’u tercihlerinize göre özelleştirmek,</li>
      <li>
        Aloparca.com’u ziyaret eden kullanıcılarımız tarafından nasıl kullanıldığı hakkında en çok
        tıklanan bağlantılar, en çok ziyaret edilen sayfalar, görüntülenen hata mesajı sayısı gibi,
        şahsa özel olmayan, genel bilgiler toplamak ve bu bilgileri analiz ederek hatalı sayfaları
        işler hale getirmek, web sitemizi geliştirmek, tercih edilmeyen sayfaları kaldırmak veya
        iyileştirmek.
      </li>
    </ol>
    <p className="mt">
      Çerezler üzerinden topladığımız veriler, kimliğinizin belirlenmesi, şahsınıza özel profilleme
      ve hedefleme yapılması veya web sitemiz haricindeki internet faaliyetlerinizin takibi amacıyla{' '}
      <strong>kullanılmamaktadır</strong>. Çerezler bu Politika’da belirtilen amaçlar dışında
      kullanılmamakta olup tüm ilgili işlemler veri koruma mevzuatına uygun olarak yürütülmektedir.
    </p>
    <p className="mt">
      <strong>Çerez Tercihlerinin Yönetimi:</strong>
    </p>
    <p>
      Web tarayıcıları genellikle çerezleri otomatik olarak kabul etmektedir. Web sitemizi
      kullanabilmek için çerez kullanımı zorunlu değildir, fakat tarayıcınızı çerezleri kabul
      etmemeye ayarlamanız halinde kullanıcı deneyiminizin kalitesi düşebilir ve sitelerimizin
      çeşitli işlevleri bozulabilir.
    </p>
    <p>
      Tarayıcınızı; çerezleri tüm siteler veya belirli siteler için engelleyecek şekilde, çerez
      oluşturulduğunda uyarı verecek şekilde, üçüncü taraf çerezleri engelleyecek şekilde veya tüm
      çerezleri oturum çerezi gibi sayacak şekilde yapılandırabilirsiniz. Ek olarak, tarayıcınız
      üzerinden çerezleri silebilir veya tarayıcınızda saklanan çerezlerin listesini ve değerlerini
      görebilirsiniz. Tarayıcınızın çerez yönetimi işlevleri hakkında detaylı bilgi için lütfen
      aşağıdaki ilgili linke tıklayarak tarayıcınızın web sitesinden bilgi alınız.
    </p>
    <p>
      Çerezler, ziyaretçilere ilişkin isim, cinsiyet veya adres gibi kişisel verileri içermezler.
      Çerezler konusunda daha detaylı bilgi için{' '}
      <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">
        www.aboutcookies.org
      </a>{' '}
      ve{' '}
      <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
        www.allaboutcookies.org
      </a>{' '}
      adreslerini ziyaret edebilirisiniz.
    </p>
    <p className="mt">
      <strong>Ziyaretçilerimizin Hakları:</strong>
    </p>
    <p>
      6698 Sayılı Kişisel Verilerin Korunması Kanunu’nun 11. maddesi uyarınca ziyaretçiler,
      Aloparça’ya başvurarak,
    </p>
    <ol>
      <li>Kişisel verilerinin işlenip işlenmediğini öğrenme ve işlenmeze bilgi talep etme,</li>
      <li>
        Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını
        öğrenme,
      </li>
      <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
      <li>
        Kişisel verilerin eksik veya yanlış işlenmiş olması durumunda verilerin düzeltilmesini ve bu
        kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini talep
        etme,
      </li>
      <li>
        Kanun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini
        gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok
        edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü
        kişilere bildirilmesini isteme,
      </li>
      <li>
        İşlenen verilerin özellikle otomatik sistemler aracılığıyla analiz edilmesi suretiyle
        kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
      </li>
      <li>
        Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın
        giderilmesini talep etme haklarına sahiptir.
      </li>
    </ol>
    <p className="mt">
      Söz konusu haklar, kişisel veri sahipleri tarafından 6698 sayılı Kanun Kapsamında Aloparça
      tarafından hazırlanan{' '}
      <a href="/static/kvk/kvk.pdf" target="_blank" rel="noopener noreferrer">
        Kişisel Verilerin İşlenmesi ve Korunmasına ilişkin Politika
      </a>
      ’da belirtilen yöntemlerle iletildiğinde 30 (otuz) gün içerisinde değerlendirilerek
      sonuçlandırılacaktır. Taleplere ilişkin olarak herhangi bir ücret talep edilmemesi esas
      olmakla birlikte, Aloparça, Kişisel Verileri Koruma Kurulu tarafından belirlenen ücret
      tarifesi üzerinden ücret talep etme hakkını saklı tutar.
    </p>
    <p>
      Aloparça, Politika hükümlerini dilediği zaman değiştirebilir. Güncel Politika Platform’da
      yayınlandığı tarihte yürürlük kazanır.
    </p>
  </GizlilikPolitikasiPage>
);
export default GizlilikPolitikasi;
