import * as React from 'react';
import axios from 'axios';
import '../index.css';

import Layout from './layout';
import coverphoto from '../images/store.jpeg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Account(){
    const navigate = useNavigate()
    const [edit, setEdit] = React.useState(false);
    const [deleteAccount, setDeleteAccount] = React.useState(false);
    const[showSidebar, setShowSidebar] = useState(true);
    const[firstName, setFirstName] = React.useState('')
    const[lastName, setLastName] = React.useState('')
    const[username, setUsername] = React.useState('')
    const[email, setEmail] = React.useState('') 
    const[memberSince, setMemberSince] = useState(false)    
    const[error, setError] = React.useState('')    
  
    useEffect(() => {
      const fetchAccountData = async () => {
        try{        
            const response = await axios.get('http://18.220.48.41:8000/users/viewaccount/');
            const profileData = response.data;
            setFirstName(profileData.first_name);
            setLastName(profileData.last_name);
            setUsername(profileData.username);
            setEmail(profileData.email);
            setMemberSince(profileData.member_since);
            
        } catch (error){
          console.error('Error fetching account data:', error);
          setError('Error fetching account data');
        }
      }
      fetchAccountData();
    }, []);    

    const handleSubmit = async (e) => {
        e.preventDefault();        
      const response = await axios.patch('http://18.220.48.41:8000/users/emailpatch/',
            {email}           
        ).then(response => {
          console.log("Email Updated")
          window.location.reload();
        })
        .catch (error =>{
          setError('Errors happened');
        })
      };

      const makeChanges = (e) => {
        e.preventDefault();
        if(deleteAccount == false){
          setEdit(true);
        }       
        
      };
      const handleDelete = (e) => {
        e.preventDefault();       
       
      };

    return(
        <Layout>
        <div className="container">
        <img src={coverphoto} className="cover-image" alt=""/>
        <section className="text-overlay-profile">
        <h1>Virtual Library Account</h1>      
        <form onSubmit={edit ? handleSubmit : (deleteAccount ? handleDelete : makeChanges)}>
        {!edit && !deleteAccount &&(
        <> 
        <div className='form-page'>
        <div className="form-group-account">
        <label>First Name:</label>
        {firstName}
        <label>Last Name:</label>
        {lastName}
        </div>
        <div className="form-group-account">
        <label>Username:</label>
        {username}
        <label>Email:</label>
        {email}
        </div>
        </div>
        
        <div className="form-group-account-date">
        <label>Member Since:</label>
        {memberSince.month}-{memberSince.day}-{memberSince.year}
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Edit</button>
        <button onClick={()=>{navigate("/store");}}>Return</button>
        <button onClick={()=>{setDeleteAccount(true)}}>Delete</button>       
        </>
        )}       
        {edit && (
        <>       
        <div className='form-page'>
        <div className="form-group-account">
        <label>First Name:</label>
        {firstName}
        <label>Last Name:</label>
        {lastName}
        </div>
        <div className="form-group-account">
        <label>Username:</label>
        {username}
        <label>Email:</label>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        </div>
        
        <div className="form-group-account-date">
        <label>Member Since:</label>
        {memberSince.month}-{memberSince.day}-{memberSince.year}
        </div>

        {error && <p>{error}</p>}
        <button type="submit">Save</button>
        <button onClick={()=>{setEdit(false)}}>cancel</button> 
        </>
      )}
      {deleteAccount && (
      <>
      <label>Are you sure you want to delete your account?  No information will be saved</label>
      <button type="submit">Yes</button>
      <button onClick={()=>{setDeleteAccount(false)}}>No</button>
      </>
      )}     
      
        </form>        
        </section>
        </div>
        </Layout>
    );
}
export default Account;