import React, { useState } from 'react';
import coverphoto from '../images/cover.jpg';
import Layout from './layout';
import { useNavigate } from 'react-router-dom';
function Store(){

    const navigate = useNavigate()

    const thrillerClick = () => {
        navigate('/thriller')
    }

    return(
        <Layout>
        <div className="container">
       
        <img src={coverphoto} className="cover-image" alt=""/>        
        <div className="text-overlay-store">
       <legend>Virtual Library Book Catalog</legend>  
         </div>

         <div className="text-overlay-searchbar">
        <input type='text' placeholder='Search...'></input>
        <button type='submit'>Search</button>
         </div>

        <div className="text-overlay-categories">
             <div>         
            <label>Horror</label>
            <button>Browse</button>  
            </div>                   
           <div>
            <label>Sci-Fi</label> 
            <button>Browse</button>                    
            </div>
            <div>
            <label>Mystery</label> 
            <button>Browse</button>           
             </div> 
             <div>       
            <label>Thriller</label>
            <button onClick={thrillerClick}>Browse</button>                        
            </div>
            <div>
            <label>Fantasy</label> 
            <button>Browse</button>                      
            </div>
            <div>
            <label>Romance</label>
            <button>Browse</button>          
            </div>
            <div>
            <label>Non Fiction</label>
            <button>Browse</button>
            </div>                           
        </div>       

      
        </div>
        </Layout>
       
    );
}
export default Store;