import Dashboard from "views/Agent_dashboard";
import Listebord from "components/Dashboardpages/ListeFacturebof";
import Typefacturebof from "components/Dashboardpages/Typefacturebof";

import Listedevise from "components/Dashboardpages/Listedevise";
import Listechargelocative from "components/Dashboardpages/Listechargelocative";
import Listechargesocial from "components/Dashboardpages/Listechargesocial";
import Listecommdis from "components/Dashboardpages/Listecommdis";
import Listefinancement from "components/Dashboardpages/Listefinancement";
import Listefiscalité from "components/Dashboardpages/Listefiscalité";
import Listefondroulement from "components/Dashboardpages/Listefondroulement";
import Listelettrecredit from "components/Dashboardpages/Listelettrecredit";
import Listeoperateur from "components/Dashboardpages/Listeoperateur";
import Listesteg from "components/Dashboardpages/Listesteg";
import Listeventilation from "components/Dashboardpages/Listeventilation";
import Archievebordereau from "components/Dashboardpages/Archievebordereau";
import Listefacturenew from "components/Dashboardpages/Listefacturenew";

import Listedevisearch from "components/Dashboardpages/Listedevisearch";
import Listechargelocativearch from "components/Dashboardpages/Listechargelocativearch";
import Listechargesocialarch from "components/Dashboardpages/Listechargesocialarch";
import Listecommdisarch from "components/Dashboardpages/Listecommdisarch";
import Listefinancementarch from "components/Dashboardpages/Listefinancementarch";
import Listefiscalitéarch from "components/Dashboardpages/Listefiscalitéarch";
import Listefondroulementarch from "components/Dashboardpages/Listefondroulementarch";
import Listelettrecreditarch from "components/Dashboardpages/Listelettrecreditarch";
import Listeoperateurarch from "components/Dashboardpages/Listeoperateurarch";
import Listestegarch from "components/Dashboardpages/Listestegarch";
import Listeventilationarch from "components/Dashboardpages/Listeventilationarch";
import Listefacturearch from "components/Dashboardpages/Listefacturearch";

import Listedeviseup from "components/Dashboardpages/Updatedevise";
import Listechargelocativeup from "components/Dashboardpages/updatechargelocative";
import Listechargesocialup from "components/Dashboardpages/Updatechargesocial";
import Listecommdisup from "components/Dashboardpages/Updatecommdis";
import Listefinancementup from "components/Dashboardpages/Updatefinancement";
import Listefiscalitéup from "components/Dashboardpages/Updatefiscalité";
import Listefondroulementup from "components/Dashboardpages/Updatefondroulement";
import Listelettrecreditup from "components/Dashboardpages/Updatelettrecredit";
import Listeoperateurup from "components/Dashboardpages/Updateoperateur";
import Listestegup from "components/Dashboardpages/Updatesteg";
import Listeventilationup from "components/Dashboardpages/Updateventilation";
import Listefacturenewup from "components/Dashboardpages/updatefacturenew";

import ChargesLocatives from "components/Dashboardpages/Typefacture/Charges_locatives";
import Devise from "components/Dashboardpages/Typefacture/Devise";
import Steg from "components/Dashboardpages/Typefacture/Steg";
import CommissionDistribution from "components/Dashboardpages/Typefacture/Commission_distribution";
import Financement from "components/Dashboardpages/Typefacture/Financement";
import FondRoulement from "components/Dashboardpages/Typefacture/Fond_roulement";
import Operateur from "components/Dashboardpages/Typefacture/Operateur";
import VentilationDirecte from "components/Dashboardpages/Typefacture/Ventilation_direct";
import ChargesSociales from "components/Dashboardpages/Typefacture/Charges_sociales";
import JetonPresence from "components/Dashboardpages/Typefacture/Jeton_presence";
import LettreCredit from "components/Dashboardpages/Typefacture/Lettre_credit";
import Profile from "views/UserProfile";

