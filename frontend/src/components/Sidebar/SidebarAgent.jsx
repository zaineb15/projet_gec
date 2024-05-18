import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav, NavItem, NavLink as  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import geclogo from '../../assets/images/tt.png';

var ps;

function SidebarAgent(props) {
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
          <img src={geclogo} alt="logo" style={{ width: '110px', height: '60px', borderRadius: '50%' }} />
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
                if (prop.redirect || prop.path === '/facture' || prop.path === '/profile' || prop.path === '/reclamation'||
                 prop.path === '/consulterfacturebof/:id'|| prop.path === '/typefacturebof'|| prop.path === '/charges_locatives'|| prop.path === '/devise'|| prop.path === '/steg'|| prop.path === '/commission_distribution'|| prop.path === '/financement'|| prop.path === '/fond_roulement'|| prop.path === '/operateur'|| prop.path === '/ventilation_direct'|| prop.path === '/charges_sociales'|| prop.path === '/jeton_presence'|| prop.path === '/lettre_credit'||
                 prop.path === '/consulter_bordereau/1'|| prop.path === '/consulter_bordereau/2'|| prop.path === '/consulter_bordereau/3'|| prop.path === '/consulter_bordereau/4'|| prop.path === '/consulter_bordereau/5'|| prop.path === '/consulter_bordereau/6'|| prop.path === '/consulter_bordereau/7'|| prop.path === '/consulter_bordereau/8'|| prop.path === '/consulter_bordereau/9'||prop.path === '/consulter_bordereau/10'|| prop.path === '/consulter_bordereau/11'|| prop.path === '/consulter_bordereau/12'||
                  prop.path === '/consulter_archieve_bordereau/1'|| prop.path === '/consulter_archieve_bordereau/2'|| prop.path === '/consulter_archieve_bordereau/3'|| prop.path === '/consulter_archieve_bordereau/4'||
                 prop.path === '/consulter_archieve_bordereau/5'|| prop.path === '/consulter_archieve_bordereau/6'|| prop.path === '/consulter_archieve_bordereau/7'|| prop.path === '/consulter_archieve_bordereau/8'|| prop.path === '/consulter_archieve_bordereau/9'|| prop.path === '/consulter_archieve_bordereau/10'|| prop.path === '/consulter_archieve_bordereau/11'|| prop.path === '/consulter_archieve_bordereau/12'|| prop.path === '/facturenew/:id'|| prop.path === '/ventilation/:id'|| prop.path === '/steg/:id'|| prop.path === '/operateur/:id'|| prop.path === '/lettre-credit/:id'|| prop.path === '/fond-roulement/:id'|| prop.path === '/fiscalite/:id'|| prop.path === '/financement/:id'|| prop.path === '/commission-distribution/:id'|| prop.path === '/charges-sociales/:id'|| prop.path === '/charges-locatives/:id'|| prop.path === '/devisee/:id'
                 || prop.path === '/consulterdevise/:id'|| prop.path === '/consulterchargelocative/:id'|| prop.path === '/consulterchargesociale/:id'|| prop.path === '/consultercommdis/:id'|| prop.path === '/consulterfinancement/:id'|| prop.path === '/consulterfiscalite/:id'|| prop.path === '/consulterfondroulement/:id'|| prop.path === '/consulterlettrecredit/:id'|| prop.path === '/consulteroperateur/:id'|| prop.path === '/consultersteg/:id'|| prop.path === '/consulterventilation/:id'
                 ) return null;
                return (
                  <NavItem
                    key={key}
                    className={
                      location.pathname === prop.layout + prop.path ? "active" : ""
                    }
                  >
                    {prop.dropdown ? (
                      <Dropdown
                        nav
                        inNavbar
                        isOpen={false}
                        toggle={() => {}}
                      >
                        <DropdownToggle nav caret>
                          <i className={prop.icon} />
                          <p>{rtlActive ? prop.rtlName : prop.name}</p>
                        </DropdownToggle>
                        <DropdownMenu>
                          {prop.children.map((childProp, childKey) => (
                            <DropdownItem
                              key={childKey}
                              tag={NavLink}
                              to={childProp.layout + childProp.path}
                              activeClassName="active"
                              onClick={props.toggleSidebar}
                            >
                              {rtlActive ? childProp.rtlName : childProp.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        onClick={props.toggleSidebar}
                      >
                        <i className={prop.icon} />
                        <p>{rtlActive ? prop.rtlName : prop.name}</p>
                      </NavLink>
                    )}
                  </NavItem>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

SidebarAgent.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default SidebarAgent;
