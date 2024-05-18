import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";

function AdminDashboard(props) {
  const [receivedReclamationsCount, setReceivedReclamationsCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  useEffect(() => {
    const fetchReceivedReclamationsCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countReceivedReclamations');
        setReceivedReclamationsCount(response.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de réclamations "Reçue":', error);
      }
    };

    fetchReceivedReclamationsCount();
  }, []);
  useEffect(() => {
    // Fonction pour récupérer le nombre d'utilisateurs actifs depuis votre API Laravel
    const fetchActiveUsersCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/active-users-count'); // Modifier l'URL selon votre configuration
        setActiveUsersCount(response.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs actifs:', error);
      }
    };

    // Appeler la fonction pour récupérer le nombre d'utilisateurs actifs lors du montage du composant
    fetchActiveUsersCount();
  }, []);
  return (
    <div className="content">
      {/* Row pour organiser les cartes en ligne */}
      <Row>
        {/* Colonne pour la première carte */}
        <Col lg="6" md="6" sm="12">
          {/* Carte pour afficher les statistiques */}
          <Card className="card-stats" style={{ backgroundColor: '#19d282' }}>
            {/* En-tête de la carte */}
            <CardHeader>
              {/* Titre de la carte avec une icône de succès */}
              <h4>
                <i className="tim-icons icon-check-2 text-success" /> Utilisateurs connectés
              </h4>
              {/* Chiffre de statistique */}
              <h4>{activeUsersCount}</h4>
            </CardHeader>
          </Card>
        </Col>
        {/* Colonne pour la deuxième carte */}
        <Col lg="6" md="6" sm="12">
          {/* Carte pour afficher les statistiques */}
          <Card className="card-stats" style={{ backgroundColor: '#7698ff' }}>
            {/* En-tête de la carte */}
            <CardHeader>
              {/* Titre de la carte avec une icône d'information */}
              <h4 >
                <i className="tim-icons icon-settings-gear-63 text-info" /> Réclamations reçue
              </h4>
              {/* Chiffre de statistique */}
              <h4>{receivedReclamationsCount}</h4>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
