import React from "react";
import {Dropdown, DropdownToggle, Badge } from "reactstrap";
import { ThemeContext, themes } from "contexts/ThemeContext";
import { backgroundColors } from "contexts/BackgroundColorContext";

function FixedPlugin(props) {
  // State pour gérer l'état du menu déroulant
  const [dropDownIsOpen, setdropDownIsOpen] = React.useState(false);

  // Fonction pour basculer l'état du menu déroulant
  const handleClick = () => {
    setdropDownIsOpen(!dropDownIsOpen);
  };

  return (
    // Div pour le plugin fixe
    <div className="fixed-plugin">
      {/* Dropdown pour les options de configuration */}
      <Dropdown isOpen={dropDownIsOpen} toggle={handleClick}>
        {/* Toggle du dropdown */}
        <DropdownToggle tag="div">
          <i className="fa fa-cog fa-2x" />
        </DropdownToggle>
        {/* Menu déroulant des options de configuration */}
        <ul className="dropdown-menu show">
          {/* Titre de l'entête du menu */}
          {/* Ligne d'ajustements des couleurs de fond */}
          <li className="adjustments-line">
            {/* Badges pour les couleurs de fond avec des classes actives pour les couleurs sélectionnées */}
          </li>
          {/* Ligne d'ajustements de la couleur de thème */}
          <li className="adjustments-line text-center color-change">
            {/* Consommateur du contexte de thème */}
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <>
                  {/* Label pour le mode clair */}
                  <span className="color-label">LIGHT MODE</span>{" "}
                  {/* Badges pour le mode clair et foncé avec des événements onClick */}
                  <Badge
                    className="light-badge mr-2"
                    onClick={() => changeTheme(themes.light)}
                  />{" "}
                  <Badge
                    className="dark-badge ml-2"
                    onClick={() => changeTheme(themes.dark)}
                  />{" "}
                  {/* Label pour le mode foncé */}
                  <span className="color-label">DARK MODE</span>{" "}
                </>
              )}
            </ThemeContext.Consumer>
          </li>
          <li className="adjustments-line">
            {/* Badges pour les couleurs de fond avec des classes actives pour les couleurs sélectionnées */}
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
