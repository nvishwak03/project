import React, { useState } from 'react';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Insert = () => {
  const [id, setId] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [doa, setDoa] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [nation, setNation] = useState('');
  const [address, setAddress] = useState('');
  const [emergency, setEmergency] = useState('');
  const [csem, setCsem] = useState('');
  const [percent, setPercent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await Axios.post('http://localhost:5000/postdata', { id, fname, lname, gender, dob, doa, dept, email, nation, address, emergency, csem, percent});
      console.log('Submission response:', response.data);
      setId('');
      setFname('');
      setLname('');
      setGender('');
      setDob('');
      setDoa('');
      setDept('');
      setEmail('');
      setNation('');
      setAddress('');
      setEmergency('');
      setCsem('');
      setPercent('');
      alert('Data inserted successfully!');
    } catch (error) {
      console.error('Error while inserting data:', error);
      alert('Failed to insert data.');
    }
  };

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h1>Insert New Record</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="First Name"
          variant="outlined"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Gender"
          variant="outlined"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="DOB"
          variant="outlined"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="DOA"
          variant="outlined"
          value={doa}
          onChange={(e) => setDoa(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Department Admission"
          variant="outlined"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Nationality"
          variant="outlined"
          value={nation}
          onChange={(e) => setNation(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Emergency Contact"
          variant="outlined"
          value={emergency}
          onChange={(e) => setEmergency(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Current Sem"
          variant="outlined"
          value={csem}
          onChange={(e) => setCsem(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <TextField
          label="Overall Percentage"
          variant="outlined"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          required
          style={{ margin: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ display: 'block', margin: '10px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Insert;