import Consulterdevise from "components/Dashboardpages/ConsulterDevise";
import Consulterchargelocative from "components/Dashboardpages/ConsulterChargeslocatives";
import Consulterchargesocial from "components/Dashboardpages/ConsulterChargessociales";
import Consultercommdis from "components/Dashboardpages/ConsulterCommissiondistribution";
import Consulterfinancement from "components/Dashboardpages/ConsulterFinancement";
import Consulterfiscalité from "components/Dashboardpages/ConsulterJetonpresence";
import Consulterfondroulement from "components/Dashboardpages/ConsulterFondroulement";
import Consulterlettrecredit from "components/Dashboardpages/ConsulterLettrecredit";
import Consulteroperateur from "components/Dashboardpages/ConsulterOperateur";
import Consultersteg from "components/Dashboardpages/ConsulterSteg";
import Consulterventilation from "components/Dashboardpages/ConsulterVentilationdirect";
import ConsulterFacturebof from "components/Dashboardpages/ConsulterFacturebof";


var AgentRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-components",
    component: <Dashboard />,
    layout: "/Agent",
  }, 
 
  {
    path: "/profile", 
    name: "Profile", 
    icon: "tim-icons icon-paper",
    component: <Profile />, 
    layout: "/Agent", 
  },
  {
    path: "/listebordereau",
    name: "Liste des bordereaux",
    icon: "tim-icons icon-paper", 
    component: <Listebord />,
    layout: "/Agent",
  },

{
  path: "/consulterfacturebof/:id", 
  name: "Détails de la facture", 
  icon: "tim-icons icon-pencil", 
  component: <ConsulterFacturebof />, 
  layout: "/Agent", 
},
{
  path: "/consulterdevise/:id", 
  name: "Détails de la devise", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterdevise />, 
  layout: "/Agent", 
},
{
  path: "/consulterchargelocative/:id", 
  name: "Détails de la charge locative", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterchargelocative />, 
  layout: "/Agent", 
},
{
  path: "/consulterchargesociale/:id", 
  name: "Détails de la charge sociale", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterchargesocial />, 
  layout: "/Agent", 
},
{
  path: "/consultercommdis/:id", 
  name: "Détails de la commission distribution", 
  icon: "tim-icons icon-pencil", 
  component: <Consultercommdis />, 
  layout: "/Agent", 
},
{
  path: "/consulterfinancement/:id", 
  name: "Détails de la financement", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterfinancement />, 
  layout: "/Agent", 
},
{
  path: "/consulterfiscalite/:id", 
  name: "Détails de la jeton de présence", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterfiscalité />, 
  layout: "/Agent", 
},
{
  path: "/consulterfondroulement/:id", 
  name: "Détails de la fond de roulement", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterfondroulement />, 
  layout: "/Agent", 
},
{
  path: "/consulterlettrecredit/:id", 
  name: "Détails de la lettre de credit", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterlettrecredit />, 
  layout: "/Agent", 
},
{
  path: "/consulteroperateur/:id", 
  name: "Détails de l'operateur", 
  icon: "tim-icons icon-pencil", 
  component: <Consulteroperateur />, 
  layout: "/Agent", 
},
{
  path: "/consultersteg/:id", 
  name: "Détails de la STEG", 
  icon: "tim-icons icon-pencil", 
  component: <Consultersteg />, 
  layout: "/Agent", 
},
{
  path: "/consulterventilation/:id", 
  name: "Détails de la ventilation directe", 
  icon: "tim-icons icon-pencil", 
  component: <Consulterventilation />, 
  layout: "/Agent", 
},

