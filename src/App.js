import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import Login from './components/login';
import NewMember from './components/createaccount';
import Store from './components/store';
import Profile from './components/profile';
import Sidebar from './components/sidebar'; // Import the Sidebar component
import Account from './components/account';
import Thrillers from './books/thriller';
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
      <Route path="/thriller" Component={Thrillers} />
    
      
    </Routes>
  </Router>  
       
   );
}

export default App;
