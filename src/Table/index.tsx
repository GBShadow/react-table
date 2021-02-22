import React, { useMemo } from 'react';

import { useTable, useSortBy } from 'react-table';

import DATA from '../data';
import COLUMNS from '../columns';


const Table: React.FC = () => {
  const data = useMemo<any>(() => [...DATA], []);
  const columns = useMemo<any>(() => [...COLUMNS], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
  return (
    <div>
      <h1>React Table</h1>

      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  </th>
                ))}
              </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {

              prepareRow(row)
              return (

                <tr {...row.getRowProps()}>
                  {
                    row.cells.map(cell => {

                      return (
                        <td {...cell.getCellProps()}>
                          {
                            cell.render('Cell')}
                        </td>
                      )
                    })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;