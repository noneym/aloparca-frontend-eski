import { Table } from 'semantic-ui-react';

const TabOem = ({ oemler }) => (
  <Table className="tab-oem" basic="very" striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Marka</Table.HeaderCell>
        <Table.HeaderCell>OEM Kod</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {oemler.map(oem => (
        <Table.Row key={`${oem.marka}-${oem.oem}`}>
          <Table.Cell>{oem.marka}</Table.Cell>
          <Table.Cell>
              {oem.oem}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TabOem;
