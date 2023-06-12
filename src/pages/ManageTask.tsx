import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';
import { useParams } from "react-router-dom";
import axios from "axios";

const ManageTask = () => {
    const { id } = useParams();
    const [status, setStatus] = useState('');
    const [tasks, setTasks] = useState('');
    const[task, setTask] = useState('');
    
  return (
    <div>
      <ContentHeader title="Manage Task" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> </h3>
              <div className="card-tools">
                
              </div>
            </div>
            <div className="card-body">
              Start creating your amazing application!
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageTask;
