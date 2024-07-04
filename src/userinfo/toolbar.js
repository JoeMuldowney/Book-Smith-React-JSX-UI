import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {GoPerson, GoBook, GoHome} from "react-icons/go";

const Toolbar = () => { 
    
    axios.defaults.withCredentials = true;    
    const navigate = useNavigate()

    const [loggedin, setLoggedIn] = useState() 
   
    useEffect(() => {
        const fetchLogStatus = async () => {
        
        axios.get('http://18.220.48.41:8000/users/logstatus/')
        .then(response => {
            if (response.status === 201) {          
                setLoggedIn(true);
              }else {
                // Status code other than 200, assume the book is not saved
                setLoggedIn(false);
              }
            })       
            .catch(error => {
              // Any error in the request, assume the book is not saved
              setLoggedIn(false);
            });
        }
        fetchLogStatus();
      }, []);    

    const [isOpen, setIsOpen] = useState(false);
    function toggle() {
        setIsOpen(prevIsOpen => !prevIsOpen);
      }

      function logtoggle() {
        setIsOpen(prevIsOpen => !prevIsOpen);
      }
    
    const handleProfileClick = () => {
        // Navigate to a different page
        navigate('/profile');
    };
    const handleAccountClick = () => {
        // Navigate to a different page
        navigate('/account');
    };
    const cartClick = () => {
        // Navigate to a different page
        navigate('/checkout');
    };
    const billingClick = () => {
        // Navigate to a different page
        navigate('/billing');
    };
    const shippingClick = () => {
        // Navigate to a different page
        navigate('/shipping');
    };
    const storeClick = () => {
        // Navigate to a different page
        navigate('/store');
    };


    const handleLogout = () => {
        axios.post('http://18.220.48.41:8000/users/memberlogout/')
            .then(response => {
                console.log('logged out') 
                setLoggedIn(false);
            })
            .catch(error => {
                // Check if the error contains response data
                if (error.response && error.response.status === 400) {
                    navigate('/login')
                    console.error('Not logged in:', error.response.data);
                } else {
                   
                    console.error('Logout failed:', error);
                }
            });
    };  
    return (
        
        <div className='container-tool-bar'>      
        <div className={`text-overlay-toolbar ${isOpen ? 'open' : ''}`}>
            <div className='menu'>
            <button onClick={storeClick}>{<GoHome />}</button>
            <button onClick={cartClick}>{<GoBook/>}</button>
            <button onClick={toggle}>{isOpen ?<GoPerson /> : <GoPerson />}</button>            
            </div>
            {isOpen && (
                <>
                    <div className="category">
                        <ul>
                        <li><a href="#" onClick={handleProfileClick} className={!loggedin ? 'disabled' : ''}>Profile</a></li>
                            <li><a href="#" onClick={handleAccountClick}className={!loggedin ? 'disabled' : ''}>Account</a></li>
                            <li><a href="#" onClick={billingClick}className={!loggedin ? 'disabled' : ''}>Billing</a></li>
                            <li><a href="#" onClick={shippingClick}className={!loggedin ? 'disabled' : ''}>Shipping</a></li>
                            <li><a href="#" onClick={handleLogout}>{loggedin ? 'Logout' :'Login'}</a></li>
                        </ul>
                    </div>
                </>    
            )}
        </div>
        </div>
           
            
      
       
      
       
    );
};

export default Toolbar;