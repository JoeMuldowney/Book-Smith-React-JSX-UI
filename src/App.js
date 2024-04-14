import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage';
import Login from './components/login';
import NewMember from './components/createaccount';
function App() {

  return ( 
   
     
    <Router>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/home" Component={HomePage} />
      <Route path="/login" Component={Login} />
      <Route path="/newmember" Component={NewMember} />
    </Routes>
  </Router>


   
       
   );
}

export default App;
