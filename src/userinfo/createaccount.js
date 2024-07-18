import * as React from 'react';
import axios from 'axios';
import '../index.css';
import coverphoto from '../images/library.jpeg'
import { useNavigate } from 'react-router-dom';


function NewMember(){
    const navigate = useNavigate();
    const [isFirstPartComplete, setIsFirstPartComplete] = React.useState(false);
    const [firstname, setFirstName] = React.useState('')
    const [lastname, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [username, setUserName] = React.useState('')
    const [password1, setPassword1] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [error, setError] = React.useState('')


    const [payFirstName, setPayFirstName] = React.useState('');
    const [payLastName, setPayLastName] = React.useState('');
    const [payment_type, setPayment] = React.useState('');
    const [card_num, setCardNum] = React.useState('');
    const [exp_date, setExpDate] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip_code, setZipCode] = React.useState('');
    const [pay_default, setPayDefault] = React.useState(true);
    const [userId, setUserId] = React.useState()

    const handleSubmitNext = async (e) => {
        e.preventDefault();       
        try{            
            const response = await axios.post('https://csjoeportfolio.com/backendapi/users/membership/', { firstname, lastname, email, username, password1, password2 });
            setUserId(response.data.user_id) 
            setIsFirstPartComplete(true);  
        }catch (error) {
            setError('Login not created');
        }
    }

    const handleSubmitPayment = async (e) => {
        e.preventDefault();       
        try{            

            const res = await axios.post('https://3.129.70.204/go/membershipcard',{      
                  "first_name": payFirstName,
                  "last_name": payLastName,
                  "card_num": card_num,
                  "payment_type": payment_type,
                  "exp_date": exp_date,
                  "street": street,
                  "city": city,
                  "state": state,
                  "zip_code": zip_code,
                  "pay_default": pay_default,
                   "user_id": userId
            })
            navigate("/store")   
        }catch (error) {
            setError('payment not created');
        }
    }

    const handleCardNum = (e) => {
        let value = e.target.value.replace(/\D/g, '');
    
        // Format the value in groups of four
        value = value.replace(/(.{4})/g, '$1 ').trim();
    
        // Ensure the value does not exceed 19 characters (16 digits + 3 spaces)
        value = value.slice(0, 19);
    
        setCardNum(value);
      };

      const handleExpDate = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    
        // Format the value with "/" after the first two digits
        if (value.length > 2) {
          value = value.slice(0, 2) + '/' + value.slice(2, 6);
        }
    
        // Ensure the value does not exceed 7 characters (MM/YYYY)
        value = value.slice(0, 7);
    
        setExpDate(value);
      };

      const handleFirstPartSubmit = (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            setError('Passwords do not match');
            setIsFirstPartComplete(false);
        }else{
            setError('');
            setIsFirstPartComplete(true);
        }
        
    };
   
    return (
        <div className="container">       
        <img src={coverphoto} className="cover-image" alt=""/>
        <section className="text-overlay-membership">
                <h1>Virtual Library Membership</h1>
                <h5>Billing Information $17.85 Monthly Recurring Charge</h5>

                {!isFirstPartComplete ? (
                    <form onSubmit={handleSubmitNext}>
                        <div className='form-page'>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input type="text" placeholder='Enter First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
                                <label>Last Name:</label>
                                <input type="text" placeholder='Enter Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
                                <label>Email:</label>
                                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" placeholder='Create A User Name' value={username} onChange={(e) => setUserName(e.target.value)} required/>
                                <label>Password:</label>
                                <input type="password" placeholder='Create A Password' value={password1} onChange={(e) => setPassword1(e.target.value)} required/>
                                <label>Confirm Password:</label>
                                <input type="password" placeholder='Confirm Password' value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
                            </div>
                        </div>
                        {error && <p>{error}</p>}
                        <button type="submit">Next</button>
                        <button onClick={()=>{navigate("/home");}}>cancel</button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitPayment}>
                        <div className='form-page'>
                            <div className="form-group">
                                <label>First Name:</label>
                                <input type="text" placeholder='Billing First Name' value={payFirstName} onChange={(e) => setPayFirstName(e.target.value)} required/>
                                <label>Last Name:</label>
                                <input type="text" placeholder='Billing Last Name' value={payLastName} onChange={(e) => setPayLastName(e.target.value)} required/>
                                <label>Payment Type:</label>
                                <input type="text" placeholder='visa' value={payment_type} onChange={(e) => setPayment(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" placeholder='0000 0000 0000 0000' value={card_num} onChange={handleCardNum} required/>
                                <label>Expiration</label>
                                <input type="text" placeholder='MM/YYYY' value={exp_date} onChange={handleExpDate} required/>
                                <label>Street:</label>
                                <input type="text" placeholder='Billing Street' value={street} onChange={(e) => setStreet(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label>City:</label>
                                <input type='text' placeholder='Billing City' value={city} onChange={(e) => setCity(e.target.value)} required/>
                                <label>State:</label>
                                <input type='text' placeholder='Billing State' value={state} onChange={(e) => setState(e.target.value)} required/>
                                <label>ZIP code:</label>
                                <input type='text' placeholder='Billing ZIP' value={zip_code} onChange={(e) => setZipCode(e.target.value)} required/>
                            </div>
                        </div>
                        {error && <p>{error}</p>}
                        <button type="submit">Create</button>
                        <button onClick={()=>{navigate("/home");}}>cancel</button>
                    </form>
                )}
            </section>
        </div>
                
    );
}
export default NewMember;