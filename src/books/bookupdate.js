
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookUpdate = (props) => {
  const { buyBook } = props;
  const { id} = useParams();
  
 
  //convert to integers
  //const bookId = parseInt(id, 10);
  const amount = parseInt(buyBook.cost,10)
  const stockAmount = parseInt(buyBook.quantity,10)


  const updateBookCart = () => {
    axios.post(
      `http://18.218.222.138:8020/cartupdate/${id}`,{     
        "quantity": stockAmount,
        "format": buyBook.format,
        "purchase": buyBook.purchaseType,
        "cost": amount
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