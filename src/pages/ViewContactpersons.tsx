import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import {Link, useNavigate} from 'react-router-dom';


const ViewContactperson = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
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
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        axios.get(`https://scribe.clickaway.co.ke/api/clients/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
        })
        .then(response => setData(response.data.contactsPersons))
        .catch(error => console.log(error));
      }, []);

  return (
    <div>
      <ContentHeader title="Contacts " />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Contact people</h3>
              <div className="card-tools">
                
              </div>
            </div>
            <div className="card-body">
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone Number</th>
    </tr>
  </thead>
  <tbody>
    {data.map(person => (
      <tr key={person.id}>
        <td>{person.id}</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.email}</td>
        <td>{person.phoneNumber}</td>
        <td>
        <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`view-project/${person.id}`}>
            <i className="fa fa-info" aria-hidden="true"></i> View 
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href={`#`}>
            <i className="fa fa-pencil" aria-hidden="true"></i> Edit
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href={`/create-job/${person.id}`}>
            <i className="fa fa-plus" aria-hidden="true"></i> Creat Job
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 

        </td>
      </tr>
    ))}
  </tbody>
</Table>
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default  ViewContactperson;
