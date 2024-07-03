import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import coverphoto from '../images/books.jpeg';
import { Grid, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../userinfo/layout';

// code for book genre dashboard 
function Views(){
  const {genre} = useParams();
  const [error, setError] = useState('')
  const[books, setBooks] = useState([
    {id: '',title:'', book_description:'', stock:'',buy_amount:'', rent_amount:'' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate()
  const cartClick = () => {
      navigate('/cart')
  }
  const bookdetailClick = (id) => {
    navigate(`/details/${id}`);
  };
  function extractFirst5Words(book_description) {
      // Split the description into an array of words
      var words = book_description.split(' ');
      // Take the first 5 words and join them back into a string
      var first5Words = words.slice(0, 5).join(' ');
      return first5Words;
  }
  useEffect(() => {
    fetchBooks();
  }, [genre, currentPage]);

    const fetchBooks = async () => {
        try{
          const response = await axios.get(`http://18.220.48.41:8000/books/category/${genre}/?page=${currentPage}`);
          if (response.status !== 200) { // Check the status of the response
            throw new Error('Failed to fetch data');
          }
            // Process the book descriptions before setting the state
          const processedBooks = response.data.books.map(book => ({
              ...book,
              book_description: extractFirst5Words(book.book_description)
        }));
          setBooks(processedBooks);  
          setTotalPages(response.data.total_pages);        
           
      } catch (error){
            
          setError('Error fetching books');
          console.error('Error fetching books', error);
        }
    }

    const goToPage = (page) => {
      setCurrentPage(page);
    };
 
    return(
      <Layout>
      <div className="container"> 
      
      <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-thriller">     
 
      <Grid container spacing={0}> {/* Set gutter spacing */}
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Score</strong></Typography>
       
      </Grid>
      <Grid item xs={4} md={3} lg={3}> {/* Set number of columns for different screen sizes */}
        <Typography variant="body1"><strong>Title</strong></Typography>
        
        {books.map((book, index) => (
          
          <Typography key={index} variant="body1" style={{cursor: 'pointer' }}onClick={() => bookdetailClick(book.id)}>{book.title}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={1} lg={4}>
        <Typography variant="body1"><strong>Description</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1"style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.id)}>{book.book_description}</Typography>
              ))}
      </Grid>

      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>On Hand</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1"style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.id)}>{book.stock}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Purchase</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1"style={{cursor: 'pointer' }} onClick={() => bookdetailClick(book.id)}>{book.buy_amount}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Rent</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1" style={{cursor: 'pointer' }}onClick={() => bookdetailClick(book.id)}>{book.rent_amount}</Typography>
              ))}
      </Grid>     
    </Grid>    
    <div>
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)}>Previous</button>
        )}
        
        Page {currentPage} of {totalPages}
        
        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)}>Next</button>
        )}</div>
        </div>
        
        </div>
        {/* Pagination Controls */}

        </Layout>
  );
}
export default Views