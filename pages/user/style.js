import styled from 'styled-components';
import { media } from '../../style/theme';

const UserPage = styled.div`
  padding: 50px 0;
  background-color: #eeeeee;
  .main-area {
    padding: 50px;
    ${media.tablet`padding: 25px;`};
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;
export default UserPage;
