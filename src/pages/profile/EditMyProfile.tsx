/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,  useEffect } from "react";
import {ContentHeader} from '@components';
import axios from 'axios';
import BackButton from "@app/components/back/Backbutton";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom';

import jwt from 'jsonwebtoken';

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [loggedInUserid, setUserid] = useState('');
  const [error, setError] = useState(null);
  const [users, setUsers] =  useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleName: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''    
  });
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      setEmail(decodedToken.sub);
    
    }
  }, []);
  useEffect(() => {
    if (email) {
      fetchUsers();
      getUser();
    }
  }, [email]);
 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



// get the user
const getUser = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://scribe.clickaway.co.ke/api/users/${loggedInUserid}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
     


      setFormData({
       
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        roleName: response.data.roles[0].roleName,
       
      });
    } catch (error) {
      console.error(error);
    }
    
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate input fields
    const validationErrors = {};
    if (formData.firstName.trim() === '') {
      validationErrors.firstName = 'Please fill this field';
    }
    if (formData.lastName.trim() === '') {
      validationErrors.lastName = 'Please fill this field';
    }
   
    if (formData.email.trim() === '') {
      validationErrors.email = 'Please enter an email address';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      setErrors(validationErrors);
      return;
    }



    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://scribe.clickaway.co.ke/api/users/${id}`,
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          roles: [
            {
              roleName: formData.roleName,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
          },
        }
      );
      setFormData({
        firstName: "",
        lastName:"",
        email: "",
        roleName: "",
        
      });
      toast.success("User updated successfully!");
      setLoading(false);
      navigate('/manage-user')
    } catch (error) {
      toast.error("An error occurred while upadting the user.");
      setLoading(false);
    }
  };

 

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const allusers = await axios.get("https://scribe.clickaway.co.ke/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      setUsers(allusers.data);
      console.log(allusers.data);
  
      console.log(email)
     
      const filteredUsers = allusers.data.filter(user => user.email === email);
      const filteredUser = filteredUsers[0]; 
      if (filteredUsers.length === 0) {
        console.log(`No user found with email ${email}`);
      } else {
        // Log the id of the filtered user
        const filteredUser = filteredUsers[0]; // assuming there's only one user with the specified email
        console.log(filteredUser.id);
        setUserid(filteredUser.id);

        
      }
      
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <ContentHeader title="Update profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">  </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                       
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">First name</label>
                                    <div className="input-group mb-3">
                                        <input type="text"  placeholder="First name" aria-label="firstName" aria-describedby="basic-addon2" 
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange}/>
                                        <div className="invalid-feedback">{errors.firstName}</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="lastname" className="form-label">Last name</label>
                                    <div className="input-group mb-3">
                                        <input type="text" 
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Last name" aria-label="lastName" aria-describedby="basic-addon2" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange}/>
                                        <div className="invalid-feedback">{errors.lastName}</div>
                                    </div>
                                </div>
                            
                            </div>
                           

                            <div className="row">
                            <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <div className="input-group mb-3">
                                        <input type="text"
                                         className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email Address" aria-label="Email" aria-describedby="basic-addon2" name="email" id="email" value={formData.email} onChange={handleInputChange}/>
                                        <div className="invalid-feedback">{errors.email}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2" name="password" id="password" value={formData.password} onChange={handleInputChange}/>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                               
                            </div>
                           
                            <button type="submit" className="btn btn-primary" disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"} </button>
                        </form>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditMyProfile;
