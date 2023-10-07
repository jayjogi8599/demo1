import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard1 from "../components/dashboard/Dashboard1";
import Dashboard2 from "../components/dashboard/Dashboard2";
import Dashboard3 from "../components/dashboard/Dashboard3";
import Pages from "../components/dashboard/Pages";
//Hide
import Attendance from '../pages/hide/Attendance'
import Loges from '../pages/hide/Loges'
import Punch from '../pages/hide/Punch'
//users
import Widgets from "../components/dashboard/users/Widgets";
import ManageUser from "../components/dashboard/users/ManageUser";
import PermissionUser from "../components/dashboard/users/PermissionUser";
const ComponentsRoutes = () => {
  return (
    <Routes>
       <Route path="/pages" element={<Pages />} />
      <Route path="/dashboard-v1" element={<Dashboard1 />} />
      <Route path="/dashboard-v2" element={<Dashboard2 />} />
      <Route path="/dashboard-v3" element={<Dashboard3 />} />
      <Route path="/attendance" element={<Attendance />} /> 
      <Route path="/loges" element={<Loges />} />
      <Route path="/punch" element={<Punch />} />
      <Route path="/widgets" element={<Widgets />} /> 
      <Route path="/manageuser" element={<ManageUser />} /> 
      <Route path="/permissionuser" element={<PermissionUser />} /> 

    </Routes>
  );
};

export default ComponentsRoutes;