{
  path: "/consulter_bordereau/2", 
  name: "Liste 3WM DEVISE", 
  icon: "tim-icons icon-pencil", 
  component: <Listedevise />, 
  layout: "/Agent", 
},
{
  path: "/consulter_bordereau/1", 
  name: "Liste 3WM Charges locatives ", 
  icon: "tim-icons icon-pencil", 
  component: <Listechargelocative />, 
  layout: "/Agent", 
},{ 
  path: "/consulter_bordereau/9", 
  name: "Liste FISCALITÉ-CHARGES SOCIALES", 
  icon: "tim-icons icon-pencil", 
  component: <Listechargesocial />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/4", 
  name: "Liste FACTURE COMMISSION & DISTRIBUTION ", 
  icon: "tim-icons icon-pencil", 
  component: <Listecommdis />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/5", 
  name: "Liste FACTURE FINANCEMENT", 
  icon: "tim-icons icon-pencil", 
  component: <Listefinancement />, 
  layout: "/Agent", 
},
{
  path: "/consulter_bordereau/10", 
  name: "Liste FISCALITÉ-JETON DE PRÉSENCE", 
  icon: "tim-icons icon-pencil", 
  component: <Listefiscalité />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/6", 
  name: "Liste FACTURE FOND DE ROULEMENT", 
  icon: "tim-icons icon-pencil", 
  component: <Listefondroulement />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/11", 
  name: "Liste LETTRE DE CREDIT", 
  icon: "tim-icons icon-pencil", 
  component: <Listelettrecredit />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/7", 
  name: "Liste FACTURE OPERATEUR", 
  icon: "tim-icons icon-pencil", 
  component: <Listeoperateur />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/3", 
  name: "Liste 3WM STEG", 
  icon: "tim-icons icon-pencil", 
  component: <Listesteg />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/8", 
  name: "Liste FACTURE VENTILATION DIRECT", 
  icon: "tim-icons icon-pencil", 
  component: <Listeventilation />, 
  layout: "/Agent", 
},{
  path: "/consulter_bordereau/12", 
  name: "Liste FACTURE FOURNISSEUR",
  icon: "tim-icons icon-pencil", 
  component: <Listefacturenew />, 
  layout: "/Agent", 
},


