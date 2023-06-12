import React, { useState } from 'react';
import adminLayout from '../hoc/adminLayout';

function AddTest() {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    internalDeadLine: '2023-02-15T08:01:03.194Z',
    clientDeadLine: '2023-02-15T08:01:03.194Z',
    status: '',
    projectMetadata: 'string',
    projectFiles: [
        {
          filePath: "string",
          fileIdentifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          fileName: "string",
          mimeType: "string",
          size: "string",
          project: 0
        }
      ],
    client: 10
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://scribe.clickaway.co.ke/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiY2xhaW1zIjpbIlJFQURfUFJJVklMRUdFIiwiUk9MRV9BRE1JTiIsIldSSVRFX1BSSVZJTEVHRSJdLCJleHAiOjE2NzY0NTgwNTB9.j5cp1BEvO2Ddfn2CPhnIj9FqHlqiauOP7CdlPYe8rofGL9-qAd0EzFI1aYY8nqisRYiiikLNEwUjqbV57FCP4Q'
        },
        body: JSON.stringify(projectData)
      });
      if (!response.ok) {
        throw new Error('Failed to create project.');
      }
      // Handle successful response here
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectTitle">Project Title:</label>
      <input type="text" id="projectTitle" name="projectTitle" value={projectData.projectTitle} onChange={handleChange} />
<br/>
      
      <label htmlFor="status">Status:</label>
      <input type="text" id="status" name="status" value={projectData.status} onChange={handleChange} />
      <br/>
      <label htmlFor="projectMetadata">Project Metadata:</label>
      
      <br/>
      <label htmlFor="projectFiles">Project Files:</label>
      
      <br/>
      <button type="submit">Create Project</button>
    </form>
  );
}
export default adminLayout(AddTest);