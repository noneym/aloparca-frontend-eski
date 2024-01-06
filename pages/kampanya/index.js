import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';

import Layout from '../../layouts/container';
import { Container } from '../../reactor';

import Pages from '../../components/pages/kampanya';

import KampanyaPage from './style';

const components = {
  'hediye-lira-kampanyasi': Pages.KampanyaKosullari
};

class Kampanya extends React.Component {
  static async getInitialProps({ query: { slug = 'hediye-lira-kampanyasi' } }) {
    return { slug };
  }
  renderPage() {
    const Page = components[this.props.slug];

    return <Page />;
  }
  render() {
    return (
      <Layout  meta={'Kampanya Koşulları'} >
        <KampanyaPage>
          <Container>
            <Flex className="main-area" mx={-1} alignItems="flex-start">
              <Flex width={[1, 1, 4 / 5]} ml={[0, 0, 2]} flexDirection="column">
                <Box p={[2, 2, 4]} className="content">
                  {this.renderPage()}
                </Box>
              </Flex>
            </Flex>
          </Container>
        </KampanyaPage>
      </Layout>
    );
  }
}

export default connect()(Kampanya);
