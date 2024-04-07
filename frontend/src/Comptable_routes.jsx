import React from "react";
import Dashboard from "views/Comptable_dashboard";

var comptableRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-components",
    component: <Dashboard />,
    layout: "/comptable",
  }
];

export default comptableRoutes;
