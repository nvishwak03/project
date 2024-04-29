import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

// Reuse the same styles from Home.js
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

const Operations = () => {
  const classes = useStyles();
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleExecuteQuery = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/executequery', { sqlQuery });
      setQueryResult(response.data);
      alert('Query executed successfully');
    } catch (error) {
      console.error('Error executing query:', error);
      alert('Failed to execute query');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTableHeader = () => {
    if (!queryResult || queryResult.length === 0) return null;

    return (
      <TableRow>
        {Object.keys(queryResult[0]).map((key, index) => (
          <TableCell key={index} className={classes.tableHeaderCell}>
            {key.toUpperCase()}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderTableData = () => {
    return (
      queryResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
        <TableRow key={index} className={classes.tableRow}>
          {Object.entries(row).map(([key, val], colIndex) => (
            <TableCell key={colIndex} className={classes.tableCell}>
              {val}
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h1>Execute SQL Query</h1>
      <TextField
        label="SQL Query"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={sqlQuery}
        onChange={(e) => setSqlQuery(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleExecuteQuery}>
        Execute
      </Button>

      {/* Display results in a table */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            {renderTableHeader()}
          </TableHead>
          <TableBody>
            {renderTableData()}
          </TableBody>
        </Table>
      </TableContainer>

      {queryResult && queryResult.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={queryResult.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
        />
      )}
    </div>
  );
};

export default Operations;
