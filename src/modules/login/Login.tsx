import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {setWindowClass} from '@app/utils/helpers';
import {PfButton, PfCheckbox} from '@profabric/react-components';
import axios from 'axios';
import jwt from 'jsonwebtoken';


import * as Yup from 'yup';

import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../services/auth';





// Replace
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();
  


  const [credentials, setCredentials] = useState({
  email: '',
  password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

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
        toast.success('Login succeeded!');
        window.location.reload();
        console.log(response.data);
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        dispatch(loginUser(accessToken));
        // console.log(accessToken);
        // const decodedToken = jwt.decode(accessToken);
        // console.log(decodedToken); // JWT payload
        navigate('/');
        
      } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error(error.message || 'Failed');
      }
    };
  



  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
          <img src="/img/logo-2.png" alt="" height={150}/>
          </Link>
        </div>
        <div className="card-body">
        <p className="login-box-msg">{t<string>('login.label.signIn')}</p>
          <form onSubmit={handleSubmit} >
  
      
                 <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                      <input   id="form3Example3" className="form-control form-control-lg" type="text" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" required/>
                 </div>
                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                          <label className="form-label" htmlFor="form3Example4">Password</label>
                          <input type="password" name="password" value={credentials.password} onChange={handleChange} id="form3Example4"  className="form-control form-control-lg" placeholder="Enter password" required/>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary" disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
                </div>
        </form>
            <p className="mb-1">
                     {/* <Link to="/forgot-password">
                   {t<string>('login.label.forgotPass')}
                  </Link> */}
              </p>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
