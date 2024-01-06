import styled from 'styled-components';
import { border, sp, color, media } from '../../style/theme';
import { Box } from '@rebass/grid';

const Outer = styled.div`
  
  padding: ${sp(1)} 0;
  margin: ${sp(1)} 0;
  color: ${color.gray[1]};
  line-height: 1.4;
  ${media.tablet`
    display: none;
  `};
`;

const WorkHours = () => (
  <Outer>
    <Box 
      p={5}
      width='100%'

      color='black'
      css={{
        backgroundImage: 'url(../static/img/work_hours.jpg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }}>
    </Box>
  </Outer>
);

export default WorkHours;
