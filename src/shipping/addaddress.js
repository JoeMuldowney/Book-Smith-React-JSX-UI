import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import coverphoto from '../images/billing.jpg';
import Layout from '../userinfo/layout';
const AddAddress = () => {

  const navigate = useNavigate()

  const[firstName, setFirstName] = React.useState('')
  const[lastName, setLastName] = React.useState('')
  const[street, setStreet] = React.useState('')
  const[city, setCity] = React.useState('')
  const[state, setState] = React.useState('')
  const[zip_code, setZipCode] = React.useState('')
  const[default_ship, setDefaultShip] = React.useState(false)
  const[userId, setUserId] = React.useState()
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://18.220.48.41:8000/users/logstatus/');
        if (response.status === 200) {          
          setUserId(response.data.user_id)          
        } 
      } catch (error) {
        console.error('Not able to retrieve user', error);
      }
    };
    getUser();
  }, []);

  const addAddress = (event) => {
    event.preventDefault();
    axios.post(
      'http://18.218.222.138:8020/address',{      
        "first_name": firstName,
        "last_name": lastName,
        "street": street,
        "city": city,
        "state": state,
        "zip_code":  parseInt(zip_code, 10),
        "user_id": userId   
      })
      .then(response => {        
        console.log("Address Added!")
        navigate('/shipping');
      })       
      .catch(error => {
        console.error('Address Not Saved', error);
      });
  }
  return (
    <Layout>
    <div className="container">
    <img src={coverphoto} className="cover-image" alt=""/>
    <section className="text-overlay-profile">
    <h1>Shipping Address</h1> 
    
    <form onSubmit={addAddress}>
    <div className='form-page'>
    <div className="form-group-profile">
    <label>First Name:</label>
    <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
    <label>Last Name:</label>
    <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
    <label>Street:</label>
    <input type="text" placeholder='Street' value={street} onChange={(e) => setStreet(e.target.value)} />
    </div>
    <div className="form-group-profile">
    <label>City:</label>
    <input type='text' placeholder='City' value={city}  onChange={(e) => setCity(e.target.value)}/>
    <label>State:</label>
    <input type='text' placeholder='State' value={state}  onChange={(e) => setState(e.target.value)}/> 
    <label>ZIP code:</label>
    <input type='text' placeholder='12345' value={zip_code} onChange={(e) => setZipCode(e.target.value)}/> 
    </div> 
    </div>
    <button type="submit">Save</button>
    <button onClick={()=>{ navigate('/shipping');}}>cancel</button>        
    
    </form>
    </section>
    
    </div>
    </Layout>
  );
};

export default AddAddress;