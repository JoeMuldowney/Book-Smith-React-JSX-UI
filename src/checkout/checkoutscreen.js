import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/checkout.jpg';
import {useNavigate } from 'react-router-dom';
import { Grid, Typography} from '@mui/material';



const CheckOut = () => {
  const navigate = useNavigate();
  const[userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [totalItems, setTotalItems] = useState();
  const [totalCost, setTotalCost] = useState();
  const[buyBook, setBuyBook] = useState([
    {book_id:0, title:'', format:'',purchase:'', cost:0.0, quantity: '', total_cost:0.0, total_items:0}
  ]); 
  const[address, setAddress] = useState([
    {first_name:'',last_name:'', street:'', city:'',state:'', zip_code:''}
  ]); 
  const[card, setCard] = useState([
    {payment_type:'', card_num:'', exp_date:''}
  ]);

useEffect(() => {
const getCheckOut = async () => {
  try{
  // First request
  const userResponse = await axios.get('https://csjoeportfolio.com/backendapi/users/logstatus');
  const userId = userResponse.data.user_id;
  setUserId(userId);
   
  const shipresponse = await axios.get(`https://joecsportfolio.com/go/shipping`, {
    params: { user: userId}})                 
    setAddress(shipresponse.data)         
    setLoading(false)
 
  const billresponse = await axios.get(`https://joecsportfolio.com/go/billing`,{
    params: { user: userId}})                 
    setCard(billresponse.data)
    setLoading(false)

   // Fetch book data based on the bookId
   const cartresponse = await axios.get(`https://joecsportfolio.com/go/checkout`,{
     params: { user: userId}})
     if(cartresponse.data.cart_items != null){             
     setBuyBook(cartresponse.data.cart_items)
     setTotalItems(cartresponse.data.total_items);
     setTotalCost(cartresponse.data.total_cost);
    }
    setLoading(false)
    } catch (error){
        console.error('Error fetching cart books', error);
        setError('Error fetching cart books');
    }
  }
  getCheckOut();
}, []);

const bookdetailClick = (id) => {
  navigate(`/details/${id}`);
};
 
if (loading) {
    return <p>Loading...</p>;
}
  if (error) {
    return <p>Error: {error.message}</p>; 
}

const clearCart = async () => {
  try {
  const bookIds = buyBook.map(book => ({ book_id: book.book_id }));
  const response = await axios.post('https://csjoeportfolio.com/backendapi/users/boughtbooks/', bookIds, { withCredentials: true });
  if (response.status === 200) { // Check the status of the response
    const deleteResponse = await axios.delete(`https://joecsportfolio.com/go/deleteall`,{
    params: { user: userId}})
    setBuyBook([]);
    setTotalItems();
    setTotalCost();
  }     
} catch (error) {
    console.error('Error clearing cart', error);
    setError('Error clearing cart');
  }
};

return (
    <Layout>
    <div className="container-book-view">
    <img src={coverphoto} className="cover-image" alt=""/>
    <div className="text-overlay-checkout">
    <h1 style={{textAlign: "center"}}>In Cart</h1>
    <h6 style={{textAlign: "center"}}>Click on a book to change the order</h6>
    <Grid container spacing={3}> 
      <Grid item xs={4} md={3} lg={5}>
        <Typography variant="body1"><strong>Title</strong></Typography>
        {buyBook.map((book, index) => (          
          <Typography key={index} variant= "body1"style={{cursor: 'pointer' }}onClick={() => bookdetailClick(book.book_id)}>{book.title}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={3} lg={1}>
        <Typography variant="body1"><strong>Price</strong></Typography>
        {buyBook.map((book, index) => ( 
          <Typography key={index} variant= "body1"style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.book_id)}>{book.cost}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={3} lg={2}> 
        <Typography variant="body1"><strong>Quantity</strong></Typography> 
        {buyBook.map((book, index) => (     
          <Typography key={index} variant="body1" style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.book_id)}>{book.quantity}</Typography> 
        ))}
      </Grid> 
      <Grid item xs={4} md={3} lg={2}> 
        <Typography variant="body1"><strong>Purchase</strong></Typography>  
        {buyBook.map((book, index) => (    
          <Typography key={index} variant="body1" style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.book_id)}>{book.purchase}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={3} lg={1}> 
        <Typography variant="body1"><strong>Format</strong></Typography>
        {buyBook.map((book, index) => (
          <Typography key={index} variant="body1" style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.book_id)}>{book.format}</Typography> 
        ))}
      </Grid>        
    </Grid>
    </div>
    <div className="text-overlay-bookview-checkout">
    <h1 style={{textAlign: "center"}}>Order Summary</h1>
    <p>Items: {totalItems}</p>
    <p>Total: {totalCost}</p>
    <h4>Payment Method</h4>
    <p>{card.payment_type}</p>
    <p>Ending In: {card.card_num} Expires: {card.exp_date}</p>
    <h4>Ship To:</h4>
    <p>{address.first_name} {address.last_name}</p>
    <p>{address.street}</p>
    <p>{address.city} {address.state} {address.zip_code}</p> 
  <div>
    <button onClick={()=>{navigate("/store");}}>Return</button>    
    <button onClick={clearCart}>Purchase</button>
    <button onClick={()=>{navigate(`/shipping`);}}>New Address</button>
    <button onClick={()=>{navigate(`/billing`);}}>New Card</button>
    </div> 
    </div>
    </div>   
    </Layout>    

  );
};

export default CheckOut;