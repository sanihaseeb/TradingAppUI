
import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Transactions',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

function UserPortfolio() {

    const [history, setHistory] = useState([]);
    const [user, setUser] = useState([]);
    const rows = history;


  const navigate = useNavigate();

  const url = "http://trading-app-trading-app.openshift75.conygre.com/api/stocks";
  const url_history = "http://trading-app-trading-app.openshift75.conygre.com/api/history";
  const url_user = "http://trading-app-trading-app.openshift75.conygre.com/api/users";

 

  const goToHistory = () => {
    navigate('/transaction-history');
  }
  const goToHome = () => {
    navigate('/');
  }
  const goToTrade = () => {
    navigate('/listing');
  }

 

    useEffect(() => {
        const url = "http://trading-app-trading-app.openshift75.conygre.com/api/history";
        const url_user = "http://trading-app-trading-app.openshift75.conygre.com/api/users";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            // console.log(json);
            setHistory(json);
          } catch (error) {
            console.log("error", error);
          }
        };

        const fetchUser = async () => {
          try {
            const response = await fetch(url_user);
            const json = await response.json();
            // console.log(json);
            setUser(json[0]);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchUser();
        fetchData();
    }, [user]);

    async function updateUserBalance() {
      // Default options are marked with *
      const url = url_user+"/1";
      const price = history[history.length - 1].currentPrice;
      const status = history[history.length - 1].status;
      const type = history[history.length - 1].type;
      let response;
      console.log(status);
      if(status === "2") {
        if(type==="BUY") {
      console.log("Putting DATA: ", price);
       response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({balance: user.balance - price}) // body data type must match "Content-Type" header
      });
    } else {
        console.log("Putting DATA: ", price);
        response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({balance: user.balance + price}) // body data type must match "Content-Type" header
        });
    }

      return response.json(); // parses JSON response into native JavaScript objects
      } 

      return null;
    }
  
    
  return (
    
    <div className="App">
      <div className="App-header">
      <header><h1>My Portfolio</h1></header>
      <TableCell align="left"><Button variant="contained" color="secondary" style={{
        borderRadius: 35,
        padding: "18px 36px",
        fontSize: "18px"
    }} onClick={() => updateUserBalance()}>Update Balance </Button></TableCell>
    <TableCell align="left" style={{fontSize: "30px"}}>$ {(Math.round(user.balance*100)/100)}</TableCell>
    <div className = "uiButton">
    <TableCell align="left"><Button variant="contained" onClick={() => goToHome() }>Home </Button></TableCell>
        <TableCell align="left"><Button variant="contained" color="success" onClick={() => goToTrade() }>Back to Trading </Button></TableCell>
        <TableCell align="left"><Button variant="contained" color="secondary" onClick={() => goToHistory() }>View My Orders </Button></TableCell>
    </div>
    <Doughnut data={data} />
      </div>
    
    </div>

  );
}

export default UserPortfolio;
