import * as React from 'react';
import axios from 'axios';
import coverphoto from '../images/cover.jpg';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const[username,setFirstName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault();  
  
      try {
        const response = await axios.post('http://localhost:5000/login', { username, password });
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
       
         <h2>Virtual Library Login</h2>
         <legend>Enter Login Credentials</legend>        

        <form onSubmit={handleSubmit}>    
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setFirstName(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        <button onClick={()=>{navigate("/home");}}>cancel</button>
        
    </form>
    </div>
    </div>
    
    );
}
export default Login;
