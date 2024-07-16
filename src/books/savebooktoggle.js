import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ToggleButton = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
  const checkSavedStatus = () => {
    axios.get(
      `http://csjoeportfolio.com/backendapi/users/bookstatus/${id}`)
      .then(response => {
        if (response.status === 201) {
          // Status 200 indicates that the book is saved          
          setIsSaved(true);
        }else {
          // Status code other than 200, assume the book is not saved
          setIsSaved(false);
        }
      })       
      .catch(error => {
        // Any error in the request, assume the book is not saved
        setIsSaved(false);
      });
    }
    checkSavedStatus()
  },[]);

  const saveBook = () => {
    axios.post(
      `http://csjoeportfolio.com/backendapi/users/savebook/${id}`)
      .then(response => {
        console.log(response.data);
        // Update state to reflect that the book is saved
        setIsSaved(true);
      })       
      .catch(error => {
        console.error('Book Not Saved', error);
      });
  }

  const deleteBook = () => {   
    axios.delete(
      `http://csjoeportfolio.com/backendapi/users/deletebook/${id}`)
      .then(response => {
        console.log(response.data);
        // Update state to reflect that the book is saved
        setIsSaved(false);
      })       
      .catch(error => {
        console.error('Book Not Deleted', error);
      });
  }

  const handleToggle = () => {
    if (isSaved) {
      // If item is already saved, delete it
      deleteBook();
    } else {
      // If item is not saved, save it
      saveBook();
    }
    // Toggle the saved state
    setIsSaved(!isSaved);
  };

  return (
    <button onClick={handleToggle}>
      {isSaved ? 'Unsave' : 'Save'}
    </button>
  );
};

export default ToggleButton;