import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';  // adjust path as needed
import Register from './components/register';  // adjust path as needed
import Store from './components/store';  // adjust path as needed
import Category from './components/book/category';
import Detail from './components/book/detail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<Store />} />
        <Route path="/category/:genre"  element={<Category />} />
        <Route path="/details/:id" Component={Detail} />
      </Routes>
    </Router>
  );
}

export default App;