{
  path: "/archivebordereau", 
  name: "Archive des bordereaux", 
  icon: "tim-icons icon-book-bookmark",
  component: <Archievebordereau />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/2", 
  name: "Liste 3WM DEVISE", 
  icon: "tim-icons icon-pencil", 
  component: <Listedevisearch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/1", 
  name: "Liste 3WM Charges locatives ", 
  icon: "tim-icons icon-pencil", 
  component: <Listechargelocativearch />, 
  layout: "/Agent", 
},{ 
  path: "/consulter_archieve_bordereau/9", 
  name: "Liste FISCALITÉ-CHARGES SOCIALES", 
  icon: "tim-icons icon-pencil", 
  component: <Listechargesocialarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/4", 
  name: "Liste FACTURE COMMISSION & DISTRIBUTION ", 
  icon: "tim-icons icon-pencil", 
  component: <Listecommdisarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/5", 
  name: "Liste FACTURE FINANCEMENT", 
  icon: "tim-icons icon-pencil", 
  component: <Listefinancementarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/10", 
  name: "Liste FISCALITÉ-JETON DE PRÉSENCE", 
  icon: "tim-icons icon-pencil", 
  component: <Listefiscalitéarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/6", 
  name: "Liste FACTURE FOND DE ROULEMENT", 
  icon: "tim-icons icon-pencil", 
  component: <Listefondroulementarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/11", 
  name: "Liste LETTRE DE CREDIT", 
  icon: "tim-icons icon-pencil", 
  component: <Listelettrecreditarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/7", 
  name: "Liste FACTURE OPERATEUR", 
  icon: "tim-icons icon-pencil", 
  component: <Listeoperateurarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/3", 
  name: "Liste 3WM STEG", 
  icon: "tim-icons icon-pencil", 
  component: <Listestegarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/8", 
  name: "Liste FACTURE VENTILATION DIRECT", 
  icon: "tim-icons icon-pencil", 
  component: <Listeventilationarch />, 
  layout: "/Agent", 
},{
  path: "/consulter_archieve_bordereau/12", 
  name: "Liste FACTURE FOURNISSEUR", 
  icon: "tim-icons icon-pencil", 
  component: <Listefacturearch />, 
  layout: "/Agent", 
},
{
  path: "/devisee/:id",
  name: "Modifier DEVISE",
  icon: "tim-icons icon-pencil",
  component: <Listedeviseup />,
  layout: "/Agent",
},
{
  path: "/charges-locatives/:id",
  name: "Modifier Charges locatives ",
  icon: "tim-icons icon-pencil",
  component: <Listechargelocativeup />,
  layout: "/Agent",
},
{
  path: "/charges-sociales/:id",
  name: "Modifier FISCALITÉ-CHARGES SOCIALES",
  icon: "tim-icons icon-pencil",
  component: <Listechargesocialup />,
  layout: "/Agent",
},
{
  path: "/commission-distribution/:id",
  name: "Modifier FACTURE COMMISSION & DISTRIBUTION ",
  icon: "tim-icons icon-pencil",
  component: <Listecommdisup />,
  layout: "/Agent",
},
{
  path: "/financement/:id",
  name: "Modifier FACTURE FINANCEMENT",
  icon: "tim-icons icon-pencil",
  component: <Listefinancementup />,
  layout: "/Agent",
},
{
  path: "/fiscalite/:id",
  name: "Modifier FISCALITÉ-JETON DE PRÉSENCE",
  icon: "tim-icons icon-pencil",
  component: <Listefiscalitéup />,
  layout: "/Agent",
},
{
  path: "/fond-roulement/:id",
  name: "Modifier FACTURE FOND DE ROULEMENT",
  icon: "tim-icons icon-pencil",
  component: <Listefondroulementup />,
  layout: "/Agent",
},
{
  path: "/lettre-credit/:id",
  name: "Modifier LETTRE DE CREDIT",
  icon: "tim-icons icon-pencil",
  component: <Listelettrecreditup />,
  layout: "/Agent",
},
{
  path: "/operateur/:id",
  name: "Modifier FACTURE OPERATEUR",
  icon: "tim-icons icon-pencil",
  component: <Listeoperateurup />,
  layout: "/Agent",
},
{
  path: "/steg/:id",
  name: "Modifier 3WM STEG",
  icon: "tim-icons icon-pencil",
  component: <Listestegup />,
  layout: "/Agent",
},
{
  path: "/ventilation/:id",
  name: "Modifier FACTURE VENTILATION DIRECT",
  icon: "tim-icons icon-pencil",
  component: <Listeventilationup />,
  layout: "/Agent",
},
{
  path: "/facturenew/:id",
  name: "Modifier FACTURE FOURNISSEUR",
  icon: "tim-icons icon-pencil",
  component: <Listefacturenewup />,
  layout: "/Agent",
},
{
  path: "/typefacturebof",
  name: "choisir type de la facture / courrier",
  icon: "tim-icons icon-pencil",
  component: <Typefacturebof />,
  layout: "/Agent",
},
{
  path: "/charges_locatives",
  name: "3WM Charges locatives",
  icon: "tim-icons icon-pencil",
  component: <ChargesLocatives />,
  layout: "/Agent",
},
{
  path: "/devise",
  name: "3WM DEVISE",
  icon: "tim-icons icon-pencil",
  component: <Devise />,
  layout: "/Agent",
},
{
  path: "/steg",
  name: "3WM STEG",
  icon: "tim-icons icon-pencil",
  component: <Steg />,
  layout: "/Agent",
},
{
  path: "/commission_distribution",
  name: "FACTURE COMMISSION & DISTRIBUTION",
  icon: "tim-icons icon-pencil",
  component: <CommissionDistribution />,
  layout: "/Agent",
},
{
  path: "/financement",
  name: "FACTURE FINANCEMENT",
  icon: "tim-icons icon-pencil",
  component: <Financement />,
  layout: "/Agent",
},
{
  path: "/fond_roulement",
  name: "FACTURE FOND DE ROULEMENT",
  icon: "tim-icons icon-pencil",
  component: <FondRoulement />,
  layout: "/Agent",
},
{
  path: "/operateur",
  name: "FACTURE OPERATEUR",
  icon: "tim-icons icon-pencil",
  component: <Operateur />,
  layout: "/Agent",
},
{
  path: "/ventilation_direct",
  name: "FACTURE VENTILATION DIRECT",
  icon: "tim-icons icon-pencil",
  component: <VentilationDirecte />,
  layout: "/Agent",
},
{
  path: "/charges_sociales",
  name: "FISCALITÉ-CHARGES SOCIALES",
  icon: "tim-icons icon-pencil",
  component: <ChargesSociales />,
  layout: "/Agent",
},
{
  path: "/jeton_presence",
  name: "FISCALITÉ-JETON DE PRÉSENCE",
  icon: "tim-icons icon-pencil",
  component: <JetonPresence />,
  layout: "/Agent",
},
{
  path: "/lettre_credit",
  name: "LETTRE DE CREDIT",
  icon: "tim-icons icon-pencil",
  component: <LettreCredit />,
  layout: "/Agent",
},
];
export default AgentRoutes;