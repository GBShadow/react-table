import React, { useEffect, useMemo, useState } from 'react';

import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from 'react-icons/fi';
import { format } from 'date-fns'

import DATA from '../data';
import COLUMNS from '../columns';
import GlobalFilter from '../GlobalFilter';

const Table: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(() => {
    const page = localStorage.getItem('pageNumber')
    return page !== null ? JSON.parse(page) : 0;
  })

  useEffect(() => {
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber))
  }, [pageNumber])

  const data = useMemo<any>(() => [...DATA.map(d => ({
    ...d,
    data: format(new Date(d.data), 'dd/MM/yyyy')
  }))], []);
  const columns = useMemo<any>(() => [...COLUMNS], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows, // tabela sem paginação
    page,
    gotoPage,
    pageCount,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: pageNumber }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const { globalFilter, pageIndex, pageSize } = state // page-size numeros de items por pagina


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
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FiArrowDown />
                          : <FiArrowUp />
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            page.map(row => {

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
      <div>
        <span>
          Ir para pagina: {' '}
          <input type="number" defaultValue={pageIndex} 
            onChange={(e) => {
              e.target.value ? 
                setPageNumber(Number(e.target.value) -1) : 
                setPageNumber(0)
               
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}><FiArrowLeft /></button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length} 
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}><FiArrowRight /></button>
        <button onClick={() => gotoPage(pageCount -1)} disabled={!canNextPage}>{'>>'}</button>
        <span>
        {' '}Items por pagina{' '}
          <strong> 
            {pageSize} 
          </strong>
        </span>
      </div>
    </div>
  );
}

export default Table;