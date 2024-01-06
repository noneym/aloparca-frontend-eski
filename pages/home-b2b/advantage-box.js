import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import cx from 'classnames';

const Outer = styled(Flex)`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  height: 100%;
  border: 1px solid #eee;
  .icon {
    font-size: 60px;
    margin-right: 20px;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
    text-align: left;
    padding: 0;
  }
  .description {
    font-size: 16px;
  }
`;

const AdvantageBox = ({ data }) => {
  const { title, description, icon } = data;

  return (
    <Outer alignItems="center">
      <Box className={cx('icon', `icon-${icon}`)} />
      <Flex flexDirection="column">
        <h3 className="title">{title}</h3>
        <Box className="description">{description}</Box>
      </Flex>
    </Outer>
  );
};

export default AdvantageBox;
