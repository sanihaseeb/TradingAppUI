import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockPage from "./StockPage";
import TransactionHistory from "./TransactionHistory"
import LandingPage from "./LandingPage"
import UserPortfolio from "./UserPortfolio"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />}/>
        <Route path="/listing" element={<StockPage />}/>
        <Route path="/transaction-history" element={<TransactionHistory />}/>
        <Route path="/portfolio" element={<UserPortfolio />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
