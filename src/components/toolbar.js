import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {GoPerson, GoBell } from "react-icons/go";
const Toolbar = () => { 
    
    axios.defaults.withCredentials = true;    
    const navigate = useNavigate()

    const [loggedin, setLoggedIn] = useState() 
    const [error, setError] = React.useState('')
    useEffect(() => {
        const fetchLogStatus = async () => {
          try{
            const response = await axios.get('http://18.220.48.41:8000/users/logstatus/');
            
            setLoggedIn(response.data.is_authenticated);
            console.log(loggedin);
        } catch (error){
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data');
          }
        }
        fetchLogStatus();
      }, []);
    

    const [isOpen, setIsOpen] = useState(false);
    function toggle() {
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


    const handleLogout = () => {
        axios.post('http://localhost:8000/users/memberlogout/')
            .then(response => {
                console.log('logged out') 
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
            <button onClick={toggle}>{isOpen ?<GoPerson /> : <GoPerson />}</button>
            {isOpen && (
                <>
                    <div className="category">
                       
                        <ul>
                        <li><a href="#" onClick={handleProfileClick} className={!loggedin ? 'disabled' : ''}>Profile</a></li>
                            <li><a href="#" onClick={handleAccountClick}className={!loggedin ? 'disabled' : ''}>Account</a></li>
                            <li><a href="#" className={!loggedin ? 'disabled' : ''}>Billing and payments</a></li>
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