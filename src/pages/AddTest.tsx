import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import Waveform from './WaveformSample';
import MyEditor from "@app/components/tinymce/Tinymce";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Editor } from '@tinymce/tinymce-react';


const FileUpload = () => {
  useEffect(() => {
    getTask();
    fetchUsers();
   }, []);
  const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
  const [initialtranscribedText, setTranscribedText] = useState("");
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [initialData, setInitialData] = useState('');
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
      id: `${id}`,
      transcribedText: '',
      startTime: '',
      endTime: '',
      status: '',
      project: '',
      user: '',
      projectFile: '',
      filePath: '',
  });
  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get("https://scribe.clickaway.co.ke/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      setUsers(response.data);
      
     
    } catch (error) {
      
     
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      user: event.target.value
    });
  };

  const getTask = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`https://scribe.clickaway.co.ke/api/tasks/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setInitialData(response.data);
      console.log(response.data);

      setTranscribedText(response.data.transcribedText);
      setStatus(response.data.status);
      setFilePath(response.data.filePath);

      setFormData({
        id: `${id}`,
        transcribedText: response.data.transcribedText,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        status: response.data.status,
        project: response.data.project,
        user: response.data.user,
        projectFile: response.data.projectFile,
        filePath: response.data.filePath,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (event) => {
    
    setLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    console.log(formData);
    event.preventDefault();
    axios.put(`https://scribe.clickaway.co.ke/api/tasks/${id}`, formData, {
      headers: {
        'accept': ' */*',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      // show success message or redirect to another page
      setLoading(false);
      toast.success('Sucessfully saved');
    })
    .catch(error => {
      console.error(error);
      // show error message
      setLoading(false);
      toast.error(error);
    });
  };
  


  return (
    <div>
      <ContentHeader title="Transcribe " />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">  </h3>
              <div className="card-tools">
                
              </div>
            </div>
            <div className="card-body">
            
    

            <select className="form-control" name="user"  value={formData.user} onChange={handleChange}    >
              <option value=""> --Select a user--</option>
                 {users.map((user) => (
                 <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option> ))}
            </select>

              
            <div>
      
      
    </div>
              <br />
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"} </button>
             
              
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileUpload;
