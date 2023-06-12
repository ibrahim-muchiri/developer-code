// import React, { useState } from "react";
// import adminLayout from "../hoc/adminLayout";
// import DataTable from 'react-data-table-component';

// import 'react-dropdown/style.css';

  
// const columns = [
//   {
//     name: 'Job',
//     selector: 'job',
//     sortable: true,
//     filterable: true
//   },{
//     name: 'Status',
//     selector: 'status',
//     sortable: true,
//     filterable: true
//   },
//   {
//     name: 'Actions',
//     selector: 'actions',
//     cell: (row) => (
//         <div className="dropdown table-action-dropdown">
//         <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
//         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
//         <li><a className="dropdown-item" href={`/task?${row.id}`}><i className="fa fa-pencil" aria-hidden="true"></i> Transcribe Job </a></li>
//         <div className="dropdown-divider"></div>
//         <li><a className="dropdown-item " href={`/task?${row.id}`}><i className="fa fa-info" aria-hidden="true"></i> Review job</a></li>
     
       
//         </ul>
//         </div>
//         )
// },
// ];

// const data = [
//   {
//     id: 1,
//     job: 'Job 1',
//     status: 'PENDING'
    
//   },
//   {
//     id: 2,
//     job: 'Job 2',
//     status: 'COMPLETE'
//   },
//   {
//     id: 3,
//     job: 'Job 3',
//     status: 'PENDING'
    
//   },
//   {
//     id: 4,
//     job: 'Job 4',
//     status: 'PENDING'
    
//   },
//   {
//     id: 5,
//     job: 'Job 5',
//     status: 'COMPELETE'
    
//   },
//   {
//     id: 6,
//     job: 'Job 6',
//     status: 'COMPELETE'
    
//   },
//   {
//     id: 7,
//     job: 'Job 7',
//     status: 'COMPELETE'
    
//   },{
//     id: 8,
//     job: 'Job 8',
//     status: 'COMPELETE'
    
//   },
//   {
//     id: 9,
//     job: 'Job 9',
//     status: 'COMPELETE'
    
//   },
//   {
//     id: 10,
//     job: 'Job 10',
//     status: 'COMPELETE'
    
//   }
  
// ];

// function ViewJobs() {
//   const [filterText, setFilterText] = useState('');
//   const filteredData = data.filter(
//     item => item.job.toLowerCase().includes(filterText.toLowerCase())
//   );

//   return (
//     <>
   
//       <DataTable
//         title={<div style={{}}><div>JOBS </div> <div style={{ display: "flex", justifyContent: "flex-end" }}><input type="text"  placeholder="Filter by job title"   value={filterText} onChange={e => setFilterText(e.target.value)} /></div> </div>}
//         columns={columns}
//         data={filteredData}
//         pagination
//         paginationPerPage={10}
//       />
//     </>
//   );
// };

// export default adminLayout(ViewJobs);

///////////////////
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { ContentHeader } from '@components';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { constants } from 'crypto';
import { toast } from 'react-toastify';

