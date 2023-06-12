import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {ContentHeader} from '@components';
import {Link, useNavigate} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { constants } from 'crypto';
import { toast } from "react-toastify";


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
  const [users, setUsers] =  useState([]);
  const [loggedInUserid, setUserid] = useState('');
  const[dataSet, setData]= useState(false);
  const[loginIdstate, setLoginIDState]= useState(false);
  const[taskId, setTaskId] = useState('');
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
      setCurrentUserRole(decodedToken.claims.find(claim => claim.startsWith('ROLE_')).substring(5));
      setEmail(decodedToken.sub);
    }
  }, []);

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("https://scribe.clickaway.co.ke/api/tasks", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        setTasks(response.data);
        setLoading(false);
       
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

// get user id of logged in user
useEffect(() => {
  if (email) {
    fetchUsers();
  }
}, [email]);

const fetchUsers = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const allusers = await axios.get("https://scribe.clickaway.co.ke/api/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    setUsers(allusers.data);
    console.log(email)
   
    const filteredUsers = allusers.data.filter(user => user.email === email);
    const filteredUser = filteredUsers[0]; 
    if (filteredUsers.length === 0) {
      console.log(`No user found with email ${email}`);
    } else {
      // Log the id of the filtered user
      const filteredUser = filteredUsers[0]; // assuming there's only one user with the specified email
      console.log(filteredUser.id);
      setUserid(filteredUser.id);
      setLoginIDState(true);
    }
    
  } catch (error) {
    setError(error);
  }
};

  // assign task to a transcriber logged in
  

  const AssignTaskToTranscriber = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`https://scribe.clickaway.co.ke/api/tasks/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
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
   
    if(dataSet  ){
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`https://scribe.clickaway.co.ke/api/tasks/${taskId}`, formData, {
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
      toast.success('Sucessfully assigned task');
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
      // show error message
      setLoading(false);
      toast.error(error);
    });

      
     
     
    }
  
   }, [dataSet]);
   


  useEffect(() => {
    // Destroy any existing DataTable instance
  if ($.fn.DataTable.isDataTable(tableRef.current)) {
    $(tableRef.current).DataTable().destroy();
  }

    


    const table = $(tableRef.current).DataTable({
      data: tasks.filter(task => currentUserRole !== 'TRANSCRIBER' || !task.user),
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
            if (currentUserRole === "TRANSCRIBER" && !row.user) {
              return `
              <div class="dropdown">
                <button class="btn btn-primary assign"  aria-haspopup="true" aria-expanded="false"  title="Assign this task to yourself">
                 Assign
                </button>
                
            </div>
              </div>
            `;
            } 
            else if (currentUserRole === "QA"&& row.status === "PEER_REVIEW") {
              reviewAction = `<a class="dropdown-item" href="/review-task/${id}">Review</a>`;
            }
            else if (currentUserRole === "ADMIN") {
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






    // Toggle dropdown menu when button is clicked
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
              <select  className="form-control"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
              >
                  <option value="">Filter by status</option>
                  <option   value="PENDING"  > PENDING</option>
                  <option   value="PEER_REVIEW"  >PEER REVIEW</option>
                  <option   value="TRANSCRIBING" >TRANSCRIBING</option>
                  <option   value="DELIVERY" >DELIVERY</option>
                  <option   value="DELIVERED"  >DELIVERED</option>
                  <option   value="SPLITTING"  >SPLITTING</option>

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
            ref={tableRef} className="table table-striped table-bordered">
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
      <tbody></tbody>
    </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default JobList;
