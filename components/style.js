import styled from 'styled-components';
import { Box } from '@rebass/grid';

import { sp, color, media } from '../style/theme';

export const Section = (props) => {
  let marginProps = {};
  if (!props.my) {
    marginProps = {
      mt: props.mt || 6,
      mb: props.mb || 6,
    };
  }
  return (
    <Box
      as="section"
      {...{
        ...props,
        ...marginProps,
      }}
    />
  );
};

export const MainTitle = styled.h1`
  display: flex;
  align-items: flex-end;
  color: ${color.gray[1]};
  margin: 0 0 ${sp(3)} 0;
  font-size: 28px;
  ${media.tablet`
    font-size: 24px;
  `};
  &:before {
    content: '';
    width: 15px;
    height: 3px;
    background-color: ${color.primary};
    margin: 0 10px 9px 0;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: flex-end;
  color: ${color.gray[1]};
  margin: 0 0 ${sp(3)} 0;
  font-size: 28px;
  ${media.tablet`
    font-size: 24px;
  `};
  &:before {

    content: '';
    width: 15px;
    height: 3px;
    background-color: ${color.primary};
    margin: 0 10px 9px 0;
  }
`;

export default { Section };
