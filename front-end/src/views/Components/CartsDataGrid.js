import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  {
    field: 'image',
    headerName: 'ITEM DESCRIPTION',
    width: 350,
  },
  {
    field: 'print_option',
    headerName: 'YOUR OPTIONS',
  },
  {
    field: 'price',
    headerName: 'PRICE',
    type: 'number',
    width: 100,
  },
];

export default function CartsDataGrid({data}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
