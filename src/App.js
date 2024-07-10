import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './userinfo/homepage';
import Login from './userinfo/login';
import NewMember from './userinfo/createaccount';
import Store from './userinfo/store';
import Profile from './userinfo/profile';
import Sidebar from './userinfo/sidebar'; // Import the Sidebar component
import Account from './userinfo/account';
import Views from './books/bookcategories';
import BookDetail from './books/bookdetails';
import SavedBook from './books/savedbooks';
import CheckOut from './checkout/checkoutscreen';
import Billing from './billing/billinginfo';
import Shipping from './shipping/shipping';
import AddAddress from './shipping/addaddress';
import AddBilling from './billing/addbilling'
import BuyHistory from './books/purchasehistory';

function App() {

  return (      
    <Router>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/home" Component={HomePage} />
      <Route path="/login" Component={Login} />
      <Route path="/newmember" Component={NewMember} />
      <Route path="/store" Component={Store} />
      <Route path="/profile" Component={Profile} />
      <Route path="/sidebar" Component={Sidebar} />
      <Route path="/account" Component={Account} />
      <Route path="/views/:genre" Component={Views} />
      <Route path="/details/:id" Component={BookDetail} />
      <Route path="/savedbooks" Component={SavedBook} />
      <Route path="/boughtbooks" Component={BuyHistory} />
      <Route path="/checkout/:userId" Component={CheckOut} />
      <Route path="/billing/:userId" Component={Billing} />
      <Route path="/shipping/:userId" Component={Shipping} />
      <Route path="/address" Component={AddAddress} />
      <Route path="/card" Component={AddBilling}/>
    
      
    </Routes>
  </Router>  
       
   );
}

export default App;
