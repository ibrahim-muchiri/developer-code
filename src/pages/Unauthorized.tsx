import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import 'react-dropdown/style.css';
import {ContentHeader} from '@components';


const Unauthorized = () => {
  


  return (
    <div>
      <ContentHeader title="401 Unauthorized acess" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
          
            <div className="card-body">
             <h2 style={{color:'red'}}>
             You do not have the rights to access this resource!
             </h2>
            </div>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;
