import styled from 'styled-components';
import { withRouter } from 'next/router';

import { media } from '../style/theme';

const BackButton = ({ router }) => {
  if (!router.route.match('home')) {
    return (
      <Outer href="javascript:;" onClick={() => window.history.back()}>
        <span className="icon-chevron-thin-left" /> <span className="text">Geri</span>
      </Outer>
    );
  }
  return null;
};

const Outer = styled.a`
  display: none;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: white !important;

  align-items: center;
  .text {
    margin-top: -1px;
  }
  ${media.tablet`
  display: flex;
  `}
`;

export default withRouter(BackButton);
