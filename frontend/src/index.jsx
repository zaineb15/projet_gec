// index.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import FournisseurLayout from "./layouts/Fournisseur/Fournisseur";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./components/LoginForm/LoginForm";
import FGpassword from "./components/LoginForm/ForgotPassword";
import CFpassword from "./components/LoginForm/ConfirmPassword";
import CodeConfirm from "./components/LoginForm/ConfirmationCode";
import Reclamation from "./components/Dashboardpages/ReclamationForm";
import UpdateReclamation from "./components/Dashboardpages/UpdateReclamation";
import Facture from "./components/Dashboardpages/FactureForm";
import Listefacture from "./components/Dashboardpages/ListeFacture";
import Listereclamation from "./components/Dashboardpages/ListeReclamation";
import Updatefacture from "./components/Dashboardpages/UpdateFacture";
import ConsulterFacturebof from "./components/Dashboardpages/ConsulterFacturebof";
import ConsulterFacture from "./components/Dashboardpages/ConsulterFacture";
import ConsulterReclamation from "./components/Dashboardpages/ConsulterReclamation";
import Preloader from "./components/Preloader";
import Typefacturebof from "./components/Dashboardpages/Typefacturebof";


import AgentLayout from "./layouts/Agent/Agent";
import AdminLayout from "./layouts/Admin/Admin";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

// Functional component for Index
const Index = () => {
  // State for managing loading
  const [loading, setLoading] = useState(true);

  // Effect for simulating loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated loading time: 2 seconds

    // Cleanup
    return () => clearTimeout(timeout);
  }, []);
  // useEffect(() => {
  //   const handleUnload = () => {
  //     localStorage.removeItem('user_id');
  //   };

  //   window.addEventListener('beforeunload', handleUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleUnload);
  //   };
  // }, []);
  
  return loading ? (
    <Preloader />
  ) : (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<FGpassword />} />
            <Route path="/confirmpassword" element={<CFpassword />} />
            <Route path="/confirmcode" element={<CodeConfirm />} />
            <Route path="/reclamation" element={<Reclamation />} />
            <Route path="/listereclamation" element={<Listereclamation />} />
            <Route path="/facture" element={<Facture />} />
            <Route path="/listefacture" element={<Listefacture />} /> 
             <Route path="/updatefacture/:id" element={<Updatefacture />} />
            <Route path="/updatereclamation/:id" element={<UpdateReclamation />} />
            <Route path="/consulterfacture/:id" element={<ConsulterFacture />} />
            <Route path="/consulterfacturebof/:id" element={<ConsulterFacturebof />} />
            <Route path="/consulterreclamation/:id" element={<ConsulterReclamation />} />
            <Route path="/typefacturebof" element={<Typefacturebof />} /> 
            <Route path="/Fournisseur/*" element={<FournisseurLayout />} />

             <Route path="/charges_locatives" element={<ChargesLocatives />} />
            <Route path="/devise" element={<Devise />} />
            <Route path="/steg" element={<Steg />} />
            <Route path="/commission_distribution" element={<CommissionDistribution />} />
            <Route path="/financement" element={<Financement />} />
            <Route path="/fond_roulement" element={<FondRoulement />} />
            <Route path="/operateur" element={<Operateur />} />
            <Route path="/ventilation_direct" element={<VentilationDirecte />} />
            <Route path="/charges_sociales" element={<ChargesSociales />} />
            <Route path="/jeton_presence" element={<JetonPresence />} />
            <Route path="/lettre_credit" element={<LettreCredit />} /> 

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/Gestion-Electronique-des-Courriers"
              element={<Navigate to="/login" replace />}
            />

            <Route path="/Agent/*" element={<AgentLayout />} />
            <Route path="/Admin/*" element={<AdminLayout />} />
          </Routes>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
};

// Root render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
