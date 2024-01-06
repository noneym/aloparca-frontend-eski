import { connect } from 'react-redux'
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { seoMeta, site } from '../../reactor/func';
import SiteFeature from '../../components/site-feature';
import { Title } from '../../components/style';
import { media, color, borderRadius } from '../../style/theme';
import Banner from './banner';
import Api from '../../api';
import AdvantageBox from './advantage-box';
import advantages from './advantages.json';
import { userLogout } from '../../actions/user/logout';
import { Router } from '../../routes';

const HomeOuter = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding: 50px 0;
`;
 
const HomeContainer = styled(Container)`
  max-width: 1340px;
  .desktop {
    ${media.tablet`
      display: none;
    `};
  }
  .mobile {
    display: none;
    ${media.tablet`
      display: flex;
      figure {
        width: 100%;
      }
    `};
  }
  h1,
  h2,
  h3 {
    width: 100%;
    text-align: center;
  }
  h1 {
    padding: 0 80px 50px;
    font-weight: 500;
    font-size: 36px;

    ${media.tablet`
      padding: 0 20px 50px;
      font-size: 18px;
    `};
  }
  .main-title {
    ${media.tablet`
      justify-items: center; 
      text-align: start;
      font-weight: 400;
      font-size: 1.5rem;
    `};
  }
  h2:not(${Title}) {
    font-size: 30px;
    font-weight: 700;
    padding: 30px 80px 0;

    ${media.tablet`
      font-size: 25px;
      padding: 30px 10px 0;
    `};
  }
  h3 {
    font-size: 24px;
    padding: 0 80px 30px;

    ${media.tablet`
      font-size: 18px;
      padding: 0 20px 30px;
    `};
  }

  .secinizDiv {
    color: #ff8900;
  }

  .seciniz {
    text-align: start;
    margin: 0;
    padding: 0;
  }

  .brands {

    .brand-wrapper {
      padding: 10px;

      /* ${media.phone`
        &:not(.shown) {
          display:none;
        }
      `} */

      .discount {
        background-image: linear-gradient(rgb(244,143,44) 0%,rgb(233,190,8) 100%);
        color: white;
        text-align: center;
        padding-top: 7px;
        padding-bottom: 7px;
        font-size: 20px;
        font-weight: bold;
        border-radius: 0 0 1rem 1rem;
      }

      .brand {
        width: 100%;
        height: 100%;
        min-height: 150px;
        background-color: white;
        border-radius: 3px;
        border: 1px solid rgb(221, 221, 221);
        padding: 10px;
        cursor: pointer;
        
        img {
          max-width: 100%;
          max-height: 70px;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.3s ease 0s;
        }

        &:hover img {
          filter: none;
          opacity: 1;
        }

        ${media.phone`
        height: 120px;
      `};
      }
    }
  }

  .dahafazla-goster {
    display: none;

    ${media.tablet`
      padding: 5px 2rem;
      display: block;
      background-image: linear-gradient(rgb(244,143,44) 0%,rgb(233,190,8) 100%);
      border-radius: 3px;
      margin-top: 2rem;
      color: white;
      font-weight: 600;
    `};
  }

  .advantage-box {
    ${media.tablet`
      width: 100%;
    `};
  }
`;

class Home extends React.Component {
  state = { page: 1 };
  static async getInitialProps({ res }) {
    const meta = res ? await seoMeta(res.req.url) : {};
    const MarkaList = await Api.get('Products/araclar');
    // console.log("res",res,"meta",meta,"markalist",MarkaList);
    return {
      meta,
      MarkaList,
    };
  }
  

  render() {
    const {
      meta, MarkaList, isLogin, userData, dispatch
    } = this.props;
    const { page } = this.state;

    return (
      <Layout meta={meta}>
        {!isLogin && <Banner />}
        <HomeOuter>
          <HomeContainer>
            {
            site === "b2b" && userData !== null && 
            userData.user[0].b2b_access != 1 && 
            dispatch(userLogout()) && 
            dispatch({ type: 'FLASH_MESSAGE', payload: 'Lütfen kurumsal işyeri hesabınızla giriş yapın!' }) && 
            Router.pushRoute('profile')
            }
            {isLogin ? (
              <Title className="main-title">
                Orjinal ve Muadil Parçalarını Bulabileceğiniz Markalar ve Güncel İndirim Oranları
              </Title>
            ) : (
                <h1>
                  Sürekli güncellenen parça fiyat katalogları sayesinde 5 milyondan fazla{' '}
                  <b>orjinal</b>, <b>logosuz orjinal</b> ve <b>yan sanayi</b> parçalara sınırsızca
                erişin.
                </h1>
              )}

            <Box className={cx('b2b-logolar brand-wrapper', 1)}
              width={[1, 1, 1]}
              p={1}
              key={Math.random()} >

              {isLogin &&
                <div className="secinizDiv">
                  <h3 className="seciniz">
                    Lütfen arama yapabilmek için marka seçiniz:
                  </h3>
                </div>}
            </Box>

            <Flex className="brands" flexWrap="wrap" mx={-1}>
              {MarkaList.results.opts.map((item, index) => {
                const content = (
                  <Flex className="brand" alignItems="center" justifyContent="center">
                    <img
                      src={`/static/img/logolar/markalar/marka_${item
                        .replace(/\s/g, '')
                        .toLowerCase()}.svg`}
                      alt={item}
                    />
                  </Flex>
                );

                return (
                  <Box
                    className={cx('b2b-logolar brand-wrapper', { shown: (index + 1) / 4 <= page })}
                    width={[1 / 2, 1 / 2, 1 / 5]}
                    p={1}
                    key={Math.random()}
                  >  
                    {isLogin ? (
                      <Link
                        route="listcar"
                        params={{ marka: item.replace(/\s/g, '_') }}
                        title={item}
                        key={item}
                      >
                        {content}
                        <div className="discount">{userData.user[0].kmp}%</div>
                      </Link>
                    ) : content }
                  </Box>
                );
              })}
              {/* {page <= MarkaList.results.opts.length / 4 && (
                <button
                  className="dahafazla-goster"
                  onClick={() => {
                    this.setState(prevState => ({ page: prevState.page + 1 }));
                  }}
                >
                  Daha Fazla {">>"}
                </button>
              )} */}
            </Flex>
            {!isLogin && (
              <div>
                <h2>Aloparça Kurumsal Avantajları</h2>
                <h3>
                  Sürekli güncel OEM fiyat listeleri ve profesyönel destek ekibimizle Aloparça siz
                  oto yedek parça profesyönelllerine çok avantajlı bir dünya sunar.
                </h3>

                <Flex flexWrap="wrap" mx={-1}>
                  {advantages.map(advantage => (
                    <Box className="advantage-box" width={1 / 2} p={1} key={Math.random()}>
                      <AdvantageBox data={advantage} />
                    </Box>
                  ))}
                </Flex>
              </div>
            )}
          </HomeContainer>
        </HomeOuter>
        <HomeContainer>
          <SiteFeature />
        </HomeContainer>
      </Layout>
    );
  }
}
 
const mapStateToProps = ({ isLogin, userData, dispatch }) => ({
  isLogin,
  userData,
  dispatch
});

export default connect(mapStateToProps)(Home);
