import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/billing.jpg';
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, Typography} from '@mui/material';

const Shipping = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [changeAddress, setChangeAddress] = React.useState(false);
    const[userId, setUserId] = React.useState()
    
const [address, setAddress] = useState([
    {
    id:0,
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    ship_default: false
}])

const [shippingAddress, setShippingAddress] = useState(
  {
  first_name: '',
  last_name: '',
  street: '',
  city: '',
  state: '',
  zip_code: '',
  ship_default: false
})

const back = () => {
  navigate(-1);
      }
const addAddress = () => {
    navigate('/address')
}

useEffect(() => {
  const getBilling = async () => {
    try {
        // First request
    const userResponse = await axios.get('https://csjoeportfolio.com/backendapi/users/logstatus');
    const userId = userResponse.data.user_id;
    setUserId(userId);
      // Fetch book data based on the bookId
    const resp = await axios.get(`http://3.129.70.204/go/shipping`,{
      params: { user: userId }
    })
    const response = await axios.get(`http://3.129.70.204/go/allshipping`,{
      params: { user: userId }
    })
    if (response.data != null){
      setAddress(response.data);
      setShippingAddress(resp.data)
      }
      setLoading(false);
         
    } catch (error) {
      setError(error);
      setLoading(false);
      }
  };
  getBilling();
}, []);

const setAddressClick = (id) =>{      
  axios.put(`https://3.129.70.204/go/updateshipping`,{withCredentials: true},{
    params: { user: userId, id: id}})
      .then(response => {        
          console.log("Address Changed")
          window.location.reload();
      })       
      .catch(error => {
  
        console.error('Address Not Changed', error);
    })
}
return(
    <Layout>
    <div className="container-book-view">
    <img src={coverphoto} className="cover-image" alt=""/>
    <div className="text-overlay-shipping-view">
    <h1 style={{textAlign: "center"}}>Shipping Address List</h1>
    <h6 style={{textAlign: "center"}}>Click on an address to make current shipping address</h6>
    
    <Grid container spacing={0}> {/* Set gutter spacing */}
      <Grid item xs={2} md={3} lg={5}>
        <Typography variant="body1"><strong>Street</strong></Typography>
        {address.map((address, index) => (          
          <Typography key={index} variant="body1" style={{cursor: 'pointer' }} onClick={() => setAddressClick(address.id)}>{address.street}</Typography> 
        ))}       
      </Grid>
      <Grid item xs={4} md={3} lg={2}> {/* Set number of columns for different screen sizes */}
        <Typography variant="body1"><strong>City</strong></Typography>        
        {address.map((address, index) => (          
          <Typography key={index} variant="body1"style={{cursor: 'pointer' }} onClick={() => setAddressClick(address.id)}>{address.city}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={1} lg={2}>
        <Typography variant="body1"><strong>State</strong></Typography>
        {address.map((address, index) => (
                <Typography key={index} variant="body1" style={{cursor: 'pointer' }} onClick={() => setAddressClick(address.id)}>{address.state}</Typography>
              ))}
      </Grid>
      <Grid item xs={4} md={1} lg={2}>
        <Typography variant="body1"><strong>ZIP code</strong></Typography>
        {address.map((address, index) => (
                <Typography key={index} variant="body1" style={{cursor: 'pointer' }}onClick={() => setAddressClick(address.id)}>{address.zip_code}</Typography>
              ))}
      </Grid>  
      </Grid>     
    </div>   
    <div className="text-overlay-shipping-default">   
    <div>
    <div>
    <h1 style={{textAlign: "center"}}>Current Shipping Address</h1>
    <div>
    <p>{shippingAddress.first_name} {shippingAddress.last_name} </p>
    <p>{shippingAddress.street}</p>
    <p>{shippingAddress.city} {shippingAddress.state} {shippingAddress.zip_code}</p> 
    </div>
    <button onClick={back}>Back</button>
    <button onClick={addAddress}>Add Address</button> 
    </div>
    </div>
    </div>
    </div>
    </Layout>  
    );
}
export default Shipping;