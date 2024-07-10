import React from 'react';
import coverphoto from '../images/library.jpeg';
import { useNavigate } from 'react-router-dom';

function HomePage() { 
  const navigate = useNavigate();
  return (  
 
    <div className="container"> 
      
    <img src={coverphoto} className="cover-image" alt=""/>
    <div className="text-overlay">
        
    <legend>Welcome to Virtual Library!</legend>
    <h3>A place to buy, rent, and leave reviews on books!</h3>
              
    </div>
      
    <div className="tool-bar"> 

    <button onClick={()=>{navigate("/login");}}>Login</button>      
      
    <button onClick={()=>{navigate("/newmember");}}>Create Account</button>      
      
    <button onClick={()=>{navigate("/store");}}>Browse store</button>
     
    </div>
    </div>     
    
  );  
}

export default HomePage;