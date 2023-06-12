import React from 'react';
import adminLayout from '../hoc/adminLayout';
import Waveform from '../components/WaveformComponent';
import MyEditor from '../components/Tinymce';


const Task = () => {
  return (
    
    <div className="my-3 p-3 bg-body rounded shadow-sm">
     
      <Waveform  />

      <MyEditor/>
      <br/>

      <button type="submit" className="btn btn-default">Submit</button>
      
    </div>
    
  );
};

export default adminLayout(Task);
