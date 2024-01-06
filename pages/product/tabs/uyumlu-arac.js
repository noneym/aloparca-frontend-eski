import { Table } from 'semantic-ui-react';

const TabUyumluArac = ({ cars, carLimit }) => (
  <Table basic="very" celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Marka</Table.HeaderCell>
        <Table.HeaderCell>Model</Table.HeaderCell>
        <Table.HeaderCell>Kasa Tipi</Table.HeaderCell>
        <Table.HeaderCell>Model Yılı</Table.HeaderCell>
        <Table.HeaderCell>Motor Tipi</Table.HeaderCell>
        <Table.HeaderCell>Beygir</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {cars &&
        cars.slice(0, carLimit).map((car, index) => (
          <Table.Row key={index}>
            <Table.Cell>{car.CAR_BRANDS}</Table.Cell>
            <Table.Cell>{car.MODEL_CAR}</Table.Cell>
            <Table.Cell>{car.BODY_TYPE}</Table.Cell>
            <Table.Cell>{car.YEAR}</Table.Cell>
            <Table.Cell>{car.TYP_CAR}</Table.Cell>
            <Table.Cell>{car.KV}KW</Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

export default TabUyumluArac;
