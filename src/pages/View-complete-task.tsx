import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import Waveform from './WaveformSample';

import { saveAs } from 'file-saver';

import { useParams } from 'react-router-dom';

import {Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const ViewComplete = () => {
  useEffect(() => {
    localStorage.removeItem('wavetime');
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


  const navigate = useNavigate();
 

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
  const handleDownload = () => {
    const text = formData.transcribedText;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  
    // Use either pdf or doc as the file extension
    const extension = 'pdf';
    const filename = `transcribed-text.${extension}`;
  
    saveAs(blob, filename);
  };
  
  



  return (
    <div>
      <ContentHeader title="View " />
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
            
          

            {filePath && <Waveform url={filePath} />}
            
            {/* <div dangerouslySetInnerHTML={{__html: formData.transcribedText}}></div> */}
            <SunEditor
            setContents={formData.transcribedText}
          
             width="100%"
            height="500"
             setOptions={{
              buttonList: [
                 
                [ 'print'],
              ],
              
              }}
             
              readOnly={true}
              />
             
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewComplete;
