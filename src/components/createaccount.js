import * as React from 'react';
import axios from 'axios';
import '../index.css';
import coverphoto from '../images/cover.jpg'
function NewMember(){
    const [firstname, setFirstName] = React.useState('')
    const [lastname, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [username, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/login', { firstname, password });
            console.log(response.data); // using for testing
        } catch (error) {
            setError('Failed to make new account');
        }
    }
    return (
        <div className="container"> 
      
        <img src={coverphoto} className="cover-image" alt=""/>
        <div className="text-overlay-login">
       
        <h2>Virtual Library Membership</h2>
        <legend>Enter New Membership Information</legend>
        
        <div className='memberformcontainer'>
        <form onSubmit={handleSubmit}>

        <legend>Enter Account Information</legend>

        <label>First Name:</label>
        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name:</label>
        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={username} onChange={(e) => setPassword(e.target.value)} />

        {error && <p>{error}</p>}
        <button type="submit">Submit</button>

        </form>
        </div>
        </div> 
        </div>         
    );
}
export default NewMember;