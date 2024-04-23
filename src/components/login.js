import * as React from 'react';
import axios from 'axios';
import coverphoto from '../images/cover.jpg';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[username,setFirstName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

  
    const handleSubmit = async (e) => {
      e.preventDefault();  
  
      try {
       
        const response = await axios.post(
          'http://18.220.94.221:8000/users/memberlogin/',
          { username, password}
         
        );
      console.log(response.data); // using for testing
      navigate('/store');
      } catch (error) {
        setError('Incorrect username or password');
      }
    };
  
    return (

      <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-login">
       
        
        <legend>Virtual Library Login</legend>        

        <form onSubmit={handleSubmit}>    
        <label>Username:</label>
        <input type="text" placeholder='Enter username' value={username} onChange={(e) => setFirstName(e.target.value)} />

        <label>Password:</label>
        <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        <button onClick={()=>{navigate("/home");}}>cancel</button>
        <p>Dont have an account? Create one<Link to="/newmember">Here</Link></p>
        
    </form>
    </div>
    </div>
    
    );
}
export default Login;
