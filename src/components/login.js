import * as React from 'react';
import axios from 'axios';
import coverphoto from '../images/cover.jpg';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const[username,setFirstName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

  
    const handleSubmit = async (e) => {
      e.preventDefault();
       
    axios.post(
          'http://localhost:8000/users/memberlogin/',{ username, password})
        .then(response => {
          navigate('/store');
        })       
      .catch(error => {
        setError('Incorrect username or password');
    });

    };
  
    return (

      <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-login">       
        
        <legend>Virtual Library Login</legend>        

        <form onSubmit={handleSubmit}>
          <div>    
        <label>Username:</label>
        <input type="text" placeholder='Enter username' value={username} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
        <label>Password:</label>
        <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <div className='buttons'>
        <button type="submit">Login</button>
        <button onClick={()=>{navigate("/home");}}>cancel</button>
        </div>
        <div className='spacing'>
        <p>Dont have an account? Create one<Link to="/newmember">Here</Link></p>
        </div>
    </form>
    </div>
    </div>
    
    );
}
export default Login;
