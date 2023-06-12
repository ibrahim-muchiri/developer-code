import React, { useState } from "react";
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddContactPerson = () => {
    const { clientId } = useParams();
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        canLogin: true,
        client: clientId,
      };
      const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const [formData, setFormData] = useState(initialFormData);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();

        // Validate input fields
        const validationErrors = {};
        if (formData.firstName.trim() === '') {
          validationErrors.firstName = 'Please enter your first name';
        }
        if (formData.lastName.trim() === '') {
          validationErrors.lastName = 'Please enter your last name';
        }
        if (formData.email.trim() === '') {
          validationErrors.email = 'Please enter your email';
        }
        else if (!isEmailValid(formData.email)) {
            validationErrors.email = 'Please enter a valid email address';
           
          }
        if (formData.phoneNumber.trim() === '') {
          validationErrors.phoneNumber = 'Please enter your phone number';
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const url = 'https://scribe.clickaway.co.ke/api/contacts';
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };
        const data = JSON.stringify(formData);
    
        fetch(url, {
          method: 'POST',
          headers,
          body: data,
        })
          .then((response) => {
            if (response.ok) {
                resetForm();
              toast.success('Contact person added successfully!');
              return response.json();
             
            } else {
              toast.error('Failed to add contact person');
              throw new Error('Failed to add contact person');
            }
          })
          .then((data) => console.log(data))
          .catch((error) => console.error(error));

          
      };
      const resetForm = () => {
        setFormData(initialFormData);
      };
    
  return (
    <div>
      <ContentHeader title="Add Contact Person" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> </h3>
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

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </Form.Group>
          </div>
          <div className="col">

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </Form.Group>
          </div>
          </div>
          <div className="row">
         <div className="col">

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email} </div>
          </Form.Group>
          </div>
          <div className="col">

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
             <div className="invalid-feedback">{errors.phoneNumber} </div>
          </Form.Group>
          </div>
          </div>


          <Form.Group controlId="canLogin">
            <Form.Check
              type="checkbox"
              label="Can Login"
              name="canLogin"
              checked={formData.canLogin}
              onChange={(event) => {
                const { name, checked } = event.target;
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [name]: checked,
                }));
              }}
            />
          </Form.Group>
        </div>
        <div className="card-footer">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
            </div>
            <div className="card-footer"> </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddContactPerson;
