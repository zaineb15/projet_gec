import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Table,
  Col,
  InputGroup,
  Input,
  CardHeader,
} from 'reactstrap';
import Loading from 'assets/images/25.png';

function FacturesList() {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appeler l'API pour récupérer toutes les factures
    const fetchFactures = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/past-date-facturesf');
        setFactures(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error);
      }
    };

    fetchFactures();
  }, []);

  return (
    <div className="content">
      <Col md="16">
        <Card>
          <CardBody>
            {loading ? (
              <div className="text-center">
                <img
                  src={Loading}
                  alt="Logo"
                  style={{ width: '50px', height: '50px' }}
                />
                <p>Chargement des factures en cours</p>
              </div>
            ) : (
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Numéro Facture</th>
                    <th>Fournisseur</th>
                    <th>Date Facture</th>
                    <th>Numéro PO</th>
                    <th>Montant</th>
                    <th>Objet</th>
                    <th>ID Fiscale</th>
                    <th>Délai de Paiement</th>
                    <th>Nature 3WM</th>
                    <th>Date de Réception</th>
                    {/* Ajouter d'autres colonnes si nécessaire */}
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture) => (
                    <tr key={facture.id}>
                      <td>{facture.numeroFacture}</td>
                      <td>{facture.fournisseur}</td>
                      <td>{facture.dateFacture}</td>
                      <td>{facture.numeroPO}</td>
                      <td>{facture.montant}</td>
                      <td>{facture.objet}</td>
                      <td>{facture.idFiscale}</td>
                      <td>{facture.delaiPaiement}</td>
                      <td>{facture.nature3wm}</td>
                      <td>{facture.dateReception}</td>
                      {/* Afficher d'autres colonnes selon les besoins */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default FacturesList;
