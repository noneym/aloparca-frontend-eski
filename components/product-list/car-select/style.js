import styled from 'styled-components';

const Outer = styled.div`
  background-color: #ff8900;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  .parca-ara {
    min-height: 130px;
    .label {
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
      color: white;
    }
    .ui.selection.dropdown {
      width: 100%;
      border: none;
      border-radius: 0;
      background-color: white;
    }
    .ui.button {
      height: 38px;
      color: white;
      text-transform: uppercase;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export default Outer;
