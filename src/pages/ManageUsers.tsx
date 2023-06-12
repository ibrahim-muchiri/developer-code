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


const ManageUsers = () => {
  const tableRef = useRef();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState('');
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
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("https://scribe.clickaway.co.ke/api/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://scribe.clickaway.co.ke/api/roles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
            },
          }
        );
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    $.fn.dataTable.ext.errMode = 'none';
    const table = $(tableRef.current).DataTable({
      data: users,
      columns: [
        { data: 'id' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'email' },
        {
      data: 'roles[0].roleName',
      render: function(data, type, row) {
        return data.replace('ROLE_', '');
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
                  <a class="dropdown-item" href="/view-user/${id}">View</a>
                  <a class="dropdown-item" href="/edit-user/${id}">Edit</a>
                  <a class="dropdown-item" href="/manage-roles/${id}">Manage roles</a>
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
    table.column(4).search(roleFilter).draw();
  }, [users, roleFilter]);
  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  return (
    <div>
      <ContentHeader title="Manage Users" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
              <div className="card-tools">
              <select
               className="form-control"
              onChange={(e) => setRoleFilter(e.target.value)}
              value={roleFilter}
              >
                <option value=""> Filter by role</option>
                     {roles.map((role) => (
                       <option key={role.roleName} value={role.roleName.replace('ROLE_', '')}>{role.roleName.replace('ROLE_', '')}</option>
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
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

export default ManageUsers;
