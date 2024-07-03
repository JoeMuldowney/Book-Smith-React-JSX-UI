import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookUpdate from './bookupdate';
const CartToggleButton = (props) => {
  const { buyBook} = props;
  const { id} = useParams();
  const [isAdded, setIsAdded] = useState(false);
 
  //convert to integers
  const bookId = parseInt(id, 10);
  const price = parseInt(buyBook.cost,10)
  const amount = parseInt(buyBook.quantity)

  useEffect(() => {
    const checkAddedStatus = () => {
      axios.get(
        `http://18.116.29.111:8020/data/${id}`)
        .then(response => {
          console.log(response.data)
          if (!response.data) {
            setIsAdded(false);
          } else {
            setIsAdded(true);
          }
        })       
        .catch(error => {
          // Any error in the request, assume the book is not saved
          setIsAdded(false);
        });
      }
      checkAddedStatus()
    },[]);

  const addBook = () => {
    axios.post(
      'http://18.116.29.111:8020/cart',{      
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
      `http://18.116.29.111:8020/delete/${id}`)
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
    {isAdded && <BookUpdate buyBook={buyBook} />}
  </div>
  );
};

export default CartToggleButton;