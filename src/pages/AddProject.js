import React, { useState, useContext,  useEffect, useCallback } from "react";
import adminLayout from "../hoc/adminLayout"
import axios from "axios";
import ReactDropzone,  { useDropzone } from "react-dropzone";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import '../assets/css/bootstrap-nav-wizard.css';
import { UserContext } from '../context/UserContext';


const AddProject = () => {
 
    const [clients, setClients] = useState([]);
  


    const [file, setFile] = useState(null);
    const onDrop = (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    };
    const [formData, setFormData] = useState({
      projectTitle: '',
      internalDeadLine: '',
      clientDeadLine: '',
      status: '',
      projectMetadata: 'string',
     projectFiles: [
    {
      filePath: 'string',
      fileIdentifier: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      fileName: "string",
      mimeType: "string",
      size: "2mb",
      project: 0
    }
  ],
      client: 10
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const { user, setUser } = useContext(UserContext);
    const handleAudioFileDrop = (files) => {
      // do something with the dropped audio files
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(
          'https://scribe.clickaway.co.ke/api/projects',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json"
            }
        
          }
        );
        setResponse("Project added successfully!");
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setResponse(error.message);
        setLoading(false);
        console.error(error);
      }
      try {
        await fetch("../uploads", {
          method: "POST",
          body: formData,
        });
        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    };


    const [checked, setChecked] = useState(false);
    useEffect(() => {
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


  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  


    
        return (
           <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0 mb-3">Add Project</h6>
                        <form onSubmit={handleSubmit}>
                        {response && <div className="alert alert-light">{response}</div>}
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Project title</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Title" aria-label="title" aria-describedby="basic-addon2" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required/>
                                        <span className="input-group-text" id="basic-addon2" ><i className="fa fa-"></i></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Select a client</label>
                                    <div className="input-group mb-3">
                                      <select className="form-control" name="client">
                                      <option value="">Select a client</option>
                                         {clients.map((client) => (
                                           <option key={client.id} value={client.clientId}>{client.clientName}</option>
                                               ))}
                                      </select>
                                      <span className="input-group-text" id="basic-addon2"><i className="fa fa-caret-down"></i></span>
                                    </div>
                                </div>
                            </div>
                           

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Project code</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Project Code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Project Status</label>
                                    
                                    <div className="input-group mb-3">
                                    <select className="form-control" placeholder="status" aria-label="project status" aria-describedby="basic-addon2" name="status">
                                      <option>Select status</option>
                                      <option   value={formData.status} onChange={handleChange} required> Pending</option>
                                      <option   value={formData.status} onChange={handleChange} required> </option>
                                    </select>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-"></i>...</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Client deadline</label>
                                    <div className="input-group mb-3">
                                        <input type="datetime-local" className="form-control" aria-label="county" aria-describedby="basic-addon2" name="clientDeadLine" value={formData.clientDeadLine} onChange={handleChange} required/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Internal deadline</label>
                                    <div className="input-group mb-3">
                                        <input type="datetime-local" className="form-control" placeholder="www.example.com" aria-label="Recipient's username" aria-describedby="basic-addon2" name="internalDeadLine" value={formData.internalDeadLine} onChange={handleChange}/>
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    
                                <div>
                                <label htmlFor="exampleInputEmail1" className="form-label">Split</label> &nbsp;
                                  <input  type="checkbox"  checked={checked} onChange={() => setChecked(!checked)}/>  {checked && (
                                     <div> <label htmlFor="exampleInputEmail1" className="form-label">How many files?</label> < input type="number"  class="form-control" name="number"/>   </div>
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
                            <div className="row" style={{  borderRadius: "5px", padding: "10px",textAlign: "center", border: "3px grey dashed"}}>

                            <div {...getRootProps()}>
            <Input {...getInputProps()} />
            {file ? (
              <p>Selected file: {file.name}</p>
            ) : (
              <p>Drag and drop a file, or click to select a file</p>
            )}
          </div>

                            </div>
                            
                           <br/>
                           <button type="submit" className="btn btn-default" disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
                        </form>
                </div>
        );
};

export default adminLayout(AddProject);