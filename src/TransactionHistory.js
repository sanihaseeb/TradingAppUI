import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function TransactionHistory() {

    const [history, setHistory] = useState([]);
    const rows = history;

    const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const navigate = useNavigate();
  async function postData(url, data) {
    // Default options are marked with *
    console.log("POSTING DATA: ", data);
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const url = "http://trading-app-trading-app.openshift75.conygre.com/api/stocks";
  const url_history = "http://trading-app-trading-app.openshift75.conygre.com/api/history";
  const handleSell = (row) => {
    postData(url_history, {
      symbol: row.symbol,
      currentPrice: row.currentPrice,
      tradingPrice: row.tradingPrice,
      status: 0,
      type: "SELL"
    });
    navigate('/transaction-history');
  }

  const handleBuyButton = () => {
    navigate('/listing');
  }
  const goToHome = () => {
    navigate('/');
  }

    useEffect(() => {
        const url = "http://trading-app-trading-app.openshift75.conygre.com/api/history";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setHistory(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, [history]);
    
  return (
    
    <div className="App">
      <header className="App-header">
      <header><h1>My Order History </h1></header>
     
      <TableContainer style={{ width: 1000 }} sx={{ minWidth: 650 }} component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
                <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Trade Price</TableCell>
                <TableCell align="right">Percentage Change</TableCell>
                <TableCell align="right">Order Time</TableCell>
                <TableCell align="right">Transaction Type</TableCell>
                <TableCell align="right">Transaction Status</TableCell>
               {/* <TableCell align="left"> <Button variant="contained" onClick={() => goToHome() }>Home </Button></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right">{row.currentPrice}</TableCell>
              <TableCell align="right">{row.tradingPrice}</TableCell>
              <TableCell align="right"><div className={row.currentPrice > row.tradingPrice ? "percentage-gain" : "percentage-loss"}>{((row.currentPrice-row.tradingPrice)/row.tradingPrice) + "%"}</div></TableCell>
              <TableCell align="right">{formatDate(row.orderTime)}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.status === "0" ? "PLACED" : row.status === "1" ? "IN PROGRESS" : row.status === "2" ? "SUCCESSFUL" : "FAILED" }</TableCell>
              <TableCell > <Button variant="contained" color="success" onClick={() => handleBuyButton() }>BUY </Button></TableCell>
              <TableCell > <Button disabled={(row.type === "BUY" && row.status === "2") ? false: true}variant="contained" color="error" onClick={() => handleSell(row) }>SELL </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </header>
    </div>

  );
}

export default TransactionHistory;
