import * as React from 'react';
import axios from 'axios';
import '../index.css';
import coverphoto from '../images/cover.jpg'
import { useNavigate } from 'react-router-dom';


function NewMember(){
    const navigate = useNavigate();
    const [firstname, setFirstName] = React.useState('')
    const [lastname, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [username, setUserName] = React.useState('')
    const [password1, setPassword1] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            setError('Passwords do not match');
            return;
        }

        try{
            const response = await axios.post('http://18.220.48.41:8000/users/membership/', { firstname, lastname, email, username, password1, password2 });
            console.log(response.data); // using for testing
            navigate("/login")
        } catch (error) {
            setError('Memebrship not created');
        }
    }
    return (
        <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-membership">
       
        
        <legend>Virtual Library Membership</legend>
        
        <div className='memberformcontainer'>
        <form onSubmit={handleSubmit}>
        <div>
        <label>First Name:</label>
        <input type="text" placeholder='Enter First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
        </div>
        <div>
        <label>Last Name:</label>
        <input type="text" placeholder='Enter Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
        </div>
        <div>
        <label>Email:</label>
        <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
        <label>Username:</label>
        <input type="text" placeholder='Create A User Name' value={username} onChange={(e) => setUserName(e.target.value)} required/>
        </div>
        <div>
        <label>Password:</label>
        <input type="password" placeholder='Create A Pasword' value={password1} onChange={(e) => setPassword1(e.target.value)} required/>
        </div>
        <div>
        <label>Confirm Password:</label>
        <input type="password" placeholder='Confirm Password' value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create</button>
        <button onClick={()=>{navigate("/home");}}>cancel</button>

        </form>
        </div>
        </div> 
        </div>         
    );
}
export default NewMember;