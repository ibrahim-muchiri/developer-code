import React, { useState, useEffect } from "react";
import adminLayout from "../hoc/adminLayout";
import DataTable from 'react-data-table-component';
import axios from "axios";

import 'react-dropdown/style.css';

const columns = [
  {
    name: 'Title',
    selector: 'projectTitle',
    sortable: true,
    filterable: true
  },
  {
    name: 'Internal Deadline',
    selector: 'internalDeadLine',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'status'
  },
  {
    name: 'Actions',
    selector: 'actions',
    cell: (row) => (
        <div className="dropdown table-action-dropdown">
        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
        <li><a className="dropdown-item" href={`/edit/${row.projectTitle}`}><i className="fa fa-pencil" aria-hidden="true"></i> Edit Project</a></li>
        <div className="dropdown-divider"></div>
        <li><a className="dropdown-item " href={`/view/${row.projectTitle}`}><i className="fa fa-eye" aria-hidden="true"></i> View project</a></li>
        <div className="dropdown-divider"></div>
        <li><a className="dropdown-item text" href={`/createjob?${row.projectTitle}`}><i className="fa fa-plus" aria-hidden="true"></i> Create job</a></li>
       
        </ul>
        </div>
        )
},
];

function ManageProject() {
  const [filterText, setFilterText] = useState('');
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get("https://scribe.clickaway.co.ke/api/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json"
        }
      });
      setProjects(response.data);
      console.log(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredData = projects.filter(
    item => item.projectTitle.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <DataTable
        title={<div style={{}}><div>Project management  </div> <div style={{ display: "flex", justifyContent: "flex-end" }}><input type="text"  placeholder="Filter by project title"   value={filterText} onChange={e => setFilterText(e.target.value)} /></div> </div>}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
      />
    </>
  );
};

export default adminLayout(ManageProject);
