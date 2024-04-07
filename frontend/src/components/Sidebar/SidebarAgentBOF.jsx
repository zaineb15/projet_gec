import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav } from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import geclogo from '../../assets/images/1.png';

var ps;

function SidebarAgentBOF(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const { routes, rtlActive, logo } = props;

  let logoImg = null;

  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <div className="logo" style={{ textAlign: 'center' }}>
          <div className="logo-img" style={{ display: 'inline-block', marginRight: '10px' }}>
            <img src={geclogo} alt="logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
          </div>
          <div style={{ display: 'inline-block' }}> <br/>
            <h6 style={{ color: 'white' }}>Gestion Eléctronique des Courriers</h6>
          </div>
        </div>
      );
    } else {
      logoImg = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          </div>
          <div className="logo-text">
            <p style={{ color: 'white' }}><b>{logo.text}</b></p>
          </div>
        </NavLink>
      );
    }
  }

  return (
    <BackgroundColorContext.Consumer>
      {({ color2 }) => (
        <div className="sidebar" data={color2}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg}
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect || prop.path === '/facture' || prop.path === '/profile' || prop.path === '/reclamation') return null;
                return (
                  <li
                    className={
                      location.pathname === prop.layout + prop.path ? "active" : ""
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      onClick={props.toggleSidebar}
                    >
                      <i className={prop.icon} />
                      <p>{rtlActive ? prop.rtlName : prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

SidebarAgentBOF.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default SidebarAgentBOF;
