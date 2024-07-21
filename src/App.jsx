import "./App.css";
import Dashboard from "./components/Dashboard";

import { Paper } from "@mui/material";
import DashboardLayout from "./layouts/DashboardLayout";
import {  Login, Router } from "@mui/icons-material";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
      <RouterProvider router={router} />

  );
};

export default App;
