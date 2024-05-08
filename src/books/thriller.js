import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import coverphoto from '../images/thriller.jpg';
import { Grid, Typography } from '@mui/material';



function Thrillers(){
    const [error, setError] = useState('')
    const[books, setBooks] = useState([
      {title:'', book_description:'',year:'', stock:'',buy_amount:'', rent_amount:'' }
    ]);
    

    useEffect(() => {
        const fetchThrillerBooks = async () => {
          try{
            const response = await axios.get('http://18.220.94.221:8000/books/thrillers/');
            if (response.status !== 200) { // Check the status of the response
              throw new Error('Failed to fetch data');
            }
            console.log('Fetched data:', response.data);
            setBooks(response.data.books);
          
           
        } catch (error){
            console.error('Error fetching books', error);
            setError('Error fetching books');
          }
        }
        fetchThrillerBooks();
      }, []);

      console.log(books)
    return(
      <div className="container"> 
      
      <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-horror">  
        

          
            <Grid container spacing={0}> {/* Set gutter spacing */}
            <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Review Score</strong></Typography>
       
      </Grid>
      <Grid item xs={4} md={3} lg={2}> {/* Set number of columns for different screen sizes */}
        <Typography variant="body1"><strong>Title</strong></Typography>
        
        {books.map((book, index) => (
          
          <Typography key={index} variant="body1">{book.title}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={1} lg={3}>
        <Typography variant="body1"><strong>Description</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1">{book.book_description}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={2}>
        <Typography variant="body1"><strong>Year</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1">{book.year}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>On Hand</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1">{book.stock}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Purchase</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1">{book.buy_amount}</Typography>
              ))}
      </Grid>
      <Grid item xs={2} md={3} lg={1}>
        <Typography variant="body1"><strong>Rent</strong></Typography>
        {books.map((book, index) => (
                <Typography key={index} variant="body1">{book.rent_amount}</Typography>
              ))}
      </Grid>

    </Grid>

         

        </div>
        </div>

  
     

    );
}
export default Thrillers