// index.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/Admin/Admin";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./components/LoginForm/LoginForm";
import Register from "./components/LoginForm/RegisterForm";
import FGpassword from "./components/LoginForm/ForgotPassword";
import CFpassword from "./components/LoginForm/ConfirmPassword";
import CodeConfirm from "./components/LoginForm/ConfirmationCode";
import Reclamation from "./components/Dashboardpages/ReclamationForm";
import UpdateReclamation from "./components/Dashboardpages/UpdateReclamation";
import Facture from "./components/Dashboardpages/FactureForm";
import Listefacture from "./components/Dashboardpages/ListeFacture";
import Listereclamation from "./components/Dashboardpages/ListeReclamation";
import Updatefacture from "./components/Dashboardpages/UpdateFacture";
import ConsulterFacture from "./components/Dashboardpages/ConsulterFacture";
import ConsulterReclamation from "./components/Dashboardpages/ConsulterReclamation";
import Preloader from "./components/Preloader";

import AgentLayout from "./layouts/Agent_bof/Agent_bof";
import ComptableLayout from "./layouts/Comptable/Comptable";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

  // Render either Preloader or application content based on loading state
  return loading ? (
    <Preloader />
  ) : (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<FGpassword />} />
            <Route path="/confirmpassword" element={<CFpassword />} />
            <Route path="/confirmcode" element={<CodeConfirm />} />
            <Route path="/reclamation" element={<Reclamation />} />
            <Route path="/listereclamation" element={<Listereclamation />} />
            <Route path="/facture" element={<Facture />} />
            <Route path="/listefacture" element={<Listefacture />} />
            {/* Ajoutez une route pour l'update de la facture */}
            <Route path="/updatefacture/:id" element={<Updatefacture />} />
            <Route path="/updatereclamation/:id" element={<UpdateReclamation />} />
            <Route path="/consulterfacture/:id" element={<ConsulterFacture />} />
            <Route path="/consulterreclamation/:id" element={<ConsulterReclamation />} />
            <Route path="/fournisseur/*" element={<AdminLayout />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/Gestion-Electronique-des-Courriers"
              element={<Navigate to="/login" replace />}
            />
            <Route path="/agent_bof/*" element={<AgentLayout />} />
            <Route path="/comptable/*" element={<ComptableLayout />} />
          </Routes>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
};

// Root render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
