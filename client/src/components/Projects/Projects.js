import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Select, { NonceProvider } from "react-select";
import StarIcon from "@mui/icons-material/Star";

import Navbar from "../Navbar/Navbar";

import "./Projects.css";
import "../../components/GlobalCss.css";

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  // console.log("asdfhid: ", userId);
  const [displayCreateWindow, setDisplayCreateWindow] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    members: [],
  });

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+"projects", {
          withCredentials: true,
        });
        if (res.data.noToken || res.data.tokenInvalid) {
          console.log(res.data.message);
          navigate("/");
        } else {
          setUserId(res.data.userId);
          setUsers(res.data.result[0]);
          setProjects(res.data.result[1]);
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
      <Navbar userId={userId} />
      {
        <div className="projects-body">
          {displayCreateWindow && (
            <div className="create-new-window">
              <button
                className="close-button"
                onClick={() => {
                  setDisplayCreateWindow((prevState) => !prevState);
                }}
              >
                X
              </button>
              <span className="required">*All fields are required!</span>
              <input placeholder="Project title" />
              <input placeholder="Project description" />
              <Select
                styles={styles}
                options={users}
                placeholder="Add members"
                value={selectedUsers}
                isMulti={true}
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
              Add Projects +
            </button>
          )}
          {!displayCreateWindow && (
            <div className="projects">
              {projects.map((project, index) => {
                return (
                  <Link
                    key={index}
                    className="link"
                    to="/project-view"
                    state={{
                      projectData: project,
                    }}
                  >
                    <div className="project-tile">
                      <div className="title">
                        {project.projectTitle.substring(0, 12) + " ..."}
                      </div>
                      <div className="description">
                        {project.projectDescription.substring(0, 65) + "..."}
                      </div>
                      {userId === project.creatorId && (
                        <span>
                          <StarIcon sx={{ fontSize: "20px" }} />
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      }
    </React.Fragment>
  );
};

export default Projects;
