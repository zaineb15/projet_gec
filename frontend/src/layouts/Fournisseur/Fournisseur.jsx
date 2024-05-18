import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

import AdminNavbar from "components/Navbars/FournisseurNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

import routes from "routes";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;

// Composant principal de l'interface d'administration
function Fournisseur(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  // Effet pour initialiser et nettoyer PerfectScrollbar
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  // Effet pour gérer le scrolling et la mise à jour du panneau principal
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  // Fonction pour basculer la barre latérale
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  // Fonction pour obtenir les routes spécifiques au composant principal
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/Fournisseur") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  // Fonction pour obtenir le texte de la marque en fonction de l'emplacement actuel
 // Fonction pour obtenir le texte de la marque en fonction de l'emplacement actuel
const getBrandText = (path) => {
  for (let i = 0; i < routes.length; i++) {
    if (
      location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1 &&
      routes[i].name !== "Modifier une facture" && // Ne pas retourner "Brand" pour la page de modification de facture
      routes[i].name !== "Détails de la facture" // Ne pas retourner "Brand" pour la page de consultation de facture
    ) {
      return routes[i].name; // Retourner le nom de la route si elle correspond à l'emplacement actuel
    }
  }
  return ""; // Retourner une chaîne vide si aucune correspondance de route n'est trouvée ou si la route est pour la modification/consultation de facture
};


  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            {/* Barre latérale */}
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            {/* Panneau principal */}
            <div className="main-panel" ref={mainPanelRef} data={color}>
              {/* Barre de navigation */}
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>
                {/* Affichage des routes spécifiques */}
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/Fournisseur/dashboard" replace />}
                />
              </Routes>
              {/* Affichage du footer sauf pour la page des cartes */}
              {location.pathname === "/Fournisseur/maps" ? null : <Footer fluid />}
            </div>
          </div>
          {/* Composant de plugin fixe pour modifier la couleur de fond */}
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Fournisseur;
