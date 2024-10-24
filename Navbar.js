import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {

    const handleLogout = ()=>{
        console.log("handleLogout")
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Expense Tracker
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
  )
}

export default Navbar