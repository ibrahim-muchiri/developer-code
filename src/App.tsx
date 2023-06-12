import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
// import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
import EditMyProfile from '@pages/profile/EditMyProfile';
import AddClient from'@pages/AddClient';
import ManageClients from '@pages/ManageClients';
import AddProject from '@pages/AddProject';
import ManageProjects from '@pages/ManageProjects';
import AddUser from '@pages/AddUser';
import ViewMyJobs from '@pages/MyJobs';
import Task from '@pages/Task';
import CreateJob from '@pages/CreateJob';
import AddContactPerson from '@pages/AddContactPerson';
import FileUpload from '@pages/AddTest';
import ManageUsers from '@pages/ManageUsers';
import DataTablePage from '@pages/Datatable';
import JobList from '@pages/JobList';
import TaskDetails from '@pages/Review';
import AssignTask from '@pages/Assigntask';
import ViewProject from '@pages/viewProject';
import ManageTask from '@pages/ManageTask';
import ViewMyjobs from '@pages/MyJobs';
import Waveformsample from '@pages/WaveformSample';
import SamplePage from '@pages/samplePage';
import ViewContactperson from '@pages/ViewContactpersons';
import EditProject from '@pages/editProject';
import EditClient from '@pages/EditClient';
import ViewUser from '@pages/ViewUser';
import EditUser from '@pages/EditUser';
import ViewClient from '@pages/ViewClient';
import SummernoteEditor from '@pages/SummerNote';
import PeerReview from '@pages/PeerReview';
import Unauthorized from '@pages/Unauthorized';
import ViewProjectTasks from '@pages/ViewProjectTasks';
import ViewComplete from '@pages/View-complete-task';
import CompletedTasks from '@pages/CompletedTasks';
import EditorSample from '@pages/EditorSample';
import PeakWaveSample from '@pages/PeakWaveSample';
import ManageRoles from '@pages/ManageRoles';


import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';




const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
     
      
      <Route path="/forgot-password" element={<PublicRoute />}>
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Route>
      <Route path="/recover-password" element={<PublicRoute />}>
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Main />}>
          <Route path="/sub-menu-2" element={<Blank />} />
          <Route path="/sub-menu-1" element={<SubMenu />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditMyProfile/>} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/manage-clients" element={<ManageClients/>} />
          <Route path="/add-project" element={<AddProject/>} />
          <Route path="/manage-projects" element={<ManageProjects/>} />
          <Route path="/add-user" element={<AddUser/>} />
          <Route path="/my-jobs" element={<ViewMyjobs/>} />
          <Route path="/job-list" element={<JobList/>} />
          <Route path="/task/:id" element={<Task/>} />
          <Route path="/review-task/:id" element={<TaskDetails/>} />
          <Route path="/view-client/:id" element={<ViewClient/>} />
          <Route path="/view-user/:id" element={<ViewUser/>} />
          <Route path="/view-contact-persons/:id" element={<ViewContactperson/>} />

          <Route path="/assign-task/:id" element={<AssignTask/>} />
          <Route path="/manage-task/:id" element={<ManageTask/>}/>
          <Route path="/edit-project/:id" element={<EditProject/>}/>
          <Route path="/complete-tasks" element={<CompletedTasks/>}/>

          <Route path="/edit-user/:id" element={<EditUser/>}/>


          <Route path="/view-project/:id" element={<ViewProject/>} />
          <Route path="/manage-roles/:id" element={<ManageRoles/>} />

          <Route path="/edit-client/:id" element={<EditClient/>} />
          <Route path="/view-project-tasks/:id" element={<ViewProjectTasks/>} />
          <Route path="/view-complete-task/:id" element={<ViewComplete/>} />
          
          
          <Route path="/add-contact-person/:clientId" element={<AddContactPerson/>} />
          <Route path="/create-job/:id" element={<CreateJob/>} />
          <Route path="/manage-user" element={<ManageUsers/>} />
          <Route path="/data-table" element={<DataTablePage/>} />
          <Route path="/waveformsample" element={<SamplePage/>} />
          <Route path="/peer-review-queue" element={<PeerReview/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/summernote" element={<SummernoteEditor/>} />


          <Route path="/addtest/:id" element={<FileUpload/>} />
          
          <Route path="/peakwave" element={<PeakWaveSample/>} />

          
          <Route path="/" element={<Dashboard />} />
           <Route path="/editorsample" element={<EditorSample />} />
        </Route>
      </Route>
    </Routes>
    <ToastContainer
      autoClose={3000}
      draggable={false}
      position="top-right"
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnHover
    />
  </BrowserRouter>
  );
};

export default App;
