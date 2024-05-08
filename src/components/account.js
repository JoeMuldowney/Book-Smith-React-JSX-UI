import * as React from 'react';
import axios from 'axios';
import '../index.css';
import Sidebar from './sidebar';
import Layout from './layout';
import coverphoto from '../images/cover.jpg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Account(){
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true);
    const[firstName, setFirstName] = React.useState('')
    const[lastName, setLastName] = React.useState('')
    const[username, setUsername] = React.useState('')
    const[email, setEmail] = React.useState('') 
    const [memberSince, setMemberSince] = useState(false)    
    const [error, setError] = React.useState('')
    
  
    useEffect(() => {
      const fetchAccountData = async () => {
        try{        
            const response = await axios.get('http://localhost:8000/users/viewaccount/');
            const profileData = response.data;
            setFirstName(profileData.first_name);
            setLastName(profileData.last_name);
            setUsername(profileData.username);
            setEmail(profileData.email);
            setMemberSince(profileData.member_since);
            console.log(profileData)
        } catch (error){
          console.error('Error fetching account data:', error);
          setError('Error fetching account data');
        }
      }
      fetchAccountData();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();  
        
      const response = await axios.post('http://localhost:8000/users/memberprofile/',
            {firstName, lastName, username, email, memberSince}           
        ).then(response => {
          console.log(response.data); // using for testing 

        })
        .catch (error =>{
          setError('Errors happened');
        })
      };
    return(
        <Layout>
        <div className="container">
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-profile">
        <legend>Account</legend>
        
        <div className='memberformcontainer'>
        <form onSubmit={handleSubmit}>
        <div>
        <label>First Name:</label>
        <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div>
        <label>Last Name:</label>
        <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
        <label>Username:</label>
        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
        <label>Email:</label>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>Member Since:</label>
        <input type='text' value={memberSince} onChange={(e) => setMemberSince(e.target.value)}/>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update</button>
        <button onClick={()=>{navigate("/store");}}>cancel</button>        

        </form>
        </div>
        </div>
        </div>
        </Layout>
    );
}
export default Account;