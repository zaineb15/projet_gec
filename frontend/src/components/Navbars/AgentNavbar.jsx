import classNames from "classnames";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { Link } from 'react-router-dom';

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    const user_id = localStorage.getItem('user_id'); // Récupérer l'`user_id` stocké localement
    axios.post(`http://127.0.0.1:8000/api/deconnexion/${user_id}`)
      .then(response => {
        console.log(response.data.message);
        // Supprimer les données de l'utilisateur du stockage local
        localStorage.removeItem('user_id');
        // Rediriger vers la page de connexion
        window.location.href = '/login';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
};
  useEffect(() => {
    const fetchUserProfile = async () => {
            try {
              const user_id = localStorage.getItem('user_id');
              if (!user_id) {
                // Gérer le cas où l'ID utilisateur n'est pas défini dans localStorage
                console.error('ID utilisateur non défini dans localStorage');
                return;
              }
              const response = await axios.get(`http://127.0.0.1:8000/api/user/${user_id}`);
              setLoading(false);
              setUser(response.data);
            } catch (error) {
              console.error('Erreur lors de la récupération du profil utilisateur:', error);
            }
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };};
     fetchUserProfile();
  }, []);

  // Mise à jour de la couleur du navbar
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };

  // Basculer l'état d'ouverture/fermeture de la barre de navigation
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };

  // Basculer l'état d'ouverture/fermeture de la fenêtre de recherche
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };



  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-bell-55" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      You have 5 more tasks
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="d-flex align-items-center">
                    <div className="photo mr-2">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <div>
         {loading ? (
           <p>Chargement...</p>
         ) : user ? (
           <React.Fragment>
             <div style={{ display: "flex", alignItems: "center",marginBottom: "-10px" }}>
  <p style={{ marginRight: "3px" }}>{user.name}</p>
  <p>{user.lastname}</p>
</div>

             {/* Ajoutez d'autres champs de profil ici */}
           </React.Fragment>
         ) : (
           <p>Aucun utilisateur trouvé</p>
         )}
       </div>
                  </div>
                </DropdownToggle>

                <DropdownMenu className="dropdown-navbar" right tag="ul">
                <NavLink tag="li">
      <DropdownItem className="nav-item">
        <Link to="/Agent/profile" style={{ color: 'grey' }}>
          Profile
        </Link>
      </DropdownItem>
    </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={handleLogout}>
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;