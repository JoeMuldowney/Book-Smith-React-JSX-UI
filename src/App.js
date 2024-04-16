import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import Login from './components/login';
import NewMember from './components/createaccount';
import Store from './components/store';
function App() {

  return (      
    <Router>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/home" Component={HomePage} />
      <Route path="/login" Component={Login} />
      <Route path="/newmember" Component={NewMember} />
      <Route path="/store" Component={Store} />
    </Routes>
  </Router>  
       
   );
}

export default App;
