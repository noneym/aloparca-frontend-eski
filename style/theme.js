import { css } from 'styled-components';
import { Flex } from '@rebass/grid';

export const color = {
  primary: '#ff8900',
  black: ['#010101', '#525355'],
  gray: ['#666', '#999', '#ddd', '#eee'],
};

export const font = {
  heading: "'Barlow', sans-serif",
  content: "'Barlow', sans-serif",
};

export const space = [0, 10, 20, 32, 40, 80, 110];
const breakpoints = ['48em', '64em'];

const sizes = {
  giant: 1440,
  desktop: 1280,
  tablet: 1023,
  phone: 767,
  phoneMini: 576,
  mini: 414,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

const br = [0, 5, 10, 15];

export const container = () => css`
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  ${media.giant`
    padding-left:40px;
    padding-right:40px;
    max-width:100%;
  `};
  ${media.tablet`
    padding-left: 20px;
    padding-right: 20px;
  `};
`;

export const sp = (px = 0) => `${space[px]}px`;
export const borderRadius = (px = 0) => `border-radius:${br[px]}px;`;
export const border = (position, c = '#ddd') => {
  const params = `1px solid ${c}`;
  switch (position) {
    case 't':
      return `border-top: ${params}`;
    case 'b':
      return `border-bottom: ${params}`;
    case 'l':
      return `border-left: ${params}`;
    case 'r':
      return `border-right: ${params}`;
    case 'y':
      return `border-bottom: ${params}; border-top: ${params}`;
    case 'x':
      return `border-left: ${params}; border-right: ${params}`;
    default:
      return `border: ${params}`;
  }
};

export const Row = props => <Flex mx={[-1, -1, -2]} flexWrap="wrap" {...props} />;
export const Column = props => <Flex width={1 / 2} px={[1, 1, 2]} {...props} />;

export default {
  color,
  font,
  space,
  breakpoints,
  br,
  sp,
  border,
};
