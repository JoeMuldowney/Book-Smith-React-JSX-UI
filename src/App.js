import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';  // adjust path as needed
import Register from './components/register';  // adjust path as needed
import Store from './components/store';  // adjust path as needed
import Category from './components/book/category';
import Detail from './components/book/detail';
import Profile from './components/profile';
import Billing from './components/billing/billing';
import Shipping from './components/shipping/shipping';
import BillInfo from './components/billing/info';
import AddAddress from './components/shipping/addshipping';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<Store />} />
        <Route path="/category/:genre"  element={<Category />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bill" element={<Billing/>} />
        <Route path="/cards" element={<BillInfo/>} />
        <Route path="/ship" element={<Shipping/>} />
        <Route path="/address" element={<AddAddress/>} />
      </Routes>
    </Router>
  );
}

export default App;