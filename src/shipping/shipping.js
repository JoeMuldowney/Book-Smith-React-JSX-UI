import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/billing.jpg';
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';

const Shipping = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [changeAddress, setChangeAddress] = React.useState(false);
    
const back = () => {
  navigate(-1);
      }
const addAddress = () => {
    navigate('/address')
}
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

useEffect(() => {
    const getShipping = async () => {
      try {
        // Fetch book data based on the bookId
        const response = await axios.get(`http://18.218.222.138:8020/allshipping/${userId}`, {withCredentials: true });
        const resp = await axios.get(`http://18.218.222.138:8020/shipping/${userId}`, {withCredentials: true });
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
    getShipping();
}, 
[]);

const setAddressClick = (id) =>{      
  axios.put(`http://18.218.222.138:8020/updateshipping/${userId}`, 
      {
        withCredentials: true, 
        "id":id,
        "ship_default": true
      })
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