import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {ContentHeader} from '@components';
import jwt from 'jsonwebtoken';
import {Link, useNavigate} from 'react-router-dom';

function CompletedTasks() {
  const tableRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      const userRole = decodedToken.claims.find(claim => claim === "ROLE_ADMIN" || claim === "ROLE_QA");
      if (!userRole) {
        navigate('/unauthorized');
      }
    } else {
      navigate('/login');
    }
  }, []);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`https://scribe.clickaway.co.ke/api/tasks/taskByStatus/DELIVERY`, {
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

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: tasks,
      columns: [
        { data: 'id' },
        { data: 'startTime' },
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
                 
                  <a class="dropdown-item" href="/view-complete-task/${id}">View</a>
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
      <ContentHeader title="complete tasks" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
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


export default CompletedTasks;
