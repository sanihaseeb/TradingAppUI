import logo from './logo.svg';
import './App.css';
// import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';




function LandingPage() {

  const navigate = useNavigate();

  const url = "http://trading-app-trading-app.openshift75.conygre.com/api/stocks";
  const url_history = "http://trading-app-trading-app.openshift75.conygre.com/api/history";

  const handleHistoryButton = () => {
    navigate('/transaction-history');
  }

  const handleStockListingButton = () => {
    navigate('/listing')
  }


    
  return (
    
    <div className="App">
      <div className="App-header">
        <header><h1>Welcome to TradeNOW!</h1></header>
        <TableCell > <Button variant="contained" color="primary" onClick={() => handleStockListingButton() }>Trade Now </Button></TableCell>
        <TableCell > <Button variant="contained" color="secondary" onClick={() => handleHistoryButton() }>View My Orders </Button></TableCell>
    </div>
     </div>

  );
}

export default LandingPage;
