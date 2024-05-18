import React from "react";
import Dashboard from "views/Admin_dashboard";
import Listereclamation from "components/Dashboardpages/ListeReclamationbof";
import Access from "components/Dashboardpages/AccessFournisseur";
import Users from "components/Dashboardpages/ListeUsers";
import Edituser from "components/Dashboardpages/EditUser";
import Profile from "views/UserProfile";

var adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-components",
    component: <Dashboard />,
    layout: "/Admin",
  },
  {
    path: "/profile", 
    name: "Profile", 
    icon: "tim-icons icon-paper",
    component: <Profile />, 
    layout: "/Admin", 
  },
  {
    path: "/users", // Chemin de la route
    name: "Liste des utilisateurs", 
    icon: "tim-icons icon-single-02", // Icône pour représenter les utilisateurs
    component: <Users />, 
    layout: "/Admin", 
},
{
  path: "/listereclamation", // Chemin de la route
  name: "Liste des réclamations", 
  icon: "tim-icons icon-single-copy-04", 
  component: <Listereclamation />, 
  layout: "/Admin", 
},
{
  path: "/accessfournisseur", // Chemin de la route
  name: "Donner un accés", 
  icon: "tim-icons icon-lock-circle",
  component: <Access />, 
  layout: "/Admin", 
},
{
  path: "/edituser/:id", // Chemin de la route
  name: "Modifier les données de l'utilisateur", 
  icon: "tim-icons icon-lock-circle",
  component: <Edituser />, 
  layout: "/Admin", 
},
];

export default adminRoutes;
