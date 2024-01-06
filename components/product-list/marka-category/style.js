import styled from 'styled-components';

const Outer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  margin-bottom: 20px;
  padding: 10px 0;
  .model-title {
    padding: 20px;
    font-size: 16px;
    font-weight: 500;
  }
  a {
    .item {
      padding: 15px 0px;
      margin: 0 20px;
      border-bottom: 1px solid #eee;
      &.active {
        font-weight: 700;
        color: #333;
      }
    }
    &:last-child {
      .item {
        border-bottom: none;
      }
    }
  }
`;

export default Outer;
