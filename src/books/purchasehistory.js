import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/store.jpeg';
import {useNavigate } from 'react-router-dom';
import { Grid, Typography,Button } from '@mui/material';

const BuyHistory = () => {
const { id } = useParams();
const navigate = useNavigate();

const bookReviewClick = (id) => {
  navigate(`/reviews/${id}`);
};  
const[book, setBook] = useState([
    {book_id:0, title:'', author: ''}
  ]); 
  

const [error, setError] = useState(null);

useEffect(() => {
  const fetchBook = async () => {
    try {
      // Fetch book data based on the bookId
      const response = await axios.get('http://localhost:8000/users/boughthistory/');
        // Process the book descriptions before setting the state
        const processedBooks = response.data.books.map(book => ({
          ...book         
      }));
        setBook(processedBooks);          
         
      } catch (error){
          console.error('Error fetching books', error);
          setError('Error fetching books');
        }
      }
      fetchBook();
  }, []);
  return(
    <Layout>
    <div className="container">     
    <img src={coverphoto} className="cover-image" alt=""/>
    <section className="text-overlay-saved-books">
    <h1>Virtual Library Purchase History</h1>
    <h6>Click on a book to leave a review</h6>   
    <Grid container spacing={3}> 
      <Grid item xs={4} md={3} lg={5}>
        <Typography variant="body1"><strong>Title</strong></Typography>
        {book.map((book, index) => (          
          <Typography key={index} variant= "body1"style={{cursor: 'pointer' }}>{book.title}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={3} lg={3}>
        <Typography variant="body1"><strong>Author</strong></Typography>
        {book.map((book, index) => ( 
          <Typography key={index} variant= "body1"style={{cursor: 'pointer' }}>{book.author}</Typography> 
        ))}
      </Grid>
      
        
    </Grid>
  </section>
  </div>
     
      </Layout>
  );
};
export default BuyHistory;