import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from 'react-router-dom';
import {ContentHeader} from '@components';
import { Dropdown } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

const ManageRoles = () => {

 
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
        setRoles(data.roles);
        
       

      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
 
  

  return (
    <div>
      <ContentHeader title="Edit roles" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> {firstName} {lastName} </h3>
              <div style={{color: 'navy', fontWeight: 'bold' }} className="card-tools">
            
              
            
              </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    
                </thead>
                <tbody>
                   
                    <tr >   
                    <th>Roles</th>
                    
                    </tr>
                    <tr>
                    <td>
                    {roles.map((role) => (
                        <span key={role.id}>{role.roleName.replace('ROLE_', '')}  </span>
                        ))} 
                        </td>
                    {/* {roleName} */}
                     </tr>   
                
                </tbody>
                <br/>
                <button className="btn btn-primary">Add Role</button>
                </Table>      
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageRoles;
