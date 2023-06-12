import React, { useState } from "react";
import adminLayout from "../hoc/adminLayout";
import DataTable from 'react-data-table-component';

import 'react-dropdown/style.css';

  
const columns = [
  {
    name: 'Username',
    selector: 'userName',
    sortable: true,
    filterable: true
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true
  },
  {
    name: 'Role',
    selector: 'role'
  },
  {
    name: 'Actions',
    selector: 'actions',
    cell: (row) => (
        <div className="dropdown table-action-dropdown">
        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
        <li><a className="dropdown-item" href={`/edit/${row.projectTitle}`}><i className="fa fa-pencil" aria-hidden="true"></i> Edit </a></li>
        <div className="dropdown-divider"></div>
        <li><a className="dropdown-item " href={`/view/${row.projectTitle}`}><i className="fa fa-info" aria-hidden="true"></i> Details</a></li>
        <div className="dropdown-divider"></div>
        <li><a className="dropdown-item text" href={`/createjob?${row.projectTitle}`}><i className="fa fa-eye" aria-hidden="true"></i> View Jobs</a></li>
        <div className="dropdown-divider"></div>
        <li><a className="dropdown-item text" href={`/createjob?${row.projectTitle}`}><i className="fa fa-trash" aria-hidden="true"></i> View Jobs</a></li>
       
        </ul>
        </div>
        )
},
];

const data = [
  {
    id: 1,
    userName: 'Test 1',
    email: 'test1@test.com',
    role: 'Transcriber'
  },
  {
    id: 2,
    userName: 'Test 2',
    email: 'test2@test.com',
    role: 'Transcriber'
  },
  {
    id: 3,
    userName: 'Test 9',
    email: 'test9@test.com',
    role: 'Project Manager'
  },
  {
    id: 4,
    userName: 'Test 3',
    email: 'test3@test.com',
    role: 'Admin'
  },
  {
    id: 5,
    userName: 'Test 4',
    email: 'test4@test.com',
    role: 'Peer Reviewer'
  },
  {
    id: 6,
    userName: 'Test 5',
    email: 'test5@test.com',
    role: 'Project Manager'
  },
  {
    id: 7,
    userName: 'Admin',
    email: 'admin@example.com',
    role: 'Admin'
  }
];

function ManageUser() {
  const [filterText, setFilterText] = useState('');
  const filteredData = data.filter(
    item => item.userName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
   
      <DataTable
        title={<div style={{}}><div>User management</div> <div style={{ display: "flex", justifyContent: "flex-end" }}><input type="text"  placeholder="Filter by username"   value={filterText} onChange={e => setFilterText(e.target.value)} /></div> </div>}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
      />
    </>
  );
};

export default adminLayout(ManageUser);
