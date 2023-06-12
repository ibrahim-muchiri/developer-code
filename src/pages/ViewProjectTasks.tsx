import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4/js/dataTables.bootstrap4.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import {ContentHeader} from '@components';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {Link, useNavigate} from 'react-router-dom';

function ViewProjectTasks() {
  const tableRef = useRef();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  { id } =useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      const userRole = decodedToken.claims.find(claim => claim === "ROLE_ADMIN" );
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
        const response = await axios.get(`https://scribe.clickaway.co.ke/api/tasks/taskByProjectID/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        setTasks(response.data);
        setLoading(false);
        console.log(response.data);
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
            return `
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="action-dropdown-${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action
                </button>
                <div class="dropdown-menu" aria-labelledby="action-dropdown-${id}">
                  <a class="dropdown-item" href="/assign-task/${id}">Assign </a>
                  <a class="dropdown-item" href="/review-task/${id}">Review</a>
                  
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
  }, [tasks]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ContentHeader title="View Tasks" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> Project {id}</h3>
              <div className="card-tools">
                
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


export default ViewProjectTasks;
