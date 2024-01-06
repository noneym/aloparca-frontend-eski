import { Flex, Box } from '@rebass/grid';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

const Outer = styled(Flex)`
  background-color: #ffb000;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
  .label {
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: white;
  }
  .ui.input input {
    font-family: 'Barlow', sans-serif;
    height: 40px;
    border: none;
    border-radius: 0;
    background-color: white;
    font-size: 1rem;
  }
  .ui.button {
    width: 100%;
    height: 40px;
    padding: 0px;
    color: white;
    text-transform: uppercase;
    border-radius: 0 3px 3px 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .button {
    width: 50px;
  }
`;

class SasiNoAra extends React.Component {
  state = {};
  render() {
    return (
      <Outer py={2} mb={2} flexDirection="column">
        <Box px={3} mb={2} className="label">
          Şasi No ile Ara
        </Box>
        <Box px={2}>
          <Flex>
            <Box>
              <Input placeholder="Şasi No Girin" />
            </Box>
            <Box className="button">
              <Button type="submit" name="btn_submit" fluid>
                Ara
              </Button>
            </Box>
          </Flex>
        </Box>
      </Outer>
    );
  }
}
export default SasiNoAra;
