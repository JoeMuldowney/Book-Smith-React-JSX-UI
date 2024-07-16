import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoPerson, GoBook, GoHome } from "react-icons/go";

const Toolbar = () => {
  axios.defaults.withCredentials = true;
  
  const navigate = useNavigate();
  const [loggedin, setLoggedIn] = useState(false);
  

  useEffect(() => {
    const fetchLogStatus = async () => {
      try {
        const response = await axios.get('http://csjoeportfolio.com/backendapi/users/logstatus/');
        if (response.status === 200) {
          setLoggedIn(true);
          // Set userId if logged in
        } else {
          setLoggedIn(false);
         
        }
      } catch (error) {
        setLoggedIn(false);
       
      }
    };

    fetchLogStatus();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const handleProfileClick = () => navigate('/profile');
  const handleAccountClick = () => navigate('/account');
  const cartClick = () => navigate(`/checkout`);
  const billingClick = () => navigate(`/billing`);
  const shippingClick = () => navigate(`/shipping`);
  const storeClick = () => navigate('/store');

  const handleLogout = async () => {
    try {
      await axios.post('https://csjoeportfolio.com/backendapi/users/memberlogout/');
      setLoggedIn(false);
    
      navigate('/store');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        navigate('/login');
      } else {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleLoginClick = () => navigate('/login');

  return (
    <div className='container-tool-bar'>
      <div className={`text-overlay-toolbar ${isOpen ? 'open' : ''}`}>
        <div className='menu'>
          <button onClick={storeClick}><GoHome /></button>
          <button onClick={cartClick}><GoBook /></button>
          <button onClick={toggle}><GoPerson /></button>
        </div>
        {isOpen && (
          <div className="category">
            <ul>
              <li><a href="#" onClick={handleProfileClick} className={!loggedin ? 'disabled' : ''}>Profile</a></li>
              <li><a href="#" onClick={handleAccountClick} className={!loggedin ? 'disabled' : ''}>Account</a></li>
              <li><a href="#" onClick={billingClick} className={!loggedin ? 'disabled' : ''}>Billing</a></li>
              <li><a href="#" onClick={shippingClick} className={!loggedin ? 'disabled' : ''}>Shipping</a></li>
              <li><a href="#" onClick={loggedin ? handleLogout : handleLoginClick}>
                {loggedin ? 'Logout' : 'Login'}
              </a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;