import React, { useState, useEffect } from "react";

import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import Waveform from './WaveformSample';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { Editor } from '@tinymce/tinymce-react';


const EditorSample = () => {
    
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  const handleExport = () => {
    // Code to export the content goes here
  };
   


  return  (
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
           
            <div>
            <Editor
                apiKey="tqfr5tznbvr4q2bfkivie9z3kf9qh3845dya8dfwa6776y4d"
                initialValue="<p>Enter text here...</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'export', 'toc'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | export | help | toc',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={handleEditorChange}
              />
      
      
    </div>
              <br />
             
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  
  );
};

export default EditorSample;
