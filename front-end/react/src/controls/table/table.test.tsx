import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Table } from './table';

describe('Table', () => {
  const columns = [
    { field: 'id', headerText: 'ID' },
    { field: 'name', headerText: 'Name' },
    { field: 'age', headerText: 'Age' },
  ];
  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
  ];
  const options = { alwaysShowHeader: true };

  it('renders without crashing', () => {
    render(<Table columns={columns} data={data} options={options} />);
  });

  it('renders the correct number of rows', () => {
    const { getAllByRole } = render(<Table columns={columns} data={data} options={options} />);
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // +1 for the header row
  });

  it('renders the correct number of columns', () => {
    const { getAllByRole } = render(<Table columns={columns} data={data} options={options} />);
    const headerCells = getAllByRole('columnheader');
    expect(headerCells).toHaveLength(columns.length);
  });

  it('renders the correct header text', () => {
    const { getByText } = render(<Table columns={columns} data={data} options={options} />);
    columns.forEach((column) => {
      const headerCell = getByText(column.headerText);
      expect(headerCell).toBeInTheDocument();
    });
  });
});