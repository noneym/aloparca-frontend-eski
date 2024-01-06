import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';

import { Link } from '../../reactor';

import Api from '../../api';

const markalarListe = require('./data/markalar.json');

// const markalar = markalarListe[0].markalar;

const Outer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-bottom: 20px;
  .label {
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: #333333;
  }
  .markalar {
    .marka {
      position: relative;
      a {
        display: block;
        font-size: 15px;
        font-weight: 500;
        color: 525355;
        padding: 15px 10px;
        &:hover,
        &.active {
          color: #ff8900;
        }
      }
      & + .marka:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: rgba(34, 36, 38, 0.1);
      }
    }
  }
`;

class LastikMarkalari extends React.Component {
  // state = { markalar: markalarListe[0].markalar };

  render() {
    // const { markalar } = this.state;
    const { query } = this.props;

    // console.log('markalarListe : ', query);

    return (
      <Outer>
        <Flex p={2} flexDirection="column">
          <Box px={1} mb={2} className="label">
            MARKALAR
          </Box>
          <Flex className="markalar" flexDirection="column">
            {markalarListe.map(marka => (
              <Box className="marka" key={marka.id}>
                <Link
                  route="araca-gore-lastik"
                  className={cx({ active: marka.slug === query.marka })}
                  params={{ marka: marka.slug }}
                >
                  {marka.title}
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Outer>
    );
  }
}
export default LastikMarkalari;
