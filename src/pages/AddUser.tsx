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

const AddUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      const userRole = decodedToken.claims.find(claim => claim === "ROLE_ADMIN" );
      if (!userRole) {
        navigate('/unauthorized');
      }
    } else {
      navigate('/login');
    }
  }, []);


  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      const response = await axios.post(
        "https://scribe.clickaway.co.ke/api/users",
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
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
        password:"",
        roleName: "",
        
      });
      toast.success("User added successfully!");
      setLoading(false);
      navigate('/manage-user')
    } catch (error) {
      toast.error("An error occurred while adding the user.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://scribe.clickaway.co.ke/api/roles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
            },
          }
        );
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);
  return (
    <div>
      <ContentHeader title="Add User" />
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
                                    <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                        
                                    <div className="input-group mb-3">
                                    <select className="form-control" name="roleName" value={formData.roleName} onChange={handleInputChange}>
                                      <option value=""> --Select a role--</option>
                                         {roles.map((role) => (
                                           <option key={role.roleName} value={role.roleName}>{role.roleName.replace('ROLE_', '')}</option>
                                               ))}
                                      </select>
                                       
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2" name="password" id="password" value={formData.password} onChange={handleInputChange}/>
                                        
                                    </div>
                                </div>
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

export default AddUser;
