import React, { useState } from 'react';

import Layout from './layout';
function Store(){

    return(
        <Layout>    
        <div className="container">        
        <div className="text-overlay-login">     
      
       <legend>Virtual Library Book Categories</legend>  
    
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
        </Layout>
    );
}
export default Store;