import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';
import { TimelineMax } from 'gsap';

import Layout from '../../layouts/container';
import { Container, Link } from '../../reactor';
import { Title } from '../../components/style';
import Pages from '../../components/pages/yardim';

import HelpPage from './style';

import Menu from './menu.json';

const components = {
  uyelik: Pages.Uyelik,
  urunler: Pages.Urunler,
  odeme: Pages.Odeme,
  siparis: Pages.Siparis,
  'kargo-ve-teslimat': Pages.Kargo,
  fatura: Pages.Fatura,
  'iade-ve-geri-gonderim': Pages.Iade,
};

class Help extends React.Component {
  static async getInitialProps({ query }) {
    const slug = query.slug ? query.slug : 'uyelik';
    return { slug };
  }

  componentDidMount() {
    this.createMenuAnim();
  }

  createMenuAnim() {
    if (this.submenu && this.subMenuIcon) {
      this.menuTL = new TimelineMax({ paused: true, reversed: true })
        .from(this.submenu, 0.3, {
          height: 0,
          alpha: 0,
          paddingTop: 0,
          clearProps: 'height',
        })
        .to(this.subMenuIcon, 0.3, {
          rotation: 90,
          delay: -0.3,
        });
    }
  }

  openMenu = () => {
    if (this.menuTL) {
      if (this.menuTL.reversed()) {
        this.menuTL.timeScale(1).play();
      } else {
        this.menuTL.timeScale(1.5).reverse();
      }
    }
  };

  renderPage() {
    const Page = components[this.props.slug];

    return <Page />;
  }
  render() {
    const { slug } = this.props;
    return (
      <Layout
        meta={{
          title: `Yardım - ${
            Menu.find((item) => {
              if (item.slug === slug) return item;
            }).title
          }`,
        }}
      >
        <HelpPage>
          <Container>
            <Flex className="main-area" mx={-1} alignItems="flex-start">
              <Box className="menu" width={[1, 1, 1 / 5]} p={2} mb={[3, 3, 0]}>
                <div className="label">
                  Yardım
                  <a href="javascript:;" onClick={this.openMenu} className="mobile-menu-link">
                    <i
                      className="icon-chevron-thin-right"
                      ref={(n) => {
                        this.subMenuIcon = n;
                      }}
                    />
                  </a>
                </div>
                <ul
                  className="submenu"
                  ref={(n) => {
                    this.submenu = n;
                  }}
                >
                  {Menu.map(item => (
                    <li key={item.title}>
                      <Link
                        route={item.route}
                        params={{ slug: item.slug }}
                        className={cx({ active: slug === item.slug })}
                      >
                        {item.title}
                        <i className="dropdown icon" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
              <Flex width={[1, 1, 4 / 5]} ml={[0, 0, 2]} flexDirection="column">
                <Box mb={2}>
                  <Title>
                    {
                      Menu.find((item) => {
                        if (item.slug === slug) return item;
                      }).title
                    }
                  </Title>
                </Box>
                <Box p={[2, 2, 4]} className="content">
                  {this.renderPage()}
                </Box>
              </Flex>
            </Flex>
          </Container>
        </HelpPage>
      </Layout>
    );
  }
}

export default connect()(Help);
