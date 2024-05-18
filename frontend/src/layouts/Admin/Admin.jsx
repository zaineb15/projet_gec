import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import SidebarAdmin from 'components/Sidebar/SidebarAdmin'; // Import du Sidebar spécifique à Admin
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import adminRoutes from 'Admin_routes'; // Import des routes spécifiques à Admin

import logo from 'assets/img/react-logo.png';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';

var ps;

function Admin(props) {
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
      if (prop.layout === '/Admin') {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    // Vérifie si le chemin correspond à la route de modification de l'utilisateur
    if (path.includes("/edituser")) {
      return "Modifier l'utilisateur";
    }
  
    // Parcours les routes pour trouver le nom correspondant
    for (let i = 0; i < adminRoutes.length; i++) {
      if (path.indexOf(adminRoutes[i].layout + adminRoutes[i].path) !== -1) {
        return adminRoutes[i].name;
      }
    }
    
    // Si aucun nom spécifique n'est trouvé, affiche le nom par défaut
    return 'Brand';
  };
  

  return (
    <BackgroundColorContext.Consumer>
      {({ changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <SidebarAdmin // Utilisation du Sidebar spécifique à Admin
              routes={adminRoutes}
              logo={{
                outterLink: 'https://www.creative-tim.com/',
                text: 'Creative Tim',
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={"green"}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>{getRoutes(adminRoutes)}</Routes>
              {location.pathname === '/Admin/maps' ? null : <Footer fluid></Footer>}
            </div>
          </div>
          <FixedPlugin bgColor={"green"} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;

