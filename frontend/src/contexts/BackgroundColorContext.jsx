import { createContext } from "react";

// Définition des différentes couleurs de fond disponibles
export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "green",
};

// Création du contexte de couleur de fond avec une valeur par défaut et une fonction de changement de couleur
export const BackgroundColorContext = createContext({
  color: backgroundColors.blue, // Couleur par défaut
  color1: backgroundColors.primary,
  color2: backgroundColors.green,
  changeColor: (color,color1,color2) => {}, // Fonction de changement de couleur initialisée avec une fonction vide
});
