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


const AssignTask = () => {
  useEffect(() => {
    getTask();
    fetchUsers();
   }, []);

  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [initialData, setInitialData] = useState('');
  const [users, setUsers] = useState([]);
  const[assignee, setAssignee] = useState('');

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
  const isAssigneePresent = () => {
    return assignee !== null;
  }
  
  // function to find user by assignee id
  const findUserByAssigneeId = (assignee) => {
    return users.find(user => user.id === assignee);
  }
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
      setAssignee(response.data.user);
      setStatus(response.data.status);
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
      toast.success('Sucessfully assigned task');
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
      <ContentHeader title="Assign task to a user " />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> Task {id} </h3>
              <div className="card-tools">
                Assignee : {assignee}
              </div>
            </div>
            <div className="card-body">
             <span>
             Assign to:
             </span>
            <br />
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

export default AssignTask;
