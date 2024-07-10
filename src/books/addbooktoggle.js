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
  const price = parseInt(buyBook.cost,10)
  const amount = parseInt(buyBook.quantity)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://18.218.222.138:8020/data/${id}`);
        console.log(response.data);
        if (!response.data) {
          setIsAdded(false);
        } else {
          setIsAdded(true);
        }
  
        //const resp = await axios.get(`http://localhost:8000/users/logstatus`);
        //setUserId(resp.data.user_id)
      
        
      } catch (error) {
        setError('Error getting data');
      }
    };
  
    fetchData();
  }, []);

  const addBook = () => {
    axios.post(
      'http://18.218.222.138:8020/cart',{ 
        "user_id": userId,     
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
      `http://18.218.222.138:8020/delete/${id}/${userId}`)
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
    {isAdded && <BookUpdate buyBook={buyBook} userId={userId} />}
  </div>
  );
};

export default CartToggleButton;