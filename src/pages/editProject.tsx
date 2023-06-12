/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useContext,  useEffect, useCallback } from "react";
import {ContentHeader} from '@components';

import axios from "axios";
import ReactDropzone,  { useDropzone } from "react-dropzone";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap-nav-wizard/bootstrap-nav-wizard.css';
import 'dropify/dist/css/dropify.css';
import 'dropify/dist/js/dropify.js';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from "moment";
import { useParams } from "react-router-dom";


import { toast } from "react-toastify";

import jwt from 'jsonwebtoken';



const EditProject = () => {
 
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [projectLoaded, setProjectLoaded] = useState(false);
  
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


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const [formData, setFormData] = useState({
    projectTitle: '',
    clientDeadLine: '',
    status: '',
    split: false,
    fileNumber: 0,
    splitBy: '',
    internalDeadLine: '',
    projectMetadata: '',
    client: 0


  });
  const handleDateTimeChange = (momentObject) => {
    setFormData({
      ...formData,
      clientDeadLine: momentObject.format('YYYY-MM-DD HH:mm:ss'),
      internalDeadLine: momentObject.format('YYYY-MM-DD HH:mm:ss'),
      // trying to access the `name` property on an undefined object
      // name: momentObject.name
    });
  };
  



  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
//get the project
const getProject = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`https://scribe.clickaway.co.ke/api/projects/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
     
      console.log(response.data);
      //initialize client form with data

      setFormData({
        projectTitle: response.data.projectTitle,
        clientDeadLine: response.data.clientDeadLine,
        status: response.data.status,
        split: response.data.split,
        fileNumber: response.data.fileNumber,
        splitBy: response.data.splitBy,
        internalDeadLine: response.data.internalDeadLine,
        projectMetadata: response.data.projectMetadata,
        client: response.data.client
       
      });
      setProjectLoaded(true);
    } catch (error) {
      console.error(error);
    }
    
  
  };



  //get project file 




//end get







  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(
        `https://scribe.clickaway.co.ke/api/projects/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json"
          }
      
        }
      );
    
      
      console.log(response.data);
    //   setResponse("Submit  ");
    toast.success('The changes have been sucessfully saved');
      setLoading(false);
      const projectId = response.data;
      const audioformData = new FormData();
    audioformData.append('file', file);
    audioformData.append('projectId', projectId);

   
    const config = {
      headers: {
        'accessToken': `bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      maxBodyLength: Infinity
    };

    // axios.post('https://scribe.clickaway.co.ke/api/projectFiles', audioformData, config)
    //   .then((response) => {
    //     console.log(response.data);
    //     setResponse("Submit ✔, Uploading ✔");
    //     toast.success('Project added successfully!');
    //     setLoading(false);
    //     navigate('/manage-projects');
       
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     toast.error(error.message);
    //     setLoading(false);
    //   });


      //end file uplaoad
    } catch (error) {
     
      setLoading(false);
      console.error(error);
      toast.error(error.message);
      console.log(formData);
    }
    

  
  };


  const [checked, setChecked] = useState(false);
  useEffect(() => {
    getProject();
    const fetchClients = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://scribe.clickaway.co.ke/api/clients', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json"
          }
        });
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClients();
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);



  const inputRef = useRef(null);

  useEffect(() => {
    $(inputRef.current).dropify();
  }, []);
  
  function handleChecked() {
    setChecked(!checked);
    setFormData({
      ...formData,
      split: !formData.split
    });
  }
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

const defaultDate = new Date(year, month, day); // create a new date object with today's date


  return (
    <div>
      <ContentHeader title="Edit Project" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                 {formData.projectTitle}
                 
              </h3>
              <div className="card-tools">
                
              </div>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
          
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Project title</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Title" aria-label="title" aria-describedby="basic-addon2" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required/>
                                        
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Select a client</label>
                                    <div className="input-group mb-3">
                                      <select className="form-control" name="client"  value={formData.client} onChange={handleChange}  >
                                      <option value=""> --Select a client--</option>
                                         {clients.map((client) => (
                                           <option key={client.clientId} value={client.clientId}>{client.clientName}</option>
                                               ))}
                                      </select>
                                      
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Client deadline</label> 
                                    {projectLoaded && (
                                    <Datetime
                                     name="clientDeadline" 
                                     value={formData.clientDeadLine}
                                     onChange={handleDateTimeChange}
                                    
                                     inputProps={{ placeholder: 'Select date' }}
                                     isValidDate={(currentDate) =>
                                       currentDate.isAfter(moment().subtract(1, 'day'))}
                                      
                                    />
                                    )}
                                        
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Internal deadline</label>
                                    
                                    {projectLoaded && (
                                    <Datetime
                                    name="internalDeadLine" 
                                    value={formData.internalDeadLine}  
                                    onChange={handleDateTimeChange}
                                    inputProps={{ placeholder: 'Select date' }}
                                    isValidDate={(currentDate) =>
                                       currentDate.isAfter(moment().subtract(1, 'day'))}
                                       />
                                      )}
                                </div>
                            </div>
                           

                            <div className="row">
                            
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Project Status</label>
                                    
                                    <div className="input-group mb-3">
                                    <select className="form-control" placeholder="status" aria-label="project status" aria-describedby="basic-addon2" name="status" value={formData.status} onChange={handleChange}>
                                      <option>Select status</option>
                                      <option   value="PENDING"  > PENDING</option>
                                      <option   value="PEER REVIEW"  >PEER REVIEW</option>
                                      <option   value="TRANSCRIBING" >TRANSCRIBING</option>
                                      <option   value="QA"  >QA</option>
                                      <option   value="DELIVERY" >DELIVERY</option>
                                      <option   value="DELIVERED"  >DELIVERED</option>
                                      <option   value="SPLITTING"  >SPLITTING</option>
                                    </select>
                                        
                                    </div>
                                </div>
                            </div>
                       
                            <div className="row">
                                <div className="col-md-6">
                                    
                                <div>
                                <label htmlFor="exampleInputEmail1" className="form-label">Split</label> &nbsp;
                                  <input  type="checkbox" name="split"   checked={checked }  onChange={() => { handleChange; handleChecked();
                                  }}/>  
                                  {checked && (
                                    <>
                                     <div> <label htmlFor="exampleInputEmail1" className="form-label">How many files?</label> < input type="number" name="fileNumber" value={formData.fileNumber} onChange={handleChange} className="form-control" />   </div>
                                     <div>
                                      
                                     <label htmlFor="" className="form-label">Split by</label> 
                                     <select className="form-control" name="splitBy" value={formData.splitBy} onChange={handleChange} >
                                      <option value="Minutes">Minutes</option>
                                      <option value="Percentage">Percentage</option>
                                     </select>
                                     </div>
                                     </>
                                     )}
                                </div>
                                </div>
                                
                            </div>
                           

                            <div className="row">
                            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                                <div class="input-group">
                                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                 </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <label htmlFor="exampleInputEmail1" className="form-label">Audio File</label>
                            <input className="form-control" type="file" onChange={handleFileChange} ref={inputRef} accept=".mp3,.wav,.ogg,.wma"/>

                            </div>
                            
                           <br/>
                           <button type="submit" className="btn btn-primary"disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin    /> : "Submit"} </button>
                          {response}
                        </form>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProject;
