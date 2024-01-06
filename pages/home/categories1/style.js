import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { sp } from '../../../style/theme';

const Outer = styled(Flex)`
  font-size: 18px;
  margin: ${sp(4)} 0;
  .category-item {
    line-height: 1.2;
    margin-top: 2px;
    color: ${props => props.theme.color.black[1]};
    strong {
      display: block;
      font-weight: 600;
    }
    .icon {
      font-size: 40px;
      margin-right: 20px;
    }
    .arrow {
      color: ${props => props.theme.color.gray[2]};
    }
    & + .category-item:before {
      content: '';
      width: 1px;
      height: 100%;
      background-color: ${props => props.theme.color.gray[2]};
      margin: 0 ${sp(2)};
    }
    &:hover {
      color: #ff8900;
    }
  }
  .button {
    background-image: linear-gradient(to bottom, rgb(82, 159, 220) 0%, rgb(68, 135, 211) 100%);
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: white;
    text-transform: uppercase;
    line-height: 1.2;
    font-weight: 400;
    padding: 20px 10px 20px 20px;
    border-radius: 3px;
    &.active {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    strong {
      display: block;
      font-weight: 600;
    }
  }
  .show-all {
    background-color: rgb(68, 135, 211);
    border-radius: 3px;
    border-top-right-radius: 0;
    .category-link {
      display: inline-flex;
      align-items: center;
      font-size: 18px;
      color: white;
      i {
        font-size: 30px;
        margin-right: 20px;
      }
      &:hover {
        color: #525355;
      }
    }
  }
`;

export default Outer;
