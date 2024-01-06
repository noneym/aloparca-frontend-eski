import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';
import LazyLoad from 'react-lazyload';

import { Link, Container } from '../../reactor';

import CarFooter from './marka';

import Outer from './style';

const Footer = ({ isProductDetail, hasFixedAddCart, isSepet }) => (

  <>
    <p>*  Orijinal Yedek Parça Fiyatları tavsiye edilen perakende satış fiyatlarıdır ve marka distribütöründe olabilecek fiyat politikası değişiklikleri nedeniyle ilgili fiyatlar gün içerisinde farklılık gösterebilir.</p>
    <Outer onlyBasket={isSepet} className={cx({ mobileProductDetail: isProductDetail })}>
      <div className="social">
        <Container>
          <ul>
            <li>Bizi takip edin</li>
            <li>
              <a href="https://www.facebook.com/aloparca" target="_blank" rel="noopener noreferrer nofollow">
                <i className="icon icon-facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/aloparca" target="_blank" rel="noopener noreferrer nofollow">
                <i className="icon icon-twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/aloparca/" target="_blank" rel="noopener noreferrer nofollow">
                <i className="icon icon-instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCjvosQ4Scra1tS_4qTR29gQ"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <i className="icon icon-youtube" />
              </a>
            </li>
          </ul>
        </Container>
      </div>

      <div className="bottom-menu">
        <Container>
          <Flex>
            <Box className="menu-list">
              <Flex>
                <Box width={1 / 3}>
                  <ul>
                    <li>
                      <Link route="home">
                        <i className="icon icon-triangle-right" />
                        Anasayfa
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'hakkimizda' }}>
                        <i className="icon icon-triangle-right" />
                        Hakkımızda
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'gizlilik-ve-cerez-politikasi' }}>
                        <i className="icon icon-triangle-right" />
                        Gizlilik ve Çerez Politikası
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'uyelik-sozlesmesi' }}>
                        <i className="icon icon-triangle-right" />
                        Üyelik Sözleşmesi
                      </Link>
                    </li>
                  </ul>
                </Box>
                <Box width={1 / 3}>
                  <ul>
                    <li>
                      <Link route="contact">
                        <i className="icon icon-triangle-right" />
                        Müşteri Hizmetleri
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'banka-bilgileri' }}>
                        <i className="icon icon-triangle-right" />
                        Banka (Havale/EFT) Bilgileri
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'garanti-ve-iade' }}>
                        <i className="icon icon-triangle-right" />
                        Garanti ve İade
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'sikca-sorulan-sorular' }}>
                        <i className="icon icon-triangle-right" />
                        Sıkça Sorulan Sorular
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'oneri-ve-sikayet' }}>
                        <i className="icon icon-triangle-right" />
                        Öneri ve Şikayet
                      </Link>
                    </li>
                  </ul>
                </Box>
                <Box width={1 / 3}>
                  <ul>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'kargo-hakkinda' }}>
                        <i className="icon icon-triangle-right" />
                        Kargo Hakkında
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'iade-islemleri' }}>
                        <i className="icon icon-triangle-right" />
                        İade İşlemleri
                      </Link>
                    </li>
                    <li>
                      <Link route="kurumsal" params={{ slug: 'kunye' }}>
                        <i className="icon icon-triangle-right" />
                        Künye
                      </Link>
                    </li>
                    <li>
                      <Link route="contact">
                        <i className="icon icon-triangle-right" />
                        İletişim
                      </Link>
                    </li>
                  </ul>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection="column">
                <Box mb={1}>
                  <img
                    className="etbis"
                    src="/static/img/etbis.svg"
                    alt="Sitemiz T.C. Gümrük ve Ticaret Bakanlığı ETBİS Sistemine Kayıtlıdır"
                  />
                </Box>
                <Box>
                  <a href="tel:08503330686" className="contact support">
                    <img src="/static/img/t/icons/telefon.svg" alt="Müşteri Hizmetleri" />
                    <div className="content">
                      <div className="title">MÜŞTERİ HİZMETLERİ</div>
                      <div className="content-phone">0850 333 0 686</div>
                    </div>
                  </a>
                </Box>
                <Box>
                  <strong>Çalışma Saatleri</strong>
                  <br />
                  {' '}
                  Hafta içi: 08:00-21:00 / Cumartesi: 09:00-14:00
                </Box>
                {/* <Box width={250} ml={28}>
              <Link className="app-store">
                <img src="/static/img/t/icons/google-play.svg" alt="Google Play" />
              </Link>
              <Link className="app-store">
                <img src="/static/img/t/icons/app-store.svg" alt="App Store" />
              </Link>
            </Box> */}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </div>

      <Flex className="phone">
        <Flex width={1}>
          <a href="tel:08503330686" className="contact support">
            <div className="content">
              <div className="title">MÜŞTERİ HİZMETLERİ</div>
              <div className="phone">0850 333 0 686</div>
            </div>
          </a>
        </Flex>
        {/* <Flex width={1 / 2}>
      <a
        href="https://api.whatsapp.com/send?phone=905444590880"
        target="_blank"
        rel="noopener noreferrer"
        className="contact whatsapp"
      >
        <div className="content">
          <div className="title">WHATSAPP DESTEK</div>
          <div className="phone">0544 459 08 80</div>
        </div>
      </a>
    </Flex> */}
      </Flex>

      <div className="taksit">
        <Container>
          <Flex className="list">
            <Box width={1 / 8}>
              <Flex className="title">
                <Box className="row1">9</Box>
                <Box className="row2">
                  <Flex className="col-group">
                    <Box className="col1">TAKSİT</Box>
                    <Box className="col2">İMKANI</Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/bonus-card.svg" alt="Bonus Card" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/maximum.svg" alt="Maximum" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/paraf.svg" alt="Paraf" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/axess.svg" alt="Axess" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/card-finans.svg" alt="Card Finans" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/ziraat-bankkart.svg" alt="Ziraat Bankkart" />
              </LazyLoad>
            </Box>
            <Box width={1 / 8} className="item">
              <LazyLoad>
                <img src="/static/img/t/icons/world.svg" alt="World" />
              </LazyLoad>
            </Box>
          </Flex>
        </Container>
      </div>
      <div className={cx('make-list', { withPadding: hasFixedAddCart })}>
        <LazyLoad>
          <CarFooter />
        </LazyLoad>
      </div>
      <div className="copyright">
        <Container>
          <Flex className="group">
            <Box width={1 / 3} className="text">
              &copy; Copyright
              {' '}
              {new Date().getFullYear()}
              {' '}
              - Aloparca.com | Her Hakkı Saklıdır.
            </Box>
            <Box width={1 / 3} className="menu">
              <Link route="yardim">Yardım</Link>
              <Link route="profile" params={{ slug: 'destek-merkezi' }}>
                Destek
              </Link>
              <Link route="kurumsal" params={{ slug: 'toplu-parca-teklifi' }}>
                Parça ve Hizmet Teklifi
              </Link>
              <Link route="profile" params={{ slug: 'siparislerim' }}>
                Siparişlerim
              </Link>
            </Box>
          </Flex>
        </Container>
      </div>
    </Outer>

  </>

);

export default Footer;
