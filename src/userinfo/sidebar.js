
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

import { GoMail  } from "react-icons/go";
import {useNavigate } from 'react-router-dom';
const Sidebar = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }
    const savedBooksClick = () => {
        navigate('/savedbooks')
    }
    const boughtBooksClick = () => {
        navigate('/boughtbooks')
    }

      const [loggedin, setLoggedIn] = useState(false);      
    
      useEffect(() => {
        const fetchLogStatus = async () => {
          try {
            const response = await axios.get('https://csjoeportfolio.com/backendapi/users/logstatus/');
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


      return (
        <div className='container-sidebar'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggle}>{isOpen ? <GoMail /> : <GoMail />}</button>
            {isOpen && (
                <>
                    <div className="category">
                        <h2>Notifications</h2>
                        <ul>
                            <li><a href="#">Messages</a></li>
                            <li><a href="#">Reviews</a></li>
                            <li><a href="#">Likes</a></li>
                        </ul>
                    </div> 

                    <div className="category">
                        <h2>Books</h2>
                        <ul>                            
                            <li><a href="#" onClick={boughtBooksClick} className={!loggedin ? 'disabled' : ''}>Purchases</a></li>
                            <li><a href="#" onClick={savedBooksClick} className={!loggedin ? 'disabled' : ''}>Saved</a></li>
                        </ul>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};


export default Sidebar;