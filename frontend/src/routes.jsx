import Dashboard from "views/Dashboard";
import Reclamation from "components/Dashboardpages/ReclamationForm";
import Listefacture from "components/Dashboardpages/ListeFacture";
import Facture from "components/Dashboardpages/FactureForm";
import Profile from "views/UserProfile";
import Listereclamation from "components/Dashboardpages/ListeReclamation";
import Updatefacture from "components/Dashboardpages/UpdateFacture";
import Updatereclamation from "components/Dashboardpages/UpdateReclamation";
import ConsulterFacture from "components/Dashboardpages/ConsulterFacture";
import ConsulterReclamation from "components/Dashboardpages/ConsulterReclamation";

var routes = [
  {
    path: "/dashboard", // Chemin de la route
    name: "Dashboard", // Nom de la page
    icon: "tim-icons icon-components", // Icône à afficher dans le sidebar
    component: <Dashboard />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },
  {
    path: "/listefacture", // Chemin de la route
    name: "Liste des factures", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Listefacture />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },
  {
    path: "/listereclamation", // Chemin de la route
    name: "Liste des réclamations", // Nom de la page
    icon: "tim-icons icon-single-copy-04", // Icône à afficher dans le sidebar
    component: <Listereclamation />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },
  {
    path: "/reclamation", // Chemin de la route
    name: "Reclamation", // Nom de la page
    icon: "tim-icons icon-single-copy-04", // Icône à afficher dans le sidebar
    component: <Reclamation />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },


  {
    path: "/facture", // Chemin de la route
    name: "Facture", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Facture />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },
  {
    path: "/profile", // Chemin de la route
    name: "Profile", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Profile />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
  },
  {
    path: "/updatefacture/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
    name: "Modifier la facture", // Nom de la page
    icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
    component: <Updatefacture />, // Composant à afficher
    layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
},  
{
  path: "/consulterfacture/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
  name: "Détails de la facture", // Nom de la page
  icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
  component: <ConsulterFacture />, // Composant à afficher
  layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
},
{
  path: "/updatereclamation/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
  name: "Modifier la réclamation", // Nom de la page
  icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
  component: <Updatereclamation />, // Composant à afficher
  layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
},  
{
path: "/consulterreclamation/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
name: "Détails de la réclamation", // Nom de la page
icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
component: <ConsulterReclamation />, // Composant à afficher
layout: "/fournisseur", // Layout à utiliser (dans ce cas, le layout fournisseur)
}
];

export default routes;
