
import './App.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';





function LandingPage() {

  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const url = "http://trading-app-trading-app.openshift75.conygre.com/api/users";
  const url_history = "http://trading-app-trading-app.openshift75.conygre.com/api/history";

  useEffect(() => {
      
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("USER " + json[0].username);
        setUser(json[0]);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);

  const handleHistoryButton = () => {
    navigate('/transaction-history');
  }

  const handleStockListingButton = () => {
    navigate('/listing')
  }

  const handlePortfolio = () => {
    navigate('/portfolio')
  }

    
  return (
    
    <div className="App">
      <div className="App-header">
        <header><h1>Welcome to TradeNOW!</h1></header>
        <TableCell > <Button variant="contained" color="primary" onClick={() => handleStockListingButton() }>Trade Now </Button></TableCell>
        <TableCell > <Button variant="contained" color="secondary" onClick={() => handleHistoryButton() }>View My Orders </Button></TableCell>
        <TableCell > <Button variant="contained" color="success" onClick={() => handlePortfolio() }>View Portfolio </Button></TableCell>
        {/* <div className="user-balance">
          Hello, {user.username}!
        </div> */}
    </div>
     </div>

  );
}

export default LandingPage;
