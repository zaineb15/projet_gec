import React, { useState } from "react";
import { BackgroundColorContext, backgroundColors } from "contexts/BackgroundColorContext";

/**
 * Composant utilisé pour envelopper l'application et fournir le contexte de couleur de fond.
 * Il gère l'état de la couleur de fond et expose une fonction pour la modifier.
 */
export default function BackgroundColorWrapper(props) {
  // État pour gérer la couleur de fond, initialisé avec la couleur par défaut
  const [color, setColor] = useState(backgroundColors.blue);

  // Fonction pour changer la couleur de fond
  function changeColor(color) {
    setColor(color);
  }

  return (
    // Fournit le contexte de couleur de fond avec la couleur actuelle et la fonction changeColor
    <BackgroundColorContext.Provider value={{ color: color, changeColor: changeColor }}>
      {/* Rendu des composants enfants */}
      {props.children}
    </BackgroundColorContext.Provider>
  );
}
