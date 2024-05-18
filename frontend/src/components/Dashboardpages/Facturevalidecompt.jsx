import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table
} from "reactstrap";

function Dashboard(props) {
  const [factures, setFactures] = useState([]); // État pour stocker les données des factures

  useEffect(() => {
    const fetchFactureCountcompt = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/countvalidecompt?user_id=${user_id}`
        );
        setFactures(response.data.factures); // Données des factures
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de factures validées par le fiscaliste :",
          error
        );
      }
    };

    fetchFactureCountcompt(); // Appeler fetchFactureCount lorsque le composant est monté
  }, []); // Utiliser une dépendance vide pour que useEffect soit exécuté une seule fois lors du montage

  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>Détails des factures :</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Montant</th>
                    <th>Numéro de facture</th>
                    <th>Date de facture</th>
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture, index) => (
                    <tr key={index}>
                      <td>{facture.montant}</td>
                      <td>{facture.num_fact}</td>
                      <td>{facture.date_fact}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
