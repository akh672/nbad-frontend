import React from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const navigate = useNavigate();
  const handleRouting = (route) => {
    navigate(route);
  }
  return (<>
    <Paper elevation={3} sx={{ 
      backgroundColor: 'white',
      color: 'black',
      height: '10vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      fontWeight: '800',
      padding: '0',
      fontSize: '40px',
      fontFamily: 'Roboto Condensed',
      display: 'flex',
      justifyContent: 'space-Between',
      alignItems: 'center'
      }}>
      <span style={{ margin: '0 0 0 30px'}}>
        {props.title}
      </span>
      <span className='navBarActions'>
        <div className="routeAction"
        onClick={() => handleRouting('/')}>
          Dashboard</div>
        <div className="routeAction"
        onClick={() => handleRouting('/addExpense')}>
          Expense
        </div>
        <div className="routeAction"
        onClick={() => handleRouting('/addBudget')}>
            Budget
        </div>
        <div>
          <Button variant='contained'
            sx={{
              backgroundColor: '#fa6166',
              color: 'white',
              fontFamily: 'Roboto Condensed',
            }}
            onClick={() => {
              navigate('/login');
              localStorage.clear();
            }}
          >
            LOGOUT
          </Button>
        </div>
      </span>
    </Paper>
    </>)
}

export default Navbar;