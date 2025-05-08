import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import coverphoto from '../images/billing.jpg';
import Layout from '../userinfo/layout';

const AddBilling = () => {
  
  const navigate = useNavigate()
  const[firstName, setFirstName] = React.useState('')
  const[lastName, setLastName] = React.useState('')
  const[payment_type, setPayment] = React.useState('')
  const[card_num, setCardNum] = React.useState('')
  const[exp_date, setExpDate] = React.useState('')
  const[street, setStreet] = React.useState('')
  const[city, setCity] = React.useState('')
  const[state, setState] = React.useState('')
  const[zip_code, setZipCode] = React.useState('')
  const[userId, setUserId] = React.useState()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('https://csjoeportfolio.com/backendapi/users/logstatus/');
        if (response.status === 200) {          
          setUserId(response.data.user_id)          
        } 
      } catch (error) {
        console.error('Not able to retrieve user', error);
      }
    };
    getUser();
  }, []);

  const addCard =  (event) => {
    event.preventDefault();
    try {    

     axios.post(
      'https://joecsportfolio.com/addcard',
      {      
        "first_name": firstName,
        "last_name": lastName,
        "card_num": card_num,
        "payment_type": payment_type,
        "exp_date": exp_date,
        "street": street,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "user_id": userId 
      } 
    ).then(response => {        
      console.log("Card added successfully");
      navigate('/billing');
    }).catch(error => {
      console.error('Card Not Saved', error);
    });

  } catch (error) {
    console.error('Error fetching user ID', error);
  }
};

  const handleCardNum = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    // Format the value in groups of four
    value = value.replace(/(.{4})/g, '$1 ').trim();

    // Ensure the value does not exceed 19 characters (16 digits + 3 spaces)
    value = value.slice(0, 19);

    setCardNum(value);
  };

    const handleExpDate = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Format the value with "/" after the first two digits
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 6);
    }

    // Ensure the value does not exceed 7 characters (MM/YYYY)
    value = value.slice(0, 7);

    setExpDate(value);
  };

  return(    
  
  <Layout>
    <div className="container">
    <img src={coverphoto} className="cover-image" alt=""/>
    <section className="text-overlay-card">
    <h1>Payment Method</h1>    
    
    <form onSubmit={addCard}>
    <div className='form-page'>
    <div className="form-group-profile">

    <label>Billing First Name:</label>
    <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
    <label>Billing Last Name:</label>
    <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
    <label>Payment Type:</label>
    <input type="text" placeholder='Payment Type' value={payment_type} onChange={(e) => setPayment(e.target.value)}/>
    </div>
    <div className="form-group-profile">
    <label>Card Number</label>
    <input type="text" placeholder='0000 0000 0000 0000' value={card_num} onChange={handleCardNum}/>
    <label>Expiration</label>
    <input type="text" placeholder='MM/YYYY' value={exp_date} onChange={handleExpDate}/>
    <label>Street:</label>
    <input type="text" placeholder='Billing Street' value={street} onChange={(e) => setStreet(e.target.value)}/>
    </div>
    <div className="form-group-profile">
    <label>City:</label>
    <input type='text' placeholder='Billing City' value={city} onChange={(e) => setCity(e.target.value)}/> 
    <label>State:</label>
    <input type='text' placeholder='Billing State' value={state} onChange={(e) => setState(e.target.value)}/> 
    <label>ZIP code:</label>
    <input type='text' placeholder='Billing ZIP' value={zip_code} onChange={(e) => setZipCode(e.target.value)}/> 
    </div>
    </div>
    <button type="submit">Save</button>
    <button onClick={()=>{navigate(`/billing`);}}>cancel</button>        
    

    </form>
    </section>    
    </div>
    </Layout>
    );
}

export default AddBilling;