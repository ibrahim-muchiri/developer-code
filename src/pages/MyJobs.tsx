import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {ContentHeader} from '@components';
import jwt from 'jsonwebtoken';

function ViewMyjobs() {
  const [email, setEmail] = useState('');
  const tableRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] =  useState([]);
  const [loggedInUserid, setUserid] = useState('');
  const[Userid, setUserrid] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      setEmail(decodedToken.sub);
  
      
    }
  }, []);
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
      console.log(allusers.data);
  
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
      }
      
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (loggedInUserid) {
      fetchMyTasks();
    }
  }, [loggedInUserid]);
  
 
   
    const fetchMyTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`https://scribe.clickaway.co.ke/api/tasks/taskByUserID/${loggedInUserid}`, {
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

 

  useEffect(() => {
     // Destroy any existing DataTable instance
  if ($.fn.DataTable.isDataTable(tableRef.current)) {
    $(tableRef.current).DataTable().destroy();
  }
    const table = $(tableRef.current).DataTable({
      data: tasks,
      columns: [
        { data: 'id' },
        { data: 'startTime', render: (data) => formatDate(data) },
        { data: 'projectTitle' },
        { data: 'status' },
        {
          data: null,
          render: function (data, type, row) {
            const id = row.id;
            return `
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="action-dropdown-${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action
                </button>
                <div class="dropdown-menu" aria-labelledby="action-dropdown-${id}">
                  <a class="dropdown-item" href="/task/${id}">Transcribe </a>
                  <a class="dropdown-item" href="/view-complete-task/${id}">View </a>
                  
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
    table.column(2).search(titleFilter).draw();
  }, [tasks, titleFilter]);
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
      <ContentHeader title="My Tasks" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">User: {loggedInUserid}</h3>
              <div className="card-tools">
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
            <div className="card-body">
            <table 
            ref={tableRef} className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Start Time</th>
          <th>Project</th>
          <th>Status</th>
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


export default ViewMyjobs;
