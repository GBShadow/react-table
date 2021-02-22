import React, { useMemo } from 'react';

import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { format } from 'date-fns'

import DATA from '../data';
import COLUMNS from '../columns';
import GlobalFilter from '../GlobalFilter';


const Table: React.FC = () => {
  const data = useMemo<any>(() => [...DATA.map(d => ({
    ...d,
    data: format(new Date(d.data), 'dd/MM/yyyy')
  }))], []);
  const columns = useMemo<any>(() => [...COLUMNS], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  )

  const { globalFilter } = state
  return (
    <div>
      <h1>React Table</h1>

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
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