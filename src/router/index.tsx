import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Data from "../components/Data";
import Teachers from "../components/Teachers";
import Profile from "../components/Profile";
import SignIn from "../components/SignIn";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Data />
      </DashboardLayout>
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    path: "about",
    element: (
      <DashboardLayout>
        <Data />
      </DashboardLayout>
    ),
  },

  {
    path: "students",
    element: (
      <DashboardLayout>
        <Teachers />
      </DashboardLayout>
    ),
  },
  {
    path: "Profile",
    element: (
      <DashboardLayout>
        <SignIn />
      </DashboardLayout>
    ),
  },
]);
