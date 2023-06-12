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

function ManageClients() {
  const tableRef = useRef();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: clients,
      columns: [
        { data: 'clientId' },
        { data: 'clientName' },
        { data: 'physicalAddress' },
        { data: 'postalAddress' },
        {
          data: null,
          render: function (data, type, row) {
            const id = row.clientId;
            return `
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="action-dropdown-${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action
                </button>
                <div class="dropdown-menu" aria-labelledby="action-dropdown-${id}">
                  <a class="dropdown-item" href="/view-client/${id}">View</a>
                  <a class="dropdown-item" href="/edit-client/${id}">Edit</a>
                  <a class="dropdown-item" href="/add-contact-person/${id}">Add Contact person</a>
                  <a class="dropdown-item" href="/view-contact-persons/${id}">View contact persons</a>
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
  }, [clients]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <ContentHeader title="Manage Clients" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
              <div className="card-tools">
                
              </div>
            </div>
            <div className="card-body">
            <table 
            ref={tableRef} className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client Name</th>
          <th>Locatiom</th>
          <th>Postal Adress</th>
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


export default ManageClients;
