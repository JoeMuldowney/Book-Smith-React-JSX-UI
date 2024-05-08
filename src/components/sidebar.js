import React from 'react';
import '../index.css';
import { useState } from 'react';
import { GoBook } from "react-icons/go";
const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(prevIsOpen => !prevIsOpen);
      }


      return (
        <div className='container-sidebar'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggle}>{isOpen ? <GoBook /> : <GoBook />}</button>
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
                        <h2>Purchases</h2>
                        <ul>
                            <li><a href="#">Rentals</a></li>
                            <li><a href="#">Bought</a></li>
                            <li><a href="#">Saved Books</a></li>
                        </ul>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};


export default Sidebar;