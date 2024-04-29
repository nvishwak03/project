import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Delete = () => {
  const [idToDelete, setIdToDelete] = useState('');

  const handleDelete = async () => {
    if (idToDelete) {
      try {
        const response = await Axios.delete(`http://localhost:5000/deletestudent/${idToDelete}`);
        alert(response.data);
        setIdToDelete('');
      } catch (error) {
        console.error('Error deleting the student:', error);
        alert('Failed to delete the student.');
      }
    } else {
      alert('Please enter a valid ID.');
    }
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h1>Delete Student Record</h1>
      <TextField
        label="ID to Delete"
        variant="outlined"
        value={idToDelete}
        onChange={(e) => setIdToDelete(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default Delete;
