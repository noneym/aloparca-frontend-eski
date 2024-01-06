import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';
import { BrowserView } from 'react-device-detect';
import { Link, Container, Image as ReactorImage } from '../../reactor';
import Outer from './style';
import SearchBar from './search';
import { Router } from '../../routes';
import { site } from '../../reactor/func';
import BackButton from '../MobileBackButton';
import { media } from '../../style/theme';
import Spinner from "../../ui/spinner";
import ReactPlayer from "react-player";
import Cookies from 'universal-cookie';
import Dropdown from "../../ui/dropdown";

const ustmenu = require('./data/ustmenu.json');
const menu = require('./data/menu.json');
const b2bmenu = require('./data/b2bmenu.json');
const cookies = new Cookies();
const Text = styled.p`
  font-family: Barlow, sans-serif;
  font-size: 14px;
  margin-bottom: 3px;
  color: #313131;

  ${media.phone`
    font-size: 13px;
  `};

  ${media.mini`
    font-size: 12px;
  `};
`;

const TextBold = styled(Text)`
  font-weight: 500;
`;

const ListCart = styled.div`
  padding: 15px;
  min-width: ${({ fixWidth }) => fixWidth ? "600px" : "300px"};
  display: inline-block;
  ${media.phone`
    min-width: 380px;
  `};

  ${media.mini`
    display: block;
    min-width: 290px;
  `};

  .cart-empty {
    font-family: 'Barlow', sans-serif;
    padding: 10px 15px;
    color: #ff8900;
    font-size: 14px;
    font-weight: 500;
  };
`;

const ListScroll = styled.div`
  max-height: 390px;
  overflow-x: hidden;
  overflow-y: ${({ scroll }) => (scroll ? 'hidden' : 'scroll')};
  border-bottom: 1px solid #eee;

  &::-webkit-scrollbar {
    width: 8px;
    background: #f7f7f7;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff8900;
    border-radius: 1px;
  }

  ${media.phone`
    overflow-y: scroll;
  `};
`;

const ListScrollUl = styled.ul``;

const ListScrollLi = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 5px !important;
  min-height: 78px;
  max-height: 100%;

  &:not(:first-of-type) {
    border-top: 1px dashed #eee;
  }

  ${media.phone`
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  `};
`;

const ListImage = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.phone`
    position: absolute;
    bottom: 10px;
  `};
`;

const ListImageImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ListScrollContent = styled.div`
  margin-left: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phone`
    margin-left: 0;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  `};
`;

const ListScrollHeader = styled(TextBold)`
  margin: 0;
  font-size: 14px;
  color: #313131;
  flex: 1;
  white-space: normal;

  ${media.phone`
    padding: 5px 0;
    font-weight: 700;
  `};
`;

const ListScrollFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.phone`
    margin-top: 10px;
    height: 40px;
    margin-left: auto;
    width: calc(50% - -20px);
  `};
`;

const ListScrollPiece = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;

  ${media.phone`
    padding: 0;
  `};
`;

const ListScrollPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  ${media.phone`
    align-items: flex-end;
  `};
`;

const ListResult = styled.div`
  margin-top: 20px;
`;

const ListResultFlex = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:first-of-type) {
    margin-top: 5px;
  }
`;

const ListResultText = styled(Text)`
  margin: 0;
`;

const ListResultTextBold = styled(Text)`
  font-weight: 700;
`;

const ListResultLink = styled(Link)`
  background: #ff8900;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  color: white;
  font-weight: 500;
  display: block;
  text-align: center;
  margin-top: 20px;
  transition: all 300ms;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    color: white !important;
    background: #e87d00;
  }

  ${media.phone`
    font-size: 15px;
  `};

  ${media.mini`
    font-size: 14px;
  `};
`;

const ButtonsDiv = styled.div`
  .buttons {
    margin-left: 0.7rem;
  }
`;
const KampanyaBar = styled.div`
    width: 100%;
    color: white;
    height: auto;
    font-size: 1.4rem;
    font-weight: 400;
    font-family: "Segoe UI",Arial,sans-serif;
    text-align: center;
    font-style: italic;
    padding: 10px 0;
    background-image: linear-gradient(-60deg, #16a085 0%, #f4d03f 100%);
    margin-top: 0.5rem;
    overflow:hidden;
    animation-delay: 5s;
    font-weight: 200;
    p {
      ${media.phone`
      font-size: 1rem;
      margin: 0.25rem 0.25rem;;
    `}
    }
    ${media.tablet`
      margin-top: 0;
      padding: 0.3rem 1rem;
      font-weight: 400;
      font-size: 1.2rem;
    `}
  `;

