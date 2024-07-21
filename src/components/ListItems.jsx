import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { PiStudentBold } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import PeopleIcon from "@mui/icons-material/People";
import { CgProfile } from "react-icons/cg";

import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <>


    
      <ListItemButton onClick={() => navigate("/")}>

        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />

      </ListItemButton>

      <ListItemButton onClick={() => navigate("/about")}>
        <ListItemIcon>
          {/* <ShoppingCartIcon /> */}
          <PiStudentBold className="econs" />        
          </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
      <ListItemButton  onClick={() => navigate("/students")}  >
        <ListItemIcon>
        <LiaChalkboardTeacherSolid className="econs" />
        </ListItemIcon>
        <ListItemText primary="Teachers" />
      </ListItemButton>
      <ListItemButton  onClick={() => navigate("/Profile")}     >
        <ListItemIcon>
        <CgProfile   className="econs"/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </>
  );
};
