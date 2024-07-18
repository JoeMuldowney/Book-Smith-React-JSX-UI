
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookUpdate = (props) => {
  const { buyBook, userId} = props;
  const { id} = useParams();
  console.log(userId)
 

  const amount = parseFloat(buyBook.cost,10)
  const stockAmount = parseInt(buyBook.quantity,10)


  const updateBookCart = () => {
    axios.post(
      `https://joecsportfolio.com/go/cartupdate/${id}`,{     
        "quantity": stockAmount,
        "format": buyBook.format,
        "purchase": buyBook.purchaseType,
        "cost": amount,
        "user_id": userId
      })
      .then(response => {        
        console.log("Book updated in cart")
      
      })       
      .catch(error => {

        console.error('Book Not Updated', error);
      });
  } 

  return (
    <button onClick={updateBookCart} style={{ fontSize: '14px' }}>
      Update Options
    </button>
  );
};

export default BookUpdate;