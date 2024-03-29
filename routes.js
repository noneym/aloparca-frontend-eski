const routes = require('next-routes')();
const getConfig = require('next/config').default;

const { publicRuntimeConfig } = getConfig();

const routesJSON = {};

const baseURL = '/oto-yedek-parca';
const categoryURL = `${baseURL}/ustkategori/:maincategory`;
const baseURL2 = '/oto-yedek-parca-v2';
const categoryURL2 = `${baseURL2}/ustkategori/:maincategory`;
routes.add('home', '/', publicRuntimeConfig.SITE === 'aloparca' ? 'home' : 'home-b2b');
//routes.add('product', '/yedek-parca/:seomake/:seotitle?/:seoid/:extra1?/:extra2?/:slug');
routes.add('product', '/yedek-parca/:seomake/:seotitle?/:seoid/:extra1?/:extra2?/:slug');
routes.add('product-oem', '/oem-yedek-parca/:slug');

routes.add('product-v2', '/yedek-parca-v2/:seomake/:seotitle?/:seoid/:extra1?/:extra2?/:slug');

routes.add('maincategory', categoryURL, 'category');
routes.add('subcategory', `${categoryURL}/altkategori/:subcategory`, 'category');

routes.add('maincategory-v2', categoryURL2, 'category-v2');
routes.add('subcategory-v2', `${categoryURL2}/altkategori/:subcategory`, 'category-v2');

routes.add(
  'listsubcategory',
  `${baseURL}/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?/altekategori/:subcategory`,
  'list',
);
routes.add(
  'listmaincategory',
  `${baseURL}/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?/ustkategori/:maincategory`,
  'list',
);
routes.add('listcar', `${baseURL}/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?`, 'list');

// routes.add('listcarparts', `${baseURL2}/:pcid`, 'list-v2');
/* */

routes.add('listcarparts', `${baseURL2}/:kasa`, 'list-v2');

routes.add(
  'listsubcategory-v2',
  `${baseURL2}/:marka?/:model?/:kasa?/:yil?/altkategori/:subcategory`,
  'list-v2',
);
routes.add(
  'listmaincategory-v2',
  `${baseURL2}/:marka?/:model?/:kasa?/:yil?/ustkategori/:maincategory`,
  'list-v2',
);
routes.add('listcar-v2', `${baseURL2}/:marka?/:model?/:kasa?/:yil?`, 'list-v2');
/* */
// routes.add('listcar', `${baseURL}/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?`, 'list-v2');

//routes.add('listcar', `${baseURL}-v2/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?`, 'list-v2');
// routes.add('listcar-b2b',`${baseURL}/:marka?`, 'list' )
routes.add('listoem', '/i/:no/:slug', 'list-oem');
routes.add('listmarka', '/marka/:marka/:slug?', 'list-marka');
routes.add('list-brand-v2', '/yedek-parca-marka');
// routes.add('list-brand-v2', '/yedek-parca-marka-v2');
routes.add('accessories', '/otoaksesuar/:kategori?/:marka?/:model?', 'accessories');
routes.add(
  'accessories-with-page',
  '/otoaksesuar/:kategori?/:marka?/:model?/sayfa/:sayfa?',
  'accessories',
);

routes.add('bakim-seti', '/bakim-seti');
routes.add('temizlik', '/temizlik');
// routes.add('petrol-ofisi-kampanya', '/petrol-ofisi-kampanya');

routes.add('bakimseti', '/bakim-seti-robotu');
routes.add('profile', '/hesabim/:slug?/:id?');
routes.add('hesabim/giris', '/hesabim/giris');
routes.add('kumbara', '/hesabim/kumbara');
// routes.add('user', '/uye/:slug?');
routes.add('sepet', '/sepet');
routes.add('satin-al/adres-secim', '/satin-al/adres-secim');
routes.add('satin-al/odeme-secim', '/satin-al/odeme-secim');
// routes.add('checkout-nonregistered', '/satin-al/uye-olmadan');
routes.add('checkout-success', '/satin-al/tesekkurler/:id?');
routes.add('checkout-error', '/satin-al/hata');
routes.add('search', '/arama/:marka?/:model?/:kasa?/:yil?/:motor?/:beygir?/q/:slug');
routes.add('yardim', '/yardim/:slug?');
routes.add('kurumsal', '/kurumsal/:slug?');
routes.add('kampanya', '/kampanya/:slug?');
routes.add('contact', '/iletisim');
routes.add('blog', '/blog/:slug?');
routes.add('blog-detay', '/blog-detay/:blog?');
routes.add('motor-oil', '/madeni-yaglar/motor-yaglari/:id?/:altkat?/:oil?');
routes.add('campaign', '/kampanyali-urunler');
routes.add('forgot-password', '/sifremi-unuttum');

routes.add('ebata-gore-lastik', '/lastik/:genislik?/:yukseklik?/:jant-capi?', 'lastik');
routes.add('araca-gore-lastik', '/lastik/:marka?/:model?/:seri?', 'lastik');

module.exports = Object.assign(routes, { routesJSON });
