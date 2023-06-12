import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import Waveform from './WaveformSample';

import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Editor } from '@tinymce/tinymce-react';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Link, useNavigate} from 'react-router-dom';
import '../assets/css/peakAudio.css';

import { Media, Player, controls, utils } from 'react-media-player';
const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen } = controls;
const { keyboardControls } = utils;


const Task = () => {
  useEffect(() => {
    getTask();
    const fileObjString = localStorage.getItem('fileObj');
    console.log(fileObjString);
    if(fileObjString){
      const fileObj = JSON.parse(fileObjString);

      console.log(fileObj.id);
    }
  
   }, []);
  
  const [initialtranscribedText, setTranscribedText] = useState("");
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [initialData, setInitialData] = useState('');
  const navigate = useNavigate();

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
// Get the string from local storage

  const handleTranscription = (text) => {
    setFormData({
      ...formData,
      transcribedText: text,
      status: 'TRANSCRIBING',
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
    const fileObj = {id: `${id}`, filepath: formData.filePath};
    
    const fileObjString = JSON.stringify(fileObj);
    // Store the string in local storage
    localStorage.setItem('fileObj', fileObjString);
    
    
    
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
      status: 'PEER_REVIEW',
      endTime: new Date().toISOString(),
    });
    const accessToken = localStorage.getItem('accessToken');
    console.log(formData);
    event.preventDefault();
    const requestBody = {
      transcribedText: formData.transcribedText,
      submitTask: true,
      status: 'PEER_REVIEW',
      taskId: `${id}`
    };
    //update first 
    // axios.put(`https://scribe.clickaway.co.ke/api/tasks/${id}`, formData, {
    //   headers: {
    //     'accept': ' */*',
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   console.log(response.data);
    //   // show success message or redirect to another page
     
    // })
    // .catch(error => {
    //   console.error(error);
    //   // show error message
    //   setLoading2(false);
    //   toast.error(error);
    // });

    //send to peer review

    
    axios.post('https://scribe.clickaway.co.ke/api/tasks/saveTask', requestBody,  {
      headers: {
        'accept': ' */*',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        setLoading2(false);
        toast.success('Sucessfully submitted for review');
        navigate('/my-jobs');
      })
      .catch(error => {
        console.error(error);
      });

    
  };
  const handleStartTime = () => {
  if (!formData.startTime) {
    const startTime = new Date();
    setFormData({
      ...formData,
      startTime: startTime,
    });
  }
};
 const handleEditorFocus = (event) => {
    setFormData({
      ...formData,
      startTime: new Date().toISOString(),
    });
  };

  const handleTocClick = () => {
    const editor = window.tinymce.activeEditor;
    editor.execCommand('mceInsertTableOfContents');
  };

  return  initialData ?(
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
            {filePath && 
            <Media>
              {(mediaProps) => (
                <div className="media-container" onKeyDown={keyboardControls.bind(null, mediaProps)}>
                  <Player src={filePath} className="media-player" />
                  <div className="media-controls-container">
                    <div className="media-controls">
                      <PlayPause className="btn btn-primary" />
                      <CurrentTime />
                      <Progress  />
                      <SeekBar className="seek-bar"/>
                      <Duration />
                      <MuteUnmute className="btn btn-secondary"/>
                      <Volume />
                      <Fullscreen className="btn btn-info"/>
                    </div>
                  </div>
                </div>
              )}
            </Media>
             }
    

            
              
            <div>
            
            <Editor
                  initialValue="HEADER"
                  apiKey="tqfr5tznbvr4q2bfkivie9z3kf9qh3845dya8dfwa6776y4d"
                  init={{
                    height: 100,
                    menubar: false,
                    toolbar: false,
                  }}
                />
            
               <Editor
                  value={formData.transcribedText}
                  onEditorChange={handleTranscription}
                  onFocus={handleEditorFocus}
                  apiKey="tqfr5tznbvr4q2bfkivie9z3kf9qh3845dya8dfwa6776y4d"
                  init={{
                    placeholder: 'RAW DRAFT',
                    height: 800,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'export', 'tableofcontents'
                    ],
                     menubar: {
                      insert: {
                        title: 'Insert',
                        items: {
                          tableofcontents: {
                            text: 'Table of Contents',
                            onAction: function () {
                              tinymce.activeEditor.execCommand('mceInsertTableOfContents');
                            }
                          }
                        }
                      }
                    },
                    toolbar: 'export | undo redo | blocks  | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent ',
                  }}
                 
                />
                <Editor
                  initialValue="FOOTER"
                  apiKey="tqfr5tznbvr4q2bfkivie9z3kf9qh3845dya8dfwa6776y4d"
                  init={{
                    height: 100,
                    menubar: false,
                    toolbar: false,
                  }}
                />
            
      
      
        </div>
              <br />
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
              <br />

              <button style={{float:"left"}} type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Save"} </button>
              
              <button style={{float:"right"}} type="button" className="btn btn-success"  onClick={handleSaveSubmit} disabled={loading2}> {loading2 ? <FontAwesomeIcon icon={faSpinner} spin /> : "Save and Submit"} </button>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  ): (
    <div>Loading...</div>
  );
};

export default Task;
