import { useEffect, useState } from 'react'
import { forwardRef } from 'react';
import MaterialTable, { Icons } from 'material-table'
import { Grid, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import DATA from '../data';
import COLUMNS from '../columns';
import './style.css'


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { format } from 'date-fns';
import { parseJSON } from 'date-fns/esm';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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

interface IColumn {
  field: string;
  title: string;
}

export default function MTable() {
  const [rows, setRows] = useState<OS[]>([])
  const [columns, setColumns] = useState<IColumn[]>([])

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });


  useEffect(() => {

    const dataRows = DATA.map(cell => {
      return {
        ...cell,
        data: format(parseJSON(cell.data), "dd/MM/yyyy")
      }
    })
    setRows(dataRows)
    setColumns(COLUMNS)
  }, [])



  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            style={{ fontSize: '1rem' }}
            title="Ordens de serviço"
            icons={tableIcons}
            columns={columns}
            data={rows}
          />
        </MuiThemeProvider>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}
