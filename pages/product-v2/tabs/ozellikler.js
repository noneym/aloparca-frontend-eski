import { Table } from 'semantic-ui-react';

const TabUyumluArac = ({ ozellikler }) => (
  <Table className="tab-ozellikler" basic="very" striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Başlık</Table.HeaderCell>
        <Table.HeaderCell>Açıklama</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {ozellikler.map((ozellik, index) => (
        <Table.Row key={index}>
          <Table.Cell>{ozellik.CRITERIA_NAME}</Table.Cell>
          <Table.Cell>{ozellik.CRITERIA_VALUES}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TabUyumluArac;
