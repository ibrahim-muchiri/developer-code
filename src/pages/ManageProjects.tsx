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


function ManageProjects() {
  const tableRef = useRef();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
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
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("https://scribe.clickaway.co.ke/api/projects", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("https://scribe.clickaway.co.ke/api/clients", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

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
        // Destroy any existing DataTable instance
  if ($.fn.DataTable.isDataTable(tableRef.current)) {
    $(tableRef.current).DataTable().destroy();
  }
    const table = $(tableRef.current).DataTable({
      data: projects,
      columns: [
        { data: 'id' },
        { data: 'projectTitle' },
       
        { data: 'clientDeadLine', render: (data) => formatDate(data) },
        { data: 'internalDeadLine', render: (data) => formatDate(data) },
        { data: 'status' },
        {
          data: 'client',
          render: function (data) {
            const client = clients.find((c) => c.clientId === data);
            return client ? client.clientName : '';
          },
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
                  <a class="dropdown-item" href="/view-project/${id}">View</a>
                  <a class="dropdown-item" href="/edit-project/${id}">Edit</a>
                  <a class="dropdown-item" href="/view-project-tasks/${id}">View tasks</a>
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
    if (clientFilter === '') {
      table.column(5).search('').draw();
    } else {
      table.column(5).search(`^${clientFilter}$`, true, false).draw();
    }
    table.column(4).search(statusFilter).draw();
  }, [projects, clientFilter, statusFilter]);
  const handleFilterChange = (e) => {
    setClientFilter(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ContentHeader title="Manage Projects" />
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
                  <option   value="PEER REVIEW"  >PEER REVIEW</option>
                  <option   value="TRANSCRIBING" >TRANSCRIBING</option>
                  <option   value="QA"  >QA</option>
                  <option   value="DELIVERY" >DELIVERY</option>
                  <option   value="DELIVERED"  >DELIVERED</option>
                  <option   value="SPLITTING"  >SPLITTING</option>

              </select>
             </div>
             &nbsp;&nbsp;
             <div className="form-group col-xs-6">
              <select
              className="form-control"
              onChange={(e) => setClientFilter(e.target.value)}
              value={clientFilter}
              >
                <option value="" >Filter by Client </option>
                {clients.map((client) => (
                <option  key={client.clientId} value={`${client.clientName}`}>
                  {client.clientName}
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
          <th>ID</th>
          <th>Project title</th>
          
          <th>Client Deadline</th>
          <th>Internal Deadline</th>
          <th>Status</th>
          <th>Client</th>
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


export default ManageProjects;
