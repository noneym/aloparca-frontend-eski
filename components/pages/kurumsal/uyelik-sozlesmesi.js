import styled from 'styled-components';
import { Flex } from '@rebass/grid';

const UyelikSozlesmesiPage = styled(Flex)`
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
const UyelikSozlesmesi = () => (
  <UyelikSozlesmesiPage flexDirection="column">
    <p>
      <strong>Üyelik sözleşmesi ve Site Kullanım Şartları</strong>
    </p>
    <p>Lütfen sitemizi kullanmadan evvel bu ‘site kullanım şartları’nı dikkatlice okuyunuz. </p>
    <p>
      Bu alışveriş sitesini kullanan ve alışveriş yapan müşterilerimiz aşağıdaki şartları kabul
      etmiş varsayılmaktadır:{' '}
    </p>
    <p>
      Sitemizdeki web sayfaları ve ona bağlı tüm sayfalar (‘site’) www.aloparca.com adresindeki
      Aloparca Oto Yedek Parça Elektronik Hiz. San. ve Tic. A.Ş. firmasının (Firma) malıdır ve
      onun tarafından işletilir. Sizler (‘Kullanıcı’) sitede sunulan tüm hizmetleri kullanırken
      aşağıdaki şartlara tabi olduğunuzu, sitedeki hizmetten yararlanmakla ve kullanmaya devam
      etmekle; Bağlı olduğunuz yasalara göre sözleşme imzalama hakkına, yetkisine ve hukuki
      ehliyetine sahip ve 18 yaşın üzerinde olduğunuzu, bu sözleşmeyi okuduğunuzu, anladığınızı ve
      sözleşmede yazan şartlarla bağlı olduğunuzu kabul etmiş sayılırsınız.
    </p>
    <p>
      İşbu sözleşme taraflara sözleşme konusu site ile ilgili hak ve yükümlülükler yükler ve
      taraflar işbu sözleşmeyi kabul ettiklerinde bahsi geçen hak ve yükümlülükleri eksiksiz, doğru,
      zamanında, işbu sözleşmede talep edilen şartlar dâhilinde yerine getireceklerini beyan
      ederler.
    </p>
    <p className="mt">
      <strong>1. Sorumluluklar</strong>
    </p>
    <ol>
      <li>
        Firma, fiyatlar ve sunulan ürün ve hizmetler üzerinde değişiklik yapma hakkını her zaman
        saklı tutar.{' '}
      </li>
      <li>
        Firma, üyenin sözleşme konusu hizmetlerden, teknik arızalar dışında yararlandırılacağını
        kabul ve taahhüt eder.
      </li>
      <li>
        Kullanıcı, sitenin kullanımında tersine mühendislik yapmayacağını ya da bunların kaynak
        kodunu bulmak veya elde etmek amacına yönelik herhangi bir başka işlemde bulunmayacağını
        aksi halde ve 3. Kişiler nezdinde doğacak zararlardan sorumlu olacağını, hakkında hukuki ve
        cezai işlem yapılacağını peşinen kabul eder.
      </li>
      <li>
        Kullanıcı, site içindeki faaliyetlerinde, sitenin herhangi bir bölümünde veya
        iletişimlerinde genel ahlaka ve adaba aykırı, kanuna aykırı, 3. Kişilerin haklarını
        zedeleyen, yanıltıcı, saldırgan, müstehcen, pornografik, kişilik haklarını zedeleyen, telif
        haklarına aykırı, yasa dışı faaliyetleri teşvik eden içerikler üretmeyeceğini,
        paylaşmayacağını kabul eder. Aksi halde oluşacak zarardan tamamen kendisi sorumludur ve bu
        durumda ‘Site’ yetkilileri, bu tür hesapları askıya alabilir, sona erdirebilir, yasal süreç
        başlatma hakkını saklı tutar. Bu sebeple yargı mercilerinden etkinlik veya kullanıcı
        hesapları ile ilgili bilgi talepleri gelirse paylaşma hakkını saklı tutar.
      </li>
      <li>
        Sitenin üyelerinin birbirleri veya üçüncü şahıslarla olan ilişkileri kendi
        sorumluluğundadır.
      </li>
    </ol>
    <p className="mt">
      <strong>2. Fikri Mülkiyet Hakları</strong>
    </p>
    <ol>
      <li>
        İşbu Site’de yer alan ünvan, işletme adı, marka, patent, logo, tasarım, bilgi ve yöntem gibi
        tescilli veya tescilsiz tüm fikri mülkiyet hakları site işleteni ve sahibi firmaya veya
        belirtilen ilgilisine ait olup, ulusal ve uluslararası hukukun koruması altındadır. İşbu
        Site’nin ziyaret edilmesi veya bu Site’deki hizmetlerden yararlanılması söz konusu fikri
        mülkiyet hakları konusunda hiçbir hak vermez.
      </li>
      <li>
        Site’de yer alan bilgiler hiçbir şekilde çoğaltılamaz, yayınlanamaz, kopyalanamaz, sunulamaz
        ve/veya aktarılamaz. Site’nin bütünü veya bir kısmı diğer bir internet sitesinde izinsiz
        olarak kullanılamaz.{' '}
      </li>
    </ol>
    <p className="mt">
      <strong>3. Gizli Bilgi</strong>
    </p>
    <ol>
      <li>
        Firma, site üzerinden kullanıcıların ilettiği kişisel bilgileri 3. Kişilere
        açıklamayacaktır. Bu kişisel bilgiler; kişi adı-soyadı, adresi, telefon numarası, cep
        telefonu, e-posta adresi gibi Kullanıcı’yı tanımlamaya yönelik her türlü diğer bilgiyi
        içermekte olup, kısaca ‘Gizli Bilgiler’ olarak anılacaktır.
      </li>
      <li>
        Kullanıcı, sadece tanıtım, reklam, kampanya, promosyon, duyuru vb. pazarlama faaliyetleri
        kapsamında kullanılması ile sınırlı olmak üzere, Site’nin sahibi olan firmanın kendisine ait
        iletişim, portföy durumu ve demografik bilgilerini iştirakleri ya da bağlı bulunduğu grup
        şirketleri ile paylaşmasına muvafakat ettiğini kabul ve beyan eder. Bu kişisel bilgiler
        firma bünyesinde müşteri profili belirlemek, müşteri profiline uygun promosyon ve
        kampanyalar sunmak ve istatistiksel çalışmalar yapmak amacıyla kullanılabilecektir.
      </li>
      <li>
        Gizli Bilgiler, ancak resmi makamlarca usulü dairesinde bu bilgilerin talep edilmesi halinde
        ve yürürlükteki emredici mevzuat hükümleri gereğince resmi makamlara açıklama yapılmasının
        zorunlu olduğu durumlarda resmi makamlara açıklanabilecektir.
      </li>
    </ol>
    <p className="mt">
      <strong>4. Garanti Vermeme</strong>
    </p>
    <p>
      İŞBU SÖZLEŞME MADDESİ UYGULANABİLİR KANUNUN İZİN VERDİĞİ AZAMİ ÖLÇÜDE GEÇERLİ OLACAKTIR. FİRMA
      TARAFINDAN SUNULAN HİZMETLER "OLDUĞU GİBİ” VE "MÜMKÜN OLDUĞU” TEMELDE SUNULMAKTA VE
      PAZARLANABİLİRLİK, BELİRLİ BİR AMACA UYGUNLUK VEYA İHLAL ETMEME KONUSUNDA TÜM ZIMNİ GARANTİLER
      DE DÂHİL OLMAK ÜZERE HİZMETLER VEYA UYGULAMA İLE İLGİLİ OLARAK (BUNLARDA YER ALAN TÜM BİLGİLER
      DÂHİL) SARİH VEYA ZIMNİ, KANUNİ VEYA BAŞKA BİR NİTELİKTE HİÇBİR GARANTİDE BULUNMAMAKTADIR.
    </p>
    <p>
      <strong>5. Kayıt ve Güvenlik</strong>
    </p>
    <p>
      Kullanıcı, doğru, eksiksiz ve güncel kayıt bilgilerini vermek zorundadır. Aksi halde bu
      Sözleşme ihlal edilmiş sayılacak ve Kullanıcı bilgilendirilmeksizin hesap kapatılabilecektir.
    </p>
    <p>
      Kullanıcı, site ve üçüncü taraf sitelerdeki şifre ve hesap güvenliğinden kendisi sorumludur.
      Aksi halde oluşacak veri kayıplarından ve güvenlik ihlallerinden veya donanım ve cihazların
      zarar görmesinden Firma sorumlu tutulamaz.
    </p>
    <p>
      <strong>6. Mücbir Sebep</strong>
    </p>
    <p>
      Tarafların kontrolünde olmayan; tabii afetler, yangın, patlamalar, iç savaşlar, savaşlar,
      ayaklanmalar, halk hareketleri, seferberlik ilanı, grev, lokavt ve salgın hastalıklar, altyapı
      ve internet arızaları, elektrik kesintisi gibi sebeplerden (aşağıda birlikte "Mücbir Sebep”
      olarak anılacaktır.) dolayı sözleşmeden doğan yükümlülükler taraflarca ifa edilemez hale
      gelirse, taraflar bundan sorumlu değildir. Bu sürede Taraflar’ın işbu Sözleşme’den doğan hak
      ve yükümlülükleri askıya alınır.
    </p>
    <p>
      <strong>7. Sözleşmenin Bütünlüğü ve Uygulanabilirlik</strong>
    </p>
    <p>
      İşbu sözleşme şartlarından biri, kısmen veya tamamen geçersiz hale gelirse, sözleşmenin geri
      kalanı geçerliliğini korumaya devam eder.
    </p>
    <p>
      <strong>8. Sözleşmede Yapılacak Değişiklikler</strong>
    </p>
    <p>
      Firma, dilediği zaman sitede sunulan hizmetleri ve işbu sözleşme şartlarını kısmen veya
      tamamen değiştirebilir. Değişiklikler sitede yayınlandığı tarihten itibaren geçerli olacaktır.
      Değişiklikleri takip etmek Kullanıcı’nın sorumluluğundadır. Kullanıcı, sunulan hizmetlerden
      yararlanmaya devam etmekle bu değişiklikleri de kabul etmiş sayılır.
    </p>
    <p>
      <strong>9. Tebligat</strong>
    </p>
    <p>
      İşbu Sözleşme ile ilgili taraflara gönderilecek olan tüm bildirimler, Firma’nın bilinen
      e.posta adresi ve kullanıcının üyelik formunda belirttiği e.posta adresi vasıtasıyla
      yapılacaktır. Kullanıcı, üye olurken belirttiği adresin geçerli tebligat adresi olduğunu,
      değişmesi durumunda 5 gün içinde yazılı olarak diğer tarafa bildireceğini, aksi halde bu
      adrese yapılacak tebligatların geçerli sayılacağını kabul eder.
    </p>
    <p>
      <strong>10. Delil Sözleşmesi</strong>
    </p>
    <p>
      Taraflar arasında işbu sözleşme ile ilgili işlemler için çıkabilecek her türlü uyuşmazlıklarda
      Taraflar’ın defter, kayıt ve belgeleri ile ve bilgisayar kayıtları ve faks kayıtları 6100
      sayılı Hukuk Muhakemeleri Kanunu uyarınca delil olarak kabul edilecek olup, kullanıcı bu
      kayıtlara itiraz etmeyeceğini kabul eder.
    </p>
    <p>
      <strong>11. Uyuşmazlıkların Çözümü</strong>
    </p>
    <p>
      İşbu Sözleşme’nin uygulanmasından veya yorumlanmasından doğacak her türlü uyuşmazlığın
      çözümünde İstanbul (Merkez) Adliyesi Mahkemeleri ve İcra Daireleri yetkilidir.
    </p>
  </UyelikSozlesmesiPage>
);
export default UyelikSozlesmesi;
