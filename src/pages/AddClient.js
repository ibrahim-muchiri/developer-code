import React, { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import adminLayout from "../hoc/adminLayout"
import axios from "axios";
import styled from 'styled-components';

function AddClient() {
    const [client, setClient] = useState({
      clientName: "",
      physicalAddress: "",
      postalAddress: "",
      county: "",
      website: "",
      logoUrl: "",
      clientMetadata: "",
      contactsPersons: [
        {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          canLogin: true,
          client: 0,
        },
      ],
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const { user, setUser } = useContext(UserContext);
    const SuccessMessage = styled.p`
    background-color: lightgreen;
    padding: 10px;
`;
const ErrorMessage = styled.p`
color: white;
background-color: #FFB6C1;
padding: 10px;
`;
  
    const handleChange = (e) => {
      setClient({ ...client, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      const accessToken = localStorage.getItem('accessToken');
      e.preventDefault();
      setLoading(true);
      axios
        .post("https://scribe.clickaway.co.ke/api/clients",
        client,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            
          }
        }
        )
        .then((res) => {
            setLoading(false);
          console.log(res);
          setResponse(<SuccessMessage>Client added successfully!</SuccessMessage>);
          setClient({
            clientName: "",
            clientEmail:"",
            physicalAddress: "",
            postalAddress: "",
            county: "",
            website: "",
            logoUrl: "",
            clientMetadata: "",
            contactsPersons: [
              {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                canLogin: true,
                client: 0,
              },
            ],
          });
        })
        .catch((err) => {
         setLoading(false);
          console.error(err);
          setResponse(err.message);
        });
    };
  
  
    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0 mb-3">Client Info</h6>
            <form onSubmit={handleSubmit}>
            {response && <div className="alert alert-danger">{response}</div>}
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Client name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Client name" aria-label="Recipient's username" aria-describedby="basic-addon2"  name="clientName" value={client.clientName} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-briefcase"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="basic-addon2" value={client.clientEmail} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2">@</span>
                        </div>
                    </div>
                </div>
               

                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Postal address</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Postal address" aria-label="Recipient's username" aria-describedby="basic-addon2" name="postalAddress" value={client.postalAddress} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-book"></i></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Location</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="area,town, etc" aria-label="location" aria-describedby="basic-addon2" name="physicalAddress" value={client.physicalAddress} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-map-marker"></i></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                        <div className="input-group mb-3">
                            <select className="form-control" name="Country">
                                <option value="Kenya">Kenya</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Rwanda">Rwanda</option>
                            </select>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-map-marker"></i></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Web adress</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="www.example.com" aria-label="Recipient's username" aria-describedby="basic-addon2" name="website" value={client.website} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-globe"></i></span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">Logo url</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="www.example.com/logo" aria-label="Recipient's username" aria-describedby="basic-addon2" name="logoUrl" value={client.logoUrl} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-globe"></i></span>
                        </div>
                    </div>
                </div>
                
                <h6 className="border-bottom pb-2 mb-0 mb-3">Contact Person</h6>
                    <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label" name="Fname">First Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First Name" aria-label="First name" aria-describedby="basic-addon2"name="firstName" value={client.firstName} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Last Name" aria-label="Last name" aria-describedby="basic-addon2" name="lastName" value={client.lastName} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon2" name="email" value={client.email} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone number</label>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="phone number" aria-label="Recipient's username" aria-describedby="basic-addon2" name="phoneNumber" value={client.phoneNumber} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-phone"></i></span>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-default" disabled={loading}> {loading ? "Loading..." : "Submit"} </button>

                {/* <button type="submit" ></button> */}
            </form>
    </div>
    );
  }

export default adminLayout(AddClient);