import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from 'react-router-dom';
import {ContentHeader} from '@components';
import { Dropdown } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

const ViewUser = () => {

 
  const [userId, setuserId] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [email, setEmail] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState([]);

  const  { id } =useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      };
      try {
        const { data } = await axios.get(
          `https://scribe.clickaway.co.ke/api/users/${id}`,
          config
        );
       
       setuserId(data.id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setRoleName(data.roles[0].roleName.replace("ROLE_", ""));
        
       

      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
 
  

  return (
    <div>
      <ContentHeader title="View User" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">User: {userId}  </h3>
              <div style={{color: 'navy', fontWeight: 'bold' }} className="card-tools">
              <a href={`/edit-user/${id}`}>Edit</a>
              
            
              </div>
            </div>
            <Table striped bordered hover>
  <thead>
    
  </thead>
  <tbody>
    <tr>
    <th>First name</th>
    <td>{firstName}</td>
    </tr>
    <tr>
    <th>Last Name</th>
    <td>{lastName}</td>
    </tr>
    <tr>
    <th>Email</th>
    <td>{email}</td>
    </tr>
    <tr >   
      <th>Role</th>
      <td>{roleName}</td>
      </tr>
  
  </tbody>
</Table>      
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewUser;
