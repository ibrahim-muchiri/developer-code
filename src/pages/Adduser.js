import React, { useState } from "react";
import adminLayout from "../hoc/adminLayout"
import axios from 'axios';
import styled from 'styled-components';

function AddUser() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      username: '',
      roleName: ''
    });
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
  
    const handleInputChange = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      const SuccessMessage = styled.p`
      background-color: lightgreen;
      padding: 10px;
`;

const ErrorMessage = styled.p`
  color: white;
  background-color: #FFB6C1;
  padding: 10px;
`;
  
      try {
        const response = await axios.post('https://scribe.clickaway.co.ke/register', formData);
        setResponse(<SuccessMessage>User added successfully!</SuccessMessage>);
        setLoading(false);
      } catch (error) {
        setResponse(<ErrorMessage>An error occurred while adding the user.</ErrorMessage>);
        setLoading(false);
      }
    };
  
        return (
          <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0 mb-3">Add user</h6>
                        <form onSubmit={handleSubmit}>
                        {response && <div className="alert alert-light">{response}</div>}
                        {/* {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} */}
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Username" aria-label="username" aria-describedby="basic-addon2" name="username" id="username" value={formData.username} onChange={handleInputChange}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Email Address" aria-label="Email" aria-describedby="basic-addon2" name="email" id="email" value={formData.email} onChange={handleInputChange}/>
                                        <span className="input-group-text" id="basic-addon2">@</span>
                                    </div>
                                </div>
                            </div>
                           

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                    <div className="input-group mb-3">
                                        <input type="number" className="form-control" placeholder="Phone Number" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                        
                                    <div className="input-group mb-3">
                                        <select className="form-control"   id="roleName" name="roleName" value={formData.roleName} onChange={handleInputChange}>
                                            
                                            <option value="project-manager">
                                                Project manager
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="transcriber" >Transcriber</option>
                                            <option value="peer-reviewer">Peer reviewer</option>

                                        </select>
                                        
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-caret-down"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2" name="password" id="password" value={formData.password} onChange={handleInputChange}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-star"></i></span>
                                    </div>
                                </div>
                            </div>
                           
                            <button type="submit" className="btn btn-default" disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
                        </form>
                </div>
      
        );
};

export default adminLayout(AddUser);