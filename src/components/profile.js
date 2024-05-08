import * as React from 'react';
import axios from 'axios';
import '../index.css';
import Sidebar from './sidebar';
import Layout from './layout';
import coverphoto from '../images/cover.jpg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Profile(){
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true);
    const[profileDesc, setProfileDesc] =React.useState('')
    const[favoriteBook, setFavoriteBook] = React.useState('')
    const[currentBook, setCurrentBook] = React.useState('')
    const[favoriteAuthor, setFavoriteAuthor] = React.useState('')
    const[favoriteGenre, setFavoriteGenre] = React.useState('')    
    const [error, setError] = React.useState('')
    const [publicProfile, setPublicProfile] = useState(false) 
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try{        
            const response = await axios.get('http://18.220.48.41:8000/users/viewprofile/');
            const profileData = response.data;
            setProfileDesc(profileData.profileDesc);
            console.log(profileData.profileDesc)
            setFavoriteBook(profileData.favoriteBook);
            setCurrentBook(profileData.currentBook);
            setFavoriteAuthor(profileData.favoriteAuthor);
            setFavoriteGenre(profileData.favoriteGenre);
            setPublicProfile(profileData.publicProfile);
        } catch (error){
          console.error('Error fetching profile data:', error);
          setError('Error fetching profile data');
        }
      }
      fetchProfileData();
    }, []);
    
    const handleToggle = () => {
          setPublicProfile(!publicProfile); // Toggle the value
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
      const response = await axios.post('http://localhost:8000/users/memberprofile/',
            {profileDesc,favoriteBook, currentBook, favoriteAuthor, favoriteGenre, publicProfile}           
        ).then(response => {
          console.log(response.data); // using for testing 

        })
        .catch (error =>{
          setError('Errors happened');
        })
      };
    return(
        <Layout>
        <div className="container">
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-profile">
        <legend>Profile</legend>
        
        <div className='memberformcontainer'>
        <form onSubmit={handleSubmit}>
        <div>
        <label>Profile Description:</label>
        <input type="text" placeholder="Profile Description" value={profileDesc} onChange={(e) => setProfileDesc(e.target.value)}/>
        </div>
        <div>
        <label>What is your favorite book:</label>
        <input type="text" placeholder='Favorite Book' value={favoriteBook} onChange={(e) => setFavoriteBook(e.target.value)}/>
        </div>
        <div>
        <label>What book are you currently reading:</label>
        <input type="text" placeholder='Currently Reading' value={currentBook} onChange={(e) => setCurrentBook(e.target.value)}/>
        </div>
        <div>
        <label>Who is your favorite author:</label>
        <input type="text" placeholder='Favorite Author' value={favoriteAuthor} onChange={(e) => setFavoriteAuthor(e.target.value)}/>
        </div>
        <div>
        <label>What is your favorite genre:</label>
        <input type="text" placeholder='Favorite Genre' value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}/>
        </div>
        <div>
        <label>Do you want your profile to be public?</label>
        <input type='checkbox' checked={publicProfile}onChange={handleToggle} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update</button>
        <button onClick={()=>{navigate("/store");}}>cancel</button>        

        </form>
        </div>
        </div>
        </div>
        </Layout>
    );
}
export default Profile;