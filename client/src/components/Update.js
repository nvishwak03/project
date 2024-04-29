import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Update = () => {
  const [idToUpdate, setIdToUpdate] = useState('');
  const [newName, setNewName] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:5000/updatestudent/${idToUpdate}`, {
        name: newName
      });
      alert(response.data);
      setIdToUpdate('');
      setNewName('');
    } catch (error) {
      console.error('Error updating the student:', error);
      alert('Failed to update the student.');
    }
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h1>Update Student Record</h1>
      <TextField
        label="ID of Student to Update"
        variant="outlined"
        value={idToUpdate}
        onChange={(e) => setIdToUpdate(e.target.value)}
        required
        style={{ margin: '10px' }}
      />
      <TextField
        label="New Name"
        variant="outlined"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        required
        style={{ margin: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  );
};

export default Update;
