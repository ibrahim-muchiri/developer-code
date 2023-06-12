import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import adminLayout from "../hoc/adminLayout";

const columns = [
  

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
      {loading ? (
        <p>Loading clients...</p>
      ) : error ? (
        <p>An error occurred while loading clients.</p>
      ) : (
        <DataTable 
        title={<div style={{}}><div>Clients  </div> <div style={{ display: "flex", justifyContent: "flex-end" }}><input type="text"  placeholder="Filter by Client Name"   value={filterText} onChange={e => setFilterText(e.target.value)} /></div> </div>}
        columns={columns} 
        data={filteredData} 
        pagination
        paginationPerPage={10}
        />
      )}
    </div>
  );
};

export default adminLayout(ManageClients);
