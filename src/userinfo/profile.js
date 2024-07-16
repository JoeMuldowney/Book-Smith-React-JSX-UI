import * as React from 'react';
import axios from 'axios';
import '../index.css';
import Sidebar from './sidebar';
import Layout from './layout';
import coverphoto from '../images/store.jpeg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Profile(){
    const navigate = useNavigate()
    const [edit, setEdit] = React.useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [view, setView] = React.useState('');
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
            const response = await axios.get('http://csjoeportfolio.com/backendapi/users/viewprofile/');
            const profileData = response.data;
            setProfileDesc(profileData.profileDesc);            
            setFavoriteBook(profileData.favoriteBook);
            setCurrentBook(profileData.currentBook);
            setFavoriteAuthor(profileData.favoriteAuthor);
            setFavoriteGenre(profileData.favoriteGenre);
            setPublicProfile(profileData.publicProfile);
            if(publicProfile){
              setView('Yes')
            }
            else{
              setView('No')
            }
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
        
      const response = await axios.post('http://csjoeportfolio.com/backendapi/users/memberprofile/',
          {profileDesc,favoriteBook, currentBook, favoriteAuthor, favoriteGenre, publicProfile}           
        ).then(response => {
          window.location.reload();
        })
        .catch (error =>{
          setError('Errors happened');
        })
      };

    const makeChanges = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    return(
        <Layout>
        <div className="container">
        <img src={coverphoto} className="cover-image" alt=""/>
        <section className="text-overlay-profile">
        <h1>Virtual Library Profile</h1>    
        <form onSubmit={edit ? handleSubmit : makeChanges}>
        {!edit && (
        <> 
        <div className="form-group-about-me">
        {profileDesc}        
        </div>
        <div className='form-page'>
        <div className="form-group-profile">
        <label>What is your favorite book:</label>
        {favoriteBook}       
        <label>What are you currently reading:</label>
        {currentBook} 
        </div>
        <div className="form-group-profile">
        <label>Who is your favorite author:</label>
        {favoriteAuthor}
        <label>What is your favorite genre:</label>
        {favoriteGenre}
        </div>
        </div>
        <div>
        <label>Public profile:</label>
        {view}
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Edit</button>
        <button onClick={()=>{navigate("/store");}}>cancel</button> 
        </>
        )}       
        {edit && (
        <>      
        <div className="form-group-about-me">
        <textarea
        placeholder="Profile Description"
        value={profileDesc}
        onChange={(e) => setProfileDesc(e.target.value)}
        rows="5"
        />
        </div>
        <div className='form-page'>
        <div className="form-group-profile">
        <label>What is your favorite book:</label>
        <input type="text" placeholder='Favorite Book' value={favoriteBook} onChange={(e) => setFavoriteBook(e.target.value)}/>       
        <label>What are you currently reading:</label>
        <input type="text" placeholder='Currently Reading' value={currentBook} onChange={(e) => setCurrentBook(e.target.value)}/>
        </div>
        <div className="form-group-profile">
        <label>Who is your favorite author:</label>
        <input type="text" placeholder='Favorite Author' value={favoriteAuthor} onChange={(e) => setFavoriteAuthor(e.target.value)}/>
        <label>What is your favorite genre:</label>
        <input type="text" placeholder='Favorite Genre' value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)}/>
        </div>
        </div>
        <div>
        <label>Do you want your profile to be public?</label>
        <input type='checkbox' checked={publicProfile}onChange={handleToggle} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Save</button>
        <button onClick={()=>{setEdit(false)}}>cancel</button> 
        </>
      )}
        </form>
        </section>
        </div>        
        </Layout>
    );
}
export default Profile;