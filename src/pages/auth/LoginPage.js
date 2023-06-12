import React, { useRef, useState, useEffect, useContext } from 'react';
import "../../assets/css/login.css"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import authLayout from "../../hoc/authLayout";
import axios from 'axios';


const Login = () => {
    const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const handleChange = (e) => {
    setCredentials({
    ...credentials,
    [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await axios.post(
            'https://scribe.clickaway.co.ke/authenticate',
            credentials
          );
      
          setLoading(false);
          console.log(response.data);
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          setUser(response.data);
          navigate('/dashboard');
        } catch (error) {
          setLoading(false);
          console.error(error);
          setError(error.message);
        }
      };
    
    return (
    
     
    <form onSubmit={handleSubmit} className="login-form">
        <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
        {error && <div className="alert alert-danger">{error}</div>}
                 <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
    <input   id="form3Example3" className="form-control form-control-lg" type="text" name="email" value={credentials.email} onChange={handleChange} placeholder="Email"/>
           </div>
           {/* <!-- Password input --> */}
           <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} id="form3Example4"  className="form-control form-control-lg" placeholder="Enter password" />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-default" disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
                 
                   
                </div>


   
   
    </form>
    
   
    );
    };

export default authLayout(Login);