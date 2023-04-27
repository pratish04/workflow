import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Select, { NonceProvider } from "react-select";

import "./ProjectView.css";
import Navbar from "../Navbar/Navbar";

const ProjectView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [project, setProject] = useState(location.state.projectData);
  const [displayCreateWindow, setDisplayCreateWindow] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  
  const SERVER_URL=process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const res = await axios.get(SERVER_URL+"projects", {
          withCredentials: true,
        });
        if (res.data.noToken || res.data.tokenInvalid) {
          console.log(res.data.message);
          navigate("/");
        } else {
          setUserId(res.data.userId);
          setUsers(res.data.result[0]);
        }
      } catch {
        console.log("Some error occurred!");
      }
    };
    isAuthenticated();
  }, [navigate, userId]);

  const styles = {
    control: (provided, state) => ({
      ...provided,
      height: "40px",
      borderRadius: "0px",
      borderStyle: NonceProvider,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "grey",
    }),
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="tasks-body">
        <div className="project-data">
          <div>
            <span>Title: </span>
            {project.projectTitle}
          </div>
          <div>
            <span>Description: </span>
            {project.projectDescription}
          </div>
          <div>
            <span>Members: </span>
            {users.map((user, index) => {
              return <div>{user.label + ", "}</div>;
            })}
          </div>
        </div>
        {displayCreateWindow && (
          <div className="create-new-window">
            <span className="required">*All fields are required!</span>
            <button
              className="close-button"
              onClick={() => {
                setDisplayCreateWindow((prevState) => !prevState);
              }}
            >
              X
            </button>
            <input placeholder="Task title" />
            <input placeholder="Task description" />
            <Select
              styles={styles}
              options={users}
              placeholder="Assign to"
              value={selectedUsers}
              isSearchable={true}
              onChange={(e) => {
                setSelectedUsers(e);
              }}
            />
            <input className="create" type="submit" value="CREATE" />
          </div>
        )}
        {!displayCreateWindow && (
          <button
            className="add-button"
            onClick={() => {
              setDisplayCreateWindow((prevState) => !prevState);
            }}
          >
            Add Task +
          </button>
        )}
        {!displayCreateWindow && (
          <div className="tasks-background">
            <div className="tasks">
              <h3>Todo</h3>
              <div>
                <span>hi</span>
                <span>hi</span>
                <span>hi</span>
                <span>hi</span>
                <span>hi</span>
                <span>hi</span>
                <span>hi</span>
              </div>
            </div>
            <div className="tasks">
              <h3>Processing</h3>
              <div></div>
            </div>
            <div className="tasks">
              <h3>Completed</h3>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProjectView;
