import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Col, Button } from "reactstrap";
import axios from 'axios';
import Loading from 'assets/images/25.png';

const ListeReclamationbof = () => {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reclamationsPerPage = 6;
  const [reclamationsStatus, setReclamationsStatus] = useState({});
  const handleReply = (reclamation) => {
    const to = reclamation.user.email; // Récupérer l'e-mail de l'utilisateur associé à la réclamation
    const subject = `Re: ${reclamation.objet}`; // Sujet du nouvel e-mail avec "Re: " précédant le sujet de la réclamation
    const body = `Bonjour,\n\nVotre réclamation "${reclamation.objet}" a été reçue.\n\nCordialement,\nVotre équipe de support`; // Corps de l'e-mail
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // Générer le lien mailto

    // Ouvrir un nouvel onglet ou une nouvelle fenêtre avec le lien mailto
    window.open(mailtoLink);
  };
  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reclamationall');
        setReclamations(response.data);
        setLoading(false);
        // Initialiser les statuts de toutes les réclamations dans l'état local
        const initialStatus = response.data.reduce((acc, reclamation) => {
          acc[reclamation.id] = reclamation.status || "Reçue";
          return acc;
        }, {});
        setReclamationsStatus(initialStatus);
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations:', error);
      }
    };

    fetchReclamations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reclamation/${id}`);
      const updatedReclamations = reclamations.filter(reclamation => reclamation.id !== id);
      setReclamations(updatedReclamations);
      // Supprimer le statut de la réclamation supprimée de l'état local
      const updatedStatus = { ...reclamationsStatus };
      delete updatedStatus[id];
      setReclamationsStatus(updatedStatus);
    } catch (error) {
      console.error('Erreur lors de la suppression de la réclamation:', error);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(reclamations.length / reclamationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Envoyer une seule requête avec tous les statuts mis à jour
      await Promise.all(Object.entries(reclamationsStatus).map(([id, status]) =>
        axios.put(`http://127.0.0.1:8000/api/reclamations/${id}/status`, { status })
      ));
      window.location.href = "/Admin/listereclamation";
      // Rafraîchir la liste des réclamations après la mise à jour des statuts
      const response = await axios.get('http://127.0.0.1:8000/api/reclamations');
      setReclamations(response.data);
      // Mettre à jour les statuts localement
      const updatedStatus = response.data.reduce((acc, reclamation) => {
        acc[reclamation.id] = reclamation.status || "Reçue";
        return acc;
      }, {});
      setReclamationsStatus(updatedStatus);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statuts des réclamations:', error);
      alert('Erreur lors de la mise à jour des statuts des réclamations!');
    }
  };

  const indexOfLastReclamation = currentPage * reclamationsPerPage;
  const indexOfFirstReclamation = indexOfLastReclamation - reclamationsPerPage;
  const currentReclamations = reclamations.slice(indexOfFirstReclamation, indexOfLastReclamation);

  return (
    <div className="content">
      <Col md="16">
        <Card>
          <CardBody>
            {loading ? (
              <div className="text-center">
                <img src={Loading} alt="Logo" style={{ width: '50px', height: '50px' }} />
                <p>Chargement des réclamations en cours</p>
              </div>
            ) : (
              <>
                <Table className="tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>id</th>
                      <th>objet</th>
                      <th>message</th>
                      <th>status</th>
                      <th className="text-center">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReclamations.map((reclamation) => (
                      <tr key={reclamation.id}>
                        <td>{reclamation.id}</td>
                        <td>{reclamation.objet}</td>
                        <td>{reclamation.message}</td>
                        <td>
                          <select
                            value={reclamationsStatus[reclamation.id]}
                            onChange={(e) => setReclamationsStatus(prevStatus => ({
                              ...prevStatus,
                              [reclamation.id]: e.target.value
                            }))}
                          >
                            <option value="Reçue">Reçue</option>
                            <option value="En cours de traitement">En cours de traitement</option>
                            <option value="Traitée">Traitée</option>
                            <option value="Clôturée">Clôturée</option>
                          </select>
                        </td>
                        <td className="project-actions text-center">
                          {/* <button className="btn btn-danger btn-sm btn-circle" type="button" onClick={() => handleDelete(reclamation.id)}>
                         Supprimer
                          </button> */}
                          <button className="btn btn-primary btn-sm" onClick={() => handleReply(reclamation)}>Répondre</button>
                        </td>
                        <td className="project-actions text-center">          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {reclamations.length > reclamationsPerPage && (
                  <ul className="pagination justify-content-end">
                    <li className="page-item">
                      <Button onClick={goToPreviousPage} className="page-link">
                        <i className="fas fa-chevron-left"></i>
                      </Button>
                    </li>
                    <li className="page-item">
                      <Button className="page-link">
                        {currentPage}/{Math.ceil(reclamations.length / reclamationsPerPage)}
                      </Button>
                    </li>
                    <li className="page-item">
                      <Button onClick={goToNextPage} className="page-link">
                        <i className="fas fa-chevron-right"></i>
                      </Button>
                    </li>
                  </ul>
                )}
                  <Button onClick={handleSubmit} className="btn btn-primary">Soumettre tous les status</Button>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default ListeReclamationbof;
