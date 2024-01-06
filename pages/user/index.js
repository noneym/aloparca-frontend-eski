import { connect } from 'react-redux';
import { Flex } from '@rebass/grid';

import { Container } from '../../reactor';
import { Title } from '../../components/style';
import Pages from '../../components/pages/user';
import UserPage from './style';

const SubPage = {
  giris: {
    title: 'Üye Girişi',
    Component: Pages.UyeGiris,
  },
  'yeni-uye': {
    title: 'Yeni Üye',
    Component: Pages.UyeOl,
  },
  'sifremi-unuttum': {
    title: 'Şifremi Unuttum',
    Component: Pages.SifremiUnuttum,
  },
};


const User = ({ slug }) => {
  if(!slug)
    return null;
  const Page = SubPage[slug];
  if(!Page)
    return null
  return (
    <UserPage>
      <Container>
        <Title>{Page.title}</Title>
        <Flex className="main-area" justifyContent="center">
          <Page.Component />
        </Flex>
      </Container>
    </UserPage>
  );
}

User.defaultProps = {
  slug: 'giris'
}

export default connect()(User);
