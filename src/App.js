import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';


import DashboardPage from './pages/DashboardPage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import AdminBlankPage from './pages/AdminBlankPage';
import Adduser from './pages/Adduser';
import AddClient from './pages/AddClient';
import AddProject from './pages/AddProject';
import Manageuser from './pages/Manageuser';
import ManageProject from './pages/ManageProjects';
import UserContextProvider from './context/UserContext';
import CreateJob from './pages/projectActions/CreateJob';
import Task from './pages/Task';
import ViewJobs from './pages/JobsList';
import ManageClients from './pages/ManageClients';
import AddTest from './pages/AddTest';
import JobList from './pages/JobsList'
import TaskDetails from '@pages/Review';
import AssignTask from '@pages/Assigntask';


import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
    const [user, setUser] = useState({});
  return (
    <UserContextProvider>
        <Router>
            <Routes>
                <Route exact path='/' element={<LoginPage/>} />
                <Route exact path='/dashboard' element={<DashboardPage/>} />
               
                <Route exact path='/reset-password' element={<ResetPassword/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/change-password' element={<ChangePasswordPage/>} />
                <Route exact path='/preferences' element={<UserPreferencesPage/>} />
                <Route exact path='/typography' element={<TypographyPage/>} />
                <Route exact path='/blank-page' element={<AdminBlankPage/>} />
                <Route exact path='/adduser' element={<Adduser/>} />
                <Route exact path='/addclient' element={<AddClient/>} />
                <Route exact path='/addproject' element={<AddProject/>} />
                <Route exact path='/manageuser' element={<Manageuser/>} />
                <Route exact path='/manageprojects' element={<ManageProject/>} />
                <Route exact path='/createjob' element={<CreateJob/>} />
                <Route exact path='/task' element={<Task/>} />
                <Route path="/review-task/:id" element={<TaskDetails/>} />
                <Route path="/assign-task/:id" element={<AssignTask/>} />

                {/* <Route exact path='/joblist' element={<ViewJobs/>} /> */}
                <Route exact path='/joblist' element={<JobList/>} />
                <Route exact path='/manageclients' element={<ManageClients/>} />
                <Route exact path='/addtest' element={<AddTest/>} />

                
            </Routes>  
        </Router>
        </UserContextProvider>
    )
}

export default App;
