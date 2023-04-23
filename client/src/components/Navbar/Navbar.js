import React, { useState } from "react";
import {Link} from "react-router-dom";

import ListSharpIcon from "@mui/icons-material/ListSharp";

import "./Navbar.css";
import "../GlobalCss.css";

const Navbar = (props) => {
  const [mobileView, setMobileView] = useState(false);

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="icon">
          <button
            className="navbar-toggle-button"
            onClick={() => {
              setMobileView((prevState) => !prevState);
            }}
          >
            <ListSharpIcon
              sx={{
                width: "35px",
                height: "35px"
              }}
            />
          </button>
          <div>ICON</div>
        </div>
        <div className={mobileView ? "mobile-links" : "links"}>
          <Link to="/projects" state={{userId: props.userId}}>Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
