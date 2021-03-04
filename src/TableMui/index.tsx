import { useEffect, useState } from 'react'

import DATA from '../data';
import COLUMNS from '../columns';

import { Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Theme, Paper, TableSortLabel } from '@material-ui/core';

interface OS {
  os: number;
  cliente: string;
  ced: string;
  bandeira: string;
  tecnico: string;
  data: string;
  projeto: string;
  status: string;
  acoes: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: 600,
    },
    '& tbody tr': {
      transition: 'background .2s',
    },
    '& tbody tr:hover': {
      backgroundColor: '#7159c1',
      cursor: 'pointer',
    },
    '& tbody tr:hover td': {
      color: '#fff',
    }
  }
}))

export default function TableMui() {
  const [rows, setRows] = useState<OS[]>([])
  const [columns, setColumns] = useState<any>([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState(0)

  const classes = useStyles();

  useEffect(() => {
    setRows(DATA)
    setColumns(COLUMNS)
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSortColumn = (field: number) => {
    const isAsc = orderBy === field && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(field)
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array: OS[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [OS, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  columns.map((column: any) => (
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === column.filed}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={() => { handleSortColumn(column.field) }}>
                        {column.headerName}
                      </TableSortLabel>
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={item.os}>
                    <TableCell>{item.os}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.ced}</TableCell>
                    <TableCell>{item.bandeira}</TableCell>
                    <TableCell>{item.tecnico}</TableCell>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.projeto}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.acoes}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[10, 2]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </TableContainer>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}
