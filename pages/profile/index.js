import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';
import { Title } from '../../components/style';

import { Router } from '../../routes';

import Api from '../../api';

import Menu from '../../components/pages/profile/components/menu';
import SubPage from '../../components/pages/profile/components/menuItems';


import ProfilePage from './style';


class Profile extends React.Component {
  static async getInitialProps({ query: { slug = 'hesabim', id }, reduxStore, res }) {
    const ilIlceNested = await Api.get('Usta/ililcev2');
    if (['giris', 'uye-ol','yeni-uye', 'sifremi-unuttum'].includes(slug) && reduxStore.getState().isLogin) {
      if (res) {
        res.writeHead(302, {
          Location: '/home',
        });
        res.end();
      } else {
        Router.pushRoute('/hesabim');
      }
    }
    return { ilIlceNested, slug, id };
  }

  state = { isLoading: true };

  async componentDidMount() {
    await this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: true });
    if (['giris', 'uye-ol','yeni-uye', 'sifremi-unuttum'].includes(this.props.slug) && this.props.isLogin) {
      Router.pushRoute('/hesabim');
    }

    if (this.props.slug === 'hesabim' && !this.props.isLogin) {
      Router.pushRoute('/hesabim/giris');
    }

  }

  UNSAFE_componentWillReceiveProps({ isLogin, slug }) {
    if (this.props.isLogin !== isLogin && ['giris', 'uye-ol','yeni-uye', 'sifremi-unuttum'].includes(slug)) {
      if (isLogin) {
        Router.pushRoute('/hesabim');
      } else {
        Router.pushRoute('/hesabim/giris');
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'LOGIN_REQUIRED', payload: false });
  }

  renderPage() {
    const { slug, id, ilIlceNested } = this.props;
    const Page = SubPage[slug].components;

    if (!Page) return null;

    return <Page {...{ slug, id }} ilIlceNested={ilIlceNested} />;
  }

  render() {
    const { slug } = this.props;
    return (
      <Layout meta={{ title: SubPage[slug].title }} slug={slug}>
        <ProfilePage>
          <Container>
            <Flex className="main-area" mx={-1} alignItems="flex-start">
              <Menu slug={slug} />
              <Flex id="i" width={[1, 1, 4 / 5]} ml={[0, 0, 2]} flexDirection="column">
                <Box mb={2}>
                  <Title>{SubPage[slug].title}</Title>
                </Box>
                <Box p={[2, 2, 4]} className="content">
                  {this.renderPage()}
                </Box>
              </Flex>
            </Flex>
          </Container>
        </ProfilePage>
      </Layout>
    );
  }
}
const mapStateToProps = ({ isLogin, isLoginRequired }) => ({ isLogin, isLoginRequired });

export default connect(mapStateToProps)(Profile);
