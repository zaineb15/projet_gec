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

import Facturerecep from "components/Dashboardpages/Facturesreceptionnées";
import Facturerejetr from "components/Dashboardpages/Facturerejetée";
import Facturefinale from "components/Dashboardpages/Facturevalidefinale";
import Facturecompt from "components/Dashboardpages/Facturevalidecompt";
import Facturefisc from "components/Dashboardpages/Facturevalidefisc";

var routes = [
  {
    path: "/dashboard", // Chemin de la route
    name: "Dashboard", // Nom de la page
    icon: "tim-icons icon-components", // Icône à afficher dans le sidebar
    component: <Dashboard />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },

  {
    path: "/facturereceptionné",
    name: "Factures receptionnées",
    icon: "tim-icons icon-components",
    component: <Facturerecep />,
    layout: "/Fournisseur",
  },
  {
    path: "/facturerejeté",
    name: "Factures rejétées ",
    icon: "tim-icons icon-components",
    component: <Facturerejetr />,
    layout: "/Fournisseur",
  },
  {
    path: "/facturefiscaliste",
    name: "Factures validées par le fiscaliste",
    icon: "tim-icons icon-components",
    component: <Facturefisc />,
    layout: "/Fournisseur",
  },
  {
    path: "/facturecomptable",
    name: "Factures validées par le comptable",
    icon: "tim-icons icon-components",
    component: <Facturecompt />,
    layout: "/Fournisseur",
  },
  {
    path: "/facturefinale",
    name: "Factures à payer",
    icon: "tim-icons icon-components",
    component: <Facturefinale />,
    layout: "/Fournisseur",
  },

  {
    path: "/listefacture", // Chemin de la route
    name: "Liste des factures", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Listefacture />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },
  {
    path: "/listereclamation", // Chemin de la route
    name: "Liste des réclamations", // Nom de la page
    icon: "tim-icons icon-single-copy-04", // Icône à afficher dans le sidebar
    component: <Listereclamation />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },
  {
    path: "/reclamation", // Chemin de la route
    name: "Reclamation", // Nom de la page
    icon: "tim-icons icon-single-copy-04", // Icône à afficher dans le sidebar
    component: <Reclamation />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },


  {
    path: "/facture", // Chemin de la route
    name: "Facture", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Facture />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },
  {
    path: "/profile", // Chemin de la route
    name: "Profile", // Nom de la page
    icon: "tim-icons icon-paper", // Icône à afficher dans le sidebar
    component: <Profile />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
  },
  {
    path: "/updatefacture/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
    name: "Modifier la facture", // Nom de la page
    icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
    component: <Updatefacture />, // Composant à afficher
    layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
},  
{
  path: "/consulterfacture/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
  name: "Détails de la facture", // Nom de la page
  icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
  component: <ConsulterFacture />, // Composant à afficher
  layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
},
{
  path: "/updatereclamation/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
  name: "Modifier la réclamation", // Nom de la page
  icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
  component: <Updatereclamation />, // Composant à afficher
  layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
},  
{
path: "/consulterreclamation/:id", // Chemin de la route avec un paramètre d'ID pour identifier la facture à mettre à jour
name: "Détails de la réclamation", // Nom de la page
icon: "tim-icons icon-pencil", // Icône à afficher dans le sidebar
component: <ConsulterReclamation />, // Composant à afficher
layout: "/Fournisseur", // Layout à utiliser (dans ce cas, le layout Fournisseur)
}
];

export default routes;
