import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from 'react-router-dom';
import {ContentHeader} from '@components';
import { Dropdown } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import {Link, useNavigate} from 'react-router-dom';

const ViewClient = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [physicalAddress, setPhysicalAddress] = useState([]);
  const [postalAddress, setPostalAddress] = useState([]);
  const [county, setCounty] = useState([]);
  const [website, setWebsite] = useState([]);
  const [logoUrl, setLogoUrl] = useState([]);


  const  { id } =useParams()
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
    const fetchClients = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      };
      try {
        const { data } = await axios.get(
          `https://scribe.clickaway.co.ke/api/clients/${id}`,
          config
        );
       
        setClientId(data.clientId);
        setClientName(data.clientName);
        setPhysicalAddress(data.physicalAddress);
        setPostalAddress(data.postalAddress);
        setCounty(data.county);
        setWebsite(data.website);
        setLogoUrl(data.website);

      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);
 
  

  return (
    <div>
      <ContentHeader title="View Client" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Client: {clientId}  </h3>
              <div style={{color: 'navy', fontWeight: 'bold' }} className="card-tools">
              <a href={`/edit-client/${id}`}>Edit</a>
            
              </div>
            </div>
            <div className="card-body">
            <Table striped bordered hover>
  <tbody>
     <tr>
      <th>Client Name</th>
      <td>{clientName}</td>
     </tr>
     <tr>
     <th>Location</th>
      <td>{physicalAddress}</td>
     </tr>
     <tr>
      <th>
        Postal Adress
      </th>
      <td>{postalAddress}</td>
     </tr>
     <tr>
      <th>County</th>
      <td>{county}</td>
     </tr>
      <tr >
        <th>Website</th>
        <td>{website}</td>
        
        
      </tr>
  
  </tbody>
</Table>      </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewClient;
