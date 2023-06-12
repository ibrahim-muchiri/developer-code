import {SmallBox} from '@app/components';
import React, {useEffect, useState} from 'react';
import {ContentHeader} from '@components';
import jwt from 'jsonwebtoken';
import axios from 'axios';
// import { CheckRole } from '@app/modules/main/menu-sidebar/MenuSidebar';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [clientCount, setClienCount] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      setCurrentUserRole(decodedToken.claims.find(claim => claim.startsWith('ROLE_')).substring(5));
      setEmail(decodedToken.sub);
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

    const fetchTasks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get("https://scribe.clickaway.co.ke/api/tasks", {
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
    const timer = setInterval(() => {
      if (projectCount < projects.length) {
        setProjectCount(projectCount + 1);
      }
    }, 10);

    return () => {
      clearInterval(timer);
    };

   
  }, [projectCount, projects]);

  
  useEffect(() => {
    const timer2 = setInterval(() => {
      if (taskCount < tasks.length) {
        setTaskCount(taskCount + 1);
      }
    }, 10);
  
    return () => {
      clearInterval(timer2);
    };
   
  }, [taskCount, tasks]);

  useEffect(() => {
    const timer3 = setInterval(() => {
      if (clientCount < clients.length) {
        setClienCount(clientCount + 1);
      }
    }, 10);
  
    return () => {
      clearInterval(timer3);
    };
   
  }, [clientCount, clients]);
 
 
  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
          {/* {currentUserRole === 'ADMIN' && ( // Check if the user role is admin */}
          <>
            <div className="col-lg-3 col-6">
           
              <div className="small-box bg-info">
                
                <div className="inner">
                  <h3>{projectCount}</h3>

                  <p>Projects</p>
                  
                </div>
                <div className="icon">
                <i className="ion ion-stats-bars" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    {taskCount}
                  
                  </h3>

                  <p>Tasks</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{clientCount}</h3>

                  <p>Clients</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>4</h3>

                  <p>Complete projects</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            </>
             {/* )} */}
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
