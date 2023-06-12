import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useParams } from 'react-router-dom';
import {ContentHeader} from '@components';
import { Dropdown } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import jwt from 'jsonwebtoken';
import {Link, useNavigate} from 'react-router-dom';

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [projectTitle, setProjectsTitle] = useState([]);
  const [clientDeadline, setClientDeadline] = useState([]);
  const [internalDeadline, setInternalDeadline] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [fileNumber, setfileNumber] = useState([]);
  const navigate = useNavigate();




  const [status, setStatus] = useState([]);
  const  { id } =useParams();
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
    const fetchProjects = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      };
      try {
        const { data } = await axios.get(
          `https://scribe.clickaway.co.ke/api/projects/${id}`,
          config
        );
        setInternalDeadline(new Date(data.internalDeadLine).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }));
        setProjects(data.projectFiles);
        setProjectsTitle(data.projectTitle);
        setClientDeadline(new Date(data.clientDeadLine).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }));
        setClientId(data.client);
        setStatus(data.status);
        setfileNumber(data.fileNumber);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
    
  }, []);
  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);
  const fetchClient  = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`https://scribe.clickaway.co.ke/api/clients/${clientId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setClientData(response.data);
      setClientName(response.data.clientName);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <ContentHeader title="View Project" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Project: {projectTitle}  </h3>
              <div style={{color: 'navy', fontWeight: 'bold' }} className="card-tools">
                <span >
              <a style={{color: 'brown' }} href={`/view-project-tasks/${id}`}>View tasks</a>
              </span>
              &nbsp;
              &nbsp;

              <span>
              <a href={`/edit-project/${id}`}>Edit</a>
              </span>
              </div>
            </div>
            <div className="card-body">
            <Table striped bordered hover>

  <tbody>
    <tr>
    <th>Title</th>
    <td>{projectTitle}</td>
    </tr>
    <tr>
    <th>Client Name</th>
    <td>{clientName}</td>
    </tr>
    <tr>
    <th>Client deadline</th>
    <td>{clientDeadline}</td>
    </tr>
    <tr>
    <th>Internal deadline</th>
    <td>{internalDeadline}</td>
    </tr>
     <tr >
      <th>No of tasks</th>
      <td>{fileNumber}</td>  
      </tr>
      <tr >
      <th>Status</th>
      <td> {status}</td>  
      </tr>
  
  </tbody>
</Table>      









             
            </div>
          
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProject;
