import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import Waveform from './WaveForm';
import MyEditor from "@app/components/tinymce/Tinymce";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Editor } from '@tinymce/tinymce-react';
import {Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';


import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const TaskDetails = () => {
  useEffect(() => {
  
    getTask();
   }, []);
  
  const [initialtranscribedText, setTranscribedText] = useState("");
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [initialData, setInitialData] = useState('');

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

  const handleTranscription = (text) => {
    setFormData({
      ...formData,
      transcribedText: text,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      const userRole = decodedToken.claims.find(claim => claim === "ROLE_ADMIN" || claim === "ROLE_QA" );
      if (!userRole) {
        navigate('/unauthorized');
      }
    } else {
      navigate('/login');
    }
  }, []);

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
  const handleSaveSubmit = (event) => {
    setLoading2(true);
    setFormData({
      ...formData,
      status: 'COMPLETED'
    });
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
      setLoading2(false);
      toast.success('Sucessfully submitted for review');
    })
    .catch(error => {
      console.error(error);
      // show error message
      setLoading2(false);
      toast.error(error);
    });
  };



  return (
    <div>
      <ContentHeader title="Review " />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">  Task {id}</h3>
              <div className="card-tools">
                {status}
              </div>
            </div>
            <div className="card-body">
            <a href={filePath}>Filepath: {filePath} </a>
    

            {filePath && <Waveform url={filePath} />}
              
            <div >
             
              <Editor
                  value={formData.transcribedText}
                  onEditorChange={handleTranscription}apiKey="tqfr5tznbvr4q2bfkivie9z3kf9qh3845dya8dfwa6776y4d"
                  init={{
                    
                    height: 800,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'export'
                    ],
                    toolbar: 'export | undo redo | blocks  | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent',
                  }}
                 
                  
                />
                 
        
    </div>
    <br />
    <div >
             <form className="form-horizontal">
        <div className="input-group input-group-sm mb-0">
          <input
            className="form-control form-control-sm"
            placeholder="Comment"
           
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-danger">
              Send
            </button>
          </div>
        </div>
      </form>
              </div>

              <br />
              <button style={{float:"left"}} type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Save"} </button>
              &nbsp; &nbsp;
              <button style={{float:"right"}} type="button" className="btn btn-success"  onClick={handleSaveSubmit} disabled={loading2}> {loading2 ? <FontAwesomeIcon icon={faSpinner} spin /> : " Save & Submit"} </button>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TaskDetails;
