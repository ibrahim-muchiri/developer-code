/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {ContentHeader} from '@components';
import { Dropdown } from 'react-bootstrap';

const columns = [
  {
    name: "ID",
    selector: "clientId",
    sortable: true,
  },
  {
    name: "Name",
    selector: "clientName",
    sortable: true,
  },
  {
    name: "Location",
    selector: "physicalAddress",
    sortable: true,
  },
  {
    name: "Postal address",
    selector: "postalAddress",
    sortable: true,
  },
  {
    name: 'Actions',
    selector: 'actions',
    cell: (row) => (
      <div className="cursor__pointer ">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Actions
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`/view-client/${row.clientId}`}>
            <i className="fa fa-info" aria-hidden="true"></i> View 
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href={`/editClient/${row.clientId}`}>
            <i className="fa fa-pencil" aria-hidden="true"></i> Edit
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href={`/add-contact-person/${row.clientId}`}>
            <i className="fa fa-plus" aria-hidden="true"></i> Add Contact person
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
        )
}
];


const ManageClients = () => {
  const [filterText, setFilterText] = useState('');
 const [clients, setClients] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

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

 useEffect(() => {
   fetchClients();
 }, []);
 const filteredData = clients.filter(
   item => item.clientName.toLowerCase().includes(filterText.toLowerCase())
 );
  return (
    <div>
      <ContentHeader title="Manage Clients" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"></h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
            <div>
   {loading ? (
     <p>Loading clients...</p>
   ) : error ? (
     <p>An error occurred while loading clients.</p>
   ) : (
     <DataTable
     title={<div style={{}}> <div style={{ display: "flex", justifyContent: "flex-end" }}><input type="text"  placeholder="Filter by Client Name"   value={filterText} onChange={e => setFilterText(e.target.value)} /></div> </div>}
     columns={columns}
     data={filteredData}
     pagination
     paginationPerPage={10}
     />
   )}
 </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageClients;
