import Dashboard from "views/Agent_dashboard";

var agentBOFRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-components",
    component: <Dashboard />,
    layout: "/agent_bof",
  }
];

export default agentBOFRoutes;