const FirstShowYouTube = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: ${({ open }) => open ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  z-index: 100;

  ${media.tablet`
    display: none;
  `};
`;

const CloseButton = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid #ff8900;
  outline: none;
  width: 100px;
  padding: 10px;
  color: #ff8900;
  transition: all .3s;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-top: 15px;

  &:hover {
    background: #ff8900;
    color: white;
  }
`;

const ListGaraga = styled.div`
  padding: 15px;
  width: 400px;
`;

const ListGaragaItem = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  color: #666;
  padding: 10px 0;
  cursor: pointer;
`;

const ListGaragaContent = styled.div`
  width: 100%;
`;

const ListGaragaHeader = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

const ListGaragaDescription = styled.div`
  margin-top: 5px;
`;

const NotingGaraga = styled.div`
  min-width: 300px;
  font-size: 14px;
  font-weight: 500;
  padding: 15px;
  text-align: center;
`;

const NotingCart = styled.div`
  color: orange;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
`;

const UstMenuUl = styled.ul`
  padding: 0!important;

  & li {
    margin: 8px 0;
  }
`;

const UstMenuLi = styled.li`
  background: #ff8900;
  margin: 0!important;
  transition: all 300ms;
  
  &::before {
    background-color: transparent!important;
  }

  & a {
    height: 100%;
    align-items: center;
    display: flex;
    color: white!important;
  }

  &:hover {
    background: #ea8106;
  }
`;

const barText = '';// "Yılın En Son Kampanyası, 200 TL ve Üzeri Alışverişinize Sepette %5 İndirim";
class Header extends React.Component {

  state = {
    isLoading: true, guncelKumbara: null, isScroll: false, b2bAccess: null, open: true
  };

  componentDidMount() {
    this.setState({ isLoading: false });
    site === "b2b" && this.props.userData !== null ? 
    this.getKumbara(this.props.userData) :
    (site === "b2b" && this.getKumbara(0)) ;
;  }


  getKumbara = async (data) => {
    try {
      const response = await data;

      const kumbaraTutar = await response.kumbara_tutar && response.kumbara_tutar !== undefined ||
      
      response.kumbara_tutar !== null ? response.kumbara_tutar : 0;
      
      this.setState({ b2bAccess: await (response.user !== undefined && response.user[0].b2b_access === "1" ? true : false) });
      
      await this.setState({ isLoading: false, guncelKumbara: kumbaraTutar === undefined || null ? 0 : kumbaraTutar }); // Burada VSCode await gereksiz diyor ama değil denendi await olmayınca komponent yükleyince null dönüyor. 

    } catch (error) {
      
      //console.log(error);

    }
  }


  changeCar = (car) => {
    const {
      Id, uyeid, not, resim, sasi, ...carList
    } = car;
    this.props.dispatch({ type: 'ADD_GARAGE', payload: carList });
    Router.pushRoute('listcar', carList);
  };
  render() {
    const {
      isLogin, cart, userData, garage, toggleMobileMenu,
    } = this.props;

    const { isLoading, isScroll, open} = this.state;
    return (
      <Outer site={site}>
        <div className="top-bar">
          <Container>
            <div>
              Müşteri Hizmetleri.&nbsp;
              <strong>
                <a href="tel:08503330686">0850 333 0686</a>
              </strong>
            </div>

            {(site === 'aloparca' || (site === 'b2b' && isLogin)) && (
              <nav>
                <ul>
                  {ustmenu.map(({ title, route, slug }) => (
                    <li key={title}>
                      <Link route={route} params={{ slug }}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </Container>
          
        </div>
        <div className="mobile-contact">
          <BackButton />
          BİZE ULAŞIN.&nbsp;
          <strong>
            <a href="tel:08503330686">0850 333 0686</a>
          </strong>
        </div>

        <Container className="main">
          <Flex>
            {(site === 'aloparca' || (site === 'b2b' && isLogin)) && (
              <a href="javascript:;" onClick={toggleMobileMenu} className="mobile-menu" altt="Menü">
                <i className="icon-mobile-menu" />
              </a>
            )}

            <div className="logo">
              <Link title="Aloparça" route="home">
                <ReactorImage src="/static/img/logo.svg" alt="logo" />
              </Link>
            </div>
          </Flex>

          {site === 'aloparca' && <SearchBar />}

          {(site === 'aloparca' || (site === 'b2b' && isLogin)) && (
            <ButtonsDiv>
              <ul className="buttons">
                <li className="garage">
                  <div className="link">
                    <Dropdown
                      trigger={(
                        <>
                          <i className="icon icon-garaj" />
                          <div className="content-area">Garaj</div>
                          <strong className="count">
                            {userData && userData.status !== false
                              ? userData.uye_garaj
                                ? userData.uye_garaj.length
                                : 0
                              : 0}
                          </strong>
                        </>
                      )}
                      onRight
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : userData
                        && userData.status !== false
                        && userData.uye_garaj ? (
                            <ListGaraga>
                              {userData.uye_garaj.map((garageItem) => (
                                <ListGaragaItem
                                  onClick={() => this.changeCar(garageItem)}
                                  key={garageItem.Id}
                                  title="Aloparça'yı bu araç bilgileri ile kullan"
                                >
                                  <ListGaragaContent>
                                    <ListGaragaHeader>
                                      {`${garageItem.marka} ${garageItem.model} ${garageItem.kasa} ${garageItem.yil}`}
                                    </ListGaragaHeader>
                                    <ListGaragaDescription>
                                      {`Motor Hacmi: ${garageItem.motor} - Beygir Gücü: ${garageItem.beygir}`}
                                    </ListGaragaDescription>
                                  </ListGaragaContent>
                                </ListGaragaItem>
                              ))}
                              <ListResultLink route="hesabim/garaj">
                                Garajı Görüntüle
                              </ListResultLink>
                            </ListGaraga>
                          ) : (
                            <NotingGaraga>
                              {`Garajınıza araç eklemek için `}
                              <Link route="profile">giriş yapınız</Link>
                            </NotingGaraga>
                          )}
                    </Dropdown>
                  </div>
                </li>

                <li className="content-area hesabim-link">
                  {isLogin ? (
                    <Link className="link" route="profile" title="Hesabım">
                      <span className="icon icon-uyelik login" />

                      <BrowserView>
                        <span className="mobilde-gizle">
                          {userData
                            && userData.status !== false
                            && `${userData.user[0].uyeadi} ${userData.user[0].uyesoyadi}`}
                        </span>
                      </BrowserView>

                      <strong className="mobilde-gizle">HESABIM</strong>
                    </Link>
                  ) : (
                      <Link
                        className="link"
                        route="profile"
                        title="Üye Girişi/Yeni Üye"
                      >
                        <span className="icon icon-uyelik" />
                        <span className="mobilde-gizle">Üye Girişi</span>
                        <BrowserView>
                          <span className="mobilde-gizle">/Yeni Üye</span>
                        </BrowserView>
                      </Link>
                    )}
                </li>
                {site === 'b2b' &&
                  <li className="content-area kumbaram">

                    <Link className="link" route="/hesabim/kumbara" title="Kumbara">
                      <span className="icon icon-hesabim-kumbara" />

                      <BrowserView>
                        <span className="mobilde-gizle">
                          {
                            `${this.state.guncelKumbara} TL`
                          }
                        </span>
                      </BrowserView>

                      <strong className="mobilde-gizle">KUMBARAM</strong>
                    </Link>

                  </li>
                }

                <li>
                  <div className="link">
                    <Dropdown
                      trigger={(
                        <>
                          <i className="icon icon-sepet" />
                          <div className="content-area">Sepet</div>
                          <strong className="count">
                            {cart ? (cart.urunler ? cart.urunler.length : 0) : 0}
                          </strong>
                        </>
                      )}
                      onRight
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : (
                          <ListCart fixWidth={cart && cart.urunler}>
                            {cart && cart.urunler ? (
                              <>
                                <ListScroll scroll={cart.urunler.length < 6 ? !isScroll : isScroll}>
                                  <ListScrollUl>
                                    {cart.urunler.map(
                                      (cartItem) => cartItem.urun_detay && (
                                        <ListScrollLi key={cartItem.urun_detay.no}>
                                          <ListImage>
                                            <ListImageImg
                                              src={`https://resize.aloparca.com/upload/w_50/${cartItem.urun_detay.gorsel}`}
                                              alt={cartItem.urun_detay.name}
                                              avatar
                                            />
                                          </ListImage>
                                          <ListScrollContent>
                                            <ListScrollHeader>
                                              {cartItem.urun_detay.name}
                                            </ListScrollHeader>
                                            <ListScrollFlex>
                                              <ListScrollPiece>
                                                <TextBold>
                                                  {cartItem.adet}
                                                </TextBold>
                                                <TextBold>
                                                  Adet
                                        </TextBold>
                                              </ListScrollPiece>
                                              <ListScrollPrice>
                                                <TextBold>
                                                  {parseFloat(
                                                    cartItem.urun_detay.fiyat
                                                    * cartItem.adet,
                                                  ).toFixed(2)}
                                                  {' '}
                                          TL
                                        </TextBold>
                                                <TextBold>
                                                  KDV Dahil
                                        </TextBold>
                                              </ListScrollPrice>
                                            </ListScrollFlex>
                                          </ListScrollContent>
                                        </ListScrollLi>
                                      ),
                                    )}
                                  </ListScrollUl>
                                </ListScroll>
                                <ListResult>
                                  <ListResultFlex>
                                    <ListResultText>Ara Toplam</ListResultText>
                                    <ListResultText>{`${cart.subtotal} TL`}</ListResultText>
                                  </ListResultFlex>
                                  <ListResultFlex>
                                    <ListResultText>Kargo</ListResultText>
                                    <ListResultText>{(site === 'b2b' && isLogin) ? "Ücretsiz" : `${cart.kargo} TL`}</ListResultText>
                                  </ListResultFlex>
                                  <ListResultFlex>
                                    <ListResultTextBold>Toplam Tutar</ListResultTextBold>
                                    <ListResultTextBold>{(site === 'b2b' && isLogin) ? `${cart.subtotal} TL` : `${cart.total} TL`}</ListResultTextBold>
                                  </ListResultFlex>
                                  <ListResultLink route="sepet">
                                    Sepeti Görüntüle
                                  </ListResultLink>
                                </ListResult>
                              </>
                            ) : (
                                <NotingCart>
                                  Sepetinizde ürün bulunmamaktadır
                                </NotingCart>
                              )}
                          </ListCart>
                        )}
                    </Dropdown>
                  </div>
                </li>
              </ul>

            </ButtonsDiv>
          )}

          {site === 'b2b' && !isLogin && (
            <Flex className="b2b-actions" alignItems="center">
              <Link
                className="b2b-register"
                route="profile"
                params={{ slug: 'yeni-uye' }}
                title="Üye Ol"
              >
                Üye Ol
              </Link>
              <Link
                className="b2b-login"
                route="profile"
                params={{ slug: 'giris' }}
                title="Giriş Yap"
              >
                Giriş Yap
              </Link>
            </Flex>
          )}
        </Container>
        {site === 'aloparca' && (
          <div className="bottom">
            <Container>
              <nav>
                <UstMenuUl>
                  {
                    menu.map(({ title, route, slug }) => (
                      title === 'ÜYE İŞYERİ BAŞVURUSU' ?
                        <li key={title}>
                          <a href={"https://test-b2b.aloparca.com"}>
                            {title}
                          </a>
                        </li>
                        :
                        <li key={title}>
                          <Link route={route} params={{ slug }}>
                            {title}
                          </Link>
                        </li>
                    ))
                  }
                  <UstMenuLi>
                    <a href="https://b2b.aloparca.com">
                      B2B
                    </a>
                  </UstMenuLi>
                  {/* menu.map(({ title, route, slug }) => (
                    <li key={title}>
                      <Link route={route} params={{ slug }}>
                        {title}
                      </Link>
                    </li>
                  )) */}
                </UstMenuUl>
              </nav>
            </Container>
          </div>
        )}
       {/*<KampanyaBar><p>{barText}</p></KampanyaBar>*/}

        {site === 'b2b' && isLogin && (
          <div className="bottom b2b-ustmenu">
            <Container>
              <nav>
                <ul>
                  {b2bmenu.map(({ title, route, slug }) => (
                    <li key={title}>
                      <Link route={route} params={{ slug }}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Container>
          </div>
        )}
      </Outer>
    );
  }
}

const mapStateToProps = ({
  isLogin, cart, userData, garage,
}) => ({
  isLogin,
  cart,
  userData,
  garage,
});

export default connect(mapStateToProps)(Header);
