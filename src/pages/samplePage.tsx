import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const SamplePage = () => {
  const [formData, setFormData] = useState({
    transcribedText: '',
  });

  const handleTranscription = (text) => {
    setFormData({
      ...formData,
      transcribedText: text,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // axios.post('https://example.com/api/endpoint', formData)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
  };

  return (
    <div>
      <Editor
        apiKey=""
        initialValue=""
        value={formData.transcribedText}
        onEditorChange={(value) => handleTranscription(value)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SamplePage;
