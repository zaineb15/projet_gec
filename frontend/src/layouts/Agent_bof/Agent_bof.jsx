import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import SidebarAgentBOF from 'components/Sidebar/SidebarAgentBOF'; // Import du Sidebar spécifique à Agent BOF
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import agentBOFRoutes from 'Agent_routes'; // Import des routes spécifiques à Agent BOF

import logo from 'assets/img/react-logo.png';
import { BackgroundColorContext } from 'contexts/BackgroundColorContext';

var ps;

function AgentBOF(props) {
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
      if (prop.layout === '/agent_bof') {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < agentBOFRoutes.length; i++) {
      if (location.pathname.indexOf(agentBOFRoutes[i].layout + agentBOFRoutes[i].path) !== -1) {
        return agentBOFRoutes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <SidebarAgentBOF // Utilisation du Sidebar spécifique à Agent BOF
              routes={agentBOFRoutes}
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
              <Routes>{getRoutes(agentBOFRoutes)}</Routes>
              {location.pathname === '/agent_bof/maps' ? null : <Footer fluid></Footer>}
            </div>
          </div>
          <FixedPlugin bgColor={"primary"} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default AgentBOF;
