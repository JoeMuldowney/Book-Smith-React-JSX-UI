import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Toolbar = () => {
    
    const navigate = useNavigate()

    const handleProfile = async () => {
        try {      
            await axios.get('http://localhost:8000/users/memberprofile/');            
            navigate("/profile"); // Reload the page for simplicity
        } catch (error) {
            // Handle error
            console.error('Get profile failed:', error);
            // Display error message or take appropriate action
        }    
    };


    const handleLogout = async () => {
        try {
      // Make a POST request to logout endpoint
                await axios.post('http://18.220.94.221:8000/users/memberlogout/');
            // Handle successful logout, e.g., clear user session
            navigate("/home"); // Reload the page for simplicity
        } catch (error) {
            // Handle error
            console.error('Logout failed:', error);
            // Display error message or take appropriate action
        }
      // Helper function to get CSRF token from cookies

    };
    return (
        <div className="toolbar">
            <div className="logo">Your Logo</div>
            <div className="actions">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleProfile}>Account Profile</button>
            </div>
        </div>
    );
};

export default Toolbar;