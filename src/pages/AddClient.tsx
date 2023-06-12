import React, { useState, useContext, useEffect } from "react";
import {ContentHeader} from '@components';
import {toast} from 'react-toastify';
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';


const AddClient = () => {
  const navigate = useNavigate();
  

  const [client, setClient] = useState({
      clientName: "",
      physicalAddress: "",
      postalAddress: "",
      county: "",
      website: "",
      logoUrl: "",
      clientMetadata: "",
    });
 

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const [errors, setErrors] = useState({
      clientName: '',
      physicalAddress: '',
      postalAddress: '',
      county: '',
      
    });
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


    const handleChange = (e) => {
      setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);

        // Validate input fields
        const validationErrors = {};
        if (client.clientName.trim() === '') {
          validationErrors.clientName = 'Please enter the Client\'s name';
        }
        if (client.physicalAddress.trim() === '') {
          validationErrors.physicalAddress = 'Please enter the client\'s physical address';
        }
       
        if (client.postalAddress.trim() === '') {
          validationErrors.postalAddress = 'Please enter the client\'s postal address';
        }
        
        if (client.county.trim() === '') {
          validationErrors.county = 'Please enter a county';
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setLoading(false);
          setErrors(validationErrors);
          return;
        }


      const accessToken = localStorage.getItem('accessToken');
      
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
          toast.success('Client added successfully!');
          
          setClient({
            clientName: "",
            clientEmail:"",
            physicalAddress: "",
            postalAddress: "",
            county: "",
            website: "",
            logoUrl: "",
            
            
          });
          navigate('/manage-clients/');
        })
        .catch((err) => {
         setLoading(false);
          console.error(err);
          toast.error(err);
        });
    };
  
  return (
    <div>
      
      <ContentHeader title="Add Client" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
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
            <Form onSubmit={handleSubmit}>
            <div className="card-body">
        <div className="row">
         <div className="col">
         <Form.Group controlId="clientName">
            <Form.Label>Client Name <span style={{color: 'red'}}>٭</span></Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.clientName ? 'is-invalid' : ''}`}
              placeholder="Enter the Client's name"
              name="clientName"
              value={client.clientName}
              onChange={handleChange}
              
              
            />
           <div className="invalid-feedback">{errors.clientName}</div>
          </Form.Group>

          </div>
          <div className="col">
          <Form.Group controlId="Email">
            <Form.Label>Email address <span style={{color: 'red'}}>٭</span></Form.Label>
            <Form.Control
              type="email"
              
              placeholder="Enter an Email address"
              name="clientEmail"
              value={client.clientEmail} onChange={handleChange} 
              
            />
           
          </Form.Group>
          </div>
        </div>
        {/* row 2 */}
        <div className="row">
         <div className="col">
         <Form.Group controlId="postalAddress">
            <Form.Label>Postal address <span style={{color: 'red'}}>٭</span></Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.postalAddress ? 'is-invalid' : ''}`}
              placeholder="Postal Address"
              name="postalAddress"
              value={client.postalAddress}
              onChange={handleChange} 
              
            />
            <div className="invalid-feedback">{errors.postalAddress}</div>
           
          </Form.Group>

          </div>
          <div className="col">
          <Form.Group controlId="location">
            <Form.Label>Location <span style={{color: 'red'}}>٭</span></Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.physicalAddress ? 'is-invalid' : ''}`}
              placeholder="area, town, etc"
              name="physicalAddress"
              value={client.physicalAddress} 
              onChange={handleChange}
              
            />
           <div className="invalid-feedback">{errors.physicalAddress}</div>
          </Form.Group>
          </div>
        </div>
        {/* row 3 */}
        <div className="row">
         <div className="col">
         <Form.Group controlId="county">
            <Form.Label>County <span style={{color: 'red'}}>٭</span></Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.county ? 'is-invalid' : ''}`}
              placeholder="County"
              name="county"
              value={client.county}
              onChange={handleChange} 
              
            />
           <div className="invalid-feedback">{errors.county}</div>
          </Form.Group>

          </div>
          <div className="col">
          <Form.Group controlId="web">
            <Form.Label>Web Address</Form.Label>
            <Form.Control
              type="text"
              
              placeholder="www.example.com"
              name="website" 
              value={client.website} 
              onChange={handleChange} 
              
            />
           
          </Form.Group>
          </div>
        </div>
        {/* row 3 */}
        <div className="row">
         <div className="col">
         <Form.Group controlId="logo">
            <Form.Label>Logo Url</Form.Label>
            <Form.Control
              type="text"
              
              placeholder="www.example.com/logo.png"
              name="logoUrl" 
              value={client.logoUrl} 
              onChange={handleChange} 
              
            />
           
          </Form.Group>
          </div>
          </div>



        </div>
      
    
          <Button type="submit" variant="primary" disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"} 
          
          </Button>
      
      </Form>




        
            </div>
            <div className="card-footer"> </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddClient;
