import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "contexts/ThemeContext";

/**
 * Composant utilisé pour envelopper l'application et fournir le contexte de thème.
 * Il gère l'état du thème et applique les styles correspondants au corps du document.
 */
export default function ThemeContextWrapper(props) {
  // État pour gérer le thème, initialisé avec le thème par défaut (light)
  const [theme, setTheme] = useState(themes.light);

  // Fonction pour changer le thème
  function changeTheme(theme) {
    setTheme(theme);
  }

  // Effet pour mettre à jour les styles du corps du document en fonction du thème sélectionné
  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  return (
    // Fournit le contexte de thème avec le thème actuel et la fonction changeTheme
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {/* Rendu des composants enfants */}
      {props.children}
    </ThemeContext.Provider>
  );
}
