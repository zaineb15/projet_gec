import React from "react";
import { Container } from "reactstrap";

function Footer() {
  return (
    // Début du composant Footer
    <footer className="footer" style={{ position: "fixed", bottom: 0, width: "100%", padding: "20px 0" }}>
      {/* Conteneur fluide pour le contenu du footer */}
      <Container fluid>
        {/* Contenu du footer aligné au centre */}
        <div className="footer-content" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          {/* Texte centré avec l'année actuelle et un icône de cœur */}
          <div className="text-center">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            {/* Lien vers le site de Tunisie Télécom ouvrant dans une nouvelle fenêtre */}
            <a href="https://www.tunisietelecom.tn/particulier/" target="_blank"  rel="noreferrer">
              Tunisie Télécom
            </a>{" "}
            for your comfort.
          </div>
        </div>
      </Container>
    </footer> // Fin du composant Footer
  );
}

export default Footer;
