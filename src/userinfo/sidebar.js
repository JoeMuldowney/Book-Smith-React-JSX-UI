import React from 'react';
import '../index.css';
import { useState } from 'react';
import { GoMail  } from "react-icons/go";
import {useNavigate } from 'react-router-dom';
const Sidebar = () => {
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
                            <li><a href="#" onClick={boughtBooksClick}>Purchases</a></li>
                            <li><a href="#" onClick={savedBooksClick}>Saved</a></li>
                        </ul>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};


export default Sidebar;