import React, { useState } from 'react';
import coverphoto from '../images/cover.jpg';

function Store(){

    return(

        <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-login">
       
       <h2>Virtual Library Store</h2>
       <legend>Browse Book Categories</legend>  
    
        </div>
        <div className="text-overlay-categories">
            <div className="category">
            <div className="book-category">
            <legend>Horror</legend>
            <button>browse</button>
            </div>
            <div className="book-category">
            <legend>Sci-Fi</legend>
            </div>
            <div className="book-category">
            <legend>Mystery</legend>
            </div>
            <div className="book-category">
            <legend>Thriller</legend>
            </div>
            </div>
            <div className="category">
            <div className="book-category">
            <legend>Fantasy</legend>
            </div>
            <div className="book-category">
            <legend>Romance</legend>
            </div>
            <div className="book-category">
            <legend>Non Fiction</legend>
            </div>
            </div>        
        </div>
        </div>

    );
}
export default Store;