import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookUpdate from './bookupdate';
const CartToggleButton = (props) => {
  const { buyBook} = props;
  const {id} = useParams();
  const [isAdded, setIsAdded] = useState(false);
  //const[userId, setUserId] = useState()
  const [error, setError] = React.useState('')
  //convert to integers
  const bookId = parseInt(id, 10);
  const price = parseFloat(buyBook.cost,10)
  const amount = parseInt(buyBook.quantity)
  const[uid, setUserId] = React.useState(null)
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First request
        const userResponse = await axios.get('https://csjoeportfolio.com/backendapi/users/logstatus');
        const userId = userResponse.data.user_id;
        setUserId(userId);
    
        // Second request, using the userId from the first request
        const cartResponse = await axios.get('http://18.218.222.138:8020/getcartbook', {
          params: { id: id, user: userId }
        });
  
        // Log the response from the second request
        console.log("Cart response:", cartResponse.data);
  
        if (!cartResponse.data) {
          setIsAdded(false);
        } else {
          setIsAdded(true);
        }
  
      } catch (error) {
        setError('Error getting data');
      }
    };
  
    fetchData();
  }, [id]); // Assuming `id` is a dependency

  const addBook = () => {
    axios.post(
      'http://18.218.222.138:8020/cart',{ 
        "user_id": uid,     
        "book_id": bookId,
        "title": buyBook.title,
        "quantity": amount,
        "format": buyBook.format,
        "purchase": buyBook.purchaseType,
        "cost": price
      })
      .then(response => {        
        console.log("Book added to cart")
        setIsAdded(true);
      })       
      .catch(error => {
        console.error('Book Not Saved', error);
      });
  }  

  const deleteBook = () => {   
    axios.delete(
      `http://18.218.222.138:8020/delete`,{
        params: { id: id, user: uid }
      })
     .then(response => {       
        // Update state to reflect that the book is saved
        setIsAdded(false);
      })       
      .catch(error => {
        console.error('Book Not Deleted', error);
      });
  }

  const handleCartToggle = () => {
    if (isAdded) { 
        deleteBook();       
    } else {      
        addBook();    
    }
    // Toggle the saved state
    setIsAdded(!isAdded);
  }
  
  return (
    <div>
    <button onClick={handleCartToggle} style={{ fontSize: '12px' }}>
      {isAdded ? 'Remove from Cart' : 'Add to Cart'}
    </button>
    {isAdded && <BookUpdate buyBook={buyBook} userId={uid} />}
  </div>
  );
};

export default CartToggleButton;