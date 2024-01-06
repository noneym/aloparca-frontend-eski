import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';

import { Link } from '../../reactor';

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
  .categories {
    .category {
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
      & + .category:before {
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

class Category extends React.Component {
  state = {};

  render() {
    const { query: { id = '3' }, data } = this.props;
    return (
      <Outer>
        <Flex p={2} flexDirection="column">
          <Box px={1} mb={2} className="label">
            Kategoriler
          </Box>
          <Flex className="categories" flexDirection="column">
            {data &&
              data.map(category =>
                  category.name && (
                    <Box className="category" key={category.name}>
                      <Link
                        route="motor-oil"
                        className={cx({
                          active: category.id === id,
                        })}
                        params={{ id: category.id }}
                      >
                        {category.name}
                      </Link>
                    </Box>
                  ))}
          </Flex>
        </Flex>
      </Outer>
    );
  }
}
export default Category;
