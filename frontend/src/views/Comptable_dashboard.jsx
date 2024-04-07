import React from "react";
import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";

function ComptableDashboard(props) {
  return (
    <div className="content">
      {/* Row pour organiser les cartes en ligne */}
      <Row>
        {/* Colonne pour la première carte */}
        <Col lg="4" md="6" sm="12">
          {/* Carte pour afficher les statistiques */}
          <Card className="card-stats">
            {/* En-tête de la carte */}
            <CardHeader>
              {/* Titre de la carte avec une icône de succès */}
              <h4 className="text-muted">
                <i className="tim-icons icon-check-2 text-success" /> Factures payées
              </h4>
              {/* Chiffre de statistique */}
              <h4>2000</h4>
            </CardHeader>
          </Card>
        </Col>
        {/* Colonne pour la deuxième carte */}
        <Col lg="4" md="6" sm="12">
          {/* Carte pour afficher les statistiques */}
          <Card className="card-stats">
            {/* En-tête de la carte */}
            <CardHeader>
              {/* Titre de la carte avec une icône d'information */}
              <h4 className="text-muted">
                <i className="tim-icons icon-settings-gear-63 text-info" /> Factures en attente
              </h4>
              {/* Chiffre de statistique */}
              <h4>5</h4>
            </CardHeader>
          </Card>
        </Col>
        {/* Colonne pour la troisième carte */}
        <Col lg="4" md="6" sm="12">
          {/* Carte pour afficher les statistiques */}
          <Card className="card-stats">
            {/* En-tête de la carte */}
            <CardHeader>
              {/* Titre de la carte avec une icône de suppression */}
              <h4 className="text-muted">
                <i className="tim-icons icon-simple-remove text-primary" /> Factures non payées
              </h4>
              {/* Chiffre de statistique */}
              <h4>3</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ComptableDashboard;