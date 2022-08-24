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




function StockPage() {

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

  const handleBuyButton = (data) => {
    
    postData(url_history, data);
    navigate('/transaction-history');
  }

    const [stocks, setStocks] = useState([]);
    const rows = stocks;

    const goToHome = () => {
      navigate('/');
    }

    useEffect(() => {
      
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setStocks(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);
    
  return (
    
    <div className="App">
      <div className="App-header">
        <header><h1>Stock Listings</h1></header>
      <TableContainer style={{ width: 1000 }} sx={{ minWidth: 650 }} component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Trade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right"> <Button variant="contained" color="success" onClick={() =>
                handleBuyButton({
                 symbol: row.symbol,
                 currentPrice: row.price,
                 tradingPrice: row.price,
                 status: 0,
                 type: "BUY"
              })}>BUY </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <Button variant="contained" onClick={() => goToHome() }>Home </Button> */}
    </div>
     </div>

  );
}

export default StockPage;
