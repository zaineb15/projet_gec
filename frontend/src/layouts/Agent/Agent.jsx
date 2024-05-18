import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import AdminNavbar from 'components/Navbars/AgentNavbar';
import Footer from 'components/Footer/Footer';
import SidebarAgent from 'components/Sidebar/SidebarAgent'; // Import du Sidebar spécifique à Agent BOF
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import AgentRoutes from 'agent_routes'; // Import des routes spécifiques à Agent BOF

import logo from 'assets/img/react-logo.png';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';

var ps;

function Agent(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setSidebarOpened] = React.useState(
    document.documentElement.className.indexOf('nav-open') !== -1
  );

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll('.table-responsive');
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
        document.documentElement.classList.add('perfect-scrollbar-off');
        document.documentElement.classList.remove('perfect-scrollbar-on');
      }
    };
  });

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      let tables = document.querySelectorAll('.table-responsive');
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

  const toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    setSidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/Agent') {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      } else {
        return null;
      }
    });
  };

// Fonction pour obtenir le texte de la marque en fonction de l'emplacement actuel
const getBrandText = (path) => {
  // Vérifier si l'URL correspond à la route spécifique "/tresorerie/consulter_bordereau/12" ou "/tresorerie/consulter_archieve_bordereau/12"
  if (path === "/Agent/consulter_bordereau/12" || path === "/Agent/consulter_archieve_bordereau/12") {
    return "Liste FACTURE FOURNISSEUR"; // Forcer l'affichage du nom spécifique
  }
  if (path === "/Agent/consulter_bordereau/10" || path === "/Agent/consulter_archieve_bordereau/10") {
    return "Liste FISCALITÉ-JETON DE PRÉSENCE"; // Forcer l'affichage du nom spécifique
  }
  if (path === "/Agent/consulter_bordereau/11" || path === "/Agent/consulter_archieve_bordereau/11") {
    return "Liste LETTRE DE CREDIT"; // Forcer l'affichage du nom spécifique
  }
  // Vérifier les autres routes
  for (let i = 0; i < AgentRoutes.length; i++) {
    if (
      location.pathname.indexOf(AgentRoutes[i].layout + AgentRoutes[i].path) !== -1 &&
      AgentRoutes[i].name !== "Modifier une facture" && // Ne pas retourner "Brand" pour la page de modification de facture
      AgentRoutes[i].name !== "Détails de la facture" // Ne pas retourner "Brand" pour la page de consultation de facture
    ) {
      return AgentRoutes[i].name; // Retourner le nom de la route si elle correspond à l'emplacement actuel
    }
  }
  return ""; // Retourner une chaîne vide si aucune correspondance de route n'est trouvée ou si la route est pour la modification/consultation de facture
};


  return (
    <BackgroundColorContext.Consumer>
      {({ changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <SidebarAgent // Utilisation du Sidebar spécifique à Agent BOF
              routes={AgentRoutes}
              logo={{
                outterLink: 'https://www.creative-tim.com/',
                text: 'Creative Tim',
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={"primary"}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>{getRoutes(AgentRoutes)}</Routes>
              {location.pathname === '/Agent/maps' ? null : <Footer fluid></Footer>}
            </div>
          </div>
          <FixedPlugin bgColor={"primary"} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Agent;
