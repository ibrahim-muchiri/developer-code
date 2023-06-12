import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, Button } from "reactstrap";
import {ContentHeader} from '@components';
import '../assets/css/bootstrap-nav-wizard.css';

const CreateJob = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
     const [audiofile, setAudiofilename] = useState("");
    
    const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title,description, assignee,audiofile);
    };

  return (
    <div>
      <ContentHeader title="Create Job" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"> </h3>
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
     
    
    <ul className='nav nav-wizard'>
            <li className={activeTab === '1' ? 'active' : ''}>
                <a href='#step1' data-toggle="tab" onClick={() => toggle('1')}>
                    Add job details
                </a>
            </li>
            <li className={activeTab === '2' ? 'active' : ''}>
                <a href='#step2' data-toggle="tab" onClick={() => toggle('2')}>
                  Attach Audio File
                </a>
            </li>
            <li className={activeTab === '3' ? '' : ''}>
                <a>Review and Publish</a>
            </li>
        </ul>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form>
            <FormGroup>
            <div className="row">
            <div className="col">
              <Label className="form-label" for="jobTitle">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Job title" onChange={e => setTitle(e.target.value)} required/>
            </div>
            <div className="col">
              <Label className="form-label" for="Assignee">Assignee</Label>
              <select className="form-control" name="assignee" onChange={e => setAssignee(e.target.value)}>
                <option value=" ">-- Select user to assign task --</option>
                <option value="Test 1">Test 1  </option>
                <option value="Test 2">Test 2  </option>
                <option value="Test 3">Test 3  </option>
             </select>
            </div>
            </div>
            <div  className="row">
            <div className="col">
            <Label for="jobDescription">Notes</Label>
            <textarea class="form-control" rows="3" name="description" id="description" placeholder="Notes" onChange={e => setDescription(e.target.value)} required></textarea>
              
              </div>
            </div>
            </FormGroup>
            <Button disabled={!title} onClick={() => setActiveTab("2")}>Next</Button>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <Form>
            <FormGroup>
            <Label className="form-label" for="attachFile">Select audio file</Label>
              <select className="form-control" name="audiofile"  onChange={e => setAudiofilename(e.target.value)}>
              <option value="" >-- Select Audio file --  </option>
                <option value="File 1 " >File 1  </option>
                <option value="File 2 " >File 2  </option>
                <option value="File 3 " >File 3  </option>
             </select>
            </FormGroup>
            <Button onClick={() => setActiveTab("3")}>Next</Button>
          </Form>
        </TabPane>
        <TabPane tabId="3">
          <Form class="">
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="titlesummary" id="titlesummaary" value={title}  disabled/>
              <Label for="Assignee">Assigned to</Label>
              <Input type="text" name="assigneesummary" id="assigneesummaary" value={assignee}  disabled/>
              <Label for="Audio file">Selected audio file</Label>
              <Input type="text" name="audiofile" id="audiofile" value={audiofile}  disabled/>
              <Label for="Notes">Notes summarry</Label>
              <textarea class="form-control" rows="3" name="description" id="description"  value={description}disabled></textarea>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </TabPane>
      </TabContent>
      </div>
    </div>


            </div>
            <div className="card-footer"> </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateJob;