function JobList() {
  const tableRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedInUserid, setUserid] = useState('');
  const [dataSet, setData] = useState(false);
  const [loginIdstate, setLoginIDState] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    transcribedText: '',
    startTime: '',
    endTime: '',
    status: '',
    project: '',
    user: '',
    projectFile: '',
    filePath: '',
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      setCurrentUserRole(
        decodedToken.claims.find((claim) => claim.startsWith('ROLE_')).substring(5)
      );
      setEmail(decodedToken.sub);
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://scribe.clickaway.co.ke/api/tasks', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        });
        setTasks(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (email) {
      fetchUsers();
    }
  }, [email]);

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const allusers = await axios.get('https://scribe.clickaway.co.ke/api/users', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      setUsers(allusers.data);
      console.log(email);

      const filteredUsers = allusers.data.filter((user) => user.email === email);
      const filteredUser = filteredUsers[0];
      if (filteredUsers.length === 0) {
        console.log(`No user found with email ${email}`);
      } else {
        const filteredUser = filteredUsers[0];
        console.log(filteredUser.id);
        setUserid(filteredUser.id);
        setLoginIDState(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const AssignTaskToTranscriber = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(
        `https://scribe.clickaway.co.ke/api/tasks/${id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFormData({
        id: `${id}`,
        transcribedText: response.data.transcribedText,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        status: response.data.status,
        project: response.data.project,
        user: loggedInUserid,
        projectFile: response.data.projectFile,
        filePath: response.data.filePath,
      });

      setTaskId(id);
      setData(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dataSet) {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      axios
        .put(`https://scribe.clickaway.co.ke/api/tasks/${taskId}`, formData, {
          headers: {
            accept: ' */*',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
          toast.success('Sucessfully assigned task');
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          toast.error(error);
        });
    }
  }, [dataSet]);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    const table = $(tableRef.current).DataTable({
      data: tasks.filter((task) => currentUserRole !== 'TRANSCRIBER' || !task.user),
      columns: [
        { data: 'id' },
        { data: 'projectTitle' },
        { data: 'project' },
        { data: 'status' },
        {
          data: 'user',
          render: function (data, type, row) {
            return data ? data : 'Unassigned';
          }
        },
        
        {
          data: null,
          render: function (data, type, row) {
            const id = row.id;
            let assignAction = '';
            let reviewAction = '';
            if (currentUserRole === 'TRANSCRIBER' && !row.user) {
              return `
              <div class="dropdown">
                <button class="btn btn-primary assign"  aria-haspopup="true" aria-expanded="false"  title="Assign this task to yourself">
                 Assign
                </button>
                
            </div>
              </div>
            `;
            } else if (currentUserRole === 'QA' && row.status === 'PEER_REVIEW') {
              reviewAction = `<a class="dropdown-item" href="/review-task/${id}">Review</a>`;
            } else if (currentUserRole === 'ADMIN') {
              assignAction = `<a class="dropdown-item" href="/assign-task/${id}">Assign </a>`;
              reviewAction = `<a class="dropdown-item" href="/review-task/${id}">Review</a>`;
            }

            return `
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="action-dropdown-${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action
                </button>
                <div class="dropdown-menu" aria-labelledby="action-dropdown-${id}">
                ${assignAction}
                ${reviewAction}
              </div>
            </div>
              </div>
            `;
          },
        },
      ],
      order: [[0, 'desc']],
    });

    table.on('click', '.dropdown-toggle', function () {
      $(this).siblings('.dropdown-menu').toggle();
    });
    table.on('click', '.assign', function () {
      const id = $(this).closest('tr').find('td:first-child').text();
      AssignTaskToTranscriber(id);
    });
    table.column(1).search(titleFilter).draw();
    table.column(3).search(statusFilter).draw();
  }, [tasks, titleFilter, statusFilter]);

  const handleFilterChange = (e) => {
    setTitleFilter(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ContentHeader title="Manage Tasks" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
              <div className="card-tools">
                <div className="row">
                  <div className="form-group col-xs-6">
                    <select
                      className="form-control"
                      onChange={(e) => setStatusFilter(e.target.value)}
                      value={statusFilter}
                    >
                      <option value="">Filter by status</option>
                      <option value="PENDING">PENDING</option>
                      <option value="PEER_REVIEW">PEER REVIEW</option>
                      <option value="TRANSCRIBING">TRANSCRIBING</option>
                      <option value="DELIVERY">DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="SPLITTING">SPLITTING</option>
                    </select>
                  </div>
                  &nbsp; &nbsp;
                  <div className="form-group col-xs-6">
                    <select
                      className="form-control"
                      onChange={(e) => setTitleFilter(e.target.value)}
                      value={titleFilter}
                    >
                      <option value="">Filter by project title</option>
                      {tasks.map((task) => (
                        <option key={task.id} value={task.projectTitle}>
                          {task.projectTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <table
                ref={tableRef}
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Project title</th>
                    <th>Project id</th>
                    <th>Status</th>
                    <th>Assignee ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.data?.map((task) => {
                   <div key={task.id}>
                   <p>{task.id}</p>
                   <p>{task.projectTitle}</p>
                   <p>{task.status}</p>
                   <p>{task.project}</p>
                   <p>{task.action}</p>
                 </div>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobList;




