import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/store.jpeg';
import {useNavigate } from 'react-router-dom';
import ToggleButton from './savebooktoggle';
import CartToggleButton from './addbooktoggle';

const BookDetail = () => {
  const[book, setBook] = useState(
    {id:0, title:'', book_description:'', stock:0, buy_amount:0.00, 
    rent_amount:0.00 }
  ); 
  const[buyBook, setBuyBook] = useState(
    {id:0, title:'', format:'',purchaseType:'', cost:0.00, quantity: 1}
  ); 

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalQuantity, setQuantityValue] = useState(1);  
  const [selectedFormat, setSelectedFormat] = useState(buyBook.format);
  const [selectedPurchaseType, setSelectedPurchaseType] = useState(buyBook.purchaseType);
  
 
useEffect(() => {

  const fetchBook = async () => {
      try {
        // Fetch book data based on the bookId
        const response = await axios.get(`http://csjoeportfolio.com/backendapi/books/view/`+id, {withCredentials: true });
        if (response.status !== 200) { // Check the status of the response
            throw new Error('Failed to fetch data');
          }        
        // Set the fetched book data to the state
        setBook(response.data.book);
        setLoading(false);

       
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBook();
   
  }, [id]);

// Event handlers to update the state when radio inputs change

const handleFormatChange = (event) => {
  setSelectedFormat(event.target.value);

  setBuyBook({ ...buyBook, format: event.target.value, title: book.title });  
};

const handlePurchaseTypeChange = (event) => {
  let selectedValue = event.target.value;
  let price;  
  // Set price based on the selected purchase type
  if (selectedValue === 'buy') {
    price = book.buy_amount;    
  } else if (selectedValue === 'rent') {   
    price = book.rent_amount;
  }
  setSelectedPurchaseType(selectedValue);
  setBuyBook({ ...buyBook, purchaseType: selectedValue, cost: price }); 
  console.log("get price:",price) 
};

//handle select for book quantity
const handleDropdownChange = (event) => {
  let selectedValue = event.target.value;
  setQuantityValue(selectedValue);
  setBuyBook({ ...buyBook, quantity: selectedValue });
};

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
   
  }

  return (
    <Layout>
    <div className="container-book-view">
    <img src={coverphoto} className="cover-image" alt=""/>
    <div className="text-overlay-bookview">
    <h1>{book.title}</h1>
    <p>By {book.author}</p>
    <p>{book.book_description} </p>
    
    </div>   
    <div className="text-overlay-bookview-precart">
    <h1 style={{textAlign: "center"}}>Book Purchase Options</h1>
    <h6 style={{textAlign: "center"}}>All fields must be filled out to purchase book</h6>
    
    <div className='form-page'>    
    <div className='form-group-store'>
    <h3>Book Format</h3>
    
    <input type="radio" id="paperback" name="format" value="paperback" checked={selectedFormat === "paperback"} 
    onChange={handleFormatChange}/> <label htmlFor="paperback">Paperback</label> 
    <div>
    <input type="radio" id="hardcover" name="format" value="hardcover"
    checked={selectedFormat === "hardcover"} onChange={handleFormatChange}/>
    <label htmlFor="hardcover">Hardcover</label>
    </div> 
    </div>   
    <div className='form-group-store'>
    <h3>Purchase Type</h3>
    <input type="radio" id="buy" name="purchase" value="buy"
    checked={selectedPurchaseType === "buy"} onChange={handlePurchaseTypeChange}/>
    <label htmlFor="buy">Buy ${book.buy_amount}</label>    
    <div>
    <input type="radio" id="rent" name="purchase" value="rent"
    checked={selectedPurchaseType === "rent"} onChange={handlePurchaseTypeChange}/>
    <label htmlFor="rent">Rent ${book.rent_amount}</label>
    </div>
    </div>
      
  <div className='form-group-store'>
  <h3>Quantity</h3>
  <div>
  <label htmlFor="copies">Copies</label>
  
  <select id="copies" value={totalQuantity} onChange={handleDropdownChange}>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
  </select>
  </div>
</div>
</div> 
<div>
    <button onClick={()=>{navigate("/store");}}>Return</button>
    </div> 
    
    <ToggleButton book={book} />    
    {buyBook.purchaseType && buyBook.cost && buyBook.format && (
        <CartToggleButton buyBook={buyBook}/>
      )}    
   
     
    </div>  
    </div>
    </Layout>    

  );
};

export default BookDetail;