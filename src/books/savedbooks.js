import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/store.jpeg';
import {useNavigate } from 'react-router-dom';
import { Grid, Typography,Button } from '@mui/material';

const SavedBook = () => {
const { id } = useParams();
const navigate = useNavigate();
const cartClick = () => {
    navigate('/cart')
}
const bookdetailClick = (id) => {
  navigate(`/details/${id}`);
};  
const[book, setBooks] = useState([
    {id:'',title:'',author:'',book:'' }
]);
  
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchBook = async () => {
    try {
      // Fetch book data based on the bookId
      const response = await axios.get('http://18.220.48.41:8000/users/savedbooks/');
        // Process the book descriptions before setting the state
        const processedBooks = response.data.books.map(book => ({
          ...book         
      }));
        setBooks(processedBooks);          
         
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
    <h1>Virtual Library Saved Books</h1>
    <h6>Click on a book to read more details</h6>   
    <Grid container spacing={4}>
   
    <Grid item xs={2} md={3} lg={3}>
    <Typography variant="body1"><strong>Review Score</strong></Typography>     
    </Grid>
    <Grid item xs={4} md={3} lg={5}> {/* Set number of columns for different screen sizes */}
    <Typography variant="body1"><strong>Title</strong></Typography>
    {book.map((book, index) => (
    <Typography key={index} variant="body1"style={{cursor: 'pointer' }}onClick={() => bookdetailClick(book.id)}>{book.title}</Typography>))}
    </Grid>
    <Grid item xs={4} md={3} lg={3}> {/* Set number of columns for different screen sizes */}
    <Typography variant="body1"><strong>Author</strong></Typography>
    {book.map((book, index) => (
    <Typography key={index} variant="body1"style={{cursor: 'pointer' }}onClick={() => bookdetailClick(book.id)}>{book.author}</Typography>))}
    </Grid> 

  </Grid>
  </section>
  </div>
     
      </Layout>
  );
};
export default SavedBook;