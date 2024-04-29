import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit" component={Link} to="/home">View</Button>
        <Button color="inherit" component={Link} to="/insert">Insert</Button>
        <Button color="inherit" component={Link} to="/update">Update</Button>
        <Button color="inherit" component={Link} to="/delete">Delete</Button>
        <Button color="inherit" component={Link} to="/operations">Query Operations</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
