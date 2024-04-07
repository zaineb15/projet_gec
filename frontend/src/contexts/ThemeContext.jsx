import { createContext } from "react";

// Définition des différents thèmes disponibles
export const themes = {
  dark: "dark-content", // Thème sombre sans classe spécifique
  light: "white-content", // Thème clair avec la classe "white-content"
};

// Création du contexte de thème avec une valeur par défaut et une fonction de changement de thème
export const ThemeContext = createContext({
  theme: themes.light, // Thème par défaut
  changeTheme: () => {}, // Fonction de changement de thème initialisée avec une fonction vide
});
