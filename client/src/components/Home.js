import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles'; // Import makeStyles from '@mui/system'

const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: 'auto',
    marginTop: '6%',
    marginBottom: '5%',
    borderRadius: '15px',
    overflow: 'hidden',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#85B7FF',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    whiteSpace: 'nowrap',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
    '&:nth-of-type(odd)': {
      backgroundColor: '#EBF3FF',
    },
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
},
  pagination: {
    overflow: 'hidden',
  },
});

const Home = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getdata");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTableHeader = () => {
    if (!data || data.length === 0) return null;

    return (
      Object.keys(data[0]).map((key, index) => (
        <TableCell key={index} className={classes.tableHeaderCell}>
          {key.toUpperCase()}
        </TableCell>
      ))
    );
  };

  const renderTableData = () => {
    if (!data || data.length === 0) return null;
  
    return (
      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
        <TableRow key={index} className={classes.tableRow}>
          {Object.entries(item).map(([key, val], valIndex) => (
            <TableCell style={{border:'1px solid #E6E6E6'}} key={valIndex} className={classes.tableCell}>
                {key === 'dob' || key === 'doa' ? val.substring(0, 10) : val}
            </TableCell> 
          ))}
        </TableRow>
      ))
    );
  };
  

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>{renderTableHeader()}</TableRow>
            {renderTableData()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={7}
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.pagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
