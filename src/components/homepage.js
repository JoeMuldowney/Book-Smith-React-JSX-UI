import React, { useState } from 'react';
import coverphoto from '../images/cover.jpg';
import { useNavigate } from 'react-router-dom';

function HomePage() { 
  const navigate = useNavigate();
  return (  
 
    <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay">
        
         Welcome to Virtual Library!
         <h3>A place to buy, rent, and leave reviews on books!</h3>
              
      </div>
      
      <div className="tool-bar">     
      <button onClick={()=>{navigate("/login");}}>Login</button>
      <button onClick={()=>{navigate("/newmember");}}>Create Account</button>
        <p>Browse as guest</p>
        </div>
 
      </div> 
     
    
  );  
}

export default HomePage;