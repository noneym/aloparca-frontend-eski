import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';

import { Link } from '../../../reactor';
import menu from './menu-home.json';
import { site } from '../../../reactor/func';


const Outer = styled(Flex)`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 35px 30px 10px;
    background-image: linear-gradient(rgb(244, 143, 44) 0%, rgb(233, 190, 8) 100%);
    color: white;
    &:hover {
      background-image: linear-gradient(rgb(233, 190, 8) 0%, rgb(244, 143, 44) 100%);
    }
    i {
      font-size: 50px;
      margin-bottom: 15px;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 50px;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const Hesabim = () => (
  <Outer flexWrap="wrap" mx={-2} my={-2}>
    {menu.map(item => (
      site === "aloparca" && item.slug === "kumbara" ? null :
      <Box width={[1 / 2, 1 / 2, 1 / 4]} px={2} py={2} key={item.slug}>
        <Link route={item.route} params={{ slug: item.slug }}>
          <i className={`icon-hesabim-${item.slug}`} />
          <span>{item.title}</span>
        </Link>
      </Box>
    ))}
  </Outer>
);

export default Hesabim;
