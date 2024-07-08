import axios from 'axios';
import Layout from '../userinfo/layout';
import coverphoto from '../images/billing.jpg';
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, Typography} from '@mui/material';



const Billing = () => {
    const navigate = useNavigate();
    const back = () => {
      navigate(-1);
      }
      const addCardClick = () => {
        navigate('/card')
      }
      const [cards, setCards] = useState([
    {
       
        first_name: '',
        last_name: '',
        card_num: '',
        payment_type: '',
        exp_date: '',
        pay_default: false
    }])


    const [mainCard, setMainCard] = useState(
    {
   
    first_name: '',
    last_name: '',
    card_num: '',
    payment_type: '',
    exp_date: '',
    pay_default: true
})

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
    useEffect(() => {
        const getBilling = async () => {
          try {
            // Fetch book data based on the bookId
            const resp = await axios.get('http://18.218.222.138:8020/billing', {withCredentials: true });
            const response = await axios.get('http://18.218.222.138:8020/allcard', {withCredentials: true });
            if(response.data != null){
              setCards(response.data);
            }
            if(resp.data != null){
            setMainCard(resp.data)
            }
            setLoading(false);
           
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
        getBilling();
      }, []);

      const setCardClick = (id) => {          
         
          axios.put('http://18.218.222.138:8020/updatecard',{
            "id":id,
            "pay_default": true
          })
          .then(response => {        
            console.log("Card Changed")
            window.location.reload();
          })       
          .catch(error => {
    
            console.error('Card Not Changed', error);
          })
  
  
        }

      
console.log(cards)
    return(
    <Layout>
    <div className="container-book-view">
    <img src={coverphoto} className="cover-image" alt=""/>
    <div className="text-overlay-bookview">
    <h1 style={{textAlign: "center"}}  >Payment Methods</h1>
    <h6 style={{textAlign: "center"}} >Click on a card to make current payment</h6>
    <Grid container spacing={2}> {/* Set gutter spacing */}
      <Grid item xs={2} md={3} lg={3}>
        <Typography variant="body1"><strong>Type</strong></Typography>
        {cards.map((card, index) => (          
          <Typography key={index} variant="body1"style={{cursor: 'pointer' }} onClick={() => setCardClick(card.id)} >{card.payment_type}</Typography> 
        ))}       
      </Grid>
      <Grid item xs={4} md={3} lg={2}> {/* Set number of columns for different screen sizes */}
        <Typography variant="body1"><strong>Ending In</strong></Typography>        
        {cards.map((card, index) => ( 
             
          <Typography key={index} variant="body1"style={{cursor: 'pointer' }}onClick={() => setCardClick(card.id)}>{card.card_num}</Typography> 
        ))}
      </Grid>
      <Grid item xs={4} md={1} lg={2}>
        <Typography variant="body1"><strong>Exp</strong></Typography>
        {cards.map((card, index) => (
                <Typography key={index} variant="body1"style={{cursor: 'pointer' }}onClick={() => setCardClick(card.id)}>{card.exp_date}</Typography>
              ))}
      </Grid>

      </Grid>  
   
    
    </div>   
    <div className="text-overlay-bookview-precart">
    <div>
    <h1 style={{textAlign: "center"}}>Payment Card In Use</h1>
    <p>{mainCard.first_name} {mainCard.last_name}</p>
    <p>{mainCard.payment_type}</p>   
    <p>Ending In: {mainCard.card_num} Exp: {mainCard.exp_date}</p>     
    </div>

    <div>
    <button onClick={back}>Back</button>
    <button onClick={addCardClick}>Add Card</button>
    
    </div>
    </div>
    </div>
    </Layout>  
  );
}
export default Billing;