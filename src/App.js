import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockPage from "./StockPage";
import TransactionHistory from "./TransactionHistory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockPage />}/>
        <Route path="/transaction-history" element={<TransactionHistory />}/>
        </Routes>
      </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
