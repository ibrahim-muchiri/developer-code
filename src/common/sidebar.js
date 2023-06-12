import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

class Sidebar extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }
    static contextType = UserContext;

    render(){
        const { user } = this.context;
       

    if (!user) {
      return <Navigate to="/" />;
    }
        return <div className="border-end sidenav" id="sidebar-wrapper">
            <div  className="sidebar-heading border-bottom ">
           
                <Link to="/">
                    <span  >
                    <i className="fa fa-bullseye"></i>  &nbsp; &nbsp;
			</span>
			<span class="ml-2 text-sm font-bold">SCRIBE</span>
                </Link>
            </div>
            <div className="sidebar-heading  border-bottom">
           
            <Link tag="a" className="" to="/dashboard">
                            <i className="fa fa-dashboard dashboard" ></i>&nbsp; Dashboard
                        </Link>
            </div>
            <PerfectScrollbar className="sidebar-items">
                <ul className="list-unstyled ps-0">
                    
                    
                    {/*
                    <hr/>
                    <li className="mb-1">
                        <Link tag="a" className="" to="/adduser">
                            <i className="fa fa-user-plus"></i> Add internal user
                        </Link>
                    </li>
                    <hr/>
                  
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <Link tag="a" className="" to="/typography">
                        <i className="fa fa-users" aria-hidden="true"></i> Users
                        </Link>
                    </li> */}
                    
                    {/* collapsable list item example */}
                    

                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse2" aria-expanded="false">
                            
                     Clients 
                        </button>
                        <div className="collapse" id="dashboard-collapse2">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/addclient">
                                
                            <i className="fa fa-user-plus"></i> &nbsp; Add client
                            </Link></li>
                            
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageclients">
                                
                            <i className="fa fa-user"></i>&nbsp;  Manage clients
                            </Link></li>
                           
                        </ul>
                        </div>
                    </li> 
                    <li className="border-top my-3"></li> 


                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse3" aria-expanded="false">
                     Projects
                        </button>
                        <div className="collapse" id="dashboard-collapse3">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/addproject">
                                
                            <i className="fa fa-"></i>  New project
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageprojects">
                                
                            <i className="fa fa-"></i> Manage projects
                            </Link></li>
                           
                        </ul>
                        </div>
                    </li> 
                    <li className="border-top my-3"></li> 
                    

                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse4" aria-expanded="false">
                    Admin
                        </button>
                        <div className="collapse" id="dashboard-collapse4">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            
                            <li className="mb-1">
                            <Link tag="a" className="" to="/adduser">
                            <i className="fa fa-user-plus"></i>&nbsp;  Add  user
                            </Link>
                           </li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageuser">
                                
                            <i className="fa fa-address-card"></i>&nbsp;   Manage users
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageroles">
                                
                            <i className="fa fa-users"></i> &nbsp;  Manage roles and permissions
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-gear"></i> &nbsp;  General settings
                            </Link></li>
                           
                        </ul>
                        </div>
                    </li> 
                    <li className="border-top my-3"></li> 



                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse5" aria-expanded="false">
                    Jobs
                        </button>
                        <div className="collapse" id="dashboard-collapse5">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            
                            <li className="mb-1">
                            <Link tag="a" className="" to="/joblist">
                            <i className="fa fa-tasks"></i>&nbsp;  Job list
                            </Link>
                           </li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-tasks"></i> &nbsp;  Create job
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageroles">
                                
                            <i className="fa fa-tasks"></i>&nbsp;  My jobs
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-tasks"></i> &nbsp;  Peer review queue
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-tasks"></i> &nbsp;  Internal QA queue
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-tasks"></i>&nbsp;   Delivery check
                            </Link></li>
                            <li className="mb-1">
                            <Link tag="a" className="rounded" to="/manageproject">
                                
                            <i className="fa fa-tasks"></i>  &nbsp; Jobs delivered
                            </Link></li>
                           
                        </ul>
                        </div>
                    </li> 
                    <li className="border-top my-3"></li> 
                   
                </ul>
            </PerfectScrollbar>
            <div className="dropdown fixed-bottom-dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://via.placeholder.com/50" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <span> {user.email} </span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item"   onClick={() => this.context.setUser(null)}> <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out </button>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default Sidebar;