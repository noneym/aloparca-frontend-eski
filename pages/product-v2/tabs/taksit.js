import { Table } from 'semantic-ui-react';
import { Flex, Box } from '@rebass/grid';

const TabTaksit = ({ taksit, taksitTutar }) => (
  <div>
    {taksit && taksit.kredikarti && taksit.kredikarti.length > 0 && (
    <Table basic="very" className="taksit" celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {taksit.kredikarti.map((karttur) => (
            <Table.HeaderCell
              className={`taksit-secenek ${karttur.kart}`}
              key={karttur.kart}
            />
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {taksitTutar.map((item) => (
          <Table.Row key={item.taksit_sayisi}>
            <Table.Cell>
              {item.taksit_sayisi}
              {' '}
              Taksit
            </Table.Cell>
            {taksit.kredikarti.map((karttur) => (
              <Table.Cell key={karttur.kart}>
                {parseFloat(item.tutar).toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                })}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    )}
    {taksit && taksit.kredikarti && taksit.kredikarti.length > 0 && (
    <Flex className="taksit-mobile" flexDirection="column">
      {taksit.kredikarti.map((karttur) => (
        <Flex flexDirection="column" key={karttur.kart}>
          <Flex justifyContent="center" my={1} className={`taksit-secenek ${karttur.kart}`} />
          <Box mb={2}>

            <table width="100%">

              <tbody>
                <tr>
                  <td align="center">
                    <strong>Taksit Sayısı</strong>
                  </td>
                  <td align="center">
                    <strong>Taksit Tutarı</strong>
                  </td>
                  <td align="center">
                    <strong>Toplam Tutar</strong>
                  </td>
                </tr>
                {taksitTutar.map((item) => (
                  <tr key={item.taksit_sayisi}>
                    <td align="center">
                      {item.taksit_sayisi}
                      {' '}
                      Taksit
                    </td>
                    <td align="center">
                      {parseFloat(item.tutar).toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      })}
                    </td>
                    <td align="center">
                      {parseFloat(item.tutar * item.taksit_sayisi).toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Flex>
      ))}
    </Flex>
    )}
  </div>
);

export default TabTaksit;
